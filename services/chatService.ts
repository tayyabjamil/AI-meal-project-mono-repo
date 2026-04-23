import { ChatMessage } from '@/types';

const AI_RESPONSES = [
  "Great question! Based on your goal, I'd recommend increasing your protein intake to at least 150g per day.",
  "That meal is an excellent choice! It's high in fiber and will keep you feeling full for hours.",
  "I suggest pairing that with a side of roasted vegetables to hit your micronutrient targets.",
  "Your calorie intake looks great today! You're right on track to meet your weekly goal.",
  "Try swapping white rice for quinoa — it has twice the protein and more fiber.",
  "Staying hydrated is key! Aim for at least 8 glasses of water throughout the day.",
  "A great post-workout meal would be a protein smoothie with banana and almond butter.",
];

export const chatService = {
  async getAIResponse(userMessage: string): Promise<string> {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
    return AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
  },

  createUserMessage(text: string): ChatMessage {
    return {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
  },

  createAIMessage(text: string): ChatMessage {
    return {
      id: (Date.now() + 1).toString(),
      text,
      sender: 'ai',
      timestamp: new Date(),
    };
  },
};
