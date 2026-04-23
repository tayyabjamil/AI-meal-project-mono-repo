import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';

const PRESETS = [
  { label: 'Cutting', calories: 1500, desc: 'Aggressive deficit for fast fat loss' },
  { label: 'Moderate Deficit', calories: 1800, desc: 'Steady weight loss (recommended)' },
  { label: 'Maintenance', calories: 2100, desc: 'Maintain your current weight' },
  { label: 'Bulking', calories: 2600, desc: 'Calorie surplus to build muscle' },
];

export default function CalorieSetupScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState(1800);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <View className="flex-1 px-6 pt-6">
        {/* Progress bar */}
        <View className="flex-row gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} className={`flex-1 h-1.5 rounded-full ${i <= 5 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />
          ))}
        </View>

        <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Daily calorie goal</Text>
        <Text className="text-slate-500 dark:text-slate-400 mb-8">
          Choose a preset or we'll calculate it based on your goal.
        </Text>

        {/* Calorie display */}
        <View className="items-center mb-8 bg-primary-light rounded-3xl py-8">
          <Text className="text-6xl font-bold text-primary">{selected.toLocaleString()}</Text>
          <Text className="text-primary-dark font-semibold mt-1">calories / day</Text>
        </View>

        <View className="gap-3 flex-1">
          {PRESETS.map((preset) => (
            <TouchableOpacity
              key={preset.calories}
              onPress={() => setSelected(preset.calories)}
              className={`flex-row items-center justify-between px-4 py-4 rounded-2xl border-2 ${
                selected === preset.calories
                  ? 'border-primary bg-primary-light'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
            >
              <View>
                <Text className={`font-semibold text-base ${selected === preset.calories ? 'text-primary-dark' : 'text-slate-800 dark:text-slate-200'}`}>
                  {preset.label}
                </Text>
                <Text className="text-slate-500 dark:text-slate-400 text-sm">{preset.desc}</Text>
              </View>
              <Text className={`font-bold text-lg ${selected === preset.calories ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
                {preset.calories}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="pb-4 mt-4">
          <Button title="Let's Go! 🎉" onPress={() => router.replace('/(tabs)')} />
        </View>
      </View>
    </SafeAreaView>
  );
}
