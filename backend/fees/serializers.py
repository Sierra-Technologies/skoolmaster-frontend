from rest_framework import serializers
from .models import FeeStructure, Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"


class FeeStructureSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    payments = PaymentSerializer(many=True, read_only=True)

    class Meta:
        model = FeeStructure
        fields = "__all__"

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"
