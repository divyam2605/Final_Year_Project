import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {
  return (
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
        name="Fooddetection"
        options={{
          title: 'Food Detection',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-variant" size={24} color="black" />

          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food-variant" size={24} color="black" />

          ),
        }}
      />
      
    </Tabs>
  );
}
