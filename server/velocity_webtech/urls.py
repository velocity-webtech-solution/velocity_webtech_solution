from django.urls import path

from .views import ContactSubmissionCreateView

urlpatterns = [
    path("contact-submissions/", ContactSubmissionCreateView.as_view(), name="contact-submissions"),
]
