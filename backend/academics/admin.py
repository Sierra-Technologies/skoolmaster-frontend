from django.contrib import admin
from .models import ClassRoom, Subject


@admin.register(ClassRoom)
class ClassRoomAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'school', 'academic_year', 'capacity', 'status', 'created_at')
    list_filter = ('status', 'school', 'academic_year')
    search_fields = ('name', 'section')
    ordering = ('name', 'section')


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'subject_type', 'credits', 'school', 'status', 'created_at')
    list_filter = ('status', 'subject_type', 'school')
    search_fields = ('name', 'code')
    ordering = ('name',)
