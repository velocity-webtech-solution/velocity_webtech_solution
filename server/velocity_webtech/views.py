import logging

from django.conf import settings
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer

logger = logging.getLogger(__name__)


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
            send_mail(
                subject,
                plain_message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_RECEIVER_EMAIL],
                fail_silently=False,
                html_message=html_message,
            )
        except Exception as error:
            logger.exception("Contact email not sent.")
            return False, str(error)

        return True, ""
