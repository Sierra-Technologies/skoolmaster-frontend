from rest_framework import serializers
from .models import TimetableEntry


class TimetableEntrySerializer(serializers.ModelSerializer):
    classroom_name = serializers.SerializerMethodField()
    subject_name = serializers.SerializerMethodField()
    teacher_name = serializers.SerializerMethodField()

    class Meta:
        model = TimetableEntry
        fields = "__all__"

    def get_classroom_name(self, obj):
        return obj.classroom.full_name if obj.classroom else None

    def get_subject_name(self, obj):
        return obj.subject.name if obj.subject else None

    def get_teacher_name(self, obj):
        if obj.teacher:
            return f"{obj.teacher.first_name} {obj.teacher.last_name}"
        return None
