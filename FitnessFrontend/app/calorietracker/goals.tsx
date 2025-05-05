// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
// import { PieChart } from 'react-native-chart-kit';
// import { useNavigation } from '@react-navigation/native';
// import { CalorieContext } from '../context/calorieContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { MotiView } from 'moti';

// const goals = () => {
//   const navigation = useNavigation();
//   const { calories, setCalories, meals, addMeal } = useContext(CalorieContext);
//   const [consumed, setConsumed] = useState<boolean[]>([]);

//   useEffect(() => {
//     const loadData = async () => {
//       const storedCalories = await AsyncStorage.getItem('totalCalories');
//       const storedMeals = await AsyncStorage.getItem('meals');
//       if (storedCalories) setCalories(parseFloat(storedCalories));
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
//     const mealCalories = calorieMatch ? parseFloat(calorieMatch[1]) : 0;
//     const newCalorie = newConsumed[index] ? calories + mealCalories : calories - mealCalories;
//     setCalories(newCalorie);
//     await AsyncStorage.setItem('totalCalories', newCalorie.toString());
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Daily Macro's</Text>
//       <PieChart
//         data={[
//           {
//             name: 'Calories Consumed',
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
import { Feather, MaterialIcons } from '@expo/vector-icons';

interface Meal {
  id: string;
  name: string;
  calories: number;
  timestamp?: number;
}

const goals = () => {
  const navigation = useNavigation();
  const { calories, setCalories, meals, addMeal } = useContext(CalorieContext);
  const [consumed, setConsumed] = useState<boolean[]>([]);
  const [dailyGoal] = useState(2500);

  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const [storedCalories, storedMeals] = await Promise.all([
          AsyncStorage.getItem('totalCalories'),
          AsyncStorage.getItem('meals'),
        ]);

        if (storedCalories) setCalories(parseFloat(storedCalories));
        if (storedMeals) {
          const parsedMeals: Meal[] = JSON.parse(storedMeals);
          addMeal(parsedMeals);
          setConsumed(parsedMeals.map(() => true));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Save meals and calories whenever they change
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.multiSet([
          ['totalCalories', calories.toString()],
          ['meals', JSON.stringify(meals)],
        ]);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    saveData();
  }, [calories, meals]);

  const handleToggleMeal = (index: number) => {
    const newConsumed = [...consumed];
    newConsumed[index] = !newConsumed[index];
    setConsumed(newConsumed);

    const meal = meals[index];
    const mealCalories = meal.calories || 0;
    const newCalorie = newConsumed[index] ? calories + mealCalories : calories - mealCalories;
    setCalories(Math.max(0, newCalorie)); // Prevent negative calories
  };

  const handleReset = () => {
    setCalories(0);
    setConsumed(meals.map(() => false));
  };

  const getProgressColor = () => {
    const progress = (calories / dailyGoal) * 100;
    if (progress < 50) return '#00b894'; // Green
    if (progress < 80) return '#fdcb6e'; // Yellow
    return '#e17055'; // Red
  };

  const renderMealItem = ({ item, index }: { item: Meal; index: number }) => (
    <TouchableOpacity onPress={() => handleToggleMeal(index)}>
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 100 }}
        style={styles.mealItem}
      >
        <View style={styles.mealContent}>
          <View style={[
            styles.mealIndicator,
            { backgroundColor: consumed[index] ? getProgressColor() : '#2d3436' }
          ]} />
          <Text
            style={[
              styles.mealText,
              consumed[index] && styles.consumedText
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
        </View>
        <Text style={styles.mealCalories}>
          {item.calories} cal
        </Text>
      </MotiView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Nutrition Tracker</Text>
        <Pressable 
          onPress={handleReset} 
          style={styles.resetButton}
          android_ripple={{ color: 'rgba(255,255,255,0.1)', borderless: true }}
        >
          <MaterialIcons name="replay" size={24} color="#00b894" />
        </Pressable>
      </View>

      {/* Progress Chart Section */}
      <View style={styles.chartContainer}>
        <PieChart
          data={[
            {
              name: 'Consumed',
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
          hasLegend={true}
        />
        <View style={styles.calorieInfo}>
          <Text style={styles.calorieText}>
            <Text style={{ color: getProgressColor(), fontWeight: '800' }}>
              {calories.toFixed(0)}
            </Text>
            <Text style={{ color: '#fff' }}> / {dailyGoal} cal</Text>
          </Text>
          <Text style={styles.progressText}>
            {((calories / dailyGoal) * 100).toFixed(0)}% of daily goal
          </Text>
        </View>
      </View>

      {/* Meals List Section */}
      {/* <View style={styles.mealsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          <Pressable 
            // onPress={() => navigation.navigate('AddMealScreen')}
            style={styles.addButton}
            android_ripple={{ color: 'rgba(255,255,255,0.1)', borderless: true }}
          >
            <Feather name="plus" size={24} color="#00b894" />
          </Pressable>
        </View>

        {meals.length > 0 ? (
          <FlatList
            data={meals}
            keyExtractor={(item) => item.id}
            renderItem={renderMealItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Feather name="coffee" size={48} color="#555" />
            <Text style={styles.emptyText}>No meals recorded today</Text>
            <Pressable 
              // onPress={() => navigation.navigate('AddMealScreen')}
              style={styles.addMealButton}
              android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
            >
              <Text style={styles.addMealButtonText}>Add Your First Meal</Text>
            </Pressable>
          </View>
        )}
      </View> */}
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
    // color: 'white',
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
  mealsContainer: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    padding: 6,
    borderRadius: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  mealItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  mealContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  mealIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
  },
  mealText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  consumedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  mealCalories: {
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
  addMealButton: {
    backgroundColor: '#00b894',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    elevation: 2,
  },
  addMealButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default goals