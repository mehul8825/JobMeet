from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from .models import CustomUser
from .serializers import (
    SignupSerializer, LoginSerializer, UserSerializer,
    PasswordResetRequestSerializer, PasswordResetConfirmSerializer,
    GoogleLoginSerializer
)


class SignupView(APIView):
    """User registration endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            # Set tokens in HTTP-only cookies
            response = Response({
                'message': 'User created successfully',
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
            
            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=not settings.DEBUG,  # True in production
                samesite='Lax',
                max_age=7 * 24 * 60 * 60  # 7 days
            )
            
            response.set_cookie(
                key='access_token',
                value=str(refresh.access_token),
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
                max_age=60 * 60  # 1 hour
            )
            
            return response
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """User login endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            response = Response({
                'message': 'Login successful',
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
            
            # Set tokens in HTTP-only cookies
            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
                max_age=7 * 24 * 60 * 60
            )
            
            response.set_cookie(
                key='access_token',
                value=str(refresh.access_token),
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
                max_age=60 * 60
            )
            
            return response
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    """User logout endpoint"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        response = Response({
            'message': 'Logout successful'
        }, status=status.HTTP_200_OK)
        
        # Clear cookies
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        
        return response


class CurrentUserView(APIView):
    """Get current authenticated user"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PasswordResetRequestView(APIView):
    """Request password reset email"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                # Return success even if user doesn't exist (security best practice)
                return Response({
                    'message': 'If an account exists with this email, a reset link will be sent'
                }, status=status.HTTP_200_OK)
            
            # Generate password reset token
            token = default_token_generator.make_token(user)
            
            # Create reset URL with user ID and token
            from django.utils.http import urlsafe_base64_encode
            from django.utils.encoding import force_bytes
            
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
            
            # Send email with HTML template
            email_subject = 'JobMeet - Password Reset Request'
            email_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #4169E1;">Password Reset Request</h2>
                        <p>Hello {user.full_name},</p>
                        <p>You recently requested to reset your password for your JobMeet account. Click the button below to reset it:</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="{reset_url}" style="background-color: #4169E1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
                        </div>
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #4169E1;">{reset_url}</p>
                        <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
                        <p style="color: #666; font-size: 14px;">If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                        <p style="color: #999; font-size: 12px;">JobMeet Interview Platform</p>
                    </div>
                </body>
            </html>
            """
            
            try:
                send_mail(
                    email_subject,
                    '',  # Plain text version (empty as we're using HTML)
                    settings.EMAIL_HOST_USER,
                    [email],
                    fail_silently=False,
                    html_message=email_body
                )
            except Exception as e:
                return Response({
                    'error': 'Failed to send email. Please try again later.'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            return Response({
                'message': 'If an account exists with this email, a reset link will be sent'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PasswordResetConfirmView(APIView):
    """Confirm password reset with token"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data['token']
            uid = serializer.validated_data.get('uid')
            new_password = serializer.validated_data['new_password']
            
            # Decode user ID from URL-safe base64
            from django.utils.http import urlsafe_base64_decode
            from django.utils.encoding import force_str
            
            try:
                user_id = force_str(urlsafe_base64_decode(uid))
                user = CustomUser.objects.get(pk=user_id)
            except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
                return Response({
                    'error': 'Invalid reset link'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Validate token
            if not default_token_generator.check_token(user, token):
                return Response({
                    'error': 'Invalid or expired reset link'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Set new password
            user.set_password(new_password)
            user.save()
            
            return Response({
                'message': 'Password reset successful. You can now log in with your new password.'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GoogleLoginView(APIView):
    """Google OAuth login endpoint"""
    permission_classes = [AllowAny]
    
    def post(self, request):
        print(f"Google login request data: {request.data}")  # Debug log
        serializer = GoogleLoginSerializer(data=request.data)
        if serializer.is_valid():
            access_token = serializer.validated_data['access_token']
            role = serializer.validated_data.get('role', 'CANDIDATE')
            
            try:
                # Verify the token with Google
                idinfo = id_token.verify_oauth2_token(
                    access_token,
                    google_requests.Request(),
                    settings.GOOGLE_OAUTH_CLIENT_ID
                )
                
                email = idinfo['email']
                full_name = idinfo.get('name', '')
                avatar = idinfo.get('picture', '')
                
                # Get or create user
                user, created = CustomUser.objects.get_or_create(
                    email=email,
                    defaults={
                        'full_name': full_name,
                        'avatar': avatar,
                        'role': role,
                    }
                )
                
                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                
                response = Response({
                    'message': 'Google login successful',
                    'user': UserSerializer(user).data,
                    'is_new_user': created
                }, status=status.HTTP_200_OK)
                
                response.set_cookie(
                    key='refresh_token',
                    value=str(refresh),
                    httponly=True,
                    secure=not settings.DEBUG,
                    samesite='Lax',
                    max_age=7 * 24 * 60 * 60
                )
                
                response.set_cookie(
                    key='access_token',
                    value=str(refresh.access_token),
                    httponly=True,
                    secure=not settings.DEBUG,
                    samesite='Lax',
                    max_age=60 * 60
                )
                
                return response
                
            except ValueError as e:
                print(f"Token verification error: {str(e)}")  # Debug log
                return Response({
                    'error': 'Invalid Google token'
                }, status=status.HTTP_400_BAD_REQUEST)
        
        print(f"Serializer errors: {serializer.errors}")  # Debug log
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
