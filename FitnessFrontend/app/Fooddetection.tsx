// import { useState, useEffect, useRef } from 'react';
// import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
// import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
// import axios from 'axios';

// type Detection = {
//   class: string;
//   confidence: number;
// };

// export default function Fooddetection() {
//   const [facing, setFacing] = useState<CameraType>('back');
//   const [permission, requestPermission] = useCameraPermissions();
//   const [image, setImage] = useState<string | null>(null);
//   const [detections, setDetections] = useState<Detection[]>([]);
//   const cameraRef = useRef<any>(null);

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="Grant Permission" />
//       </View>
//     );
//   }

//   const toggleCameraFacing = () => {
//     setFacing((current) => (current === 'back' ? 'front' : 'back'));
//   };

//   const captureAndManipulateImage = async (photoUri: string) => {
//     try {
//       const manipResult = await manipulateAsync(
//         photoUri,
//         [{ rotate: 90 }, { flip: FlipType.Vertical }],
//         { compress: 1, format: SaveFormat.PNG }
//       );

//       setImage(manipResult.uri);

//       const base64Image = await convertToBase64(manipResult.uri);
//       const response = await axios.post('http://192.168.29.22:5000/detect', {
//         image: base64Image,
//       });

//       setDetections(response.data as Detection[]);
//     } catch (error) {
//       console.error('Error during manipulation or detection:', error);
//     }
//   };

//   const handleCapture = async () => {
//     if (cameraRef.current) {
//       const photo = await cameraRef.current.takePictureAsync();
//       await captureAndManipulateImage(photo.uri);
//     }
//   };

//   const convertToBase64 = async (uri: string): Promise<string> => {
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     const reader = new FileReader();
//     return new Promise((resolve, reject) => {
//       reader.onloadend = () => {
//         if (reader.result && typeof reader.result === 'string') {
//           resolve(reader.result.split(',')[1]);
//         } else {
//           reject(new Error('Failed to read file'));
//         }
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {!image ? (
//         <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={handleCapture}>
//               <Text style={styles.text}>Capture</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//               <Text style={styles.text}>Flip Camera</Text>
//             </TouchableOpacity>
//           </View>
//         </CameraView>
//       ) : (
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: image }} style={styles.image} />
//           <Button title="Retake" onPress={() => setImage(null)} />
//           {detections.length > 0 && (
//             <View style={styles.detectionContainer}>
//               {detections.map((item, index) => (
//                 <Text key={index}>
//                   {item.class}: {item.confidence}%
//                 </Text>
//               ))}
//             </View>
//           )}
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   message: {
//     textAlign: 'center',
//     paddingBottom: 10,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     justifyContent: 'space-between',
//     margin: 20,
//   },
//   button: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 18,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   imageContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 300,
//     height: 300,
//     marginBottom: 20,
//   },
//   detectionContainer: {
//     marginTop: 20,
//   },
// });

import { useState, useEffect, useRef } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import axios from 'axios';

type Detection = {
  class: string;
  confidence: number;
};

export default function Fooddetection() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState<string | null>(null);
  const [detections, setDetections] = useState<Detection[]>([]);
  const cameraRef = useRef<any>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const captureAndManipulateImage = async (photoUri: string) => {
    try {
      const manipResult = await manipulateAsync(
        photoUri,
        [{ rotate: 90 }, { flip: FlipType.Vertical }],
        { compress: 1, format: SaveFormat.PNG }
      );

      setImage(manipResult.uri);

      const base64Image = await convertToBase64(manipResult.uri);
      const response = await axios.post('http://192.168.29.22:5000/detect', {
        image: base64Image,
      });

      setDetections(response.data as Detection[]);
    } catch (error) {
      console.error('Error during manipulation or detection:', error);
    }
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      await captureAndManipulateImage(photo.uri);
    }
  };

  const convertToBase64 = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCapture}>
              <Text style={styles.text}>Capture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <Button title="Retake" onPress={() => setImage(null)} />
          {detections.length > 0 && (
            <View style={styles.detectionContainer}>
              {detections.map((item, index) => (
                <Text key={index} style={styles.detectionText}>
                  {item.class}: {item.confidence.toFixed(2)}%
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 20,
  },
  camera: {
    flex: 1,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detectionContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '90%',
  },
  detectionText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
});


