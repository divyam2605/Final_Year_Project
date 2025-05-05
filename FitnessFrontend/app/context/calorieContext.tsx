import { useContext, createContext } from "react";

export const CalorieContext = createContext({
    calories: 0,
    setCalories: (val: number) => { },
    meals: [] as string[],
    addMeal: (meal: string) => { },
});

