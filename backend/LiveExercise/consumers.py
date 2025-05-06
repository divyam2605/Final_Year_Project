# consumers.py
import base64
import json
import cv2
import numpy as np
from channels.generic.websocket import AsyncWebsocketConsumer
from .exercise_session_handler import ExerciseSessionHandler

# Create a persistent session handler (global instance)
session_handler = ExerciseSessionHandler()

class LiveExerciseConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({"message": "WebSocket connection established"}))

    async def disconnect(self, close_code):
        print("Disconnected")
        session_handler.end_current_exercise()  # Optional: finalize session on disconnect
        summary = session_handler.get_summary()
        await self.send(text_data=json.dumps({"session_summary": summary}))

    async def receive(self, text_data=None, bytes_data=None):
        try:
            data = json.loads(text_data)
            frame_data = data.get("frame")

            if not frame_data:
                await self.send(text_data=json.dumps({"error": "No frame data received"}))
                return

            # Decode Base64 frame
            img_array = np.frombuffer(base64.b64decode(frame_data), np.uint8)
            frame = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

            # Process and encode frame
            processed_frame = session_handler.process(frame)
            _, buffer = cv2.imencode('.jpg', processed_frame)
            encoded = base64.b64encode(buffer).decode('utf-8')

            await self.send(text_data=json.dumps({
                "processed_frame": encoded,
                "exercise": session_handler.current_prediction,
                "count": session_handler.current_count
            }))

        except Exception as e:
            await self.send(text_data=json.dumps({"error": f"Exception: {str(e)}"}))
            
            