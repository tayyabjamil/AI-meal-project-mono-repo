export interface Meal {
  id: string;
  title: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number; // minutes
  category: MealCategory;
  tags: string[];
  description: string;
  ingredients: string[];
  instructions: string[];
}

export type MealCategory =
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Snack'
  | 'Healthy';

export type GoalType = 'lose_weight' | 'gain_muscle' | 'maintain';

export type DietType =
  | 'None'
  | 'Vegetarian'
  | 'Vegan'
  | 'Keto'
  | 'Paleo'
  | 'Gluten-Free';

export type Cuisine =
  | 'American'
  | 'Italian'
  | 'Asian'
  | 'Mexican'
  | 'Mediterranean'
  | 'Indian';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  goal: GoalType;
  dailyCalorieTarget: number;
  dietType: DietType;
  allergies: string[];
}

export interface DailyLog {
  date: string;
  meals: LoggedMeal[];
  totalCalories: number;
  totalProtein: number;
}

export interface LoggedMeal {
  mealId: string;
  mealTitle: string;
  calories: number;
  protein: number;
  mealTime: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
}
