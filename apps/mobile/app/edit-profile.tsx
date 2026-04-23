import { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { MOCK_USER } from '@/constants/mockData';

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-900" edges={['bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
          {/* Avatar */}
          <View className="items-center mb-8">
            <View className="relative">
              <Image source={{ uri: MOCK_USER.avatar }} className="w-24 h-24 rounded-full" />
              <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full items-center justify-center border-2 border-white">
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="mt-3">
              <Text className="text-primary text-sm font-medium">Change Photo</Text>
            </TouchableOpacity>
          </View>

          <Input label="Full Name" value={name} onChangeText={setName} leftIcon="person-outline" />
          <Input label="Email" value={email} onChangeText={setEmail} leftIcon="mail-outline" keyboardType="email-address" autoCapitalize="none" />
          <Input label="Current Goal" value="Lose Weight" editable={false} leftIcon="flag-outline" />
          <Input label="Daily Calorie Target" value="1800" leftIcon="flame-outline" keyboardType="numeric" />

          <View className="mt-4 gap-3">
            <Button title="Save Changes" onPress={handleSave} loading={loading} />
            <Button title="Cancel" onPress={() => router.back()} variant="outline" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
