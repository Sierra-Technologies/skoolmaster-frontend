from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Exam, ExamResult
from .serializers import ExamSerializer, ExamResultSerializer


class ExamViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ExamSerializer

    def get_queryset(self):
        return Exam.objects.select_related("school", "classroom", "subject")

    @action(detail=False, url_path="class/(?P<class_id>[^/.]+)", methods=["get"])
    def by_class(self, request, class_id=None):
        qs = self.get_queryset().filter(classroom_id=class_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def schedule(self, request):
        qs = self.get_queryset().filter(status="scheduled")
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def results(self, request, pk=None):
        exam = self.get_object()
        results = exam.results.select_related("student")
        serializer = ExamResultSerializer(results, many=True)
        return Response(serializer.data)

    @action(detail=True, url_path="publish-results", methods=["post"])
    def publish_results(self, request, pk=None):
        exam = self.get_object()
        exam.results_published = True
        exam.status = "completed"
        exam.save()
        return Response({"message": "Results published successfully."})
