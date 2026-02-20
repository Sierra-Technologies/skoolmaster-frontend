from rest_framework import serializers
from .models import School


class SchoolListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views."""

    class Meta:
        model = School
        fields = [
            'id',
            'name',
            'code',
            'email',
            'phone',
            'principal',
            'subscription_plan',
            'subscription_status',
            'status',
            'total_students',
            'total_teachers',
            'logo',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']


class SchoolDetailSerializer(serializers.ModelSerializer):
    """Full serializer for detail/create/update views."""

    class Meta:
        model = School
        fields = [
            'id',
            'name',
            'code',
            'email',
            'phone',
            'address',
            'principal',
            'established_year',
            'subscription_plan',
            'subscription_status',
            'subscription_expiry',
            'theme',
            'logo',
            'website',
            'status',
            'total_students',
            'total_teachers',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
