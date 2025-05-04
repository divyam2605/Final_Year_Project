// import { Link } from "expo-router";
// import { Text, View, Button } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit app/index.tsx to edit this screen.</Text>

//       <Link href='/pushuptracker'>Go to Push up tracker screen</Link>
//       <Link href='/DemoVideoStreamingScreen'>Go to Demo Video Streaming Screen</Link>
//       <Link href='/DemoExerciseSelectionScreen'>Go to Demo Exercise Selection Screen</Link>
//       <Link href='/BMIScreen'>Go to BMI Screen</Link>
//       <Link href='/Fooddetection'>GO to Food detect</Link>
//       <Link href='/calorietracker' asChild>
//         <Button title="Go to Calorie Tracker" />
//       </Link>
//     </View>
//   );
// }

import { Link } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>🏋️‍♂️ Habitlens - Shape you Future</Text>

      <View style={styles.tileContainer}>
        <Link href="/exercise" asChild>
          <TouchableOpacity style={styles.tile}>
            <FontAwesome5 name="dumbbell" size={36} color="#10a37f" />
            <Text style={styles.label}>Exercise</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/calorietracker" asChild>
          <TouchableOpacity style={styles.tile}>
            <MaterialCommunityIcons name="fire" size={36} color="#ff5c5c" />
            <Text style={styles.label}>Calories</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/BMIScreen" asChild>
          <TouchableOpacity style={styles.tile}>
            <Ionicons name="body-outline" size={36} color="#4b7bec" />
            <Text style={styles.label}>BMI</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/fooddetection" asChild>
          <TouchableOpacity style={styles.tile}>
            <MaterialCommunityIcons name="food-apple-outline" size={36} color="#2d98da" />
            <Text style={styles.label}>Nutrition</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#202123",
  },
  tileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
  },
  tile: {
    backgroundColor: "#fff",
    width: "47%",
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#202123",
  },
});
