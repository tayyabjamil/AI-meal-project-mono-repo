import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';

const ALLERGENS = [
  { label: 'Peanuts', emoji: '🥜' },
  { label: 'Tree Nuts', emoji: '🌰' },
  { label: 'Milk', emoji: '🥛' },
  { label: 'Eggs', emoji: '🥚' },
  { label: 'Wheat / Gluten', emoji: '🌾' },
  { label: 'Soy', emoji: '🫘' },
  { label: 'Fish', emoji: '🐟' },
  { label: 'Shellfish', emoji: '🦐' },
];

export default function AllergiesScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (label: string) => {
    setSelected((prev) => prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <View className="flex-1 px-6 pt-6">
        {/* Progress bar */}
        <View className="flex-row gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} className={`flex-1 h-1.5 rounded-full ${i <= 3 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />
          ))}
        </View>

        <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Any allergies?</Text>
        <Text className="text-slate-500 dark:text-slate-400 mb-8">
          Select all that apply. We'll exclude these from your meal plan.
        </Text>

        <View className="flex-row flex-wrap gap-3 flex-1">
          {ALLERGENS.map(({ label, emoji }) => (
            <TouchableOpacity
              key={label}
              onPress={() => toggle(label)}
              activeOpacity={0.8}
              className={`flex-row items-center gap-2 px-4 py-3 rounded-2xl border-2 ${
                selected.includes(label)
                  ? 'bg-red-50 border-red-400 dark:bg-red-900/20'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Text className="text-xl">{emoji}</Text>
              <Text className={`text-sm font-medium ${selected.includes(label) ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="pb-4 gap-3">
          <Button title="Continue" onPress={() => router.push('/(onboarding)/calorie-setup')} />
          <Button title="No allergies, skip" onPress={() => router.push('/(onboarding)/calorie-setup')} variant="ghost" />
        </View>
      </View>
    </SafeAreaView>
  );
}
