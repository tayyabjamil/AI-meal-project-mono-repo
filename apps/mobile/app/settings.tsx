import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '@/components/Card';

type IconName = keyof typeof Ionicons.glyphMap;

interface SettingToggle {
  icon: IconName;
  label: string;
  desc: string;
  key: string;
}

const TOGGLES: SettingToggle[] = [
  { icon: 'notifications-outline', label: 'Meal Reminders', desc: 'Get notified at meal times', key: 'reminders' },
  { icon: 'moon-outline', label: 'Dark Mode', desc: 'Switch to dark theme', key: 'darkMode' },
  { icon: 'scale-outline', label: 'Metric Units', desc: 'Use kg and cm', key: 'metric' },
  { icon: 'share-social-outline', label: 'Share Progress', desc: 'Allow sharing meal data', key: 'share' },
];

const LINKS = [
  { icon: 'document-text-outline' as IconName, label: 'Terms of Service' },
  { icon: 'shield-outline' as IconName, label: 'Privacy Policy' },
  { icon: 'help-circle-outline' as IconName, label: 'Help Center' },
  { icon: 'star-outline' as IconName, label: 'Rate the App' },
];

export default function SettingsScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    reminders: true,
    darkMode: false,
    metric: true,
    share: false,
  });

  const toggle = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900" edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        {/* Preferences */}
        <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Preferences</Text>
        <Card variant="elevated" padding="none" className="mb-6">
          {TOGGLES.map((item, index) => (
            <View
              key={item.key}
              className={`flex-row items-center px-4 py-4 ${index < TOGGLES.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''}`}
            >
              <View className="w-9 h-9 bg-primary-light rounded-xl items-center justify-center mr-3">
                <Ionicons name={item.icon} size={18} color="#22c55e" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-800 dark:text-slate-200 font-medium">{item.label}</Text>
                <Text className="text-slate-400 text-xs mt-0.5">{item.desc}</Text>
              </View>
              <Switch
                value={toggles[item.key]}
                onValueChange={() => toggle(item.key)}
                trackColor={{ false: '#e2e8f0', true: '#86efac' }}
                thumbColor={toggles[item.key] ? '#22c55e' : '#94a3b8'}
              />
            </View>
          ))}
        </Card>

        {/* Links */}
        <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">About</Text>
        <Card variant="elevated" padding="none" className="mb-6">
          {LINKS.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              className={`flex-row items-center px-4 py-4 ${index < LINKS.length - 1 ? 'border-b border-slate-100 dark:border-slate-700' : ''}`}
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

        <View className="items-center">
          <Text className="text-slate-300 dark:text-slate-600 text-xs">MealAI v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
