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
        name="pushuptracker"
        options={{
          title: 'Pushups',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="sports-gymnastics" size={24} color="black" />

          ),
        }}
      />
      
    </Tabs>
  );
}
