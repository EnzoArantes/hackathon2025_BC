from django.db import models
from django.contrib.auth.models import User

class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lessons_completed = models.IntegerField(default=0)
    total_score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.lessons_completed} lessons"
