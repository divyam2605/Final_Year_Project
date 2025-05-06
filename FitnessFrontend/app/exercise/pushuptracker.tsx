// // import React, { useRef, useState, useEffect } from 'react';
// // import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
// // import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

// // const PushupTracker: React.FC = () => {
// //   const cameraRef = useRef<CameraView | null>(null);
// //   const [hasPermission, requestPermission] = useCameraPermissions();
// //   const [facing, setFacing] = useState<CameraType>('front');
// //   const [processedFrame, setProcessedFrame] = useState<string | null>(null);
// //   const [socket, setSocket] = useState<WebSocket | null>(null);

// //   const toggleCameraFacing = () => {
// //     setFacing((current) => (current === 'front' ? 'back' : 'front'));
// //   };

// //   // Setup WebSocket connection
// //   useEffect(() => {
// //     const ws = new WebSocket('ws://172.20.10.7:8000/ws/live/'); // replace <YOUR-IP>

// //     ws.onopen = () => console.log('WebSocket connected');
// //     ws.onclose = () => console.log('WebSocket disconnected');
// //     ws.onerror = (e) => console.error('WebSocket error:', (e as any).message);
// //     ws.onmessage = (e) => {
// //       try {
// //         const data = JSON.parse(e.data);
// //         if (data.processed_frame) {
// //           setProcessedFrame(`data:image/jpeg;base64,${data.processed_frame}`);
// //         }
// //       } catch (err) {
// //         console.error('Error parsing message:', err);
// //       }
// //     };

// //     setSocket(ws);

// //     return () => ws.close();
// //   }, []);

// //   // Send frames to backend periodically
// //   useEffect(() => {
// //     if (!socket || socket.readyState !== WebSocket.OPEN) return;

// //     const intervalId = setInterval(async () => {
// //       if (cameraRef.current) {
// //         try {
// //           const photo = await cameraRef.current.takePictureAsync({
// //             base64: true,
// //             quality: 0.3,
// //             skipProcessing: true,
// //           });
// //           if (photo.base64) {
// //             socket.send(JSON.stringify({ frame: photo.base64 }));
// //           }
// //         } catch (err) {
// //           console.error('Error capturing photo:', err);
// //         }
// //       }
// //     }, 500);

// //     return () => clearInterval(intervalId);
// //   }, [socket]);

// //   if (!hasPermission) {
// //     return <View />;
// //   }

// //   if (!hasPermission.granted) {
// //     return (
// //       <View style={styles.centered}>
// //         <Text>We need your permission to show the camera</Text>
// //         <TouchableOpacity onPress={requestPermission}>
// //           <Text style={styles.permissionText}>Grant Permission</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <CameraView
// //         ref={cameraRef}
// //         style={styles.camera}
// //         facing={facing}
// //       />
// //       <View style={styles.processedContainer}>
// //         {processedFrame ? (
// //           <Image source={{ uri: processedFrame }} style={styles.processedImage} />
// //         ) : (
// //           <Text style={styles.placeholderText}>Waiting for processed frame...</Text>
// //         )}
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1 },
// //   centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// //   permissionText: {
// //     color: '#3498db',
// //     marginTop: 10,
// //     fontSize: 18,
// //   },
// //   camera: { flex: 8 },
// //   processedContainer: {
// //     flex: 2,
// //     borderTopWidth: 2,
// //     borderColor: '#00FF00',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#000',
// //   },
// //   processedImage: {
// //     width: '100%',
// //     height: '100%',
// //     resizeMode: 'contain',
// //   },
// //   placeholderText: {
// //     color: '#fff',
// //     fontSize: 16,
// //   },
// // });

// // export default PushupTracker;


// import React, { useRef, useState, useEffect } from 'react';
// import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

// const PushupTracker: React.FC = () => {
//   const cameraRef = useRef<CameraView | null>(null);
//   const [hasPermission, requestPermission] = useCameraPermissions();
//   const [facing, setFacing] = useState<CameraType>('front');
//   const [processedFrame, setProcessedFrame] = useState<string | null>(null);
//   const [receivedData, setReceivedData] = useState<string>('');  // <-- NEW STATE
//   const [socket, setSocket] = useState<WebSocket | null>(null);

//   const toggleCameraFacing = () => {
//     setFacing((current) => (current === 'front' ? 'back' : 'front'));
//   };

//   // Setup WebSocket connection
//   useEffect(() => {
//     const ws = new WebSocket('ws://172.20.10.7:8000/ws/live/'); // replace with your IP

