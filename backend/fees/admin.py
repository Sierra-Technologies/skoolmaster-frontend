from django.contrib import admin
from .models import FeeStructure, Payment

@admin.register(FeeStructure)
class FeeStructureAdmin(admin.ModelAdmin):
    list_display = ["student", "fee_type", "amount", "status", "due_date"]
    list_filter = ["status", "fee_type"]

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ["receipt_number", "fee", "amount_paid", "payment_method"]
