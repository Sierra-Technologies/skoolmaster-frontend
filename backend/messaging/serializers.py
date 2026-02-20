from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = "__all__"

    def get_sender_name(self, obj):
        return obj.sender.get_full_name()
