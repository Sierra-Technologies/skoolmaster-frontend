from rest_framework.routers import DefaultRouter
from .views import MessageViewSet

router = DefaultRouter(trailing_slash=False)
router.register("messages", MessageViewSet, basename="message")
urlpatterns = router.urls
