import base64
import json
import cv2
import numpy as np
from channels.generic.websocket import AsyncWebsocketConsumer

class LiveExerciseConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({"message": "WebSocket connection established"}))

    async def disconnect(self, close_code):
        print("Disconnected")

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        frame_data = data.get("frame")

        # Decode Base64 image
        try:
            img_array = np.frombuffer(base64.b64decode(frame_data), np.uint8)
            frame = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        except Exception as e:
            await self.send(text_data=json.dumps({"error": "Invalid frame format"}))
            return

        # Run your dummy function (to be integrated below)
        processed_frame = run_inference_on_frame(frame)

        # Encode processed frame back to Base64
        _, buffer = cv2.imencode('.jpg', processed_frame)
        encoded = base64.b64encode(buffer).decode('utf-8')

        await self.send(text_data=json.dumps({
            "processed_frame": encoded
        }))

def run_inference_on_frame(frame):
    # TEMP: Draw dummy text to verify loopback works
    cv2.putText(frame, "Processing...", (10, 50),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    return frame