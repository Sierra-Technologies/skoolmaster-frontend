from django.db import models
from django.utils import timezone


class School(models.Model):
    SUBSCRIPTION_PLAN_CHOICES = (
        ('basic', 'Basic'),
        ('premium', 'Premium'),
        ('enterprise', 'Enterprise'),
    )

    SUBSCRIPTION_STATUS_CHOICES = (
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('trial', 'Trial'),
    )

    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )

    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True, db_index=True)
    email = models.EmailField(blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')
    address = models.TextField(blank=True, default='')
    principal = models.CharField(max_length=255, blank=True, default='')
    established_year = models.PositiveIntegerField(null=True, blank=True)

    subscription_plan = models.CharField(
        max_length=20,
        choices=SUBSCRIPTION_PLAN_CHOICES,
        default='basic',
    )
    subscription_status = models.CharField(
        max_length=20,
        choices=SUBSCRIPTION_STATUS_CHOICES,
        default='trial',
    )
    subscription_expiry = models.DateField(null=True, blank=True)

    theme = models.CharField(max_length=50, blank=True, default='')
    logo = models.ImageField(upload_to='school_logos/', null=True, blank=True)
    website = models.URLField(blank=True, default='')

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active',
    )

    total_students = models.PositiveIntegerField(default=0)
    total_teachers = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'schools'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.name} ({self.code})"

    def get_stats(self):
        return {
            'total_students': self.total_students,
            'total_teachers': self.total_teachers,
            'subscription_plan': self.subscription_plan,
            'subscription_status': self.subscription_status,
            'subscription_expiry': self.subscription_expiry,
            'status': self.status,
        }
