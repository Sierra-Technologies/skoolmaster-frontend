from django.urls import path
from .views import (
    LoginView, LogoutView, RegisterView, RefreshTokenView,
    MeView, ChangePasswordView, ForgotPasswordView, ResetPasswordView,
    VerifyEmailView, UserListView, UserDetailView
)

urlpatterns = [
    path('auth/login', LoginView.as_view(), name='login'),
    path('auth/logout', LogoutView.as_view(), name='logout'),
    path('auth/register', RegisterView.as_view(), name='register'),
    path('auth/refresh', RefreshTokenView.as_view(), name='token-refresh'),
    path('auth/me', MeView.as_view(), name='me'),
    path('auth/change-password', ChangePasswordView.as_view(), name='change-password'),
    path('auth/forgot-password', ForgotPasswordView.as_view(), name='forgot-password'),
    path('auth/reset-password', ResetPasswordView.as_view(), name='reset-password'),
    path('auth/verify-email', VerifyEmailView.as_view(), name='verify-email'),
    path('users', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>', UserDetailView.as_view(), name='user-detail'),
]
