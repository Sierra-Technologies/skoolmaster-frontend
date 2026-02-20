from django.db import models


class Admission(models.Model):
    GENDER_CHOICES = (("male", "Male"), ("female", "Female"), ("other", "Other"))
    STATUS_CHOICES = (
        ("pending", "Pending"), ("approved", "Approved"),
        ("rejected", "Rejected"), ("waitlisted", "Waitlisted"),
    )

    school = models.ForeignKey("schools.School", on_delete=models.CASCADE, related_name="admissions")
    applicant_name = models.CharField(max_length=255)
    applicant_email = models.EmailField(blank=True, default="")
    applicant_phone = models.CharField(max_length=20, blank=True, default="")
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default="male")
    applying_for_class = models.CharField(max_length=50)
    academic_year = models.CharField(max_length=20)
    parent_name = models.CharField(max_length=255, blank=True, default="")
    parent_email = models.EmailField(blank=True, default="")
    parent_phone = models.CharField(max_length=20, blank=True, default="")
    address = models.TextField(blank=True, default="")
    previous_school = models.CharField(max_length=255, blank=True, default="")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    remarks = models.TextField(blank=True, default="")
    applied_date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "admissions"
        ordering = ["-applied_date"]

    def __str__(self):
        return f"{self.applicant_name} - {self.applying_for_class} ({self.status})"
