from rest_framework.routers import DefaultRouter
from .views import AdmissionViewSet

router = DefaultRouter(trailing_slash=False)
router.register("admissions", AdmissionViewSet, basename="admission")
urlpatterns = router.urls
