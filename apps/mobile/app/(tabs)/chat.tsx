import { useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ChatBubble from '@/components/ChatBubble';
import { MOCK_CHAT_MESSAGES } from '@/constants/mockData';
import { chatService } from '@/services/chatService';
import { ChatMessage } from '@/types';

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = chatService.createUserMessage(input);
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const responseText = await chatService.getAIResponse(input);
    const aiMsg = chatService.createAIMessage(responseText);
    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);

    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View className="flex-row items-center px-5 py-4 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
          <View className="w-10 h-10 bg-primary rounded-full items-center justify-center mr-3">
            <Ionicons name="nutrition" size={20} color="#fff" />
          </View>
          <View>
            <Text className="font-bold text-slate-900 dark:text-white">NutriAI Assistant</Text>
            <View className="flex-row items-center gap-1.5">
              <View className="w-2 h-2 bg-green-400 rounded-full" />
              <Text className="text-xs text-slate-500 dark:text-slate-400">Always available</Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <View className="flex-row items-end mb-4">
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-2">
                <Text className="text-white text-xs font-bold">AI</Text>
              </View>
              <View className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-4 py-3 rounded-3xl rounded-bl-lg">
                <View className="flex-row gap-1.5 items-center">
                  {[0, 1, 2].map((i) => (
                    <View key={i} className="w-2 h-2 bg-slate-400 rounded-full" />
                  ))}
                </View>
              </View>
            </View>
          )}
          <View className="h-4" />
        </ScrollView>

        {/* Suggestions */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8, gap: 8 }}
        >
          {['High-protein meal ideas', 'What should I eat for dinner?', 'Low-calorie snacks'].map((suggestion) => (
            <TouchableOpacity
              key={suggestion}
              onPress={() => setInput(suggestion)}
              className="bg-primary-light border border-primary/20 px-3 py-2 rounded-full"
            >
              <Text className="text-primary text-xs font-medium">{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Input */}
        <View className="flex-row items-end px-4 py-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 gap-3">
          <View className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-2xl px-4 py-3 min-h-[44px] max-h-[120px]">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask about nutrition, meals..."
              placeholderTextColor="#94a3b8"
              multiline
              className="text-slate-900 dark:text-slate-100 text-sm"
              onSubmitEditing={sendMessage}
            />
          </View>
          <TouchableOpacity
            onPress={sendMessage}
            disabled={!input.trim() || isTyping}
            className={`w-11 h-11 rounded-full items-center justify-center ${input.trim() && !isTyping ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
          >
            {isTyping ? (
              <ActivityIndicator size="small" color="#22c55e" />
            ) : (
              <Ionicons name="send" size={18} color={input.trim() ? '#fff' : '#94a3b8'} />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
