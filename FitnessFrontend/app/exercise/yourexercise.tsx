// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   ScrollView,
//   Pressable,
//   Animated,
//   LayoutAnimation,
//   UIManager,
//   Platform
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useExercises } from '../context/ExerciseContext';

// // Enable LayoutAnimation for Android
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// export default function YourExercise() {
//   const { exercises, updateExerciseSet } = useExercises(); // Assuming updateExerciseSet is implemented
//   const navigation = useNavigation();

//   const handleToggleSet = (exerciseId: string, setIndex: number) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     updateExerciseSet(exerciseId, setIndex); // toggle completion
//   };

//   return (
//     <ScrollView style={{ padding: 16, backgroundColor: '#111', flex: 1 }}>
//       <Button title="+ Add Exercise" onPress={() => navigation.navigate('addexercise' as never)} />
//       {exercises.map((exercise) => (
//         <View
//           key={exercise.id}
//           style={{ marginTop: 20, padding: 16, borderRadius: 12, backgroundColor: '#222' }}
//         >
//           <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
//             {exercise.name} ({exercise.type})
//           </Text>
//           {exercise.sets.map((set, index) => {
//             const opacity = useRef(new Animated.Value(1)).current;

//             const onPressSet = () => {
//               if (!set.completed) {
//                 Animated.timing(opacity, {
//                   toValue: 0,
//                   duration: 400,
//                   useNativeDriver: true,
//                 }).start(() => {
//                   handleToggleSet(exercise.id, index);
//                   opacity.setValue(1); // reset for future sets
//                 });
//               } else {
//                 handleToggleSet(exercise.id, index);
//               }
//             };

//             return (
//               <Animated.View key={index} style={{ opacity }}>
//                 <Pressable
//                   onPress={onPressSet}
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     backgroundColor: set.completed ? '#4c8' : '#333',
//                     padding: 10,
//                     marginTop: 8,
//                     borderRadius: 8,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: 'white',
//                       textDecorationLine: set.completed ? 'line-through' : 'none',
//                     }}
//                   >
//                     {set.weight} lbs
//                   </Text>
//                   <Text
//                     style={{
//                       color: 'white',
//                       textDecorationLine: set.completed ? 'line-through' : 'none',
//                     }}
//                   >
//                     {set.reps} reps
//                   </Text>
//                   <Text style={{ color: 'white', fontSize: 18 }}>
//                     {set.completed ? '✓' : '○'}
//                   </Text>
//                 </Pressable>
//               </Animated.View>
//             );
//           })}
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Animated,
  LayoutAnimation,
  UIManager,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useExercises } from '../context/ExerciseContext';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function YourExercise() {
  const { exercises, updateExerciseSet } = useExercises();
  const navigation = useNavigation();

  const handleToggleSet = (exerciseId: string, setIndex: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    updateExerciseSet(exerciseId, setIndex);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('addexercise' as never)}>
        <Text style={styles.addButtonText}>+ Add Exercise</Text>
      </TouchableOpacity>

      {exercises.map((exercise) => (
        <View key={exercise.id} style={styles.card}>
          <Text style={styles.exerciseTitle}>
            {exercise.name} ({exercise.type})
          </Text>

          {exercise.sets.map((set, index) => {
            const opacity = useRef(new Animated.Value(1)).current;

            const onPressSet = () => {
              if (!set.completed) {
                Animated.timing(opacity, {
                  toValue: 0,
                  duration: 400,
                  useNativeDriver: true,
                }).start(() => {
                  handleToggleSet(exercise.id, index);
                  opacity.setValue(1);
                });
              } else {
                handleToggleSet(exercise.id, index);
              }
            };

            return (
              <Animated.View key={index} style={{ opacity }}>
                <Pressable onPress={onPressSet} style={[styles.setItem, set.completed && styles.setCompleted]}>
                  <Text style={[styles.setText, set.completed && styles.strikeThrough]}>
                    {set.weight} lbs
                  </Text>
                  <Text style={[styles.setText, set.completed && styles.strikeThrough]}>
                    {set.reps} reps
                  </Text>
                  <Text style={styles.icon}>{set.completed ? '✓' : '○'}</Text>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F4F6F8',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  setItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  setCompleted: {
    backgroundColor: '#C8F7C5',
  },
  setText: {
    color: '#333',
    fontSize: 15,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: '#555',
  },
  icon: {
    fontSize: 18,
    color: '#333',
  },
});
