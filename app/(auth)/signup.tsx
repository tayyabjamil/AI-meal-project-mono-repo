import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.replace('/(onboarding)/welcome');
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-4 pb-6">
            {/* Back button */}
            <TouchableOpacity onPress={() => router.back()} className="mb-6">
              <Ionicons name="arrow-back" size={24} color="#22c55e" />
            </TouchableOpacity>

            <View className="mb-8">
              <Text className="text-3xl font-bold text-slate-900 dark:text-white">Create account</Text>
              <Text className="text-slate-500 dark:text-slate-400 mt-2">
                Start your personalized nutrition journey
              </Text>
            </View>

            <Input
              label="Full Name"
              placeholder="Alex Johnson"
              value={name}
              onChangeText={setName}
              leftIcon="person-outline"
            />
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
              placeholder="Create a strong password"
              value={password}
              onChangeText={setPassword}
              leftIcon="lock-closed-outline"
              isPassword
            />

            <View className="flex-row items-center mb-6 mt-2">
              <Ionicons name="shield-checkmark-outline" size={16} color="#22c55e" />
              <Text className="text-slate-500 dark:text-slate-400 text-xs ml-2 flex-1">
                By signing up you agree to our Terms of Service and Privacy Policy
              </Text>
            </View>

            <Button title="Create Account" onPress={handleSignup} loading={loading} />

            <View className="flex-row justify-center mt-6">
              <Text className="text-slate-500 dark:text-slate-400">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-primary font-semibold">Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
