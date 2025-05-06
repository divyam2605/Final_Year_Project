import cv2
import numpy as np
from tensorflow.keras.models import load_model
import joblib
import mediapipe as mp
from backend.LiveExercise.PoseModule2 import posture_detector
# from ExerciseAiTrainer import Exercise, count_repetition_squat
from backend.LiveExercise.ExerciseAiTrainer import Exercise, relevant_landmarks_indices, count_repetition_squat, count_repetition_bicep_curl, count_repetition_push_up, count_repetition_shoulder_press

# Load model components using Exercise class
exercise = Exercise()
model = exercise.lstm_model
scaler = exercise.scaler
label_encoder = exercise.label_encoder
exercise_classes = exercise.exercise_classes

pose = mp.solutions.pose.Pose()
detector = posture_detector()

# Set parameters
window_size = 30
landmarks_window = []
current_prediction = ""
current_count = 0
stage = None
# counter = 0

stage_right = None
stage_left = None

import time

class ExerciseSession:
    def __init__(self):
        # Dictionary to store {exercise_name: {"count": int, "start_time": float, "total_time": float}}
        self.exercise_data = {
            'squat': {"count": 0, "start_time": None, "total_time": 0.0},
            'push_up': {"count": 0, "start_time": None, "total_time": 0.0},
            'bicep_curl': {"count": 0, "start_time": None, "total_time": 0.0},
            'shoulder_press': {"count": 0, "start_time": None, "total_time": 0.0}
        }
        self.current_exercise = None

    def start_exercise(self, exercise_name):
        if self.current_exercise != exercise_name:
            # End timing previous exercise if applicable
            self.end_current_exercise()
            # Start new exercise
            self.current_exercise = exercise_name
            self.exercise_data[exercise_name]['start_time'] = time.time()
            print("start_exercise")

    def end_current_exercise(self):
        if self.current_exercise is not None:
            now = time.time()
            ex_data = self.exercise_data[self.current_exercise]
            if ex_data['start_time'] is not None:
                ex_data['total_time'] += now - ex_data['start_time']
                ex_data['start_time'] = None
            self.current_exercise = None

    def update_count(self, exercise_name, count):
        self.exercise_data[exercise_name]['count'] = count
        print("updated count")

    def get_summary(self):
        summary = {}
        for ex, data in self.exercise_data.items():
            summary[ex] = {
                'reps': data['count'],
                'time_seconds': round(data['total_time'], 2)
            }
        return summary

# Open webcam
cap = cv2.VideoCapture(0)

session = ExerciseSession()

