import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export default function Footer() {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => router.push('/index')}>
        <Ionicons name="home" size={24} color="#10a37f" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/dummy1')}>
        <Ionicons name="body" size={24} color="#10a37f" />
        <Text style={styles.label}>Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/dummy1')}>
        <Ionicons name="pizza" size={24} color="#10a37f" />
        <Text style={styles.label}>Nutrition</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/settings')}>
        <Ionicons name="settings" size={24} color="#10a37f" />
        <Text style={styles.label}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    elevation: 4,
  },
  label: {
    fontSize: 12,
    color: '#202123',
    textAlign: 'center',
    marginTop: 4,
  },
});
