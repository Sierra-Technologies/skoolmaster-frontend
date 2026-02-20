from rest_framework import serializers
from .models import Parent


class ParentSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Parent
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class ParentListSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()

    class Meta:
        model = Parent
        fields = (
            'id', 'first_name', 'last_name', 'full_name',
            'email', 'phone', 'status', 'school', 'created_at',
        )
