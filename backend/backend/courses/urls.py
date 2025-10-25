from django.urls import path
from . import views

urlpatterns = [
    path('generate-lesson/', views.generate_lesson_content, name='generate_lesson'),
    path('status/', views.demo_status, name='demo_status'),
]
