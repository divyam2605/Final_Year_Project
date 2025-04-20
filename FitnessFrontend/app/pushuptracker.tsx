import React, { useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";

const pushuptracker = () => {
    const [pushups, setPushups] = useState(0);
    const [calories, setCalories] = useState(0);

    const fetchStats = async () => {
        try {
            const response = await axios.get("http://192.168.29.22:5000/pushup_count");
            setPushups(response.data.pushups);
            setCalories(response.data.calories);
        } catch (error) {
            console.error("Failed to fetch pushup stats", error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>Pushup Tracker</Text>

                <View style={styles.videoContainer}>
                    <WebView
                        source={{ uri: "http://192.168.29.22:5000/video_feed" }}
                        style={styles.webView}
                    />
                </View>

                <View style={styles.statsContainer}>
                    <Button title="Get Pushup Count" onPress={fetchStats} color="#007BFF" />
                    <Text style={styles.statText}>Pushups: <Text style={styles.bold}>{pushups}</Text></Text>
                    <Text style={styles.statText}>Calories Burned: <Text style={styles.bold}>{calories}</Text></Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default pushuptracker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    content: {
        padding: 16,
        alignItems: "center",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333",
    },
    videoContainer: {
        width: "100%",
        height: 300,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 24,
        borderColor: "#DDD",
        borderWidth: 1,
        backgroundColor: "#000",
    },
    webView: {
        flex: 1,
    },
    statsContainer: {
        width: "100%",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#FFF",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    statText: {
        fontSize: 18,
        marginTop: 12,
        color: "#555",
    },
    bold: {
        fontWeight: "600",
        color: "#000",
    },
})