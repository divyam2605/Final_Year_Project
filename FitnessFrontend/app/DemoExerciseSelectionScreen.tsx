import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExerciseSelectionScreen = ({ navigation }: any) => {
  const exercises = ['pushup', 'plank', 'squats'];

  const handleExercisePress = (exercise: string) => {
    navigation.navigate('DemoVideoStreamingScreen', { exercise });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select an Exercise</Text>
      {exercises.map((exercise) => (
        <TouchableOpacity
          key={exercise}
          style={styles.button}
          onPress={() => handleExercisePress(exercise)}
        >
          <Text style={styles.buttonText}>{exercise.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ExerciseSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4e6eff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
