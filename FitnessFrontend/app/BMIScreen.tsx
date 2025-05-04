import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

export default function BMIScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (!weight || !height || !age || !gender) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    const roundedBmi = parseFloat(bmiValue.toFixed(2));
    setBmi(roundedBmi);
    setCategory(getBMICategory(roundedBmi));
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 25) return 'Normal';
    if (bmi >= 25 && bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'Underweight':
        return '#F59E0B'; // Amber
      case 'Normal':
        return '#10B981'; // Green
      case 'Overweight':
        return '#EF4444'; // Red
      case 'Obese':
        return '#B91C1C'; // Dark Red
      default:
        return '#6B7280'; // Gray
    }
  };

  const genderOptions = ['Male', 'Female', 'Other'];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust behavior for iOS
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>BMI Calculator</Text>

        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => {
            setWeight(text);
            // Keyboard.dismiss(); // Dismiss keyboard when typing
          }}
          placeholderTextColor="#6B7280" // Darken placeholder
        />

        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={(text) => {
            setHeight(text);
            // Keyboard.dismiss(); // Dismiss keyboard when typing
          }}
          placeholderTextColor="#6B7280" // Darken placeholder
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => {
            setAge(text);
            // Keyboard.dismiss(); // Dismiss keyboard when typing
          }}
          placeholderTextColor="#6B7280" // Darken placeholder
        />

        <Text style={styles.label}>Select Gender:</Text>
        <View style={styles.genderContainer}>
          {genderOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.genderButton, gender === option.toLowerCase() && styles.genderButtonSelected]}
              onPress={() => setGender(option.toLowerCase())}
            >
              <Text
                style={[styles.genderText, gender === option.toLowerCase() && styles.genderTextSelected]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>

        {bmi !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Your BMI is: <Text style={{ fontWeight: 'bold' }}>{bmi}</Text>
            </Text>
            <Text style={[styles.categoryText, { color: getCategoryColor() }]}>
              Category: {category}
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
    justifyContent: 'center',
    marginTop: 30
  },
  scrollViewContent: {
    paddingBottom: 20, // To make sure the last element is not hidden
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1F2937',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#374151',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  genderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#E5E7EB',
  },
  genderButtonSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  genderText: {
    fontSize: 16,
    color: '#374151',
  },
  genderTextSelected: {
    color: '#FFF',
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    color: '#111827',
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
