import logging
import email
import imaplib
import re
from html import unescape
from email.header import decode_header, make_header
from email.utils import formataddr, parseaddr, parsedate_to_datetime

from django.conf import settings
from django.core.validators import validate_email
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer

logger = logging.getLogger(__name__)


def decode_email_value(value):
    if not value:
        return ""

    try:
        return str(make_header(decode_header(value)))
    except Exception:
        return value


def extract_message_body(message):
    if message.is_multipart():
        plain_body = ""
        html_body = ""

        for part in message.walk():
            content_type = part.get_content_type()
            disposition = part.get_content_disposition()

            if disposition == "attachment":
                continue

            try:
                payload = part.get_payload(decode=True)
            except Exception:
                payload = None

            if not payload:
                continue

            charset = part.get_content_charset() or "utf-8"
            text = payload.decode(charset, errors="replace").strip()

            if content_type == "text/plain" and not plain_body:
                plain_body = text
            elif content_type == "text/html" and not html_body:
                html_body = text

        return plain_body or strip_html(html_body)

    payload = message.get_payload(decode=True)
    if not payload:
        return ""

    charset = message.get_content_charset() or "utf-8"
    return payload.decode(charset, errors="replace").strip()


def strip_html(value):
    if not value:
        return ""

    return unescape(re.sub(r"<[^>]+>", " ", value)).strip()


def normalize_email_date(value):
    if not value:
        return ""

    try:
        parsed_date = parsedate_to_datetime(value)
    except Exception:
        return value

    return parsed_date.isoformat()


