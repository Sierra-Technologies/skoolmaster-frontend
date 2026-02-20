from django.db import models


class Exam(models.Model):
    EXAM_TYPE_CHOICES = (
        ("midterm", "Midterm"), ("final", "Final"), ("unit_test", "Unit Test"), ("other", "Other"),
    )
    STATUS_CHOICES = (
        ("scheduled", "Scheduled"), ("ongoing", "Ongoing"), ("completed", "Completed"), ("cancelled", "Cancelled"),
    )

    school = models.ForeignKey("schools.School", on_delete=models.CASCADE, related_name="exams")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    classroom = models.ForeignKey("academics.ClassRoom", on_delete=models.SET_NULL, null=True, blank=True, related_name="exams")
    subject = models.ForeignKey("academics.Subject", on_delete=models.SET_NULL, null=True, blank=True, related_name="exams")
    exam_date = models.DateField()
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    total_marks = models.FloatField(default=100.0)
    pass_marks = models.FloatField(default=35.0)
    exam_type = models.CharField(max_length=20, choices=EXAM_TYPE_CHOICES, default="other")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="scheduled")
    results_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "exams"
        ordering = ["-exam_date"]

    def __str__(self):
        return self.title


class ExamResult(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name="results")
    student = models.ForeignKey("students.Student", on_delete=models.CASCADE, related_name="exam_results")
    marks_obtained = models.FloatField(null=True, blank=True)
    grade_letter = models.CharField(max_length=5, blank=True, default="")
    remarks = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "exam_results"
        unique_together = ("exam", "student")

    def __str__(self):
        return f"{self.exam.title} - {self.student}"
