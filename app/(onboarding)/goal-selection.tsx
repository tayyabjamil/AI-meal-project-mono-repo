import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { GoalType } from '@/types';

const GOALS: { id: GoalType; emoji: string; title: string; desc: string }[] = [
  { id: 'lose_weight', emoji: '🏃', title: 'Lose Weight', desc: 'Burn fat and reach a healthier body weight' },
  { id: 'gain_muscle', emoji: '💪', title: 'Gain Muscle', desc: 'Build strength with high-protein meal plans' },
  { id: 'maintain', emoji: '⚖️', title: 'Maintain Weight', desc: 'Eat balanced to sustain your current physique' },
];

export default function GoalSelectionScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<GoalType | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <View className="flex-1 px-6 pt-6">
        {/* Progress bar */}
        <View className="flex-row gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} className={`flex-1 h-1.5 rounded-full ${i === 1 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />
          ))}
        </View>

        <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2">What's your goal?</Text>
        <Text className="text-slate-500 dark:text-slate-400 mb-8">
          We'll build a meal plan tailored to your objective.
        </Text>

        <View className="gap-4 flex-1">
          {GOALS.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              onPress={() => setSelected(goal.id)}
              activeOpacity={0.85}
              className={`flex-row items-center p-5 rounded-3xl border-2 ${
                selected === goal.id
                  ? 'border-primary bg-primary-light'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
            >
              <Text className="text-4xl mr-4">{goal.emoji}</Text>
              <View className="flex-1">
                <Text className={`text-base font-semibold ${selected === goal.id ? 'text-primary-dark' : 'text-slate-800 dark:text-slate-200'}`}>
                  {goal.title}
                </Text>
                <Text className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{goal.desc}</Text>
              </View>
              {selected === goal.id && (
                <View className="w-6 h-6 bg-primary rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View className="pb-4">
          <Button
            title="Continue"
            onPress={() => router.push('/(onboarding)/preferences')}
            disabled={!selected}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
