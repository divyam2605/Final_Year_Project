// import React, { useContext, useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import { CalorieContext } from '../context/calorieContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AddMealScreen = () => {
//   const [query, setQuery] = useState('');
//   const [caloriesFetched, setCaloriesFetched] = useState<number | null>(null);
//   const navigation = useNavigation();
//   const { calories, setCalories } = useContext(CalorieContext);

//   const fetchNutrition = async () => {
//     try {
//       const response = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
//         headers: { 'X-Api-Key': '2mP5+/8HDDquyGDXpTa6jw==4keibH0CetYgJ9mY' },
//       });

//       const items = response.data.items;
//       const totalCalories = items.reduce((sum: number, item: any) => sum + item.calories, 0);
//       setCaloriesFetched(totalCalories);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch nutrition info');
//     }
//   };

//   const addCalories = async () => {
//     if (caloriesFetched === null) return;
//     const newTotal = calories + caloriesFetched;
//     setCalories(newTotal);
//     await AsyncStorage.setItem('totalCalories', newTotal.toString());
//     setCaloriesFetched(null);
//     setQuery('');
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="e.g. 10oz onion and a tomato"
//         placeholderTextColor="#ccc"
//         style={styles.input}
//         onChangeText={setQuery}
//         value={query}
//       />
//       <Button title="Fetch Calories" onPress={fetchNutrition} />
//       {caloriesFetched !== null && (
//         <>
//           <Text style={styles.result}>Calories: {caloriesFetched.toFixed(1)}</Text>
//           <Button title="Add to Macros" onPress={addCalories} />
//         </>
//       )}
//       {/* <Button title="Back to Macros" onPress={() => navigation.goBack()} /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     color: 'white',
//     marginBottom: 20,
//   },
//   result: {
//     color: 'white',
//     fontSize: 18,
//     marginVertical: 10,
//   },
// });

// export default AddMealScreen;

import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { CalorieContext } from '../context/calorieContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddMealScreen = () => {
  const [query, setQuery] = useState('');
  const [caloriesFetched, setCaloriesFetched] = useState<number | null>(null);
  const navigation = useNavigation();
  const { calories, setCalories, addMeal } = useContext(CalorieContext);

  const fetchNutrition = async () => {
    try {
      const response = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
        headers: { 'X-Api-Key': '2mP5+/8HDDquyGDXpTa6jw==4keibH0CetYgJ9mY' },
      });

      const items = response.data.items;
      const totalCalories = items.reduce((sum: number, item: any) => sum + item.calories, 0);
      setCaloriesFetched(totalCalories);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch nutrition info');
    }
  };

  const addCalories = async () => {
    if (caloriesFetched === null) return;
    const newTotal = calories + caloriesFetched;
    setCalories(newTotal);
    await AsyncStorage.setItem('totalCalories', newTotal.toString());
    addMeal(`${query} (${caloriesFetched.toFixed(1)} cal)`);
    setCaloriesFetched(null);
    setQuery('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Meal</Text>

      <TextInput
        placeholder="e.g. 10oz onion and a tomato"
        placeholderTextColor="#888"
        style={styles.input}
        onChangeText={setQuery}
        value={query}
      />

      <TouchableOpacity style={styles.fetchButton} onPress={fetchNutrition}>
        <Text style={styles.buttonText}>Fetch Calories</Text>
      </TouchableOpacity>

      {caloriesFetched !== null && (
        <>
          <Text style={styles.result}>Calories: {caloriesFetched.toFixed(1)}</Text>
          <TouchableOpacity style={styles.addButton} onPress={addCalories}>
            <Text style={styles.buttonText}>Add to Macros</Text>
          </TouchableOpacity>
        </>
      )}

      {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Macros</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
    color: '#000',
  },
  fetchButton: {
    backgroundColor: '#1abc9c',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  backButtonText: {
    color: '#2980b9',
    fontSize: 15,
  },
  result: {
    color: '#333',
    fontSize: 18,
    marginTop: 10,
  },
});

export default AddMealScreen;
