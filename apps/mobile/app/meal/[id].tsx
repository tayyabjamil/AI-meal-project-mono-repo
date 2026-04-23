import { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import { MOCK_MEALS } from '@/constants/mockData';

export default function MealDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const meal = MOCK_MEALS.find((m) => m.id === id);

  if (!meal) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-slate-900">
        <Text className="text-slate-500">Meal not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900" edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero image */}
        <View className="relative">
          <Image source={{ uri: meal.image }} className="w-full h-64" resizeMode="cover" />
          <View className="absolute inset-0 bg-black/20" />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-12 left-4 w-10 h-10 bg-white/90 rounded-full items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="#0f172a" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSaved(!saved)}
            className="absolute top-12 right-4 w-10 h-10 bg-white/90 rounded-full items-center justify-center"
          >
            <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={saved ? '#22c55e' : '#0f172a'} />
          </TouchableOpacity>
          <View className="absolute bottom-4 left-4">
            <View className="bg-primary px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-semibold">{meal.category}</Text>
            </View>
          </View>
        </View>

        <View className="px-5 pt-5">
          <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{meal.title}</Text>
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="time-outline" size={14} color="#94a3b8" />
            <Text className="text-slate-400 text-sm">{meal.prepTime} min prep time</Text>
          </View>

          {/* Tags */}
          <View className="flex-row flex-wrap gap-2 mb-5">
            {meal.tags.map((tag) => (
              <View key={tag} className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                <Text className="text-slate-600 dark:text-slate-400 text-xs font-medium">{tag}</Text>
              </View>
            ))}
          </View>

          {/* Macros */}
          <View className="flex-row bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 mb-6">
            {[
              { label: 'Calories', value: `${meal.calories}`, unit: 'kcal', color: '#22c55e' },
              { label: 'Protein', value: `${meal.protein}`, unit: 'g', color: '#3b82f6' },
              { label: 'Carbs', value: `${meal.carbs}`, unit: 'g', color: '#f59e0b' },
              { label: 'Fat', value: `${meal.fat}`, unit: 'g', color: '#ec4899' },
            ].map((macro) => (
              <View key={macro.label} className="flex-1 items-center">
                <Text style={{ color: macro.color }} className="text-xl font-bold">
                  {macro.value}
                </Text>
                <Text className="text-slate-400 text-xs">{macro.unit}</Text>
                <Text className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{macro.label}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <Text className="text-base font-semibold text-slate-900 dark:text-white mb-2">About</Text>
          <Text className="text-slate-600 dark:text-slate-400 leading-6 mb-6">{meal.description}</Text>

          {/* Ingredients */}
          <Text className="text-base font-semibold text-slate-900 dark:text-white mb-3">Ingredients</Text>
          <View className="gap-2 mb-6">
            {meal.ingredients.map((ing, i) => (
              <View key={i} className="flex-row items-center gap-3">
                <View className="w-2 h-2 bg-primary rounded-full" />
                <Text className="text-slate-600 dark:text-slate-400 capitalize">{ing}</Text>
              </View>
            ))}
          </View>

          {/* Instructions */}
          <Text className="text-base font-semibold text-slate-900 dark:text-white mb-3">Instructions</Text>
          <View className="gap-4">
            {meal.instructions.map((step, i) => (
              <View key={i} className="flex-row gap-3">
                <View className="w-7 h-7 bg-primary rounded-full items-center justify-center flex-shrink-0 mt-0.5">
                  <Text className="text-white text-xs font-bold">{i + 1}</Text>
                </View>
                <Text className="flex-1 text-slate-600 dark:text-slate-400 leading-5">{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <Button title="Add to Today's Log" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}
