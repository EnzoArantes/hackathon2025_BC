from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from .models import UserProgress

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)
    
    user = User.objects.create_user(username=username, password=password)
    UserProgress.objects.create(user=user)
    
    return Response({'message': 'User created successfully'})

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user:
        login(request, user)
        progress = UserProgress.objects.get(user=user)
        return Response({
            'message': 'Login successful',
            'lessons_completed': progress.lessons_completed,
            'total_score': progress.total_score
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=401)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_progress(request):
    """Get user's lesson progress"""
    try:
        progress = UserProgress.objects.get(user=request.user)
        completed_lessons = progress.get_completed_lessons()
        progress_data = progress.get_progress_data()

        return Response({
            'completed_lessons': completed_lessons,
            'progress': progress_data,
            'total_lessons': progress.lessons_completed,
            'total_score': progress.total_score,
            'certification_earned': progress.certification_earned,
            'certification_date': progress.certification_date
        })
    except UserProgress.DoesNotExist:
        # Create new progress if it doesn't exist
        progress = UserProgress.objects.create(user=request.user)
        return Response({
            'completed_lessons': [],
            'progress': {},
            'total_lessons': 0,
            'total_score': 0,
            'certification_earned': False,
            'certification_date': None
        })

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_progress(request):
    lesson_id = request.data.get('lesson_id')
    score = request.data.get('score', 0)

    try:
        progress = UserProgress.objects.get(user=request.user)
    except UserProgress.DoesNotExist:
        progress = UserProgress.objects.create(user=request.user)

    # Get current completed lessons and progress data
    completed_lessons = progress.get_completed_lessons()
    progress_data = progress.get_progress_data()

    # Add lesson to completed list if not already there
    if lesson_id not in completed_lessons:
        completed_lessons.append(lesson_id)
        completed_lessons.sort()
        progress.lessons_completed += 1

    # Update progress data for this lesson
    progress_data[str(lesson_id)] = {
        'score': score,
        'completed': True,
        'completed_at': timezone.now().isoformat()
    }

    # Update total score
    progress.total_score += score

    # Save updated data
    progress.set_completed_lessons(completed_lessons)
    progress.set_progress_data(progress_data)

    # Check if all 4 lessons are completed and award certification
    TOTAL_LESSONS = 4
    if len(completed_lessons) >= TOTAL_LESSONS and not progress.certification_earned:
        progress.certification_earned = True
        progress.certification_date = timezone.now()

    progress.save()

    return Response({
        'message': 'Progress updated',
        'certification_earned': progress.certification_earned,
        'all_lessons_completed': len(completed_lessons) >= TOTAL_LESSONS
    })