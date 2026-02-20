from django.db import models


class Assignment(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('overdue', 'Overdue'),
        ('completed', 'Completed'),
        ('draft', 'Draft'),
    )

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    subject = models.ForeignKey(
        'academics.Subject',
        on_delete=models.CASCADE,
        related_name='assignments',
    )
    classroom = models.ForeignKey(
        'academics.ClassRoom',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assignments',
    )
    school = models.ForeignKey(
        'schools.School',
        on_delete=models.CASCADE,
        related_name='assignments',
    )
    teacher = models.ForeignKey(
        'teachers.Teacher',
        on_delete=models.CASCADE,
        related_name='assignments',
    )
    due_date = models.DateField()
    total_marks = models.FloatField(default=100.0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'assignments'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['school', 'status']),
            models.Index(fields=['classroom', 'subject']),
        ]

    def __str__(self):
        return self.title


class AssignmentSubmission(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('submitted', 'Submitted'),
        ('graded', 'Graded'),
        ('late', 'Late'),
    )

    assignment = models.ForeignKey(
        Assignment,
        on_delete=models.CASCADE,
        related_name='submissions',
    )
    student = models.ForeignKey(
        'students.Student',
        on_delete=models.CASCADE,
        related_name='assignment_submissions',
    )
    submission_file = models.FileField(upload_to='assignment_submissions/', null=True, blank=True)
    submission_text = models.TextField(blank=True, default='')
    submitted_at = models.DateTimeField(auto_now_add=True)
    marks_obtained = models.FloatField(null=True, blank=True)
    feedback = models.TextField(blank=True, default='')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'assignment_submissions'
        ordering = ['-submitted_at']
        unique_together = ('assignment', 'student')
        indexes = [
            models.Index(fields=['assignment', 'student']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.student} - {self.assignment.title}"
