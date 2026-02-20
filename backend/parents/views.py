from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

from .models import Parent
from .serializers import ParentSerializer, ParentListSerializer


class ParentPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class ParentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Parent CRUD operations.

    Extra actions:
    children: GET /parents/{id}/children/
    """

    queryset = Parent.objects.select_related('school', 'user').all()
    permission_classes = [IsAuthenticated]
    pagination_class = ParentPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return ParentListSerializer
        return ParentSerializer

    def get_queryset(self):
        queryset = Parent.objects.select_related('school', 'user').all()

        search = self.request.query_params.get('search', '').strip()
        if search:
            queryset = queryset.filter(
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(email__icontains=search) |
                Q(phone__icontains=search)
            )

        school_id = self.request.query_params.get('school', '').strip()
        if school_id:
            queryset = queryset.filter(school_id=school_id)

        status_filter = self.request.query_params.get('status', '').strip()
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        return queryset.order_by('-created_at')

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
            {'success': True, 'data': serializer.data, 'message': 'Parent created successfully.'},
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'success': True, 'data': serializer.data, 'message': 'Parent updated successfully.'})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {'success': True, 'message': 'Parent deleted successfully.'},
            status=status.HTTP_204_NO_CONTENT,
        )

    @action(detail=True, methods=['get'], url_path='children')
    def children(self, request, pk=None):
        """Return list of students related to this parent."""
        self.get_object()  # 404 if not found
        try:
            from students.models import Student
            from students.serializers import StudentListSerializer
            parent = self.get_object()
            # Students linked by parent_email matching parent email
            students = Student.objects.filter(
                school=parent.school,
                parent_email=parent.email,
            ) if parent.email else Student.objects.none()
            serializer = StudentListSerializer(students, many=True)
            return Response({'success': True, 'data': serializer.data})
        except Exception:
            return Response({'success': True, 'data': []})
