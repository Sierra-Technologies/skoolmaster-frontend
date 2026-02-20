from rest_framework import serializers
from .models import Grade


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'percentage', 'grade_letter')


class GradeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = (
            'id', 'student', 'subject', 'classroom', 'term',
            'marks_obtained', 'max_marks', 'grade_letter', 'percentage',
            'exam_type', 'date', 'created_at',
        )
