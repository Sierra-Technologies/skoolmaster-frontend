from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

from .models import Student
from .serializers import StudentListSerializer, StudentDetailSerializer


class StudentPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class StudentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Student CRUD operations.

    list:   GET  /students/
    create: POST /students/
    retrieve: GET  /students/{id}/
    update: PUT  /students/{id}/
    partial_update: PATCH /students/{id}/
    destroy: DELETE /students/{id}/

    Extra actions:
    grades:      GET /students/{id}/grades/
    attendance:  GET /students/{id}/attendance/
    assignments: GET /students/{id}/assignments/
    fees:        GET /students/{id}/fees/
    timetable:   GET /students/{id}/timetable/
    report_card: GET /students/{id}/report-card/
    """

    queryset = Student.objects.select_related('school', 'user').all()
    permission_classes = [IsAuthenticated]
    pagination_class = StudentPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return StudentListSerializer
        return StudentDetailSerializer

    def get_queryset(self):
        queryset = Student.objects.select_related('school', 'user').all()

        search = self.request.query_params.get('search', '').strip()
        if search:
            queryset = queryset.filter(
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(email__icontains=search) |
                Q(student_id__icontains=search)
            )

        school_id = self.request.query_params.get('school', '').strip()
        if school_id:
            queryset = queryset.filter(school_id=school_id)

        status_filter = self.request.query_params.get('status', '').strip()
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        class_name = self.request.query_params.get('class_name', '').strip()
        if class_name:
            queryset = queryset.filter(class_name=class_name)

        section = self.request.query_params.get('section', '').strip()
        if section:
            queryset = queryset.filter(section=section)

        fee_status = self.request.query_params.get('fee_status', '').strip()
        if fee_status:
            queryset = queryset.filter(fee_status=fee_status)

        return queryset.order_by('-created_at')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            paginated_response = self.get_paginated_response(serializer.data)
            return Response({
                'success': True,
                'data': paginated_response.data,
            })
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'success': True,
            'data': serializer.data,
        })

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            'success': True,
            'data': serializer.data,
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Student created successfully.',
        }, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Student updated successfully.',
        })

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            'success': True,
            'message': 'Student deleted successfully.',
        }, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['get'], url_path='grades')
    def grades(self, request, pk=None):
        self.get_object()  # Ensure 404 if student not found
        return Response({
            'success': True,
            'data': [],
        })

    @action(detail=True, methods=['get'], url_path='attendance')
    def attendance(self, request, pk=None):
        self.get_object()
        return Response({
            'success': True,
            'data': [],
        })

    @action(detail=True, methods=['get'], url_path='assignments')
    def assignments(self, request, pk=None):
        self.get_object()
        return Response({
            'success': True,
            'data': [],
        })

    @action(detail=True, methods=['get'], url_path='fees')
    def fees(self, request, pk=None):
        self.get_object()
        return Response({
            'success': True,
            'data': [],
        })

    @action(detail=True, methods=['get'], url_path='timetable')
    def timetable(self, request, pk=None):
        self.get_object()
        return Response({
            'success': True,
            'data': [],
        })

    @action(detail=True, methods=['get'], url_path='report-card')
    def report_card(self, request, pk=None):
        self.get_object()
        return Response({
            'success': True,
            'data': {},
        })
