"""
Authentication middleware for JWT cookie-based authentication
"""
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed


class CookieJWTAuthentication(JWTAuthentication):
    """
    Custom JWT authentication class that reads the token from cookies
    instead of the Authorization header
    """
    
    def authenticate(self, request):
        # Try to get token from cookie
        access_token = request.COOKIES.get('access_token')
        
        if access_token is None:
            return None
        
        # Validate the token
        validated_token = self.get_validated_token(access_token)
        
        # Get the user
        return self.get_user(validated_token), validated_token
