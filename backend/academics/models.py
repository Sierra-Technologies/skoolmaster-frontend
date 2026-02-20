from django.db import models


class ClassRoom(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )

    school = models.ForeignKey(
        'schools.School',
        on_delete=models.CASCADE,
        related_name='classrooms',
    )
    name = models.CharField(max_length=50, help_text="e.g. '10'")
    section = models.CharField(max_length=10, blank=True, default='', help_text="e.g. 'A'")
    class_teacher = models.ForeignKey(
        'teachers.Teacher',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='homeroom_classes',
    )
    capacity = models.PositiveIntegerField(default=40)
    academic_year = models.CharField(max_length=20, help_text="e.g. '2024-2025'")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'classrooms'
        ordering = ['name', 'section']
        indexes = [
            models.Index(fields=['school', 'status']),
            models.Index(fields=['academic_year']),
        ]

    def __str__(self):
        return self.full_name

    @property
    def full_name(self):
        if self.section:
            return f"{self.name}-{self.section}"
        return self.name


class Subject(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )
    SUBJECT_TYPE_CHOICES = (
        ('core', 'Core'),
        ('elective', 'Elective'),
        ('extracurricular', 'Extracurricular'),
    )

    school = models.ForeignKey(
        'schools.School',
        on_delete=models.CASCADE,
        related_name='subjects',
    )
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=50, help_text='Unique per school')
    description = models.TextField(blank=True, default='')
    subject_type = models.CharField(
        max_length=20,
        choices=SUBJECT_TYPE_CHOICES,
        default='core',
    )
    credits = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'subjects'
        ordering = ['name']
        unique_together = ('school', 'code')
        indexes = [
            models.Index(fields=['school', 'status']),
        ]

    def __str__(self):
        return f"{self.name} ({self.code})"
