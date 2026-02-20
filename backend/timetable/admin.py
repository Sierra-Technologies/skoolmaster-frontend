from django.contrib import admin
from .models import TimetableEntry

@admin.register(TimetableEntry)
class TimetableEntryAdmin(admin.ModelAdmin):
    list_display = ["classroom", "day", "period", "subject", "teacher", "start_time", "end_time"]
    list_filter = ["day", "school"]
