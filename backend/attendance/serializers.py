from rest_framework import serializers
from .models import Attendance


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class AttendanceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = (
            'id', 'student', 'classroom', 'date', 'status',
            'remarks', 'marked_by', 'created_at',
        )


class BulkAttendanceSerializer(serializers.Serializer):
    date = serializers.DateField()
    classroom = serializers.IntegerField(required=False, allow_null=True)
    school = serializers.IntegerField()
    records = serializers.ListField(
        child=serializers.DictField(),
        help_text='List of {student_id, status, remarks}',
    )
