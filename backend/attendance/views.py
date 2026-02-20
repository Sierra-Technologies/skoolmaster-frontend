from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import Attendance
from .serializers import AttendanceSerializer, AttendanceListSerializer, BulkAttendanceSerializer


class StandardPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class AttendanceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Attendance CRUD operations.

    Extra actions:
    by_student:  GET  /attendance/student/{studentId}/
    by_class:    GET  /attendance/class/{classId}/
    by_date:     GET  /attendance/date/{date}/
    mark:        POST /attendance/mark/
    bulk_mark:   POST /attendance/bulk-mark/
    report:      GET  /attendance/report/
    export:      GET  /attendance/export/
    """

    queryset = Attendance.objects.select_related('student', 'classroom', 'school', 'marked_by').all()
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return AttendanceListSerializer
        return AttendanceSerializer

    def get_queryset(self):
        queryset = Attendance.objects.select_related('student', 'classroom', 'school', 'marked_by').all()

        school_id = self.request.query_params.get('school', '').strip()
        if school_id:
            queryset = queryset.filter(school_id=school_id)

        student_id = self.request.query_params.get('student', '').strip()
        if student_id:
            queryset = queryset.filter(student_id=student_id)

        classroom_id = self.request.query_params.get('classroom', '').strip()
        if classroom_id:
            queryset = queryset.filter(classroom_id=classroom_id)

        date = self.request.query_params.get('date', '').strip()
        if date:
            queryset = queryset.filter(date=date)

        status_filter = self.request.query_params.get('status', '').strip()
        if status_filter:
            queryset = queryset.filter(status=status_filter)

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
            {'success': True, 'data': serializer.data, 'message': 'Attendance recorded successfully.'},
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'success': True, 'data': serializer.data, 'message': 'Attendance updated successfully.'})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {'success': True, 'message': 'Attendance record deleted successfully.'},
            status=status.HTTP_204_NO_CONTENT,
        )

    @action(detail=False, methods=['get'], url_path=r'student/(?P<student_id>[^/.]+)')
    def by_student(self, request, student_id=None):
        records = Attendance.objects.filter(student_id=student_id).order_by('-date')
        serializer = AttendanceListSerializer(records, many=True)
        return Response({'success': True, 'data': serializer.data})

    @action(detail=False, methods=['get'], url_path=r'class/(?P<class_id>[^/.]+)')
    def by_class(self, request, class_id=None):
        records = Attendance.objects.filter(classroom_id=class_id).select_related('student').order_by('-date')
        serializer = AttendanceListSerializer(records, many=True)
        return Response({'success': True, 'data': serializer.data})

    @action(detail=False, methods=['get'], url_path=r'date/(?P<date>[^/.]+)')
    def by_date(self, request, date=None):
        records = Attendance.objects.filter(date=date).select_related('student', 'classroom')
        serializer = AttendanceListSerializer(records, many=True)
        return Response({'success': True, 'data': serializer.data})

    @action(detail=False, methods=['post'], url_path='mark')
    def mark(self, request):
        serializer = AttendanceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(marked_by=request.user)
        return Response(
            {'success': True, 'data': serializer.data, 'message': 'Attendance marked successfully.'},
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=['post'], url_path='bulk-mark')
    def bulk_mark(self, request):
        serializer = BulkAttendanceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        created = []
        for record in data['records']:
            obj, _ = Attendance.objects.update_or_create(
                student_id=record.get('student_id'),
                date=data['date'],
                defaults={
                    'status': record.get('status', 'present'),
                    'remarks': record.get('remarks', ''),
                    'school_id': data['school'],
                    'classroom_id': data.get('classroom'),
                    'marked_by': request.user,
                },
            )
            created.append(AttendanceListSerializer(obj).data)
        return Response({'success': True, 'data': created, 'message': f'{len(created)} records saved.'})

    @action(detail=False, methods=['get'], url_path='report')
    def report(self, request):
        return Response({'success': True, 'data': {}})

    @action(detail=False, methods=['get'], url_path='export')
    def export(self, request):
        return Response({'success': True, 'data': []})
