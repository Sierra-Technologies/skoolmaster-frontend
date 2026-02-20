from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SchoolViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'schools', SchoolViewSet, basename='school')

urlpatterns = [
    path('', include(router.urls)),
]
