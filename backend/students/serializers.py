from rest_framework import serializers
from .models import Student


class StudentListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views."""

    full_name = serializers.SerializerMethodField()
    school_name = serializers.CharField(source='school.name', read_only=True)

    class Meta:
        model = Student
        fields = [
            'id',
            'student_id',
            'first_name',
            'last_name',
            'full_name',
            'email',
            'phone',
            'class_name',
            'section',
            'roll_number',
            'gender',
            'status',
            'fee_status',
            'attendance_percentage',
            'current_gpa',
            'school',
            'school_name',
            'photo',
            'created_at',
        ]
        read_only_fields = ['id', 'full_name', 'school_name', 'created_at']

    def get_full_name(self, obj):
        return obj.full_name


class StudentDetailSerializer(serializers.ModelSerializer):
    """Full serializer for detail/create/update views."""

    full_name = serializers.SerializerMethodField()
    school_name = serializers.CharField(source='school.name', read_only=True)

    class Meta:
        model = Student
        fields = [
            'id',
            'user',
            'school',
            'school_name',
            'student_id',
            'first_name',
            'last_name',
            'full_name',
            'email',
            'phone',
            'date_of_birth',
            'gender',
            'class_name',
            'section',
            'roll_number',
            'admission_date',
            'photo',
            'address',
            'parent_name',
            'parent_email',
            'parent_phone',
            'blood_group',
            'religion',
            'status',
            'attendance_percentage',
            'current_gpa',
            'fee_status',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'full_name', 'school_name', 'created_at', 'updated_at']

    def get_full_name(self, obj):
        return obj.full_name
