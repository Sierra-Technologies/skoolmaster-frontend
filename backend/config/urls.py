"""
URL configuration for SkoolMaster project.
All API routes are under /api/ prefix.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Swagger/ReDoc API documentation
schema_view = get_schema_view(
    openapi.Info(
        title="SkoolMaster API",
        default_version='v1',
        description="School Management System REST API",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # API Documentation
    path('api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # API Routes
    path('api/', include('accounts.urls')),
    path('api/', include('schools.urls')),
    path('api/', include('students.urls')),
    path('api/', include('teachers.urls')),
    path('api/', include('parents.urls')),
    path('api/', include('academics.urls')),
    path('api/', include('grades.urls')),
    path('api/', include('attendance.urls')),
    path('api/', include('assignments.urls')),
    path('api/', include('fees.urls')),
    path('api/', include('timetable.urls')),
    path('api/', include('exams.urls')),
    path('api/', include('admissions.urls')),
    path('api/', include('messaging.urls')),
    path('api/', include('notifications.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
