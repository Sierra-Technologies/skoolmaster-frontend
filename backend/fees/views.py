from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import FeeStructure, Payment
from .serializers import FeeStructureSerializer, FeeStructureListSerializer, PaymentSerializer


class StandardPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class FeeStructureViewSet(viewsets.ModelViewSet):
    """
    ViewSet for FeeStructure CRUD operations.

    Extra actions:
    by_student:      GET  /fees/student/{studentId}/
    make_payment:    POST /fees/payment/
    payment_history: GET  /fees/student/{studentId}/history/
    receipt:         GET  /fees/payment/{paymentId}/receipt/
    pending:         GET  /fees/pending/
    overdue:         GET  /fees/overdue/
    export:          GET  /fees/export/
    """

    queryset = FeeStructure.objects.select_related('student', 'school').all()
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return FeeStructureListSerializer
        return FeeStructureSerializer

    def get_queryset(self):
        queryset = FeeStructure.objects.select_related('student', 'school').all()

        school_id = self.request.query_params.get('school', '').strip()
        if school_id:
            queryset = queryset.filter(school_id=school_id)

        student_id = self.request.query_params.get('student', '').strip()
        if student_id:
            queryset = queryset.filter(student_id=student_id)

        status_filter = self.request.query_params.get('status', '').strip()
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        academic_year = self.request.query_params.get('academic_year', '').strip()
        if academic_year:
            queryset = queryset.filter(academic_year=academic_year)

        fee_type = self.request.query_params.get('fee_type', '').strip()
        if fee_type:
            queryset = queryset.filter(fee_type=fee_type)

        return queryset.order_by('-due_date')

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
            {'success': True, 'data': serializer.data, 'message': 'Fee structure created successfully.'},
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({'success': True, 'data': serializer.data, 'message': 'Fee structure updated successfully.'})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {'success': True, 'message': 'Fee structure deleted successfully.'},
            status=status.HTTP_204_NO_CONTENT,
        )

    @action(detail=False, methods=['get'], url_path=r'student/(?P<student_id>[^/.]+)')
    def by_student(self, request, student_id=None):
        fees = FeeStructure.objects.filter(student_id=student_id).order_by('-due_date')
        serializer = FeeStructureListSerializer(fees, many=True)
        return Response({'success': True, 'data': serializer.data})

    @action(detail=False, methods=['post'], url_path='payment')
    def make_payment(self, request):
        serializer = PaymentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payment = serializer.save()
        fee = payment.fee
        total_paid = sum(p.amount_paid for p in fee.payments.all())
        if total_paid >= fee.amount:
            fee.status = 'paid'
        elif total_paid > 0:
            fee.status = 'partial'
        fee.save()
        return Response(
            {'success': True, 'data': serializer.data, 'message': 'Payment recorded successfully.'},
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=['get'], url_path=r'student/(?P<student_id>[^/.]+)/history')
    def payment_history(self, request, student_id=None):
        fee_ids = FeeStructure.objects.filter(student_id=student_id).values_list('id', flat=True)
        payments = Payment.objects.filter(fee_id__in=fee_ids).select_related('fee').order_by('-payment_date')
        serializer = PaymentSerializer(payments, many=True)
        return Response({'success': True, 'data': serializer.data})

    @action(detail=False, methods=['get'], url_path=r'payment/(?P<payment_id>[^/.]+)/receipt')
    def receipt(self, request, payment_id=None):
        try:
            payment = Payment.objects.select_related('fee', 'fee__student').get(id=payment_id)
            serializer = PaymentSerializer(payment)
            return Response({'success': True, 'data': serializer.data})
        except Payment.DoesNotExist:
            return Response(
                {'success': False, 'message': 'Payment not found.'},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=False, methods=['get'], url_path='pending')
    def pending(self, request):
        fees = FeeStructure.objects.filter(status='pending').select_related('student', 'school')
        school_id = request.query_params.get('school', '').strip()
        if school_id:
            fees = fees.filter(school_id=school_id)
        serializer = FeeStructureListSerializer(fees, many=True)
        return Response({'success': True, 'data': serializer.data})

    @action(detail=False, methods=['get'], url_path='overdue')
    def overdue(self, request):
        fees = FeeStructure.objects.filter(status='overdue').select_related('student', 'school')
        school_id = request.query_params.get('school', '').strip()
        if school_id:
            fees = fees.filter(school_id=school_id)
        serializer = FeeStructureListSerializer(fees, many=True)
        return Response({'success': True, 'data': serializer.data})

    @action(detail=False, methods=['get'], url_path='export')
    def export(self, request):
        return Response({'success': True, 'data': []})
