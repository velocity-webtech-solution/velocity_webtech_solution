from rest_framework import serializers

from .models import ContactSubmission


class ContactSubmissionSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="full_name", write_only=True)

    class Meta:
        model = ContactSubmission
        fields = [
            "id",
            "name",
            "full_name",
            "phone",
            "email",
            "service",
            "message",
            "email_sent",
            "created_at",
        ]
        read_only_fields = ["id", "full_name", "email_sent", "created_at"]
