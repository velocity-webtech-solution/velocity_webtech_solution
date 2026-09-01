from django.contrib import admin

from .models import ContactSubmission


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
