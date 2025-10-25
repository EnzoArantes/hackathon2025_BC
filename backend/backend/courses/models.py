from django.db import models
from django.contrib.auth.models import User
import json

class LearningTopic(models.Model):
    """Core AI literacy topics that lessons can be generated around"""
    name = models.CharField(max_length=200)  # "Prompt Engineering", "AI Ethics"
    description = models.TextField()
    difficulty_level = models.IntegerField(default=1)  # 1-5 scale
    learning_objectives = models.JSONField()  # List of what students should learn
    
    def __str__(self):
        return f"{self.name} (Level {self.difficulty_level})"

class ContentTemplate(models.Model):
    """Templates for AI to generate different types of exercises"""
    TEMPLATE_TYPES = [
        ('multiple_choice', 'Multiple Choice'),
        ('fill_blank', 'Fill in the Blank'),
        ('prompt_writing', 'Prompt Writing Exercise'),
        ('scenario_analysis', 'AI Use Case Scenario'),
    ]
    
    name = models.CharField(max_length=200)
    template_type = models.CharField(max_length=20, choices=TEMPLATE_TYPES)
    ai_prompt_template = models.TextField()  # Template for AI generation
    topic = models.ForeignKey(LearningTopic, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.name} - {self.topic.name}"

class GeneratedLesson(models.Model):
    """AI-generated lesson instances"""
    topic = models.ForeignKey(LearningTopic, on_delete=models.CASCADE)
    template = models.ForeignKey(ContentTemplate, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Personalized for user
    content = models.JSONField()  # AI-generated questions/answers
    difficulty_adapted = models.IntegerField(default=1)  # Adapted based on user progress
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.topic.name} for {self.user.username}"

class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(LearningTopic, on_delete=models.CASCADE)
    lessons_completed = models.IntegerField(default=0)
    average_score = models.FloatField(default=0.0)
    current_difficulty = models.IntegerField(default=1)
    last_activity = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'topic']
    
    def __str__(self):
        return f"{self.user.username} - {self.topic.name}"
