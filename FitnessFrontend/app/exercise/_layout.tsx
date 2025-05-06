import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { ExerciseProvider } from '../context/ExerciseContext';

export default function TabLayout() {
  return (
    <ExerciseProvider>
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
          name="pushuptracker"
          options={{
            title: 'Exercise Tracker Page',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="sports-gymnastics" size={24} color="black" />

            ),
          }}
        />

        <Tabs.Screen
          name="yourexercise"
          options={{
            title: 'Your Exercises & Goals',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bullseye-arrow" size={size} color={color} />

            ),
          }}
        />
        <Tabs.Screen
          name="addexercise"
          options={{
            title: 'Add Exercise',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />

            ),
          }}
        />

      </Tabs>
    </ExerciseProvider>
  );
}
