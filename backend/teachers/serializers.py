from rest_framework import serializers
from .models import Teacher


class TeacherListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views."""

    full_name = serializers.SerializerMethodField()
    school_name = serializers.CharField(source='school.name', read_only=True)

    class Meta:
        model = Teacher
        fields = [
            'id',
            'teacher_id',
            'first_name',
            'last_name',
            'full_name',
            'email',
            'phone',
            'gender',
            'qualification',
            'experience',
            'specialization',
            'status',
            'school',
            'school_name',
            'photo',
            'joining_date',
            'created_at',
        ]
        read_only_fields = ['id', 'full_name', 'school_name', 'created_at']

    def get_full_name(self, obj):
        return obj.full_name


class TeacherDetailSerializer(serializers.ModelSerializer):
    """Full serializer for detail/create/update views."""

    full_name = serializers.SerializerMethodField()
    school_name = serializers.CharField(source='school.name', read_only=True)

    class Meta:
        model = Teacher
        fields = [
            'id',
            'user',
            'school',
            'school_name',
            'teacher_id',
            'first_name',
            'last_name',
            'full_name',
            'email',
            'phone',
            'date_of_birth',
            'gender',
            'photo',
            'qualification',
            'experience',
            'joining_date',
            'address',
            'blood_group',
            'status',
            'salary',
            'specialization',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'full_name', 'school_name', 'created_at', 'updated_at']

    def get_full_name(self, obj):
        return obj.full_name
