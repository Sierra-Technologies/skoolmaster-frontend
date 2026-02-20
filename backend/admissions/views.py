from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Admission
from .serializers import AdmissionSerializer


class AdmissionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AdmissionSerializer

    def get_queryset(self):
        queryset = Admission.objects.select_related("school")
        status_filter = self.request.query_params.get("status")
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset

    @action(detail=False, methods=["get"])
    def pending(self, request):
        qs = self.get_queryset().filter(status="pending")
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        admission = self.get_object()
        admission.status = "approved"
        admission.remarks = request.data.get("remarks", admission.remarks)
        admission.save()
        serializer = self.get_serializer(admission)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        admission = self.get_object()
        admission.status = "rejected"
        admission.remarks = request.data.get("remarks", admission.remarks)
        admission.save()
        serializer = self.get_serializer(admission)
        return Response(serializer.data)
