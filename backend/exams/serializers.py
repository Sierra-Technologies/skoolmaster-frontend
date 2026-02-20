from rest_framework import serializers
from .models import Exam, ExamResult


class ExamResultSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()

    class Meta:
        model = ExamResult
        fields = "__all__"

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"


class ExamSerializer(serializers.ModelSerializer):
    classroom_name = serializers.SerializerMethodField()
    subject_name = serializers.SerializerMethodField()

    class Meta:
        model = Exam
        fields = "__all__"

    def get_classroom_name(self, obj):
        return obj.classroom.full_name if obj.classroom else None

    def get_subject_name(self, obj):
        return obj.subject.name if obj.subject else None