while True:

    ret, frame = cap.read()
    if not ret:
        break

    img = detector.find_person(frame.copy())
    landmark_list = detector.find_landmarks(img, draw=True)
    print('debug here ')
    # Extract 3D landmarks for classification
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(frame_rgb)
    landmarks = []
    if results.pose_landmarks:
        for idx in relevant_landmarks_indices:
            lm = results.pose_landmarks.landmark[idx]
            landmarks.extend([lm.x, lm.y, lm.z])

    # Append features for classification
    if len(landmarks) == len(relevant_landmarks_indices) * 3:
        features = exercise.extract_features(landmarks)
        print("Extracted feature length:", len(features))
        print("Feature sample:", features[:10])
        if len(features) == 78:
            landmarks_window.append(features)
    print('debug here 1')
    print('landmarks_window: ',len(landmarks_window))
    print('window_size: ',(window_size))

    # Predict when window is full
    if len(landmarks_window) == window_size:
        input_data = scaler.transform(np.array(landmarks_window))  # shape: (30, 78)
        input_data = input_data.reshape(1, window_size, 78)
        prediction = model.predict(input_data)
        print('debug here 2')
        class_id = np.argmax(prediction)
        print("Prediction probs:", prediction)
        print("Predicted class index:", class_id)
        print("Predicted class label:", exercise_classes[class_id])

        current_prediction = exercise_classes[class_id]
        landmarks_window = []

    # current_prediction = 'squat'
    
    # if current_prediction != "":
    #     session.start_exercise(current_prediction)

    # Count squat reps if detected
    # if len(landmark_list) > 0 and current_prediction == 'squat':

    #     session.start_exercise(current_prediction)
    #     counter = session.exercise_data[current_prediction]['count']

    #     stage, counter = count_repetition_squat(detector, img, landmark_list, stage, counter, exercise)
    #     right_leg_angle = detector.find_angle(img, 24, 26, 28)
    #     left_leg_angle = detector.find_angle(img, 23, 25, 27)
    #     print(f"Right Leg Angle: {right_leg_angle}, Left Leg Angle: {left_leg_angle}, Stage: {stage}, Counter: {counter}")
        
    #     session.update_count('squat', counter)
    #     current_count = session.exercise_data[current_prediction]['count']

    # elif current_prediction == 'push_up':

    #     session.start_exercise(current_prediction)
    #     counter = session.exercise_data[current_prediction]['count']

    #     stage, counter = count_repetition_push_up(detector, img, landmark_list, stage, counter, exercise)

    #     session.update_count('push_up', counter)
    #     current_count = session.exercise_data[current_prediction]['count']

    # elif current_prediction == 'bicep_curl':

    #     session.start_exercise(current_prediction)
    #     counter = session.exercise_data[current_prediction]['count']

    #     stage, counter = count_repetition_bicep_curl(detector, img, landmark_list, stage, counter, exercise)

    #     session.update_count('bicep_curl', counter)
    #     current_count = session.exercise_data[current_prediction]['count']

    # elif current_prediction == 'shoulder_press':

    #     session.start_exercise(current_prediction)
    #     counter = session.exercise_data[current_prediction]['count']

    #     stage, counter = count_repetition_shoulder_press(detector, img, landmark_list, stage, counter, exercise)

    #     session.update_count('shoulder_press', counter)
    #     current_count = session.exercise_data[current_prediction]['count']

    if len(landmark_list) > 0 and current_prediction in session.exercise_data:

        session.start_exercise(current_prediction)
        counter = session.exercise_data[current_prediction]['count']
        increment = False

        if current_prediction == 'squat':
            stage, counter, increment = count_repetition_squat(detector, img, landmark_list, stage, counter, exercise)
            right_leg_angle = detector.find_angle(img, 24, 26, 28)
            left_leg_angle = detector.find_angle(img, 23, 25, 27)
            print(f"Right Leg Angle: {right_leg_angle}, Left Leg Angle: {left_leg_angle}, Stage: {stage}, Counter: {counter}")

        elif current_prediction == 'push_up':
            stage, counter, increment = count_repetition_push_up(detector, img, landmark_list, stage, counter, exercise)

        elif current_prediction == 'bicep_curl':  
            # stage, counter = count_repetition_bicep_curl(detector, img, landmark_list, stage, counter, exercise)
            stage_right, stage_left, counter, increment = count_repetition_bicep_curl(detector, img, landmark_list, stage_right, stage_left, counter, exercise)

        elif current_prediction == 'shoulder_press':
            stage, counter, increment = count_repetition_shoulder_press(detector, img, landmark_list, stage, counter, exercise)

        if increment == True:
            session.update_count(current_prediction, counter)
            current_count = counter
    # else:
    #     current_count = 0

    # if current_prediction in session.exercise_data:
    #     current_count = session.exercise_data[current_prediction]['count']
    # else:
    #     current_count = 0

    # Display prediction and counter
    cv2.putText(img, f"Prediction: {current_prediction}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
    cv2.putText(img, f"Count: {current_count}", (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
    # cv2.putText(img, f"R-Angle: {int(right_leg_angle)}", (10, 110), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)
    # cv2.putText(img, f"L-Angle: {int(left_leg_angle)}", (10, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)


    cv2.imshow("Counter", img)
    if cv2.waitKey(1) & 0xFF == ord('q'):

        session.end_current_exercise()
        summary = session.get_summary()
        print("----- Exercise Session Summary -----")
        for exercise, stats in summary.items():
            print(f"{exercise.capitalize()}: {stats['reps']} reps, {stats['time_seconds']} seconds")

        break

cap.release()
cv2.destroyAllWindows()
