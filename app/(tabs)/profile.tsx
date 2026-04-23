import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Card from '@/components/Card';
import { MOCK_USER } from '@/constants/mockData';

const GOAL_LABELS = { lose_weight: 'Lose Weight 🏃', gain_muscle: 'Gain Muscle 💪', maintain: 'Maintain ⚖️' };

const MENU_ITEMS = [
  { icon: 'person-outline' as const, label: 'Edit Profile', route: '/edit-profile' },
  { icon: 'settings-outline' as const, label: 'Settings', route: '/settings' },
  { icon: 'notifications-outline' as const, label: 'Notifications', route: '/settings' },
  { icon: 'shield-checkmark-outline' as const, label: 'Privacy', route: '/settings' },
  { icon: 'help-circle-outline' as const, label: 'Help & Support', route: '/settings' },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="bg-white dark:bg-slate-800 px-5 pt-6 pb-8 items-center border-b border-slate-100 dark:border-slate-700">
          <View className="relative mb-4">
            <Image source={{ uri: MOCK_USER.avatar }} className="w-24 h-24 rounded-full" />
            <TouchableOpacity
              className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full items-center justify-center border-2 border-white"
              onPress={() => router.push('/edit-profile')}
            >
              <Ionicons name="camera" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text className="text-xl font-bold text-slate-900 dark:text-white">{MOCK_USER.name}</Text>
          <Text className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{MOCK_USER.email}</Text>
          <View className="bg-primary-light px-3 py-1 rounded-full mt-3">
            <Text className="text-primary-dark text-xs font-semibold">{GOAL_LABELS[MOCK_USER.goal]}</Text>
          </View>
        </View>

        {/* Stats */}
        <View className="mx-5 mt-5">
          <Card variant="elevated" padding="md">
            <View className="flex-row justify-around">
              {[
                { value: '42', label: 'Meals Logged' },
                { value: '12', label: 'Streak Days' },
                { value: '1.8k', label: 'Avg. Calories' },
              ].map((stat) => (
                <View key={stat.label} className="items-center">
                  <Text className="text-2xl font-bold text-primary">{stat.value}</Text>
                  <Text className="text-slate-400 text-xs mt-0.5">{stat.label}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Calorie goal */}
        <View className="mx-5 mt-4">
          <Card variant="flat" padding="md">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-semibold text-slate-800 dark:text-slate-200">Daily Goal</Text>
              <Text className="text-primary font-bold">{MOCK_USER.dailyCalorieTarget} kcal</Text>
            </View>
            <View className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <View className="h-full bg-primary rounded-full" style={{ width: '51%' }} />
            </View>
            <Text className="text-slate-400 text-xs mt-1.5">920 / {MOCK_USER.dailyCalorieTarget} kcal today</Text>
          </Card>
        </View>

        {/* Menu */}
        <View className="mx-5 mt-5">
          <Card variant="elevated" padding="none">
            {MENU_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => router.push(item.route as any)}
                className={`flex-row items-center px-4 py-4 ${index < MENU_ITEMS.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''}`}
                activeOpacity={0.7}
              >
                <View className="w-9 h-9 bg-slate-100 dark:bg-slate-700 rounded-xl items-center justify-center mr-3">
                  <Ionicons name={item.icon} size={18} color="#64748b" />
                </View>
                <Text className="flex-1 text-slate-700 dark:text-slate-300 font-medium">{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        {/* Sign out */}
        <View className="mx-5 mt-4">
          <TouchableOpacity
            onPress={() => router.replace('/(auth)/login')}
            className="flex-row items-center justify-center py-4 rounded-2xl border-2 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900"
          >
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text className="text-red-500 font-semibold ml-2">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
