from django.shortcuts import render

# Create your views here.
from django.http import StreamingHttpResponse, JsonResponse
from django.views.decorators import gzip
import cv2
import mediapipe as mp
from . import posemodule as pm

# Initialize pose detector
detector = pm.poseDetector()
count = 0
f = 0

# Open webcam or mobile camera stream
cap = cv2.VideoCapture(0)

# Video streaming function
def generate_frames():
    global count, f
    while True:
        success, img = cap.read()
        if not success:
            break

        img = detector.findPose(img)
        lmlist = detector.getPosition(img, draw=False)

        if len(lmlist) != 0:
            y1 = lmlist[14][2]
            y2 = lmlist[0][2]
            length = y2 - y1

            if length >= 0 and f == 0:
                f = 1
            elif length < -50 and f == 1:
                f = 0
                count += 1

        _, buffer = cv2.imencode('.jpg', img)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# Streaming video view
@gzip.gzip_page
def video_feed(request):
    return StreamingHttpResponse(generate_frames(), content_type='multipart/x-mixed-replace; boundary=frame')

# Push-up count view
def pushup_count(request):
    return JsonResponse({"pushups": count, "calories": round(count * 0.29, 2)})

