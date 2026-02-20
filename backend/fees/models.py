from django.db import models
import uuid


class FeeStructure(models.Model):
    FEE_TYPE_CHOICES = (
        ("tuition", "Tuition"),
        ("transport", "Transport"),
        ("library", "Library"),
        ("sports", "Sports"),
        ("exam", "Exam"),
        ("other", "Other"),
    )
    STATUS_CHOICES = (
        ("paid", "Paid"),
        ("pending", "Pending"),
        ("overdue", "Overdue"),
        ("partial", "Partial"),
    )

    student = models.ForeignKey("students.Student", on_delete=models.CASCADE, related_name="fees")
    school = models.ForeignKey("schools.School", on_delete=models.CASCADE, related_name="fees")
    fee_type = models.CharField(max_length=20, choices=FEE_TYPE_CHOICES, default="tuition")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    academic_year = models.CharField(max_length=20)
    description = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "fees"
        ordering = ["-due_date"]

    def __str__(self):
        return f"{self.student} - {self.fee_type} - {self.status}"


class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = (
        ("cash", "Cash"),
        ("online", "Online"),
        ("bank_transfer", "Bank Transfer"),
        ("check", "Check"),
    )

    fee = models.ForeignKey(FeeStructure, on_delete=models.CASCADE, related_name="payments")
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default="cash")
    receipt_number = models.CharField(max_length=100, unique=True, default="")
    remarks = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "payments"
        ordering = ["-payment_date"]

    def save(self, *args, **kwargs):
        if not self.receipt_number:
            self.receipt_number = f"RCP-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Payment {self.receipt_number}"
