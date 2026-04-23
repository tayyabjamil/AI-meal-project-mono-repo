import { View, Text } from 'react-native';
import { ChatMessage } from '@/types';

interface ChatBubbleProps {
  message: ChatMessage;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <View className={`flex-row mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-2 mt-auto mb-5">
          <Text className="text-white text-xs font-bold">AI</Text>
        </View>
      )}
      <View className={`max-w-[78%]`}>
        <View
          className={`px-4 py-3 rounded-3xl ${
            isUser
              ? 'bg-primary rounded-br-lg'
              : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-bl-lg'
          }`}
          style={
            isUser
              ? { elevation: 2, shadowColor: '#22c55e', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }
              : { elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } }
          }
        >
          <Text
            className={`text-sm leading-5 ${
              isUser ? 'text-white' : 'text-slate-800 dark:text-slate-200'
            }`}
          >
            {message.text}
          </Text>
        </View>
        <Text className={`text-xs text-slate-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
}
