from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db import IntegrityError
from .models import UserProfile
from courses.models import UserProgress, LearningTopic
import json

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Register a new user"""
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name', '')
        
        if not all([username, email, password]):
            return Response({'error': 'Username, email, and password required'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name
        )
        
        return Response({
            'message': 'User created successfully',
            'user_id': user.id,
            'username': user.username
        }, status=status.HTTP_201_CREATED)
        
    except IntegrityError:
        return Response({'error': 'Username already exists'}, 
                      status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """Login user"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Username and password required'}, 
                      status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)
    if user:
        login(request, user)
        profile = user.userprofile
        
        return Response({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'total_xp': profile.total_xp,
                'level': profile.level,
                'current_streak': profile.current_streak
            }
        })
    else:
        return Response({'error': 'Invalid credentials'}, 
                      status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_progress(request):
    """Get user's learning progress"""
    user = request.user
    profile = user.userprofile
    
    # Get progress for each topic
    topics = LearningTopic.objects.all()
    progress_data = []
    
    for topic in topics:
        user_progress = UserProgress.objects.filter(user=user, topic=topic).first()
        progress_data.append({
            'topic_id': topic.id,
            'topic_name': topic.name,
            'difficulty_level': topic.difficulty_level,
            'lessons_completed': user_progress.lessons_completed if user_progress else 0,
            'average_score': user_progress.average_score if user_progress else 0,
            'current_difficulty': user_progress.current_difficulty if user_progress else 1
        })
    
    return Response({
        'user_stats': {
            'total_xp': profile.total_xp,
            'level': profile.level,
            'current_streak': profile.current_streak
        },
        'progress': progress_data,
        'ready_for_certification': profile.total_xp >= 500  # Example threshold
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_progress(request):
    """Update user progress after completing a lesson"""
    user = request.user
    topic_id = request.data.get('topic_id')
    score = request.data.get('score', 0)
    
    try:
        topic = LearningTopic.objects.get(id=topic_id)
        
        # Get or create progress record
        progress, created = UserProgress.objects.get_or_create(
            user=user,
            topic=topic,
            defaults={'lessons_completed': 0, 'average_score': 0, 'current_difficulty': 1}
        )
        
        # Update progress
        progress.lessons_completed += 1
        
        # Calculate new average score
        total_score = (progress.average_score * (progress.lessons_completed - 1)) + score
        progress.average_score = total_score / progress.lessons_completed
        
        # Adapt difficulty based on performance
        if progress.average_score >= 85:
            progress.current_difficulty = min(5, progress.current_difficulty + 1)
        elif progress.average_score < 60:
            progress.current_difficulty = max(1, progress.current_difficulty - 1)
        
        progress.save()
        
        # Update user XP
        xp_gained = max(10, int(score / 10))  # 10-100 XP based on score
        user.userprofile.add_xp(xp_gained)
        
        return Response({
            'message': 'Progress updated successfully',
            'xp_gained': xp_gained,
            'new_level': user.userprofile.level,
            'total_xp': user.userprofile.total_xp,
            'lessons_completed': progress.lessons_completed,
            'current_difficulty': progress.current_difficulty
        })
        
    except LearningTopic.DoesNotExist:
        return Response({'error': 'Topic not found'}, 
                      status=status.HTTP_404_NOT_FOUND)
