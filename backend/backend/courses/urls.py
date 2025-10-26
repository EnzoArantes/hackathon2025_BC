from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('progress/', views.get_progress, name='get_progress'),
    path('update-progress/', views.update_progress, name='update_progress'),
]
