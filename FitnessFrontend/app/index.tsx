import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

      <Link href={'/pushuptracker'}>Go to Push up tracker screen</Link>
      <Link href={'/DemoVideoStreamingScreen'}>Go to Demo Video Streaming Screen</Link>
      <Link href={'/DemoExerciseSelectionScreen'}>Go to Demo Exercise Selection Screen</Link>
    </View>
  );
}
