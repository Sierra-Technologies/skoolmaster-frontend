from django.db import models
from django.conf import settings


class Student(models.Model):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    )

    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('graduated', 'Graduated'),
        ('transferred', 'Transferred'),
    )

    FEE_STATUS_CHOICES = (
        ('paid', 'Paid'),
        ('pending', 'Pending'),
        ('overdue', 'Overdue'),
        ('partial', 'Partial'),
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='student_profile',
    )
    school = models.ForeignKey(
        'schools.School',
        on_delete=models.CASCADE,
        related_name='students',
    )

    student_id = models.CharField(max_length=50, unique=True, db_index=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)

    class_name = models.CharField(max_length=20)
    section = models.CharField(max_length=10, blank=True, default='')
    roll_number = models.PositiveIntegerField(null=True, blank=True)

    admission_date = models.DateField()
    photo = models.ImageField(upload_to='student_photos/', null=True, blank=True)
    address = models.TextField(blank=True, default='')

    parent_name = models.CharField(max_length=255, blank=True, default='')
    parent_email = models.EmailField(blank=True, default='')
    parent_phone = models.CharField(max_length=20, blank=True, default='')

    blood_group = models.CharField(max_length=10, blank=True, default='')
    religion = models.CharField(max_length=50, blank=True, default='')

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active',
    )

    attendance_percentage = models.FloatField(default=0.0)
    current_gpa = models.FloatField(default=0.0)
    fee_status = models.CharField(
        max_length=20,
        choices=FEE_STATUS_CHOICES,
        default='paid',
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'students'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['student_id']),
            models.Index(fields=['school', 'status']),
            models.Index(fields=['class_name', 'section']),
        ]

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.student_id})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
