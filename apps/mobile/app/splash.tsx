import { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen() {
  const router = useRouter();
  const opacity = new Animated.Value(0);
  const scale = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 100, friction: 8 }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Animated.View style={{ opacity, transform: [{ scale }] }} className="items-center">
        <View className="w-24 h-24 bg-white rounded-3xl items-center justify-center mb-6 shadow-lg">
          <Ionicons name="leaf" size={48} color="#22c55e" />
        </View>
        <Text className="text-white text-4xl font-bold tracking-tight">MealAI</Text>
        <Text className="text-green-100 text-base mt-2 font-medium">Eat Smart. Live Better.</Text>
      </Animated.View>
    </View>
  );
}