//     ws.onopen = () => console.log('WebSocket connected');
//     ws.onclose = () => console.log('WebSocket disconnected');
//     ws.onerror = (e) => console.error('WebSocket error:', (e as any).message);
//     ws.onmessage = (e) => {
//       try {
//         const data = JSON.parse(e.data);
//         console.log('Received data:', data);   // <-- CONSOLE LOG

//         // Store pretty JSON string in state
//         setReceivedData(JSON.stringify(data, null, 2));  

//         if (data.processed_frame) {
//           setProcessedFrame(`data:image/jpeg;base64,${data.processed_frame}`);
//         }
//       } catch (err) {
//         console.error('Error parsing message:', err);
//         setReceivedData(e.data);  // Store raw data if not JSON
//       }
//     };

//     setSocket(ws);
//     return () => ws.close();
//   }, []);

//   // Send frames to backend periodically
//   useEffect(() => {
//     if (!socket || socket.readyState !== WebSocket.OPEN) return;

//     const intervalId = setInterval(async () => {
//       if (cameraRef.current) {
//         try {
//           const photo = await cameraRef.current.takePictureAsync({
//             base64: true,
//             quality: 0.3,
//             skipProcessing: true,
//           });
//           if (photo.base64) {
//             socket.send(JSON.stringify({ frame: photo.base64 }));
//           }
//         } catch (err) {
//           console.error('Error capturing photo:', err);
//         }
//       }
//     }, 500);

//     return () => clearInterval(intervalId);
//   }, [socket]);

//   if (!hasPermission) {
//     return <View />;
//   }

//   if (!hasPermission.granted) {
//     return (
//       <View style={styles.centered}>
//         <Text>We need your permission to show the camera</Text>
//         <TouchableOpacity onPress={requestPermission}>
//           <Text style={styles.permissionText}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView
//         ref={cameraRef}
//         style={styles.camera}
//         facing={facing}
//       />
//       <View style={styles.processedContainer}>
//         {processedFrame ? (
//           <Image source={{ uri: processedFrame }} style={styles.processedImage} />
//         ) : (
//           <ScrollView style={styles.scrollContainer}>
//             <Text style={styles.placeholderText}>Waiting for processed frame…</Text>
//             <Text style={styles.receivedDataText}>{receivedData}</Text>
//           </ScrollView>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   permissionText: {
//     color: '#3498db',
//     marginTop: 10,
//     fontSize: 18,
//   },
//   camera: { flex: 8 },
//   processedContainer: {
//     flex: 2,
//     borderTopWidth: 2,
//     borderColor: '#00FF00',
//     backgroundColor: '#000',
//   },
//   processedImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   scrollContainer: {
//     flex: 1,
//     padding: 5,
//   },
//   placeholderText: {
//     color: '#fff',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   receivedDataText: {
//     color: '#0f0',
//     fontSize: 12,
//   },
// });

// export default PushupTracker;
// ===================================================================================================

// import React, { useRef, useState, useEffect } from 'react';
// import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

// const PushupTracker: React.FC = () => {
//   const cameraRef = useRef<CameraView | null>(null);
//   const [hasPermission, requestPermission] = useCameraPermissions();
//   const [facing, setFacing] = useState<CameraType>('front');
//   const [processedFrame, setProcessedFrame] = useState<string | null>(null);
//   const [receivedData, setReceivedData] = useState<string>('');
//   const [socket, setSocket] = useState<WebSocket | null>(null);

//   const toggleCameraFacing = () => {
//     setFacing((current) => (current === 'front' ? 'back' : 'front'));
//   };

//   useEffect(() => {
//     const ws = new WebSocket('ws://172.20.10.7:8000/ws/live/'); // replace with your IP

//     // let intervalId: NodeJS.Timeout;
//     let intervalId: number;

//     ws.onopen = () => {
//       console.log('WebSocket connected');
//       // Start sending frames every 500ms
//       intervalId = setInterval(async () => {
//         if (cameraRef.current) {
//           try {
//             const photo = await cameraRef.current.takePictureAsync({
//               base64: true,
//               quality: 0.3,
//               skipProcessing: true,
//             });
//             if (photo.base64) {
//               ws.send(JSON.stringify({ frame: photo.base64 }));
//               console.log('Sent frame to server');
//             }
//           } catch (err) {
//             console.error('Error capturing photo:', err);
//           }
//         }
//       }, 100);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket disconnected');
//       clearInterval(intervalId);
//     };

//     ws.onerror = (e) => console.error('WebSocket error:', (e as any).message);

