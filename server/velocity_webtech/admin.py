from django.contrib import admin

from .models import ContactSubmission, EnquiryEmailReply


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "full_name",
        "phone",
        "email",
        "service",
        "message",
        "email_sent",
        "created_at",
    )
    list_filter = ("service", "email_sent", "created_at")
    search_fields = ("full_name", "phone", "email", "service", "message")
    readonly_fields = ("created_at",)


@admin.register(EnquiryEmailReply)
class EnquiryEmailReplyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "contact_submission",
        "subject",
        "from_email",
        "to_email",
        "sent_at",
    )
    list_filter = ("sent_at",)
    search_fields = (
        "subject",
        "message",
        "from_email",
        "to_email",
        "contact_submission__full_name",
        "contact_submission__email",
    )
    readonly_fields = ("sent_at",)
