from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Assignment, AssignmentSubmission
from .serializers import AssignmentSerializer, AssignmentSubmissionSerializer


class AssignmentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        queryset = Assignment.objects.select_related("subject", "classroom", "teacher", "school")
        classroom_id = self.request.query_params.get("classId")
        subject_id = self.request.query_params.get("subjectId")
        student_id = self.request.query_params.get("studentId")
        if classroom_id:
            queryset = queryset.filter(classroom_id=classroom_id)
        if subject_id:
            queryset = queryset.filter(subject_id=subject_id)
        if student_id:
            queryset = queryset.filter(classroom__students__id=student_id)
        return queryset

    @action(detail=False, url_path="class/(?P<class_id>[^/.]+)", methods=["get"])
    def by_class(self, request, class_id=None):
        qs = self.get_queryset().filter(classroom_id=class_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, url_path="subject/(?P<subject_id>[^/.]+)", methods=["get"])
    def by_subject(self, request, subject_id=None):
        qs = self.get_queryset().filter(subject_id=subject_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, url_path="student/(?P<student_id>[^/.]+)", methods=["get"])
    def by_student(self, request, student_id=None):
        qs = self.get_queryset().filter(submissions__student_id=student_id)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def submit(self, request, pk=None):
        assignment = self.get_object()
        student_id = request.data.get("student_id")
        submission, created = AssignmentSubmission.objects.get_or_create(
            assignment=assignment,
            student_id=student_id,
            defaults={"status": "submitted", "submission_text": request.data.get("submission_text", "")}
        )
        serializer = AssignmentSubmissionSerializer(submission)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    @action(detail=True, methods=["get"])
    def submissions(self, request, pk=None):
        assignment = self.get_object()
        subs = assignment.submissions.select_related("student")
        serializer = AssignmentSubmissionSerializer(subs, many=True)
        return Response(serializer.data)

    @action(detail=True, url_path="submissions/(?P<submission_id>[^/.]+)/grade", methods=["post"])
    def grade_submission(self, request, pk=None, submission_id=None):
        submission = AssignmentSubmission.objects.get(pk=submission_id, assignment_id=pk)
        submission.marks_obtained = request.data.get("marks_obtained", submission.marks_obtained)
        submission.feedback = request.data.get("feedback", submission.feedback)
        submission.status = "graded"
        submission.save()
        serializer = AssignmentSubmissionSerializer(submission)
        return Response(serializer.data)
