from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
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
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_progress(request):
    lesson_id = request.data.get('lesson_id')
    score = request.data.get('score', 0)
    
    progress = UserProgress.objects.get(user=request.user)
    progress.lessons_completed += 1
    progress.total_score += score
    progress.save()
    
    return Response({'message': 'Progress updated'})