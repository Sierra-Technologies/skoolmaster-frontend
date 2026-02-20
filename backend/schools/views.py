from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

from .models import School
from .serializers import SchoolListSerializer, SchoolDetailSerializer


class SchoolPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class SchoolViewSet(viewsets.ModelViewSet):
    """
    ViewSet for School CRUD operations.

    list:   GET  /schools/
    create: POST /schools/
    retrieve: GET  /schools/{id}/
    update: PUT  /schools/{id}/
    partial_update: PATCH /schools/{id}/
    destroy: DELETE /schools/{id}/

    Extra actions:
    stats:      GET  /schools/{id}/stats/
    activate:   POST /schools/{id}/activate/
    deactivate: POST /schools/{id}/deactivate/
    """

    queryset = School.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = SchoolPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return SchoolListSerializer
        return SchoolDetailSerializer

    def get_queryset(self):
        queryset = School.objects.all()
        search = self.request.query_params.get('search', '').strip()
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(code__icontains=search)
            )

        status_filter = self.request.query_params.get('status', '').strip()
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        plan_filter = self.request.query_params.get('subscription_plan', '').strip()
        if plan_filter:
            queryset = queryset.filter(subscription_plan=plan_filter)

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
            'message': 'School created successfully.',
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
            'message': 'School updated successfully.',
        })

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            'success': True,
            'message': 'School deleted successfully.',
        }, status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['get'], url_path='stats')
    def stats(self, request, pk=None):
        school = self.get_object()
        return Response({
            'success': True,
            'data': school.get_stats(),
        })

    @action(detail=True, methods=['post'], url_path='activate')
    def activate(self, request, pk=None):
        school = self.get_object()
        school.status = 'active'
        school.save(update_fields=['status', 'updated_at'])
        serializer = SchoolDetailSerializer(school)
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'School activated successfully.',
        })

    @action(detail=True, methods=['post'], url_path='deactivate')
    def deactivate(self, request, pk=None):
        school = self.get_object()
        school.status = 'inactive'
        school.save(update_fields=['status', 'updated_at'])
        serializer = SchoolDetailSerializer(school)
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'School deactivated successfully.',
        })
