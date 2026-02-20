from rest_framework import serializers
from .models import Assignment, AssignmentSubmission


class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()

    class Meta:
        model = AssignmentSubmission
        fields = "__all__"

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"


class AssignmentSerializer(serializers.ModelSerializer):
    subject_name = serializers.SerializerMethodField()
    classroom_name = serializers.SerializerMethodField()
    teacher_name = serializers.SerializerMethodField()
    submissions_count = serializers.SerializerMethodField()

    class Meta:
        model = Assignment
        fields = "__all__"

    def get_subject_name(self, obj):
        return obj.subject.name if obj.subject else None

    def get_classroom_name(self, obj):
        return obj.classroom.full_name if obj.classroom else None

    def get_teacher_name(self, obj):
        return f"{obj.teacher.first_name} {obj.teacher.last_name}" if obj.teacher else None

    def get_submissions_count(self, obj):
        return obj.submissions.count()
