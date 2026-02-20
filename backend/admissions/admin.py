from django.contrib import admin
from .models import Admission

@admin.register(Admission)
class AdmissionAdmin(admin.ModelAdmin):
    list_display = ["applicant_name", "applying_for_class", "status", "applied_date"]
    list_filter = ["status"]