class ContactSubmissionCreateView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        page_number = request.query_params.get("page", 1)
        page_size = request.query_params.get("page_size", 10)

        try:
            page_size = max(1, min(int(page_size), 100))
        except (TypeError, ValueError):
            page_size = 10

        submissions = ContactSubmission.objects.all()
        paginator = Paginator(submissions, page_size)

        try:
            page = paginator.page(page_number)
        except PageNotAnInteger:
            page = paginator.page(1)
        except EmptyPage:
            page = paginator.page(paginator.num_pages)

        serializer = ContactSubmissionSerializer(page.object_list, many=True)

        return Response(
            {
                "results": serializer.data,
                "count": paginator.count,
                "page": page.number,
                "page_size": page_size,
                "total_pages": paginator.num_pages,
                "has_next": page.has_next(),
                "has_previous": page.has_previous(),
                "stats": {
                    "total": paginator.count,
                    "new": submissions.filter(email_sent=False).count(),
                    "contacted": submissions.filter(email_sent=True).count(),
                    "converted": 0,
                },
            },
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        serializer = ContactSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        submission = serializer.save()

        email_sent, email_error = self.send_contact_email(submission)
        if email_sent:
            submission.email_sent = True
            submission.save(update_fields=["email_sent"])

        response_data = {
            "message": "Enquiry Submitted Successfully.",
            "email_sent": email_sent,
            "data": ContactSubmissionSerializer(submission).data,
        }

        if email_error and settings.DEBUG:
            response_data["email_error"] = email_error

        return Response(response_data, status=status.HTTP_201_CREATED)

    def send_contact_email(self, submission):
        if not settings.EMAIL_HOST_PASSWORD:
            error = "EMAIL_HOST_PASSWORD is missing. Gmail SMTP requires an app password."
            logger.error("Contact email not sent: %s", error)
            return False, error

        subject = f"New contact enquiry - {submission.service}"
        plain_message = (
            "New contact form submission\n\n"
            f"Full Name: {submission.full_name}\n"
            f"Phone Number: {submission.phone}\n"
            f"Email Address: {submission.email}\n"
            f"Service Required: {submission.service}\n\n"
            "Project Details:\n"
            f"{submission.message}\n"
        )
        html_message = render_to_string(
            "velocity_webtech/contact_submission_email.html",
            {"submission": submission},
        )

        try:
            email_message = EmailMultiAlternatives(
                subject,
                plain_message,
                formataddr((submission.full_name, submission.email)),
                [settings.CONTACT_RECEIVER_EMAIL],
                reply_to=[submission.email],
                headers={
                    "Sender": settings.DEFAULT_FROM_EMAIL,
                    "X-Velocity-Client-Email": submission.email,
                },
            )
            email_message.attach_alternative(html_message, "text/html")
            email_message.send(fail_silently=False)
        except Exception as error:
            logger.exception("Contact email not sent.")
            return False, str(error)

        return True, ""


class ContactSubmissionEmailHistoryView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        customer_email = (request.query_params.get("email") or "").strip()
        service = (request.query_params.get("service") or "").strip()
        message = (request.query_params.get("message") or "").strip()

        if not customer_email:
            return Response(
                {"message": "Email query parameter is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not settings.EMAIL_HOST_USER or not settings.EMAIL_HOST_PASSWORD:
            return Response(
                {"message": "Gmail credentials are not configured."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        try:
            messages = self.fetch_gmail_messages(customer_email)
            messages = self.filter_messages_for_enquiry(messages, service, message)
        except Exception as error:
            logger.exception("Unable to fetch Gmail messages.")
            return Response(
                {"message": "Unable to fetch Gmail messages.", "detail": str(error)},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        return Response(
            {
                "email": customer_email,
                "from_account": settings.EMAIL_HOST_USER,
                "count": len(messages),
                "results": messages,
            },
            status=status.HTTP_200_OK,
        )

    def fetch_gmail_messages(self, customer_email):
        mailbox_names = ['"[Gmail]/All Mail"', "INBOX"]
        messages = []

        with imaplib.IMAP4_SSL("imap.gmail.com", timeout=15) as mailbox:
            mailbox.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)

            for mailbox_name in mailbox_names:
                result, _ = mailbox.select(mailbox_name, readonly=True)
                if result == "OK":
                    break
            else:
                raise RuntimeError("Unable to open Gmail mailbox.")

            message_ids = sorted(
                self.search_message_ids(mailbox, customer_email),
                key=lambda value: int(value),
            )

            for message_id in reversed(message_ids):
                result, fetched_data = mailbox.fetch(message_id, "(RFC822)")
                if result != "OK" or not fetched_data:
                    continue

                raw_message = next(
                    (
                        item[1]
                        for item in fetched_data
                        if isinstance(item, tuple) and len(item) > 1
                    ),
                    None,
                )

                if not raw_message:
                    continue

                message = email.message_from_bytes(raw_message)
                sender_name, sender_email = parseaddr(message.get("From", ""))
                recipient_name, recipient_email = parseaddr(message.get("To", ""))
                body = extract_message_body(message)

                messages.append(
                    {
                        "id": message.get("Message-ID", message_id.decode()),
                        "subject": decode_email_value(message.get("Subject", "")),
                        "from": {
                            "name": decode_email_value(sender_name),
                            "email": sender_email,
                        },
                        "to": {
                            "name": decode_email_value(recipient_name),
                            "email": recipient_email,
                        },
                        "date": normalize_email_date(message.get("Date", "")),
                        "snippet": " ".join(body.split())[:280],
                        "body": " ".join(body.split()),
                    }
                )

        return messages

    def filter_messages_for_enquiry(self, messages, service, message):
        filters = [value.lower() for value in (service, message) if value]

        if not filters:
            return messages

        matched_messages = []

        for gmail_message in messages:
            searchable_text = " ".join(
                [
                    gmail_message.get("subject", ""),
                    gmail_message.get("snippet", ""),
                    gmail_message.get("body", ""),
                ]
            ).lower()

            if all(value in searchable_text for value in filters):
                matched_messages.append(gmail_message)

        return matched_messages

    def search_message_ids(self, mailbox, customer_email):
        message_ids = []
        seen_ids = set()
        search_queries = [
            ("FROM", f'"{customer_email}"'),
            ("TO", f'"{customer_email}"'),
            ("CC", f'"{customer_email}"'),
            ("TEXT", f'"{customer_email}"'),
        ]

        for query in search_queries:
            result, data = mailbox.search(None, *query)

            if result != "OK" or not data:
                continue

            for message_id in data[0].split():
                if message_id in seen_ids:
                    continue

                seen_ids.add(message_id)
                message_ids.append(message_id)

        return message_ids


class ContactSubmissionReplyEmailView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        customer_email = (request.data.get("email") or "").strip()
        subject = (request.data.get("subject") or "Reply from Velocity Webtech Solution").strip()
        message = (request.data.get("message") or "").strip()
        client_name = (request.data.get("name") or "Client").strip()
        client_phone = (request.data.get("phone") or "-").strip()
        service = (request.data.get("service") or "Website Development").strip()
        submitted_at = (request.data.get("submitted_at") or "-").strip()

        if not customer_email:
            return Response(
                {"message": "Client email is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            validate_email(customer_email)
        except ValidationError:
            return Response(
                {"message": "Please provide a valid client email address."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not message:
            return Response(
                {"message": "Reply message is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        sender_email = (
            getattr(settings, "CONTACT_RECEIVER_EMAIL", "")
            or settings.DEFAULT_FROM_EMAIL
            or settings.EMAIL_HOST_USER
        )

        if not sender_email or not settings.EMAIL_HOST_PASSWORD:
            return Response(
                {"message": "Gmail sending credentials are not configured."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        try:
            html_message = render_to_string(
                "velocity_webtech/contact_reply_email.html",
                {
                    "reply": {
                        "subject": subject,
                        "message": message,
                        "client_name": client_name,
                        "client_email": customer_email,
                        "client_phone": client_phone,
                        "service": service,
                        "submitted_at": submitted_at,
                        "sender_email": sender_email,
                    }
                },
            )
            email_message = EmailMultiAlternatives(
                subject,
                message,
                sender_email,
                [customer_email],
                reply_to=[sender_email],
            )
            email_message.attach_alternative(html_message, "text/html")
            email_message.send(fail_silently=False)
        except Exception as error:
            logger.exception("Reply email not sent.")
            return Response(
                {"message": "Unable to send reply email.", "detail": str(error)},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        return Response(
            {"message": "Reply email sent successfully."},
            status=status.HTTP_200_OK,
        )
