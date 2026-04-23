import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MealCard from '@/components/MealCard';
import Card from '@/components/Card';
import { MOCK_MEALS, MOCK_USER } from '@/constants/mockData';
import { Meal } from '@/types';

const DAILY_TARGET = MOCK_USER.dailyCalorieTarget;
const CONSUMED = 920;

export default function HomeScreen() {
  const [saved, setSaved] = useState<string[]>([]);

  const toggleSave = (meal: Meal) => {
    setSaved((prev) => prev.includes(meal.id) ? prev.filter((id) => id !== meal.id) : [...prev, meal.id]);
  };

  const progress = Math.min(CONSUMED / DAILY_TARGET, 1);
  const remaining = DAILY_TARGET - CONSUMED;

  const recommended = MOCK_MEALS.slice(0, 4);
  const quickPicks = MOCK_MEALS.filter((m) => m.prepTime <= 10);

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <View>
            <Text className="text-slate-500 dark:text-slate-400 text-sm">Good morning 👋</Text>
            <Text className="text-xl font-bold text-slate-900 dark:text-white">
              {MOCK_USER.name.split(' ')[0]}
            </Text>
          </View>
          <TouchableOpacity>
            <Image
              source={{ uri: MOCK_USER.avatar }}
              className="w-11 h-11 rounded-full"
            />
          </TouchableOpacity>
        </View>

        {/* Calorie card */}
        <View className="mx-5 mb-5">
          <Card variant="elevated" padding="lg">
            <View className="flex-row justify-between mb-4">
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary">{CONSUMED}</Text>
                <Text className="text-slate-400 text-xs mt-0.5">consumed</Text>
              </View>
              <View className="items-center">
                <View className="w-20 h-20 rounded-full border-4 border-primary items-center justify-center">
                  <Text className="text-lg font-bold text-slate-800 dark:text-slate-200">{Math.round(progress * 100)}%</Text>
                </View>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-accent">{remaining}</Text>
                <Text className="text-slate-400 text-xs mt-0.5">remaining</Text>
              </View>
            </View>

            {/* Progress bar */}
            <View className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <View
                className="h-full bg-primary rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </View>
            <Text className="text-slate-400 text-xs text-right mt-1">
              Goal: {DAILY_TARGET.toLocaleString()} kcal
            </Text>

            {/* Macros */}
            <View className="flex-row justify-between mt-4">
              {[
                { label: 'Protein', value: '48g', color: 'bg-blue-400' },
                { label: 'Carbs', value: '102g', color: 'bg-yellow-400' },
                { label: 'Fat', value: '32g', color: 'bg-pink-400' },
              ].map((macro) => (
                <View key={macro.label} className="items-center">
                  <View className={`w-2 h-2 rounded-full ${macro.color} mb-1`} />
                  <Text className="text-slate-700 dark:text-slate-300 font-semibold text-sm">{macro.value}</Text>
                  <Text className="text-slate-400 text-xs">{macro.label}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Quick picks */}
        <View className="mb-5">
          <View className="flex-row items-center justify-between px-5 mb-3">
            <Text className="text-lg font-bold text-slate-900 dark:text-white">⚡ Quick &amp; Easy</Text>
            <Text className="text-primary text-sm font-medium">See all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
            {quickPicks.map((meal) => (
              <View key={meal.id} style={{ width: 240 }}>
                <MealCard meal={meal} onSave={toggleSave} isSaved={saved.includes(meal.id)} />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recommended */}
        <View className="px-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-slate-900 dark:text-white">🌟 Recommended</Text>
            <Text className="text-primary text-sm font-medium">See all</Text>
          </View>
          {recommended.map((meal) => (
            <MealCard key={meal.id} meal={meal} variant="horizontal" onSave={toggleSave} isSaved={saved.includes(meal.id)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
