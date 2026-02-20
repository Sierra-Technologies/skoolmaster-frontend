from django.contrib import admin
from .models import Parent


@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'school', 'status', 'created_at')
    list_filter = ('status', 'school')
    search_fields = ('first_name', 'last_name', 'email', 'phone')
    ordering = ('-created_at',)
