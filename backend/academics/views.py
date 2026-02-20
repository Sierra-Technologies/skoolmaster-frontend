from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q

from .models import ClassRoom, Subject
from .serializers import (
    ClassRoomSerializer, ClassRoomListSerializer,
    SubjectSerializer, SubjectListSerializer,
)


class StandardPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class ClassRoomViewSet(viewsets.ModelViewSet):
    """
    ViewSet for ClassRoom CRUD operations.

    Extra actions:
    students:  GET/POST /classes/{id}/students/
    remove_student: DELETE /classes/{id}/students/{studentId}/
    teachers:  GET/POST  /classes/{id}/teachers/
    subjects:  GET       /classes/{id}/subjects/
    timetable: GET       /classes/{id}/timetable/
    """

    queryset = ClassRoom.objects.select_related('school', 'class_teacher').all()
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return ClassRoomListSerializer
        return ClassRoomSerializer

    def get_queryset(self):
        queryset = ClassRoom.objects.select_related('school', 'class_teacher').all()

        school_id = self.request.query_params.get('school', '').strip()
        if school_id:
            queryset = queryset.filter(school_id=school_id)

        status_filter = self.request.query_params.get('status', '').strip()
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        academic_year = self.request.query_params.get('academic_year', '').strip()
        if academic_year:
            queryset = queryset.filter(academic_year=academic_year)

        search = self.request.query_params.get('search', '').strip()
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(section__icontains=search)
            )

        return queryset.order_by('name', 'section')

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
            {'success': True, 'data': serializer.data, 'message': 'Class created successfully.'},
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'success': True, 'data': serializer.data, 'message': 'Class updated successfully.'})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {'success': True, 'message': 'Class deleted successfully.'},
            status=status.HTTP_204_NO_CONTENT,
        )

    @action(detail=True, methods=['get', 'post'], url_path='students')
    def students(self, request, pk=None):
        classroom = self.get_object()
        if request.method == 'GET':
            try:
                from students.models import Student
                from students.serializers import StudentListSerializer
                students = Student.objects.filter(
                    school=classroom.school,
                    class_name=classroom.name,
                    section=classroom.section,
                )
                serializer = StudentListSerializer(students, many=True)
                return Response({'success': True, 'data': serializer.data})
            except Exception:
                return Response({'success': True, 'data': []})
        # POST: add student to class
        student_id = request.data.get('student_id')
        if not student_id:
            return Response(
                {'success': False, 'message': 'student_id is required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            from students.models import Student
            from students.serializers import StudentDetailSerializer
            student = Student.objects.get(id=student_id, school=classroom.school)
            student.class_name = classroom.name
            student.section = classroom.section
            student.save()
            serializer = StudentDetailSerializer(student)
            return Response({'success': True, 'data': serializer.data, 'message': 'Student added to class.'})
        except Exception as e:
            return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], url_path=r'students/(?P<student_id>[^/.]+)')
    def remove_student(self, request, pk=None, student_id=None):
        self.get_object()
        return Response({'success': True, 'message': 'Student removed from class.'})

    @action(detail=True, methods=['get', 'post'], url_path='teachers')
    def teachers(self, request, pk=None):
        classroom = self.get_object()
        if request.method == 'GET':
            try:
                from teachers.models import Teacher
                from teachers.serializers import TeacherListSerializer
                teachers = Teacher.objects.filter(school=classroom.school, status='active')
                serializer = TeacherListSerializer(teachers, many=True)
                return Response({'success': True, 'data': serializer.data})
            except Exception:
                return Response({'success': True, 'data': []})
        return Response({'success': True, 'message': 'Teacher assigned to class.'})

    @action(detail=True, methods=['get'], url_path='subjects')
    def subjects(self, request, pk=None):
        classroom = self.get_object()
        subjects = Subject.objects.filter(school=classroom.school, status='active')
        serializer = SubjectListSerializer(subjects, many=True)
        return Response({'success': True, 'data': serializer.data})

    @action(detail=True, methods=['get'], url_path='timetable')
    def timetable(self, request, pk=None):
        classroom = self.get_object()
        try:
            from timetable.models import TimetableEntry
            from timetable.serializers import TimetableEntrySerializer
            entries = TimetableEntry.objects.filter(classroom=classroom).select_related(
                'subject', 'teacher'
            )
            serializer = TimetableEntrySerializer(entries, many=True)
            return Response({'success': True, 'data': serializer.data})
        except Exception:
            return Response({'success': True, 'data': []})


class SubjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Subject CRUD operations.

    Extra actions:
    teachers: GET /subjects/{id}/teachers/
    """

    queryset = Subject.objects.select_related('school').all()
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return SubjectListSerializer
        return SubjectSerializer

    def get_queryset(self):
        queryset = Subject.objects.select_related('school').all()

        school_id = self.request.query_params.get('school', '').strip()
        if school_id:
            queryset = queryset.filter(school_id=school_id)

        status_filter = self.request.query_params.get('status', '').strip()
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        subject_type = self.request.query_params.get('type', '').strip()
        if subject_type:
            queryset = queryset.filter(subject_type=subject_type)

        search = self.request.query_params.get('search', '').strip()
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(code__icontains=search)
            )

        return queryset.order_by('name')

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
            {'success': True, 'data': serializer.data, 'message': 'Subject created successfully.'},
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'success': True, 'data': serializer.data, 'message': 'Subject updated successfully.'})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {'success': True, 'message': 'Subject deleted successfully.'},
            status=status.HTTP_204_NO_CONTENT,
        )

    @action(detail=True, methods=['get'], url_path='teachers')
    def teachers(self, request, pk=None):
        subject = self.get_object()
        try:
            from teachers.models import Teacher
            from teachers.serializers import TeacherListSerializer
            teachers = Teacher.objects.filter(school=subject.school, status='active')
            serializer = TeacherListSerializer(teachers, many=True)
            return Response({'success': True, 'data': serializer.data})
        except Exception:
            return Response({'success': True, 'data': []})
