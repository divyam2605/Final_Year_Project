from django.urls import path
from . import views

urlpatterns = [
    path('start/', views.start_tracking),
    path('demo_stream/', views.stream_demo),
    path('live_stream/', views.stream_live),
]