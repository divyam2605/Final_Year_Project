# exercise_session_handler.py
import cv2
import numpy as np
import time
import mediapipe as mp
from PoseModule2 import posture_detector
from ExerciseAiTrainer import (
    Exercise,
    relevant_landmarks_indices,
    count_repetition_squat,
    count_repetition_push_up,
    count_repetition_bicep_curl,
    count_repetition_shoulder_press
)

pose = mp.solutions.pose.Pose()
detector = posture_detector()

class ExerciseSessionHandler:
    def _init_(self):
        self.exercise = Exercise()
        self.model = self.exercise.lstm_model
        self.scaler = self.exercise.scaler
        self.label_encoder = self.exercise.label_encoder
        self.exercise_classes = self.exercise.exercise_classes

        self.window_size = 30
        self.landmarks_window = []
        self.current_prediction = ""
        self.current_count = 0
        self.stage = None
        self.stage_right = None
        self.stage_left = None

        self.session_data = {
            'squat': {"count": 0, "start_time": None, "total_time": 0.0},
            'push_up': {"count": 0, "start_time": None, "total_time": 0.0},
            'bicep_curl': {"count": 0, "start_time": None, "total_time": 0.0},
            'shoulder_press': {"count": 0, "start_time": None, "total_time": 0.0}
        }
        self.current_exercise = None

    def start_exercise(self, exercise_name):
        if self.current_exercise != exercise_name:
            self.end_current_exercise()
            self.current_exercise = exercise_name
            self.session_data[exercise_name]["start_time"] = time.time()

    def end_current_exercise(self):
        if self.current_exercise:
            now = time.time()
            ex_data = self.session_data[self.current_exercise]
            if ex_data["start_time"] is not None:
                ex_data["total_time"] += now - ex_data["start_time"]
                ex_data["start_time"] = None
            self.current_exercise = None

    def update_count(self, exercise_name, count):
        self.session_data[exercise_name]["count"] = count

    def get_summary(self):
        return {
            ex: {
                "reps": data["count"],
                "time_seconds": round(data["total_time"], 2)
            } for ex, data in self.session_data.items()
        }

    def process(self, frame):
        img = detector.find_person(frame.copy())
        landmark_list = detector.find_landmarks(img, draw=True)

        # Extract pose landmarks
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(frame_rgb)
        landmarks = []
        if results.pose_landmarks:
            for idx in relevant_landmarks_indices:
                lm = results.pose_landmarks.landmark[idx]
                landmarks.extend([lm.x, lm.y, lm.z])

        if len(landmarks) == len(relevant_landmarks_indices) * 3:
            features = self.exercise.extract_features(landmarks)
            if len(features) == 78:
                self.landmarks_window.append(features)

        if len(self.landmarks_window) == self.window_size:
            input_data = self.scaler.transform(np.array(self.landmarks_window))
            input_data = input_data.reshape(1, self.window_size, 78)
            prediction = self.model.predict(input_data)
            class_id = np.argmax(prediction)
            self.current_prediction = self.exercise_classes[class_id]
            self.landmarks_window = []

        if len(landmark_list) > 0 and self.current_prediction in self.session_data:
            self.start_exercise(self.current_prediction)
            counter = self.session_data[self.current_prediction]["count"]
            increment = False

            if self.current_prediction == 'squat':
                self.stage, counter, increment = count_repetition_squat(detector, img, landmark_list, self.stage, counter, self.exercise)
            elif self.current_prediction == 'push_up':
                self.stage, counter, increment = count_repetition_push_up(detector, img, landmark_list, self.stage, counter, self.exercise)
            elif self.current_prediction == 'bicep_curl':
                self.stage_right, self.stage_left, counter, increment = count_repetition_bicep_curl(detector, img, landmark_list, self.stage_right, self.stage_left, counter, self.exercise)
            elif self.current_prediction == 'shoulder_press':
                self.stage, counter, increment = count_repetition_shoulder_press(detector, img, landmark_list, self.stage, counter, self.exercise)

            if increment:
                self.update_count(self.current_prediction, counter)
                self.current_count = counter

        cv2.putText(img, f"Prediction: {self.current_prediction}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
        cv2.putText(img, f"Count: {self.current_count}", (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
        return img