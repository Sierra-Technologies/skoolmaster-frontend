from django.db import models
from django.conf import settings


class Message(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sent_messages")
    recipients = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="received_messages", blank=True)
    subject = models.CharField(max_length=255)
    body = models.TextField()
    thread_id = models.CharField(max_length=100, blank=True, default="")
    is_read = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "messages"
        ordering = ["-created_at"]

    def __str__(self):
        return self.subject
