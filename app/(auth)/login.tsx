import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-8 pb-6">
            {/* Header */}
            <View className="items-center mb-10">
              <View className="w-16 h-16 bg-primary-light rounded-2xl items-center justify-center mb-4">
                <Ionicons name="leaf" size={32} color="#22c55e" />
              </View>
              <Text className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back</Text>
              <Text className="text-slate-500 dark:text-slate-400 mt-2 text-center">
                Sign in to continue your health journey
              </Text>
            </View>

            {/* Form */}
            <View className="mb-6">
              <Input
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                leftIcon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                leftIcon="lock-closed-outline"
                isPassword
              />
              <TouchableOpacity
                onPress={() => router.push('/(auth)/forgot-password')}
                className="items-end -mt-2 mb-2"
              >
                <Text className="text-primary text-sm font-medium">Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <Button title="Sign In" onPress={handleLogin} loading={loading} />

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              <Text className="mx-4 text-slate-400 text-sm">or continue with</Text>
              <View className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            </View>

            {/* Social buttons */}
            <View className="flex-row gap-3">
              {['logo-google', 'logo-apple'].map((icon) => (
                <TouchableOpacity
                  key={icon}
                  className="flex-1 flex-row items-center justify-center border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 bg-slate-50 dark:bg-slate-800"
                  activeOpacity={0.75}
                >
                  <Ionicons name={icon as any} size={22} color="#374151" />
                </TouchableOpacity>
              ))}
            </View>

            {/* Sign up link */}
            <View className="flex-row justify-center mt-8">
              <Text className="text-slate-500 dark:text-slate-400">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                <Text className="text-primary font-semibold">Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
