from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import LearningTopic, ContentTemplate
import json
import random

@api_view(['POST'])
@permission_classes([AllowAny])  # No auth needed for demo
def generate_lesson_content(request):
    """Generate AI-style lesson content for any topic"""
    
    topic_name = request.data.get('topic', 'Prompt Engineering')
    lesson_type = request.data.get('type', 'prompt_writing')
    
    # Mock AI-generated content (in real app, this would call OpenAI/Claude API)
    content_variations = {
        'context_lessons': [
            {
                "title": "Adding Context: The Game Changer",
                "sections": [
                    {
                        "type": "intro",
                        "content": "Context is like giving AI your background story. The more relevant details you provide, the better AI understands your situation."
                    },
                    {
                        "type": "exercise",
                        "scenario": "You need help writing an email to your professor about missing class",
                        "bad_example": "Write an email to my professor",
                        "good_example": "You are a helpful communication assistant. Help me write a professional email to my Computer Science professor explaining that I missed today's lecture due to a family emergency. I need to ask about getting notes and if there are any assignments I missed. Keep the tone respectful and brief.",
                        "feedback_criteria": ["Professional tone", "Clear explanation", "Specific request"]
                    }
                ]
            }
        ],
        'critical_thinking': [
            {
                "title": "Think Critically: Spotting AI Mistakes",
                "sections": [
                    {
                        "type": "intro", 
                        "content": "AI can make mistakes or generate outdated information. Learn to verify and fact-check AI responses."
                    },
                    {
                        "type": "exercise",
                        "scenario": "AI gave you this fact: 'The iPhone was invented in 2010.' What should you do?",
                        "options": [
                            {"text": "Trust it completely", "correct": False, "explanation": "Never trust AI completely without verification"},
                            {"text": "Check multiple reliable sources", "correct": True, "explanation": "Always verify facts, especially dates and statistics"},
                            {"text": "Assume it's wrong", "correct": False, "explanation": "Don't assume, but always verify"}
                        ]
                    }
                ]
            }
        ]
    }
    
    # Return generated content
    lesson_data = content_variations.get(lesson_type, content_variations['context_lessons'])[0]
    
    return Response({
        'status': 'success',
        'generated_lesson': lesson_data,
        'ai_note': 'This content was generated using AI templates and would be personalized for each student',
        'topic': topic_name
    })
@api_view(['GET'])
@permission_classes([AllowAny])
def demo_status(request):
    """Simple endpoint to test backend connection"""
    return Response({
        'message': 'AI Literacy Backend is running!',
        'lesson_generation': 'ready',
        'static_lessons': 'working with frontend'
    })
