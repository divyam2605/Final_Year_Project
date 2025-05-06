// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Pressable,
//   Animated,
//   LayoutAnimation,
//   UIManager,
//   Platform,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useExercises } from '../context/ExerciseContext';

// // Enable LayoutAnimation for Android
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// export default function YourExercise() {
//   const { exercises, updateExerciseSet } = useExercises();
//   const navigation = useNavigation();

//   // Persistent refs map — will not reset every re-render
//   const opacityRefs = useRef<{ [key: string]: Animated.Value[] }>({});

//   const getOpacity = (exerciseId: string, setIndex: number) => {
//     if (!opacityRefs.current[exerciseId]) {
//       opacityRefs.current[exerciseId] = [];
//     }
//     if (!opacityRefs.current[exerciseId][setIndex]) {
//       opacityRefs.current[exerciseId][setIndex] = new Animated.Value(1);
//     }
//     return opacityRefs.current[exerciseId][setIndex];
//   };

//   const handleToggleSet = (exerciseId: string, setIndex: number) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     updateExerciseSet(exerciseId, setIndex);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate('addexercise' as never)}
//       >
//         <Text style={styles.addButtonText}>+ Add Exercise</Text>
//       </TouchableOpacity>

//       {exercises.map((exercise) => (
//         <View key={exercise.id} style={styles.card}>
//           <Text style={styles.exerciseTitle}>
//             {exercise.name} ({exercise.type})
//           </Text>

//           {exercise.sets.map((set, index) => {
//             const opacity = getOpacity(exercise.id, index);

//             const onPressSet = () => {
//               if (!set.completed) {
//                 Animated.timing(opacity, {
//                   toValue: 0,
//                   duration: 400,
//                   useNativeDriver: true,
//                 }).start(() => {
//                   handleToggleSet(exercise.id, index);
//                   opacity.setValue(1);
//                 });
//               } else {
//                 handleToggleSet(exercise.id, index);
//               }
//             };

//             return (
//               <Animated.View key={index} style={{ opacity }}>
//                 <Pressable
//                   onPress={onPressSet}
//                   style={[styles.setItem, set.completed && styles.setCompleted]}
//                 >
//                   <Text style={[styles.setText, set.completed && styles.strikeThrough]}>
//                     {set.weight} lbs
//                   </Text>
//                   <Text style={[styles.setText, set.completed && styles.strikeThrough]}>
//                     {set.reps} reps
//                   </Text>
//                   <Text style={styles.icon}>{set.completed ? '✓' : '○'}</Text>
//                 </Pressable>
//               </Animated.View>
//             );
//           })}
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#F4F6F8',
//     flex: 1,
//   },
//   addButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 14,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   exerciseTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 12,
//   },
//   setItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#eee',
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 8,
//   },
//   setCompleted: {
//     backgroundColor: '#C8F7C5',
//   },
//   setText: {
//     color: '#333',
//     fontSize: 15,
//   },
//   strikeThrough: {
//     textDecorationLine: 'line-through',
//     color: '#555',
//   },
//   icon: {
//     fontSize: 18,
//     color: '#333',
//   },
// });

// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
// import { PieChart } from 'react-native-chart-kit';
// import { useNavigation } from '@react-navigation/native';
// import { CalorieContext } from '../context/calorieContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { MotiView } from 'moti';

// const goals = () => {
//   const navigation = useNavigation();
//   const { calories, setcaloriesSpent, meals, addMeal } = useContext(CalorieContext);
//   const [consumed, setConsumed] = useState<boolean[]>([]);

//   useEffect(() => {
//     const loadData = async () => {
//       const storedcalories = await AsyncStorage.getItem('totalcalories');
//       const storedMeals = await AsyncStorage.getItem('meals');
//       if (storedcalories) setcaloriesSpent(parseFloat(storedcalories));
//       if (storedMeals) {
//         const parsedMeals = JSON.parse(storedMeals);
//         addMeal(parsedMeals);
//         // setConsumed(parsedMeals.map(() => false));
//         setConsumed(parsedMeals.map(() => true));
//       }
//     };
//     loadData();
//   }, []);

//   const handleToggleMeal = async (index: number) => {
//     const newConsumed = [...consumed];
//     newConsumed[index] = !newConsumed[index];
//     setConsumed(newConsumed);

