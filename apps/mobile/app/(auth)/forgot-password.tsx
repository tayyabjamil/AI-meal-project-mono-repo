import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <View className="flex-1 px-6 pt-4">
          <TouchableOpacity onPress={() => router.back()} className="mb-8">
            <Ionicons name="arrow-back" size={24} color="#22c55e" />
          </TouchableOpacity>

          {!sent ? (
            <>
              <View className="mb-8">
                <View className="w-16 h-16 bg-primary-light rounded-2xl items-center justify-center mb-4">
                  <Ionicons name="mail-outline" size={32} color="#22c55e" />
                </View>
                <Text className="text-3xl font-bold text-slate-900 dark:text-white">Forgot password?</Text>
                <Text className="text-slate-500 dark:text-slate-400 mt-2">
                  Enter your email and we'll send you a reset link.
                </Text>
              </View>

              <Input
                label="Email address"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                leftIcon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Button title="Send Reset Link" onPress={handleSend} loading={loading} />
            </>
          ) : (
            <View className="flex-1 items-center justify-center">
              <View className="w-20 h-20 bg-primary-light rounded-full items-center justify-center mb-6">
                <Ionicons name="checkmark-circle" size={40} color="#22c55e" />
              </View>
              <Text className="text-2xl font-bold text-slate-900 dark:text-white text-center">Check your inbox</Text>
              <Text className="text-slate-500 dark:text-slate-400 text-center mt-3 mb-8 px-4">
                We sent a password reset link to{'\n'}
                <Text className="font-semibold text-slate-700 dark:text-slate-300">{email}</Text>
              </Text>
              <Button title="Back to Sign In" onPress={() => router.replace('/(auth)/login')} />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
