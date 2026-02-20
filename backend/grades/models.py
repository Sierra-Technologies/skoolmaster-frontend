from django.db import models


class Grade(models.Model):
    EXAM_TYPE_CHOICES = (
        ('midterm', 'Midterm'),
        ('final', 'Final'),
        ('quiz', 'Quiz'),
        ('assignment', 'Assignment'),
        ('other', 'Other'),
    )

    student = models.ForeignKey(
        'students.Student',
        on_delete=models.CASCADE,
        related_name='grades',
    )
    subject = models.ForeignKey(
        'academics.Subject',
        on_delete=models.CASCADE,
        related_name='grades',
    )
    classroom = models.ForeignKey(
        'academics.ClassRoom',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='grades',
    )
    school = models.ForeignKey(
        'schools.School',
        on_delete=models.CASCADE,
        related_name='grades',
    )

    term = models.CharField(max_length=50, help_text='Term or semester, e.g. Term 1')
    marks_obtained = models.FloatField()
    max_marks = models.FloatField(default=100.0)
    grade_letter = models.CharField(max_length=5, blank=True, default='')
    percentage = models.FloatField(default=0.0)
    exam_type = models.CharField(max_length=20, choices=EXAM_TYPE_CHOICES, default='other')
    remarks = models.TextField(blank=True, default='')
    date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'grades'
        ordering = ['-date']
        indexes = [
            models.Index(fields=['student', 'subject']),
            models.Index(fields=['school', 'term']),
        ]

    def __str__(self):
        return f"{self.student} - {self.subject} - {self.grade_letter}"

    def save(self, *args, **kwargs):
        if self.max_marks and self.max_marks > 0:
            self.percentage = round((self.marks_obtained / self.max_marks) * 100, 2)
        if not self.grade_letter:
            self.grade_letter = self._compute_grade_letter(self.percentage)
        super().save(*args, **kwargs)

    @staticmethod
    def _compute_grade_letter(percentage):
        if percentage >= 90:
            return 'A+'
        elif percentage >= 80:
            return 'A'
        elif percentage >= 70:
            return 'B+'
        elif percentage >= 60:
            return 'B'
        elif percentage >= 50:
            return 'C'
        elif percentage >= 40:
            return 'D'
        return 'F'
