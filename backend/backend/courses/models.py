from django.db import models
from django.contrib.auth.models import User
import json

class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lessons_completed = models.IntegerField(default=0)
    total_score = models.IntegerField(default=0)
    completed_lesson_ids = models.TextField(default='[]')  # JSON array of completed lesson IDs
    progress_data = models.TextField(default='{}')  # JSON object with detailed progress per lesson
    certification_earned = models.BooleanField(default=False)
    certification_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.lessons_completed} lessons"

    def get_completed_lessons(self):
        """Return list of completed lesson IDs"""
        try:
            return json.loads(self.completed_lesson_ids)
        except:
            return []

    def set_completed_lessons(self, lesson_ids):
        """Set completed lesson IDs"""
        self.completed_lesson_ids = json.dumps(lesson_ids)

    def get_progress_data(self):
        """Return progress data as dictionary"""
        try:
            return json.loads(self.progress_data)
        except:
            return {}

    def set_progress_data(self, data):
        """Set progress data"""
        self.progress_data = json.dumps(data)
