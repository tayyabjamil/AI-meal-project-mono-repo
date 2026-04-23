import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { Cuisine, DietType } from '@/types';

const CUISINES: Cuisine[] = ['American', 'Italian', 'Asian', 'Mexican', 'Mediterranean', 'Indian'];
const DIETS: DietType[] = ['None', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Gluten-Free'];

export default function PreferencesScreen() {
  const router = useRouter();
  const [selectedCuisines, setSelectedCuisines] = useState<Cuisine[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<DietType>('None');

  const toggleCuisine = (c: Cuisine) => {
    setSelectedCuisines((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Progress bar */}
        <View className="flex-row gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} className={`flex-1 h-1.5 rounded-full ${i <= 2 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />
          ))}
        </View>

        <Text className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Food preferences</Text>
        <Text className="text-slate-500 dark:text-slate-400 mb-8">Tell us what you like to eat.</Text>

        <Text className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">Favorite cuisines</Text>
        <View className="flex-row flex-wrap gap-2 mb-8">
          {CUISINES.map((cuisine) => (
            <TouchableOpacity
              key={cuisine}
              onPress={() => toggleCuisine(cuisine)}
              className={`px-4 py-2.5 rounded-full border ${
                selectedCuisines.includes(cuisine)
                  ? 'bg-primary border-primary'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Text className={`text-sm font-medium ${selectedCuisines.includes(cuisine) ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                {cuisine}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-3">Diet type</Text>
        <View className="gap-2 mb-8">
          {DIETS.map((diet) => (
            <TouchableOpacity
              key={diet}
              onPress={() => setSelectedDiet(diet)}
              className={`flex-row items-center justify-between px-4 py-3.5 rounded-2xl border ${
                selectedDiet === diet
                  ? 'bg-primary-light border-primary'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Text className={`font-medium ${selectedDiet === diet ? 'text-primary-dark' : 'text-slate-700 dark:text-slate-300'}`}>
                {diet}
              </Text>
              {selectedDiet === diet && (
                <View className="w-5 h-5 bg-primary rounded-full items-center justify-center">
                  <Text className="text-white text-xs">✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Continue" onPress={() => router.push('/(onboarding)/allergies')} />
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
