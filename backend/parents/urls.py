from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ParentViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'parents', ParentViewSet, basename='parent')

urlpatterns = [
    path('', include(router.urls)),
]