//     const meal = meals[index];
//     const calorieMatch = meal.match(/\((\d+(\.\d+)?) cal\)/);
//     const mealcalories = calorieMatch ? parseFloat(calorieMatch[1]) : 0;
//     const newCalorie = newConsumed[index] ? calories + mealcalories : calories - mealcalories;
//     setcaloriesSpent(newCalorie);
//     await AsyncStorage.setItem('totalcalories', newCalorie.toString());
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Daily Macro's</Text>
//       <PieChart
//         data={[
//           {
//             name: 'calories Consumed',
//             population: calories,
//             color: '#00b894',
//             legendFontColor: '#fff',
//             legendFontSize: 12,
//           },
//           {
//             name: 'Remaining',
//             population: Math.max(0, 2500 - calories),
//             color: '#2d3436',
//             legendFontColor: '#fff',
//             legendFontSize: 12,
//           },
//         ]}
//         width={300}
//         height={200}
//         chartConfig={{
//           backgroundColor: '#1e1e1e',
//           backgroundGradientFrom: '#1e1e1e',
//           backgroundGradientTo: '#1e1e1e',
//           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//         }}
//         accessor="population"
//         backgroundColor="transparent"
//         paddingLeft="15"
//         absolute
//       />
//       <Text style={styles.calText}>{calories.toFixed(1)} / 2500 cal</Text>
//       <Text style={styles.mealHeader}>Meals Today:</Text>
//       <FlatList
//         data={meals}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => (
//           <TouchableOpacity onPress={() => handleToggleMeal(index)}>
//             <MotiView
//               from={{ opacity: 0, translateY: 10 }}
//               animate={{ opacity: 1, translateY: 0 }}
//               transition={{ delay: index * 100 }}
//               style={styles.mealItem}
//             >
//               <Text
//                 style={[
//                   styles.mealText,
//                   consumed[index] && styles.strikeThrough,
//                 ]}
//               >
//                 • {item}
//               </Text>
//             </MotiView>
//           </TouchableOpacity>
//         )}
//       />
//       <Button title="Add Meal" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     padding: 20,
//   },
//   header: {
//     color: 'white',
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   calText: {
//     color: 'white',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   mealHeader: {
//     color: 'white',
//     fontSize: 18,
//     marginTop: 20,
//   },
//   mealItem: {
//     marginVertical: 5,
//   },
//   mealText: {
//     color: 'white',
//   },
//   strikeThrough: {
//     textDecorationLine: 'line-through',
//     opacity: 0.5,
//   },
// });

// export default goals;


import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { CalorieContext } from '../context/calorieContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView } from 'moti';
import { MaterialIcons } from '@expo/vector-icons';

interface Exercise {
  id: string;
  name: string;
  calories: number;
  timestamp?: number;
}

const ExerciseGoals = () => {
  const navigation = useNavigation();
  const { calories, setcaloriesSpent, exercises, addExercise } = useContext(CalorieContext); // Adjust context if needed
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [dailyGoal] = useState(3000); // Example goal for calories burned

  useEffect(() => {
    const loadData = async () => {
      try {
        const [storedCalories, storedExercises] = await Promise.all([
          AsyncStorage.getItem('exerciseCalories'),
          AsyncStorage.getItem('exercises'),
        ]);

        if (storedCalories) setcaloriesSpent(parseFloat(storedCalories));
        if (storedExercises) {
          const parsedExercises: Exercise[] = JSON.parse(storedExercises);
          addExercise(parsedExercises);
          setCompleted(parsedExercises.map(() => true));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.multiSet([
          ['exerciseCalories', calories.toString()],
          ['exercises', JSON.stringify(exercises)],
        ]);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    saveData();
  }, [calories, exercises]);

  const handleToggleExercise = (index: number) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);

    const exercise = exercises[index];
    const exerciseCalories = exercise.calories || 0;
    const newCalorie = newCompleted[index] ? calories + exerciseCalories : calories - exerciseCalories;
    setcaloriesSpent(Math.max(0, newCalorie));
  };

  const handleReset = () => {
    setcaloriesSpent(0);
    setCompleted(exercises.map(() => false));
  };

  const getProgressColor = () => {
    const progress = (calories / dailyGoal) * 100;
    if (progress < 50) return '#00b894';
    if (progress < 80) return '#fdcb6e';
    return '#e17055';
  };

  const renderExerciseItem = ({ item, index }: { item: Exercise; index: number }) => (
    <TouchableOpacity onPress={() => handleToggleExercise(index)}>
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 100 }}
        style={styles.exerciseItem}
      >
        <View style={styles.exerciseContent}>
          <View style={[styles.exerciseIndicator, { backgroundColor: completed[index] ? getProgressColor() : '#2d3436' }]} />
          <Text
            style={[styles.exerciseText, completed[index] && styles.completedText]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
        </View>
        <Text style={styles.exerciseCalories}>
          {item.calories} cal
        </Text>
      </MotiView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Calories Burned Tracker</Text>
        <Pressable onPress={handleReset} style={styles.resetButton}>
          <MaterialIcons name="replay" size={24} color="#00b894" />
        </Pressable>
      </View>

      <View style={styles.chartContainer}>
        <PieChart
          data={[
            {
              name: 'Burned',
              population: calories,
              color: getProgressColor(),
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
            },
            {
              name: 'Remaining',
              population: Math.max(0, dailyGoal - calories),
              color: '#2d3436',
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
            },
          ]}
          width={300}
          height={220}
          chartConfig={{
            backgroundColor: '#1e1e1e',
            backgroundGradientFrom: '#1e1e1e',
            backgroundGradientTo: '#1e1e1e',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        <View style={styles.calorieInfo}>
          <Text style={styles.calorieText}>
            <Text style={{ color: getProgressColor(), fontWeight: '800' }}>
              {calories.toFixed(0)}
            </Text>
            <Text style={{ color: '#fff' }}> / {dailyGoal} calories burned</Text>
          </Text>
          <Text style={styles.progressText}>
            {((calories / dailyGoal) * 100).toFixed(0)}% of daily goal
          </Text>
        </View>
      </View>

      <FlatList
        data={exercises}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  resetButton: {
    padding: 8,
    borderRadius: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  calorieInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  calorieText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  progressText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 20,
  },
  exerciseItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  exerciseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  exerciseIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
  },
  exerciseText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  exerciseCalories: {
    color: '#00b894',
    fontWeight: 'bold',
    fontSize: 15,
    minWidth: 60,
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#555',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  addExerciseButton: {
    backgroundColor: '#00b894',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    elevation: 2,
  },
  addExerciseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default ExerciseGoals;
