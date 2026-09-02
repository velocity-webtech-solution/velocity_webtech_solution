from django.urls import path

from .views import (
    ContactSubmissionCreateView,
    ContactSubmissionEmailHistoryView,
    ContactSubmissionReplyEmailView,
)

urlpatterns = [
    path("contact-submissions/", ContactSubmissionCreateView.as_view(), name="contact-submissions"),
    path(
        "contact-submissions/emails/",
        ContactSubmissionEmailHistoryView.as_view(),
        name="contact-submission-emails",
    ),
    path(
        "contact-submissions/reply/",
        ContactSubmissionReplyEmailView.as_view(),
        name="contact-submission-reply",
    ),
]
