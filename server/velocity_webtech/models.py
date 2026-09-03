from django.db import models


class ContactSubmission(models.Model):
    full_name = models.CharField(max_length=120)
    phone = models.CharField(max_length=30)
    email = models.EmailField()
    service = models.CharField(max_length=120)
    message = models.TextField()
    email_sent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact submission"
        verbose_name_plural = "Contact submissions"

    def __str__(self):
        return f"{self.full_name} - {self.service}"


class EnquiryEmailReply(models.Model):
    contact_submission = models.ForeignKey(
        ContactSubmission,
        related_name="email_replies",
        on_delete=models.CASCADE,
    )
    subject = models.CharField(max_length=255)
    message = models.TextField()
    from_email = models.EmailField()
    to_email = models.EmailField()
    sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-sent_at"]
        verbose_name = "Enquiry email reply"
        verbose_name_plural = "Enquiry email replies"

    def __str__(self):
        return f"{self.subject} -> {self.to_email}"
