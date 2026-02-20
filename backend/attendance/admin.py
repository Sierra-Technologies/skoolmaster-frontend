from django.contrib import admin
from .models import Attendance


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'date', 'status', 'classroom', 'school', 'marked_by', 'created_at')
    list_filter = ('status', 'school', 'date')
    search_fields = ('student__first_name', 'student__last_name')
    ordering = ('-date',)
