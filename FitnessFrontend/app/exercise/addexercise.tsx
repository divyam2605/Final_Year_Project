// // import React, { useState } from 'react';
// // import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
// // import { useExercises } from '../context/ExerciseContext';
// // import { useNavigation } from '@react-navigation/native';

// // export default function AddExerciseScreen() {
// //   const [name, setName] = useState('');
// //   const [type, setType] = useState('');
// //   const [sets, setSets] = useState([{ weight: 0, reps: 0, completed: false }]);
// //   const { addExercise } = useExercises();
// //   const navigation = useNavigation();

// //   const generateId = () => crypto.randomUUID();

// //   const updateSet = (index: number, key: 'weight' | 'reps', value: number) => {
// //     const updated = [...sets];
// //     updated[index][key] = value;
// //     setSets(updated);
// //   };

// //   const handleAddExercise = () => {
// //     if (!name.trim() || !type.trim()) {
// //       Alert.alert('Missing Info', 'Please enter both name and type.');
// //       return;
// //     }

// //     addExercise({ id: generateId(), name, type, sets });
// //     navigation.goBack();
// //   };

// //   return (
// //     <View style={{ padding: 16, backgroundColor: '#111', flex: 1 }}>
// //       <TextInput
// //         placeholder="Exercise Name"
// //         placeholderTextColor="#888"
// //         style={{ color: 'white', borderBottomWidth: 1, borderColor: '#555', marginBottom: 10 }}
// //         onChangeText={setName}
// //       />
// //       <TextInput
// //         placeholder="Type (e.g., Barbell)"
// //         placeholderTextColor="#888"
// //         style={{ color: 'white', borderBottomWidth: 1, borderColor: '#555', marginBottom: 10 }}
// //         onChangeText={setType}
// //       />
// //       <FlatList
// //         data={sets}
// //         keyExtractor={(_, i) => i.toString()}
// //         renderItem={({ item, index }) => (
// //           <View style={{ flexDirection: 'row', marginBottom: 8 }}>
// //             <TextInput
// //               keyboardType='numeric'
// //               placeholder='lbs'
// //               placeholderTextColor='#888'
// //               style={{ color: 'white', borderBottomWidth: 1, borderColor: '#555', flex: 1, marginRight: 8 }}
// //               onChangeText={text => updateSet(index, 'weight', parseInt(text) || 0)}
// //             />
// //             <TextInput
// //               keyboardType='numeric'
// //               placeholder='reps'
// //               placeholderTextColor='#888'
// //               style={{ color: 'white', borderBottomWidth: 1, borderColor: '#555', flex: 1 }}
// //               onChangeText={text => updateSet(index, 'reps', parseInt(text) || 0)}
// //             />
// //           </View>
// //         )}
// //       />
// //       <Button title="Add Set" onPress={() => setSets([...sets, { weight: 0, reps: 0, completed: false }])} />
// //       <View style={{ marginTop: 16 }}>
// //         <Button title="Save Exercise" onPress={handleAddExercise} />
// //       </View>
// //     </View>
// //   );
// // }

// import React, { useState } from 'react';
// import { View, TextInput, Button, FlatList, Alert } from 'react-native';
// import { useExercises } from '../context/ExerciseContext';
// import { useNavigation } from '@react-navigation/native';
// import uuid from 'react-native-uuid';

// export default function AddExerciseScreen() {
//   const [name, setName] = useState('');
//   const [type, setType] = useState('');
//   const [sets, setSets] = useState([{ weight: 0, reps: 0, completed: false }]);
//   const { addExercise } = useExercises();
//   const navigation = useNavigation();

//   const generateId = () => uuid.v4().toString();

//   const updateSet = (index: number, key: 'weight' | 'reps', value: number) => {
//     const updated = [...sets];
//     updated[index][key] = value;
//     setSets(updated);
//   };

//   const handleAddExercise = () => {
//     if (!name.trim() || !type.trim()) {
//       Alert.alert('Missing Info', 'Please enter both name and type.');
//       return;
//     }

//     addExercise({ id: generateId(), name, type, sets });
//     navigation.goBack();
//   };

//   return (
//     <View style={{ padding: 16, backgroundColor: '#111', flex: 1 }}>
//       <TextInput
//         placeholder="Exercise Name"
//         placeholderTextColor="#888"
//         style={{ color: 'white', borderBottomWidth: 1, borderColor: '#555', marginBottom: 10 }}
//         onChangeText={setName}
//       />
//       <TextInput
//         placeholder="Type (e.g., Barbell)"
//         placeholderTextColor="#888"
//         style={{ color: 'white', borderBottomWidth: 1, borderColor: '#555', marginBottom: 10 }}
//         onChangeText={setType}
//       />
//       <FlatList
//         data={sets}
//         keyExtractor={(_, i) => i.toString()}
//         renderItem={({ item, index }) => (
//           <View style={{ flexDirection: 'row', marginBottom: 8 }}>
//             <TextInput
//               keyboardType='numeric'
//               placeholder='lbs'
//               placeholderTextColor='#888'
//               style={{ color: 'white', borderBottomWidth: 1, borderColor: '#555', flex: 1, marginRight: 8 }}
//               onChangeText={text => updateSet(index, 'weight', parseInt(text) || 0)}
//             />
//             <TextInput
//               keyboardType='numeric'
//               placeholder='reps'
//               placeholderTextColor='#888'
//               style={{ color: 'white', borderBottomWidth: 1, borderColor: '#555', flex: 1 }}
//               onChangeText={text => updateSet(index, 'reps', parseInt(text) || 0)}
//             />
//           </View>
//         )}
//       />
//       <Button title="Add Set" onPress={() => setSets([...sets, { weight: 0, reps: 0, completed: false }])} />
//       <View style={{ marginTop: 16 }}>
//         <Button title="Save Exercise" onPress={handleAddExercise} />
//       </View>
//     </View>
//   );
// }

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useExercises } from '../context/ExerciseContext';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

export default function AddExerciseScreen() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [sets, setSets] = useState([{ weight: 0, reps: 0, completed: false }]);
  const { addExercise } = useExercises();
  const navigation = useNavigation();

  const generateId = () => uuid.v4().toString();

  const updateSet = (index: number, key: 'weight' | 'reps', value: number) => {
    const updated = [...sets];
    updated[index][key] = value;
    setSets(updated);
  };

  const handleAddExercise = () => {
    if (!name.trim() || !type.trim()) {
      Alert.alert('Missing Info', 'Please enter both name and type.');
      return;
    }

    addExercise({ id: generateId(), name, type, sets });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Add New Exercise</Text>

      <TextInput
        placeholder="Exercise Name"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Type (e.g., Barbell)"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setType}
      />

      <Text style={styles.subtitle}>Sets</Text>
      <FlatList
        data={sets}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.setRow}>
            <TextInput
              keyboardType="numeric"
              placeholder="Weight (lbs)"
              placeholderTextColor="#aaa"
              style={styles.setInput}
              onChangeText={text => updateSet(index, 'weight', parseInt(text) || 0)}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="Reps"
              placeholderTextColor="#aaa"
              style={styles.setInput}
              onChangeText={text => updateSet(index, 'reps', parseInt(text) || 0)}
            />
          </View>
        )}
      />

      <TouchableOpacity style={styles.addSetButton} onPress={() => setSets([...sets, { weight: 0, reps: 0, completed: false }])}>
        <Text style={styles.addSetText}>+ Add Set</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleAddExercise}>
        <Text style={styles.saveButtonText}>Save Exercise</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F6F8',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  setRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  setInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addSetButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addSetText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
