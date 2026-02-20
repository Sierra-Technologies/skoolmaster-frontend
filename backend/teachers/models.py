from django.db import models
from django.conf import settings


class Teacher(models.Model):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    )

    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('on_leave', 'On Leave'),
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='teacher_profile',
    )
    school = models.ForeignKey(
        'schools.School',
        on_delete=models.CASCADE,
        related_name='teachers',
    )

    teacher_id = models.CharField(max_length=50, unique=True, db_index=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)

    photo = models.ImageField(upload_to='teacher_photos/', null=True, blank=True)
    qualification = models.CharField(max_length=255, blank=True, default='')
    experience = models.PositiveIntegerField(default=0, help_text='Years of experience')
    joining_date = models.DateField()
    address = models.TextField(blank=True, default='')

    blood_group = models.CharField(max_length=10, blank=True, default='')

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active',
    )

    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    specialization = models.CharField(max_length=255, blank=True, default='')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'teachers'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['teacher_id']),
            models.Index(fields=['school', 'status']),
        ]

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.teacher_id})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
