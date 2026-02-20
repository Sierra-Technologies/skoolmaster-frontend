from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import TimetableEntry
from .serializers import TimetableEntrySerializer


class TimetableViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TimetableEntrySerializer

    def get_queryset(self):
        return TimetableEntry.objects.select_related("classroom", "subject", "teacher", "school")

    @action(detail=False, url_path="class/(?P<class_id>[^/.]+)", methods=["get"])
    def by_class(self, request, class_id=None):
        qs = self.get_queryset().filter(classroom_id=class_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, url_path="teacher/(?P<teacher_id>[^/.]+)", methods=["get"])
    def by_teacher(self, request, teacher_id=None):
        qs = self.get_queryset().filter(teacher_id=teacher_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, url_path="student/(?P<student_id>[^/.]+)", methods=["get"])
    def by_student(self, request, student_id=None):
        from students.models import Student
        try:
            student = Student.objects.get(pk=student_id)
            qs = self.get_queryset().filter(
                classroom__name=student.class_name,
                classroom__section=student.section,
                classroom__school=student.school
            )
        except Student.DoesNotExist:
            qs = TimetableEntry.objects.none()
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["post"])
    def generate(self, request):
        return Response({"message": "Timetable generation is not automated. Please create entries manually."})
