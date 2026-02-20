from django.contrib import admin
from .models import Exam, ExamResult

@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ["title", "exam_type", "exam_date", "status", "results_published"]
    list_filter = ["status", "exam_type"]

@admin.register(ExamResult)
class ExamResultAdmin(admin.ModelAdmin):
    list_display = ["exam", "student", "marks_obtained", "grade_letter"]
