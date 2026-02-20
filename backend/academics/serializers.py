from rest_framework import serializers
from .models import ClassRoom, Subject


class ClassRoomSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = ClassRoom
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class ClassRoomListSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = ClassRoom
        fields = (
            'id', 'name', 'section', 'full_name', 'academic_year',
            'capacity', 'status', 'school', 'created_at',
        )


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class SubjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = (
            'id', 'name', 'code', 'subject_type', 'credits',
            'status', 'school', 'created_at',
        )
