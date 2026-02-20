from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import Grade
from .serializers import GradeSerializer, GradeListSerializer


class StandardPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class GradeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Grade CRUD operations.

    Extra actions:
    by_student:  GET /grades/student/{studentId}/
    by_class:    GET /grades/class/{classId}/
    by_subject:  GET /grades/subject/{subjectId}/
    bulk_update: POST /grades/bulk-update/
    export:      GET /grades/export/
    """

    queryset = Grade.objects.select_related('student', 'subject', 'classroom', 'school').all()
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return GradeListSerializer
        return GradeSerializer

    def get_queryset(self):
        queryset = Grade.objects.select_related('student', 'subject', 'classroom', 'school').all()

        school_id = self.request.query_params.get('school', '').strip()
        if school_id:
            queryset = queryset.filter(school_id=school_id)

        student_id = self.request.query_params.get('student', '').strip()
        if student_id:
            queryset = queryset.filter(student_id=student_id)

        subject_id = self.request.query_params.get('subject', '').strip()
        if subject_id:
            queryset = queryset.filter(subject_id=subject_id)

        term = self.request.query_params.get('term', '').strip()
        if term:
            queryset = queryset.filter(term=term)

        exam_type = self.request.query_params.get('exam_type', '').strip()
        if exam_type:
            queryset = queryset.filter(exam_type=exam_type)

        return queryset.order_by('-date')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            paginated_response = self.get_paginated_response(serializer.data)
            return Response({'success': True, 'data': paginated_response.data})
        serializer = self.get_serializer(queryset, many=True)
        return Response({'success': True, 'data': serializer.data})

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({'success': True, 'data': serializer.data})

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'success': True, 'data': serializer.data, 'message': 'Grade created successfully.'},
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'success': True, 'data': serializer.data, 'message': 'Grade updated successfully.'})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {'success': True, 'message': 'Grade deleted successfully.'},
            status=status.HTTP_204_NO_CONTENT,
        )

    @action(detail=False, methods=['get'], url_path=r'student/(?P<student_id>[^/.]+)')
    def by_student(self, request, student_id=None):
        grades = Grade.objects.filter(student_id=student_id).select_related('subject', 'classroom')
        serializer = GradeListSerializer(grades, many=True)
        return Response({'success': True, 'data': serializer.data})

    @action(detail=False, methods=['get'], url_path=r'class/(?P<class_id>[^/.]+)')
    def by_class(self, request, class_id=None):
        grades = Grade.objects.filter(classroom_id=class_id).select_related('student', 'subject')
        serializer = GradeListSerializer(grades, many=True)
        return Response({'success': True, 'data': serializer.data})

    @action(detail=False, methods=['get'], url_path=r'subject/(?P<subject_id>[^/.]+)')
    def by_subject(self, request, subject_id=None):
        grades = Grade.objects.filter(subject_id=subject_id).select_related('student', 'classroom')
        serializer = GradeListSerializer(grades, many=True)
        return Response({'success': True, 'data': serializer.data})

    @action(detail=False, methods=['post'], url_path='bulk-update')
    def bulk_update(self, request):
        grades_data = request.data.get('grades', [])
        updated = []
        errors = []
        for item in grades_data:
            grade_id = item.get('id')
            try:
                grade = Grade.objects.get(id=grade_id)
                serializer = GradeSerializer(grade, data=item, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    updated.append(serializer.data)
                else:
                    errors.append({'id': grade_id, 'errors': serializer.errors})
            except Grade.DoesNotExist:
                errors.append({'id': grade_id, 'errors': 'Grade not found.'})
        return Response({'success': True, 'updated': updated, 'errors': errors})

    @action(detail=False, methods=['get'], url_path='export')
    def export(self, request):
        return Response({'success': True, 'data': []})
