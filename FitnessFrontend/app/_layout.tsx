import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"/>
      <Stack.Screen name="pushuptracker"/>
      <Stack.Screen name="DemoExerciseSelectionScreen"/>
      <Stack.Screen name="DemoVideoStreamingScreen"/>
      <Stack.Screen name="BMIScreen"/>
      <Stack.Screen name="Fooddetection"/>
    </Stack>
  );
}
