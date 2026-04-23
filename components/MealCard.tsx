import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Meal } from '@/types';

interface MealCardProps {
  meal: Meal;
  onSave?: (meal: Meal) => void;
  isSaved?: boolean;
  variant?: 'horizontal' | 'vertical';
}

export default function MealCard({
  meal,
  onSave,
  isSaved = false,
  variant = 'vertical',
}: MealCardProps) {
  const router = useRouter();

  if (variant === 'horizontal') {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/meal/${meal.id}`)}
        activeOpacity={0.85}
        className="flex-row bg-white dark:bg-slate-800 rounded-2xl overflow-hidden mb-3 border border-slate-100 dark:border-slate-700"
        style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
      >
        <Image source={{ uri: meal.image }} className="w-24 h-24" resizeMode="cover" />
        <View className="flex-1 p-3 justify-between">
          <View className="flex-row items-start justify-between">
            <Text className="text-slate-900 dark:text-slate-100 font-semibold text-sm flex-1 mr-2" numberOfLines={2}>
              {meal.title}
            </Text>
            {onSave && (
              <TouchableOpacity onPress={() => onSave(meal)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons
                  name={isSaved ? 'bookmark' : 'bookmark-outline'}
                  size={18}
                  color={isSaved ? '#22c55e' : '#94a3b8'}
                />
              </TouchableOpacity>
            )}
          </View>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Ionicons name="flame-outline" size={13} color="#f97316" />
              <Text className="text-xs text-slate-500 dark:text-slate-400">{meal.calories} kcal</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="barbell-outline" size={13} color="#22c55e" />
              <Text className="text-xs text-slate-500 dark:text-slate-400">{meal.protein}g protein</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="time-outline" size={13} color="#94a3b8" />
              <Text className="text-xs text-slate-500 dark:text-slate-400">{meal.prepTime}m</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => router.push(`/meal/${meal.id}`)}
      activeOpacity={0.85}
      className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden mb-4"
      style={{ elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 3 } }}
    >
      <View className="relative">
        <Image source={{ uri: meal.image }} className="w-full h-48" resizeMode="cover" />
        <View className="absolute top-3 right-3">
          {onSave && (
            <TouchableOpacity
              onPress={() => onSave(meal)}
              className="bg-white dark:bg-slate-800 rounded-full p-2"
              style={{ elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } }}
            >
              <Ionicons
                name={isSaved ? 'bookmark' : 'bookmark-outline'}
                size={16}
                color={isSaved ? '#22c55e' : '#64748b'}
              />
            </TouchableOpacity>
          )}
        </View>
        <View className="absolute bottom-3 left-3">
          <View className="bg-primary px-2.5 py-1 rounded-full">
            <Text className="text-white text-xs font-medium">{meal.category}</Text>
          </View>
        </View>
      </View>
      <View className="p-4">
        <Text className="text-slate-900 dark:text-slate-100 font-semibold text-base mb-2" numberOfLines={1}>
          {meal.title}
        </Text>
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-primary font-bold text-sm">{meal.calories}</Text>
            <Text className="text-slate-400 text-xs">kcal</Text>
          </View>
          <View className="items-center">
            <Text className="text-slate-700 dark:text-slate-300 font-bold text-sm">{meal.protein}g</Text>
            <Text className="text-slate-400 text-xs">protein</Text>
          </View>
          <View className="items-center">
            <Text className="text-slate-700 dark:text-slate-300 font-bold text-sm">{meal.carbs}g</Text>
            <Text className="text-slate-400 text-xs">carbs</Text>
          </View>
          <View className="items-center">
            <Text className="text-slate-700 dark:text-slate-300 font-bold text-sm">{meal.prepTime}m</Text>
            <Text className="text-slate-400 text-xs">prep</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
