from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(
            sender=user
        ).union(
            Message.objects.filter(recipients=user)
        ).order_by("-created_at")

    @action(detail=False, url_path="user/(?P<user_id>[^/.]+)", methods=["get"])
    def by_user(self, request, user_id=None):
        qs = Message.objects.filter(sender_id=user_id) | Message.objects.filter(recipients__id=user_id)
        serializer = self.get_serializer(qs.distinct(), many=True)
        return Response(serializer.data)

    @action(detail=False, url_path="thread/(?P<thread_id>[^/.]+)", methods=["get"])
    def thread(self, request, thread_id=None):
        qs = Message.objects.filter(thread_id=thread_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=True, url_path="read", methods=["post"])
    def mark_read(self, request, pk=None):
        message = self.get_object()
        message.is_read = True
        message.save()
        return Response({"message": "Marked as read."})

    @action(detail=False, url_path="unread-count", methods=["get"])
    def unread_count(self, request):
        count = Message.objects.filter(recipients=request.user, is_read=False).count()
        return Response({"count": count})
