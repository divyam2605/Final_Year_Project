import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { MotiView } from 'moti';

interface FoodItem {
  id: string;
  name: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const HealthyFoods = () => {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data (replace with real API later)
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        // Simulated delay
        await new Promise(res => setTimeout(res, 1000));
        const data: FoodItem[] = [
          {
            id: '1',
            name: 'Grilled Salmon',
            image: 'https://images.unsplash.com/photo-1613145993484-2c0b4c2f5f9e?auto=format&fit=crop&w=800&q=80',
            calories: 220,
            protein: 25,
            carbs: 0,
            fat: 13,
          },
          {
            id: '2',
            name: 'Avocado Toast',
            image: 'https://images.unsplash.com/photo-1585238342028-4e6a1a4c6e1f?auto=format&fit=crop&w=800&q=80',
            calories: 280,
            protein: 6,
            carbs: 30,
            fat: 16,
          },
          {
            id: '3',
            name: 'Quinoa Salad',
            image: 'https://images.unsplash.com/photo-1604908177522-3b1e3f3f3f3f?auto=format&fit=crop&w=800&q=80',
            calories: 190,
            protein: 8,
            carbs: 22,
            fat: 7,
          },
          {
            id: '4',
            name: 'Greek Yogurt with Berries',
            image: 'https://images.unsplash.com/photo-1590080878060-9f8c3b3b3b3b?auto=format&fit=crop&w=800&q=80',
            calories: 150,
            protein: 12,
            carbs: 15,
            fat: 4,
          },
          {
            id: '5',
            name: 'Chicken Breast and Steamed Broccoli',
            image: 'https://images.unsplash.com/photo-1604908554040-3b1e3f3f3f3f?auto=format&fit=crop&w=800&q=80',
            calories: 300,
            protein: 35,
            carbs: 8,
            fat: 12,
          },
          {
            id: '6',
            name: 'Oatmeal with Banana',
            image: 'https://images.unsplash.com/photo-1585238342028-4e6a1a4c6e1f?auto=format&fit=crop&w=800&q=80',
            calories: 250,
            protein: 6,
            carbs: 45,
            fat: 5,
          },
          {
            id: '7',
            name: 'Hummus with Veggie Sticks',
            image: 'https://images.unsplash.com/photo-1604908177522-3b1e3f3f3f3f?auto=format&fit=crop&w=800&q=80',
            calories: 180,
            protein: 5,
            carbs: 20,
            fat: 9,
          },
          {
            id: '8',
            name: 'Lentil Soup',
            image: 'https://images.unsplash.com/photo-1590080878060-9f8c3b3b3b3b?auto=format&fit=crop&w=800&q=80',
            calories: 200,
            protein: 12,
            carbs: 30,
            fat: 3,
          },
          {
            id: '9',
            name: 'Mixed Fruit Bowl',
            image: 'https://images.unsplash.com/photo-1604908554040-3b1e3f3f3f3f?auto=format&fit=crop&w=800&q=80',
            calories: 120,
            protein: 2,
            carbs: 28,
            fat: 1,
          },
          {
            id: '10',
            name: 'Tofu Stir-Fry',
            image: 'https://images.unsplash.com/photo-1613145993484-2c0b4c2f5f9e?auto=format&fit=crop&w=800&q=80',
            calories: 260,
            protein: 18,
            carbs: 20,
            fat: 12,
          },
        ];
        
        setFoods(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching foods:', error);
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const renderFoodItem = ({ item, index }: { item: FoodItem; index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100 }}
      style={styles.card}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.nutritionText}>Calories: {item.calories} kcal</Text>
        <Text style={styles.nutritionText}>Protein: {item.protein} g</Text>
        <Text style={styles.nutritionText}>Carbs: {item.carbs} g</Text>
        <Text style={styles.nutritionText}>Fat: {item.fat} g</Text>
      </View>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00b894" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={foods}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2d3436',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  details: {
    padding: 16,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  nutritionText: {
    fontSize: 14,
    color: '#b2bec3',
    marginBottom: 2,
  },
});


export default HealthyFoods;
