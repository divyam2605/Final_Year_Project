import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HABITS = [
  { id: '1', name: 'Completed Workout' },
  { id: '2', name: 'Healthy Nutrition' },
  { id: '3', name: '10000 Steps' },
];

const DAYS = Array.from({ length: 21 }, (_, i) => i + 1);
const generateDummyData = () => HABITS.map(() => DAYS.map(() => Math.random() < 0.6));

const getLongestStreak = (bools: boolean[]) => {
  let max = 0, current = 0;
  for (let done of bools) {
    current = done ? current + 1 : 0;
    if (current > max) max = current;
  }
  return max;
};

const HabitTracker = () => {
  const [habitData, setHabitData] = useState<boolean[][]>(generateDummyData());

  const toggleDay = (habitIndex: number, dayIndex: number) => {
    const updated = [...habitData];
    updated[habitIndex][dayIndex] = !updated[habitIndex][dayIndex];
    setHabitData(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Your Streak!</Text>
      {HABITS.map((habit, habitIndex) => {
        const completedDays = habitData[habitIndex].filter(Boolean).length;
        const longestStreak = getLongestStreak(habitData[habitIndex]);

        return (
          <View key={habit.id} style={styles.habitBlock}>
            <View style={styles.habitHeader}>
              <Text style={styles.habitTitle}>{habit.name}</Text>
              <Text style={styles.habitProgress}>
                {completedDays}/21 | 🔥 Streak: {longestStreak}
              </Text>
            </View>

            {/* Display 3 rows of 7 days */}
            <View style={styles.gridContainer}>
              {Array.from({ length: 3 }).map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {Array.from({ length: 7 }).map((_, colIndex) => {
                    const dayIndex = rowIndex * 7 + colIndex;
                    const done = habitData[habitIndex][dayIndex];
                    return (
                      <TouchableOpacity
                        key={colIndex}
                        style={[styles.dayDot, done ? styles.done : styles.notDone]}
                        onPress={() => toggleDay(habitIndex, dayIndex)}
                      >
                        <Text style={styles.dotText}>{dayIndex + 1}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9fafb',
      padding: 16,
      paddingTop: 30,
      marginBottom: 30,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 16,
    },
    habitBlock: {
      marginBottom: 20,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#dcdde1',
    },
    habitHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    habitTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: '#2d3436',
    },
    habitProgress: {
      fontSize: 13,
      color: '#636e72',
    },
    gridContainer: {
      marginTop: 4,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    dayDot: {
      width: 30,
      height: 30,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    done: {
      backgroundColor: '#00b894',
    },
    notDone: {
      backgroundColor: '#dfe6e9',
    },
    dotText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 11,
    },
  });
  
  

export default HabitTracker;
