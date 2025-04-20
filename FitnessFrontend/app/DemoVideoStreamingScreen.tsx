import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

const BASE_URL = 'http://192.168.103.226:8000'; // Replace with your backend IP

const DemoVideoStreamingScreen = () => {
  const demoStreamUrl = `${BASE_URL}/demo/demo_stream/`;
  const liveStreamUrl = `${BASE_URL}/demo/live_stream/`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Demo Video</Text>
      <WebView
        source={{ uri: demoStreamUrl }}
        style={styles.video}
        javaScriptEnabled
        domStorageEnabled
      />

      <Text style={styles.header}>Live Video</Text>
      <WebView
        source={{ uri: liveStreamUrl }}
        style={styles.video}
        javaScriptEnabled
        domStorageEnabled
      />
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  video: {
    width: width * 0.9,
    height: 240,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#000',
  },
});

export default DemoVideoStreamingScreen;
