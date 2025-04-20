from django.urls import path
from . import views

urlpatterns = [
    path('video_feed/', views.video_feed, name='video_feed'),
    path('pushup_count/', views.pushup_count, name='pushup_count'),
]