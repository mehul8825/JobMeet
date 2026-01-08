from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    """Custom user manager for email-based authentication"""
    
    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular user with the given email and password"""
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        
        # Remove username from extra_fields if present
        extra_fields.pop('username', None)
        
        # Create user instance
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a superuser with the given email and password"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        # Set full_name if not provided
        if 'full_name' not in extra_fields:
            extra_fields['full_name'] = email.split('@')[0]
        
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    """
    Custom User model with email as the primary identifier.
    Supports both Host (Interviewer) and Candidate (Interviewee) roles.
    """
    ROLE_CHOICES = [
        ('HOST', 'Host/Interviewer'),
        ('CANDIDATE', 'Candidate/Interviewee'),
    ]
    
    # Override username to make it optional (we'll use email instead)
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    
    # Email as primary identifier
    email = models.EmailField(unique=True, db_index=True)
    
    # Profile fields
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True, null=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='CANDIDATE')
    avatar = models.URLField(blank=True, null=True)  # Can store uploaded image URL or Google profile pic
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Use custom manager
    objects = CustomUserManager()
    
    # Use email as the username field
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']  # Required when creating superuser
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.full_name} ({self.email})"
    
    def save(self, *args, **kwargs):
        # Auto-generate username from email if not provided
        if not self.username:
            self.username = self.email.split('@')[0] + str(self.id or '')
        super().save(*args, **kwargs)
