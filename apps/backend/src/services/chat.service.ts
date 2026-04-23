const AI_RESPONSES = [
  "Based on your goal, I'd recommend increasing your protein intake to at least 150g per day.",
  "That meal is an excellent choice! It's high in fiber and will keep you feeling full.",
  "Try pairing that with roasted vegetables to hit your micronutrient targets.",
  "Your calorie intake looks great! You're right on track for your weekly goal.",
  "Try swapping white rice for quinoa — it has twice the protein and more fiber.",
  "Staying hydrated is key! Aim for at least 8 glasses of water throughout the day.",
];

export const chatService = {
  async getAIResponse(_message: string): Promise<string> {
    // TODO: replace with real AI/LLM call
    await new Promise((r) => setTimeout(r, 500));
    return AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
  },
};