//     ws.onmessage = (e) => {
//       try {
//         const data = JSON.parse(e.data);
//         // console.log('Received data:', data);

//         setReceivedData(JSON.stringify(data, null, 2));

//         if (data.processed_frame) {
//           setProcessedFrame(`data:image/jpeg;base64,${data.processed_frame}`);
//         }
//       } catch (err) {
//         console.error('Error parsing message:', err);
//         setReceivedData(e.data);
//       }
//     };

//     setSocket(ws);
//     return () => {
//       ws.close();
//       clearInterval(intervalId);
//     };
//   }, []);

//   if (!hasPermission) return <View />;

//   if (!hasPermission.granted) {
//     return (
//       <View style={styles.centered}>
//         <Text>We need your permission to show the camera</Text>
//         <TouchableOpacity onPress={requestPermission}>
//           <Text style={styles.permissionText}>Grant Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView
//         ref={cameraRef}
//         style={styles.camera}
//         facing={facing}
//       />
//       <View style={styles.processedContainer}>
//         {processedFrame ? (
//           <Image source={{ uri: processedFrame }} style={styles.processedImage} />
//         ) : (
//           <ScrollView style={styles.scrollContainer}>
//             <Text style={styles.placeholderText}>Waiting for processed frame…</Text>
//             <Text style={styles.receivedDataText}>{receivedData}</Text>
//           </ScrollView>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   permissionText: {
//     color: '#3498db',
//     marginTop: 10,
//     fontSize: 18,
//   },
//   camera: { flex: 8 },
//   processedContainer: {
//     flex: 2,
//     borderTopWidth: 2,
//     borderColor: '#00FF00',
//     backgroundColor: '#000',
//   },
//   processedImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   scrollContainer: {
//     flex: 1,
//     padding: 5,
//   },
//   placeholderText: {
//     color: '#fff',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   receivedDataText: {
//     color: '#0f0',
//     fontSize: 12,
//   },
// });

// export default PushupTracker;
//==============================================================================================

import React, { useRef, useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

const PushupTracker: React.FC = () => {
  const cameraRef = useRef<CameraView | null>(null);
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('front');
  const [processedFrame, setProcessedFrame] = useState<string | null>(null);
  const [receivedData, setReceivedData] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'front' ? 'back' : 'front'));
  };

  useEffect(() => {
    const ws = new WebSocket('ws://172.20.10.7:8000/ws/live/'); // replace with your IP

    let intervalId: number;

    ws.onopen = () => {
      console.log('WebSocket connected');
      intervalId = setInterval(async () => {
        if (cameraRef.current) {
          try {
            const photo = await cameraRef.current.takePictureAsync({
              base64: true,
              quality: 0.3,
              skipProcessing: true,
            });
            if (photo.base64) {
              ws.send(JSON.stringify({ frame: photo.base64 }));
              console.log('Sent frame to server');
            }
          } catch (err) {
            console.error('Error capturing photo:', err);
            // You can check if the camera was unmounted here and log the error.
            if (err.message && err.message.includes('Camera unmounted')) {
              console.error('Camera was unmounted while capturing');
            }
          }
        }
      }, 600);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      clearInterval(intervalId);
    };

    ws.onerror = (e) => console.error('WebSocket error:', (e as any).message);

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        // console.log('Received data:', data);

        setReceivedData(JSON.stringify(data, null, 2));

        if (data.processed_frame) {
          setProcessedFrame(`data:image/jpeg;base64,${data.processed_frame}`);
        }
      } catch (err) {
        console.error('Error parsing message:', err);
        setReceivedData(e.data);
      }
    };

    setSocket(ws);
    return () => {
      ws.close();
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, []);

  if (!hasPermission) return <View />;

  if (!hasPermission.granted) {
    return (
      <View style={styles.centered}>
        <Text>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.permissionText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      />
      <View style={styles.processedContainer}>
        {processedFrame ? (
          <Image source={{ uri: processedFrame }} style={styles.processedImage} />
        ) : (
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.placeholderText}>Waiting for processed frame…</Text>
            <Text style={styles.receivedDataText}>{receivedData}</Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  permissionText: {
    color: '#3498db',
    marginTop: 10,
    fontSize: 18,
  },
  camera: { flex: 8 },
  processedContainer: {
    flex: 2,
    borderTopWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: '#000',
  },
  processedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  scrollContainer: {
    flex: 1,
    padding: 5,
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  receivedDataText: {
    color: '#0f0',
    fontSize: 12,
  },
});

export default PushupTracker;
