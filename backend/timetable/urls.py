from rest_framework.routers import DefaultRouter
from .views import TimetableViewSet

router = DefaultRouter(trailing_slash=False)
router.register("timetable", TimetableViewSet, basename="timetable")
urlpatterns = router.urls
