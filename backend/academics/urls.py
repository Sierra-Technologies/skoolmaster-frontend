from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClassRoomViewSet, SubjectViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'classes', ClassRoomViewSet, basename='classroom')
router.register(r'subjects', SubjectViewSet, basename='subject')

urlpatterns = [
    path('', include(router.urls)),
]
