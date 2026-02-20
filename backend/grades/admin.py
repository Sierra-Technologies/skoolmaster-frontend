from django.contrib import admin
from .models import Grade


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'term', 'marks_obtained', 'max_marks', 'grade_letter', 'percentage', 'exam_type', 'date')
    list_filter = ('exam_type', 'school', 'term')
    search_fields = ('student__first_name', 'student__last_name', 'subject__name')
    ordering = ('-date',)
