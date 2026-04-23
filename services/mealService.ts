import { Meal, MealCategory } from '@/types';
import { MOCK_MEALS } from '@/constants/mockData';

export const mealService = {
  getAll(): Meal[] {
    return MOCK_MEALS;
  },

  getById(id: string): Meal | undefined {
    return MOCK_MEALS.find((m) => m.id === id);
  },

  getByCategory(category: MealCategory): Meal[] {
    return MOCK_MEALS.filter((m) => m.category === category);
  },

  search(query: string, category?: MealCategory | 'All'): Meal[] {
    return MOCK_MEALS.filter((meal) => {
      const matchesQuery =
        !query ||
        meal.title.toLowerCase().includes(query.toLowerCase()) ||
        meal.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory = !category || category === 'All' || meal.category === category;
      return matchesQuery && matchesCategory;
    });
  },

  getQuickMeals(maxPrepTime = 10): Meal[] {
    return MOCK_MEALS.filter((m) => m.prepTime <= maxPrepTime);
  },

  getRecommended(limit = 4): Meal[] {
    return MOCK_MEALS.slice(0, limit);
  },
};
