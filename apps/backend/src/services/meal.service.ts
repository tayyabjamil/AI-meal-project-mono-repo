interface Meal {
  id: string;
  title: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number;
  category: string;
  tags: string[];
  description: string;
  ingredients: string[];
  instructions: string[];
}

const MEALS: Meal[] = [
  {
    id: '1',
    title: 'Avocado Toast with Eggs',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400',
    calories: 380, protein: 18, carbs: 32, fat: 22, prepTime: 10,
    category: 'Breakfast',
    tags: ['Quick', 'High Protein', 'Vegetarian'],
    description: 'Creamy avocado on toasted sourdough topped with poached eggs and chili flakes.',
    ingredients: ['2 slices sourdough', '1 ripe avocado', '2 eggs', 'chili flakes', 'lemon juice', 'salt & pepper'],
    instructions: ['Toast bread', 'Mash avocado with lemon juice', 'Poach eggs', 'Assemble and season'],
  },
  {
    id: '2',
    title: 'Grilled Chicken Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    calories: 320, protein: 42, carbs: 12, fat: 10, prepTime: 20,
    category: 'Lunch',
    tags: ['High Protein', 'Low Carb', 'Keto'],
    description: 'Juicy grilled chicken breast over mixed greens with a light vinaigrette.',
    ingredients: ['200g chicken breast', 'mixed greens', 'cherry tomatoes', 'cucumber', 'olive oil', 'balsamic'],
    instructions: ['Season and grill chicken', 'Chop vegetables', 'Toss salad', 'Slice chicken and serve'],
  },
  {
    id: '3',
    title: 'Salmon & Quinoa Bowl',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
    calories: 520, protein: 38, carbs: 45, fat: 18, prepTime: 25,
    category: 'Dinner',
    tags: ['Omega-3', 'Balanced', 'Healthy'],
    description: 'Pan-seared salmon fillet over fluffy quinoa with roasted vegetables.',
    ingredients: ['180g salmon fillet', '100g quinoa', 'broccoli', 'sweet potato', 'lemon', 'olive oil'],
    instructions: ['Cook quinoa', 'Roast vegetables', 'Pan-sear salmon', 'Assemble bowl'],
  },
];

export const mealService = {
  getAll(): Meal[] {
    return MEALS;
  },

  getById(id: string): Meal | undefined {
    return MEALS.find((m) => m.id === id);
  },

  search(query: string, category?: string): Meal[] {
    return MEALS.filter((meal) => {
      const matchesQuery =
        !query ||
        meal.title.toLowerCase().includes(query.toLowerCase()) ||
        meal.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory = !category || category === 'All' || meal.category === category;
      return matchesQuery && matchesCategory;
    });
  },
};
