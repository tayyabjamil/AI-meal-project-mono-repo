import { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/Input';
import MealCard from '@/components/MealCard';
import { MOCK_MEALS } from '@/constants/mockData';
import { Meal, MealCategory } from '@/types';

const CATEGORIES: (MealCategory | 'All')[] = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Healthy'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<MealCategory | 'All'>('All');
  const [saved, setSaved] = useState<string[]>([]);

  const toggleSave = (meal: Meal) => {
    setSaved((prev) => prev.includes(meal.id) ? prev.filter((id) => id !== meal.id) : [...prev, meal.id]);
  };

  const filtered = useMemo(() => {
    return MOCK_MEALS.filter((meal) => {
      const matchesQuery = meal.title.toLowerCase().includes(query.toLowerCase()) ||
        meal.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || meal.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900">
      <View className="px-5 pt-4 pb-2">
        <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Find Meals</Text>
        <Input
          placeholder="Search meals, ingredients..."
          value={query}
          onChangeText={setQuery}
          leftIcon="search-outline"
          rightIcon={query ? 'close-circle' : undefined}
          onRightIconPress={() => setQuery('')}
        />
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12, gap: 8 }}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full ${
              activeCategory === cat
                ? 'bg-primary'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Text className={`text-sm font-semibold ${activeCategory === cat ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <Text className="text-slate-400 text-sm mb-4">
          {filtered.length} {filtered.length === 1 ? 'meal' : 'meals'} found
        </Text>
        {filtered.length > 0 ? (
          filtered.map((meal) => (
            <MealCard key={meal.id} meal={meal} variant="horizontal" onSave={toggleSave} isSaved={saved.includes(meal.id)} />
          ))
        ) : (
          <View className="items-center py-16">
            <Text className="text-5xl mb-4">🍽️</Text>
            <Text className="text-slate-700 dark:text-slate-300 font-semibold text-lg">No meals found</Text>
            <Text className="text-slate-400 text-sm mt-1">Try a different search term</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
