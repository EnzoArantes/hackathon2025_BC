from django.contrib import admin
from .models import LearningTopic, ContentTemplate, GeneratedLesson, UserProgress

@admin.register(LearningTopic)
class LearningTopicAdmin(admin.ModelAdmin):
    list_display = ['name', 'difficulty_level']
    list_filter = ['difficulty_level']

@admin.register(ContentTemplate)
class ContentTemplateAdmin(admin.ModelAdmin):
    list_display = ['name', 'template_type', 'topic']
    list_filter = ['template_type', 'topic']

@admin.register(GeneratedLesson)
class GeneratedLessonAdmin(admin.ModelAdmin):
    list_display = ['topic', 'user', 'difficulty_adapted', 'created_at']
    list_filter = ['topic', 'difficulty_adapted']

@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'topic', 'lessons_completed', 'average_score']
    list_filter = ['topic', 'current_difficulty']
