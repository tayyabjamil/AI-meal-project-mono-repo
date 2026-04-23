import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MealCard from '@/components/MealCard';
import { MOCK_MEALS } from '@/constants/mockData';
import { Meal } from '@/types';

export default function SavedScreen() {
  const [savedIds, setSavedIds] = useState<string[]>(['1', '3', '6']);

  const savedMeals = MOCK_MEALS.filter((m) => savedIds.includes(m.id));

  const toggleSave = (meal: Meal) => {
    setSavedIds((prev) => prev.includes(meal.id) ? prev.filter((id) => id !== meal.id) : [...prev, meal.id]);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900">
      <View className="px-5 pt-4 pb-2">
        <Text className="text-2xl font-bold text-slate-900 dark:text-white">Saved Meals</Text>
        <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          {savedMeals.length} {savedMeals.length === 1 ? 'meal' : 'meals'} saved
        </Text>
      </View>

      {savedMeals.length > 0 ? (
        <ScrollView className="flex-1 px-5 pt-2" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          {savedMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} variant="horizontal" onSave={toggleSave} isSaved />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-24 h-24 bg-primary-light rounded-full items-center justify-center mb-6">
            <Ionicons name="bookmark-outline" size={40} color="#22c55e" />
          </View>
          <Text className="text-xl font-bold text-slate-800 dark:text-slate-200 text-center">No saved meals yet</Text>
          <Text className="text-slate-500 dark:text-slate-400 text-center mt-2 leading-5">
            Tap the bookmark icon on any meal to save it for later.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
