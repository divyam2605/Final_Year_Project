import React, { createContext, useContext, useState } from 'react';

export type Exercise = {
  id: string;
  name: string;
  type: string;
  sets: { weight: number; reps: number; completed: boolean }[];
  calories : number;
  multiplier: number
};

type ContextType = {
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  updateExerciseSet: (exerciseId: string, setIndex: number) => void; // ✅ added here
};

const ExerciseContext = createContext<ContextType>({
  exercises: [],
  addExercise: () => {},
  updateExerciseSet: () => {}, // ✅ default empty function
});

export const ExerciseProvider = ({ children }: { children: React.ReactNode }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addExercise = (exercise: Exercise) => {
    setExercises(prev => [...prev, exercise]);
  };

  // ✅ NEW: Toggle the completed status of a set
  const updateExerciseSet = (exerciseId: string, setIndex: number) => {
    setExercises(prev =>
      prev.map(ex =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set, idx) =>
                idx === setIndex ? { ...set, completed: !set.completed } : set
              ),
            }
          : ex
      )
    );
  };

  return (
    <ExerciseContext.Provider value={{ exercises, addExercise, updateExerciseSet }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => useContext(ExerciseContext);
