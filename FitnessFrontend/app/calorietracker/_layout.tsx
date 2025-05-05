import { useState } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons,MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { CalorieContext } from '../context/calorieContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
  const [calories, setCalories] = useState(0);
  const [meals, setMeals] = useState<string[]>([]);

  const addMeal = (meal: string) => {
    const updatedMeals = [...meals, meal];
    setMeals(updatedMeals);
    AsyncStorage.setItem('meals', JSON.stringify(updatedMeals));
  };
  return (
    <CalorieContext.Provider value={{ calories, setCalories, meals, addMeal }}>
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#10a37f',
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 80,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="intakeinsights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddMealScreen"
        options={{
          title: 'Add Meal',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: 'Macros',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="query-stats" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="charts"
        options={{
          title: 'Charts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-line" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
    </CalorieContext.Provider>
  );
}
