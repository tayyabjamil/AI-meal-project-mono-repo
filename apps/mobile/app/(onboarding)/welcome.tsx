import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <View className="flex-1 px-6">
        {/* Illustration area */}
        <View className="flex-1 items-center justify-center">
          <View className="w-72 h-72 bg-primary-light rounded-full items-center justify-center mb-8">
            <Text style={{ fontSize: 120 }}>🥗</Text>
          </View>
          <Text className="text-4xl font-bold text-slate-900 dark:text-white text-center leading-tight">
            Your Personal{'\n'}
            <Text className="text-primary">Nutrition AI</Text>
          </Text>
          <Text className="text-slate-500 dark:text-slate-400 text-center mt-4 text-base leading-6 px-4">
            Get personalized meal plans, track your calories, and chat with AI to reach your health goals faster.
          </Text>
        </View>

        {/* Features */}
        <View className="mb-8 gap-4">
          {[
            { icon: '🍽️', text: 'Personalized meal recommendations' },
            { icon: '🤖', text: 'AI-powered nutrition guidance' },
            { icon: '📊', text: 'Track calories & macros effortlessly' },
          ].map((item) => (
            <View key={item.text} className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-primary-light rounded-xl items-center justify-center">
                <Text className="text-xl">{item.icon}</Text>
              </View>
              <Text className="text-slate-700 dark:text-slate-300 font-medium flex-1">{item.text}</Text>
            </View>
          ))}
        </View>

        <Button title="Get Started" onPress={() => router.push('/(onboarding)/goal-selection')} />
        <View className="h-4" />
      </View>
    </SafeAreaView>
  );
}
