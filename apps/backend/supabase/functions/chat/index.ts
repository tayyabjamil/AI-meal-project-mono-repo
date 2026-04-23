import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const AI_RESPONSES = [
  "Based on your goal, I'd recommend increasing your protein intake to at least 150g per day.",
  "That meal is an excellent choice! It's high in fiber and will keep you feeling full.",
  "Try pairing that with roasted vegetables to hit your micronutrient targets.",
  "Your calorie intake looks great! You're right on track for your weekly goal.",
  "Try swapping white rice for quinoa — it has twice the protein and more fiber.",
  "Staying hydrated is key! Aim for at least 8 glasses of water throughout the day.",
  "A great post-workout meal would be a protein smoothie with banana and almond butter.",
];

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, userId } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // TODO: replace with real AI call (OpenAI, Claude, etc.)
    const reply = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];

    // Save messages to DB if userId is provided
    if (userId) {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      await supabase.from('chat_messages').insert([
        { user_id: userId, text: message, sender: 'user' },
        { user_id: userId, text: reply, sender: 'ai' },
      ]);
    }

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
