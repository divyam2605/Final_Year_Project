import { StyleSheet, View, TouchableOpacity, Text} from "react-native"

import { useState, useEffect } from "react";

import axios from "axios";
import SmallTitle from "../components/ExerciseDetail/SmallTitle";
import ExerciseList from "../components/ExercisesList/ExerciseList";
import FoodItem from "../components/FoodItem";

function FoodnNutrition() {

  const [data, setData] = useState([
      {
          "name": "poha",
          "calories": "Only available for premium subscribers.",
          "serving_size_g": "Only available for premium subscribers.",
          "fat_total_g": 0.2,
          "fat_saturated_g": 0.0,
          "protein_g": "Only available for premium subscribers.",
          "sodium_mg": 3,
          "potassium_mg": 29,
          "cholesterol_mg": 0,
          "carbohydrates_total_g": 24.9,
          "fiber_g": 0.0,
          "sugar_g": 0.0
      },
      {
          "name": "upma",
          "calories": "Only available for premium subscribers.",
          "serving_size_g": "Only available for premium subscribers.",
          "fat_total_g": 2.6,
          "fat_saturated_g": 0.2,
          "protein_g": "Only available for premium subscribers.",
          "sodium_mg": 113,
          "potassium_mg": 51,
          "cholesterol_mg": 0,
          "carbohydrates_total_g": 13.6,
          "fiber_g": 1.3,
          "sugar_g": 1.7
      },
      {
          "name": "idli",
          "calories": "Only available for premium subscribers.",
          "serving_size_g": "Only available for premium subscribers.",
          "fat_total_g": 1.1,
          "fat_saturated_g": 0.2,
          "protein_g": "Only available for premium subscribers.",
          "sodium_mg": 195,
          "potassium_mg": 70,
          "cholesterol_mg": 0,
          "carbohydrates_total_g": 29.6,
          "fiber_g": 1.4,
          "sugar_g": 0.3
      },
      {
          "name": "dosa",
          "calories": "Only available for premium subscribers.",
          "serving_size_g": "Only available for premium subscribers.",
          "fat_total_g": 3.8,
          "fat_saturated_g": 0.6,
          "protein_g": "Only available for premium subscribers.",
          "sodium_mg": 97,
          "potassium_mg": 52,
          "cholesterol_mg": 0,
          "carbohydrates_total_g": 30.0,
          "fiber_g": 0.9,
          "sugar_g": 0.2
      },
      {
          "name": "salad",
          "calories": "Only available for premium subscribers.",
          "serving_size_g": "Only available for premium subscribers.",
          "fat_total_g": 0.2,
          "fat_saturated_g": 0.0,
          "protein_g": "Only available for premium subscribers.",
          "sodium_mg": 36,
          "potassium_mg": 32,
          "cholesterol_mg": 0,
          "carbohydrates_total_g": 4.9,
          "fiber_g": 1.9,
          "sugar_g": 2.2
      }
  ]);

  const apiKey = '33+bRygk15IxRpeKhHDGfw==3k5iUYx0joMZMDV7';
  const nutritious_foods = ['poha', 'upma', 'idli', 'dosa', 'salad']


  return (
    <View>
      {data.map((item, index) => (
        <FoodItem key={index} title={item.name} imageUrl={item.name} style={styles.bodyPartItem}/>
      ))}
    </View>
  )
}

export default FoodnNutrition;

const styles = StyleSheet.create({
  listContainer: {
      flex: 1
  },
  filtersContainer: {
      flexDirection: 'row',
      justifyContent: 'center'
  },
  itemContainer: {
      flex: 1,
      backgroundColor: 'red'
  },
  buttonActive: {
      backgroundColor: '#646060',
  },
  button: {
      flex: 1,
      backgroundColor: '#252424',
      borderRadius: 8,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 8,
      marginVertical: 8,
  },
  bodyPartItem: {
      flex: 1,
      marginBottom: 4,
      height: 200,
      elevation: 18,
  },
  bodyPartLastItem: {
      flex: 1,
      height: 200,
      elevation: 18,
  }
})
