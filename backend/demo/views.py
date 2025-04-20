from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import StreamingHttpResponse
from django.views.decorators.gzip import gzip_page
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
import cv2
import mediapipe as mp
import numpy as np
import json
import os

# MediaPipe Pose setup
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
drawing_utils = mp.solutions.drawing_utils

exercise_name = "pushup"

# Path to demo video
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEMO_VIDEO_PATH = os.path.join(BASE_DIR, "static", f"{exercise_name}_demo.mp4")


def process_frame(frame):
    image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)
    image = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2BGR)
    if results.pose_landmarks:
        drawing_utils.draw_landmarks(
            image,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS
        )
    return image

def generate_demo():
    cap = cv2.VideoCapture(DEMO_VIDEO_PATH)
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue
        frame = process_frame(frame)
        ret, jpeg = cv2.imencode('.jpg', frame)
        if not ret:
            continue
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')
    cap.release()

def generate_live():
    cap = cv2.VideoCapture(0)
    while True:
        success, frame = cap.read()
        if not success:
            continue
        frame = process_frame(frame)
        ret, jpeg = cv2.imencode('.jpg', frame)
        if not ret:
            continue
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')
    cap.release()

@gzip_page
def stream_demo(request):
    return StreamingHttpResponse(generate_demo(), content_type='multipart/x-mixed-replace; boundary=frame')

@gzip_page
def stream_live(request):
    return StreamingHttpResponse(generate_live(), content_type='multipart/x-mixed-replace; boundary=frame')

@api_view(['POST'])
@permission_classes([AllowAny])
def start_tracking(request):
    global exercise_name, DEMO_VIDEO_PATH

    data = request.data
    exercise_name = data.get('exercise', 'pushup')
    DEMO_VIDEO_PATH = os.path.join(BASE_DIR, "static", f"{exercise_name}_demo.mp4")
    
    return Response({"status": "started", "exercise": exercise_name}, status=status.HTTP_200_OK)
