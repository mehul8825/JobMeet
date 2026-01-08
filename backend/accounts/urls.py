from django.urls import path
from .views import (
    SignupView, LoginView, LogoutView, CurrentUserView,
    PasswordResetRequestView, PasswordResetConfirmView,
    GoogleLoginView
)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', CurrentUserView.as_view(), name='current-user'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('google/', GoogleLoginView.as_view(), name='google-login'),
]
