import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

type NutritionItem = {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
};

export default function IntakeInsights() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<NutritionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<{ calories: number; protein: number; carbs: number }>({
    calories: 0,
    protein: 0,
    carbs: 0,
  });

  const fetchNutrition = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);
    setSummary({ calories: 0, protein: 0, carbs: 0 });

    try {
      const res = await axios.get<{ items: NutritionItem[] }>(
        `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
        {
          headers: { 'X-Api-Key': '9F3mZxp/CtfDUFx02OKJxw==AaS5sGgH3Snv7mVJ' },
        }
      );
      const items = res.data.items || [];

      const total = items.reduce(
        (acc, item) => ({
          calories: acc.calories + item.calories,
          protein: acc.protein + item.protein_g,
          carbs: acc.carbs + item.carbohydrates_total_g,
        }),
        { calories: 0, protein: 0, carbs: 0 }
      );

      setSummary(total);
      setResults(items);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Nutrition Tracker</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="What you want to eat today, let's analyze it..."
          style={styles.input}
          value={query}
          placeholderTextColor="#6B7280"
          onChangeText={setQuery}
        />
        <Button title="Analyze" onPress={fetchNutrition} color="#10a37f" />
      </View>

      {loading && <ActivityIndicator size="large" color="#10a37f" style={{ marginTop: 20 }} />}

      {!loading && results.length > 0 && (
        <View style={styles.summary}>
          <Text style={styles.summaryText}>🔥 Calories: {summary.calories.toFixed(1)}</Text>
          <Text style={styles.summaryText}>💪 Protein: {summary.protein.toFixed(1)}g</Text>
          <Text style={styles.summaryText}>🥔 Carbs: {summary.carbs.toFixed(1)}g</Text>
        </View>
      )}

      <ScrollView style={{ marginTop: 10 }}>
        {results.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text>Calories: {item.calories} kcal</Text>
            <Text>Protein: {item.protein_g} g</Text>
            <Text>Carbs: {item.carbohydrates_total_g} g</Text>
            <Text>Fat: {item.fat_total_g} g (Saturated: {item.fat_saturated_g} g)</Text>
            <Text>Fiber: {item.fiber_g} g | Sugar: {item.sugar_g} g</Text>
            <Text>Sodium: {item.sodium_mg} mg | Cholesterol: {item.cholesterol_mg} mg</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#202123',
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  summary: {
    backgroundColor: '#e8f5f1',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0d4d3b',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#aaa',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
});
