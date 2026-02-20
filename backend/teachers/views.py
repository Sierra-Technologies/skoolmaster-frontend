from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

from .models import Teacher
from .serializers import TeacherListSerializer, TeacherDetailSerializer


class TeacherPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class TeacherViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Teacher CRUD operations.

    list:           GET    /teachers/
    create:         POST   /teachers/
    retrieve:       GET    /teachers/{id}/
    update:         PUT    /teachers/{id}/
    partial_update: PATCH  /teachers/{id}/
    destroy:        DELETE /teachers/{id}/

    Extra actions:
    classes:  GET /teachers/{id}/classes/
    students: GET /teachers/{id}/students/
    schedule: GET /teachers/{id}/schedule/
    """

    queryset = Teacher.objects.select_related('school', 'user').all()
    permission_classes = [IsAuthenticated]
    pagination_class = TeacherPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return TeacherListSerializer
        return TeacherDetailSerializer

    def get_queryset(self):
        queryset = Teacher.objects.select_related('school', 'user').all()

        search = self.request.query_params.get('search', '').strip()
        if search:
            queryset = queryset.filter(
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(email__icontains=search) |
                Q(teacher_id__icontains=search)
            )

        school_id = self.request.query_params.get('school', '').strip()
        if school_id:
            queryset = queryset.filter(school_id=school_id)

        status_filter = self.request.query_params.get('status', '').strip()
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        gender_filter = self.request.query_params.get('gender', '').strip()
        if gender_filter:
            queryset = queryset.filter(gender=gender_filter)

        specialization = self.request.query_params.get('specialization', '').strip()
        if specialization:
            queryset = queryset.filter(specialization__icontains=specialization)

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
            'message': 'Teacher created successfully.',
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
            'message': 'Teacher updated successfully.',
        })

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            'success': True,
            'message': 'Teacher deleted successfully.',
        }, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['get'], url_path='classes')
    def classes(self, request, pk=None):
        self.get_object()  # Ensure 404 if teacher not found
        return Response({
            'success': True,
            'data': [],
        })

    @action(detail=True, methods=['get'], url_path='students')
    def students(self, request, pk=None):
        self.get_object()
        return Response({
            'success': True,
            'data': [],
        })

    @action(detail=True, methods=['get'], url_path='schedule')
    def schedule(self, request, pk=None):
        self.get_object()
        return Response({
            'success': True,
            'data': [],
        })
