// components/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ onMenuPress }: { onMenuPress?: () => void }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={28} color="#202123" />
      </TouchableOpacity>
      <Text style={styles.title}>Habitlens</Text>
      <View style={{ width: 28 }} /> {/* Placeholder for symmetry */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: Platform.select({
      ios: 'Helvetica Neue',
      android: 'sans-serif-condensed',
      default: 'System',
    }),
    color: '#202123',
    letterSpacing: 1,
  },  
});
