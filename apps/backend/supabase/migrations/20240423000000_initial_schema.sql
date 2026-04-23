-- ============================================================
-- MealAI — Initial Schema
-- ============================================================

-- ─── Profiles ───────────────────────────────────────────────
-- Extends Supabase auth.users with app-specific fields
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL DEFAULT '',
  avatar_url  TEXT,
  goal        TEXT CHECK (goal IN ('lose_weight', 'gain_muscle', 'maintain')) DEFAULT 'maintain',
  diet_type   TEXT CHECK (diet_type IN ('None', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Gluten-Free')) DEFAULT 'None',
  allergies   TEXT[] DEFAULT '{}',
  calorie_target INT DEFAULT 2000,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── Meals ──────────────────────────────────────────────────
CREATE TABLE meals (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  image        TEXT,
  calories     INT NOT NULL,
  protein      INT NOT NULL,
  carbs        INT NOT NULL,
  fat          INT NOT NULL,
  prep_time    INT NOT NULL,
  category     TEXT CHECK (category IN ('Breakfast', 'Lunch', 'Dinner', 'Snack', 'Healthy')) NOT NULL,
  tags         TEXT[] DEFAULT '{}',
  description  TEXT,
  ingredients  TEXT[] DEFAULT '{}',
  instructions TEXT[] DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Saved Meals ────────────────────────────────────────────
CREATE TABLE saved_meals (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  meal_id    UUID NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
  saved_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, meal_id)
);

-- ─── Daily Logs ─────────────────────────────────────────────
CREATE TABLE daily_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  meal_id      UUID NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
  meal_time    TEXT CHECK (meal_time IN ('Breakfast', 'Lunch', 'Dinner', 'Snack')) NOT NULL,
  logged_at    DATE NOT NULL DEFAULT CURRENT_DATE,
  calories     INT NOT NULL,
  protein      INT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Chat Messages ──────────────────────────────────────────
CREATE TABLE chat_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  text       TEXT NOT NULL,
  sender     TEXT CHECK (sender IN ('user', 'ai')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_meals  ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs   ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Meals: anyone authenticated can read meals
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view meals"
  ON meals FOR SELECT TO authenticated USING (true);

-- Saved meals: users manage only their own
CREATE POLICY "Users can view own saved meals"
  ON saved_meals FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save meals"
  ON saved_meals FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave meals"
  ON saved_meals FOR DELETE USING (auth.uid() = user_id);

-- Daily logs: users manage only their own
CREATE POLICY "Users can view own logs"
  ON daily_logs FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add logs"
  ON daily_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own logs"
  ON daily_logs FOR DELETE USING (auth.uid() = user_id);

-- Chat: users see only their own messages
CREATE POLICY "Users can view own messages"
  ON chat_messages FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can send messages"
  ON chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Seed Data — Meals
-- ============================================================

INSERT INTO meals (title, image, calories, protein, carbs, fat, prep_time, category, tags, description, ingredients, instructions) VALUES
(
  'Avocado Toast with Eggs',
  'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400',
  380, 18, 32, 22, 10, 'Breakfast',
  ARRAY['Quick', 'High Protein', 'Vegetarian'],
  'Creamy avocado on toasted sourdough topped with poached eggs and chili flakes.',
  ARRAY['2 slices sourdough', '1 ripe avocado', '2 eggs', 'chili flakes', 'lemon juice', 'salt & pepper'],
  ARRAY['Toast bread', 'Mash avocado with lemon juice', 'Poach eggs', 'Assemble and season']
),
(
  'Grilled Chicken Salad',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
  320, 42, 12, 10, 20, 'Lunch',
  ARRAY['High Protein', 'Low Carb', 'Keto'],
  'Juicy grilled chicken breast over mixed greens with a light vinaigrette.',
  ARRAY['200g chicken breast', 'mixed greens', 'cherry tomatoes', 'cucumber', 'olive oil', 'balsamic'],
  ARRAY['Season and grill chicken', 'Chop vegetables', 'Toss salad', 'Slice chicken and serve']
),
(
  'Salmon & Quinoa Bowl',
  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
  520, 38, 45, 18, 25, 'Dinner',
  ARRAY['Omega-3', 'Balanced', 'Healthy'],
  'Pan-seared salmon fillet over fluffy quinoa with roasted vegetables.',
  ARRAY['180g salmon fillet', '100g quinoa', 'broccoli', 'sweet potato', 'lemon', 'olive oil'],
  ARRAY['Cook quinoa', 'Roast vegetables', 'Pan-sear salmon', 'Assemble bowl']
),
(
  'Greek Yogurt Parfait',
  'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
  280, 20, 38, 5, 5, 'Snack',
  ARRAY['Quick', 'Probiotic', 'Vegetarian'],
  'Layered Greek yogurt with fresh berries, granola, and a drizzle of honey.',
  ARRAY['200g Greek yogurt', 'mixed berries', '30g granola', 'honey', 'chia seeds'],
  ARRAY['Layer yogurt', 'Add berries', 'Top with granola', 'Drizzle honey']
),
(
  'Veggie Stir Fry',
  'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
  290, 12, 42, 9, 15, 'Dinner',
  ARRAY['Vegan', 'Quick', 'Fiber-Rich'],
  'Colorful vegetables stir-fried in a savory soy-ginger sauce over brown rice.',
  ARRAY['mixed vegetables', 'brown rice', 'soy sauce', 'ginger', 'garlic', 'sesame oil'],
  ARRAY['Cook rice', 'Prep vegetables', 'Stir fry in wok', 'Add sauce and serve']
),
(
  'Overnight Oats',
  'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=400',
  340, 14, 52, 8, 5, 'Breakfast',
  ARRAY['Meal Prep', 'Fiber', 'Vegetarian'],
  'Creamy overnight oats loaded with banana, peanut butter, and chocolate chips.',
  ARRAY['80g rolled oats', '200ml almond milk', '1 banana', 'peanut butter', 'chocolate chips'],
  ARRAY['Combine oats and milk', 'Mix in toppings', 'Refrigerate overnight', 'Serve cold']
),
(
  'Turkey Wrap',
  'https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?w=400',
  410, 32, 38, 14, 10, 'Lunch',
  ARRAY['High Protein', 'On-the-Go', 'Lean'],
  'Sliced turkey breast with lettuce, tomato, and hummus in a whole wheat wrap.',
  ARRAY['whole wheat wrap', '100g turkey breast', 'lettuce', 'tomato', 'hummus', 'cucumber'],
  ARRAY['Spread hummus on wrap', 'Layer turkey and vegetables', 'Roll tightly', 'Slice in half']
),
(
  'Protein Smoothie Bowl',
  'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400',
  360, 28, 44, 7, 8, 'Breakfast',
  ARRAY['High Protein', 'Post-Workout', 'Vegan'],
  'Thick blended smoothie bowl with protein powder, topped with seeds and fresh fruit.',
  ARRAY['protein powder', 'frozen banana', 'almond milk', 'spinach', 'mixed seeds', 'berries'],
  ARRAY['Blend until thick', 'Pour into bowl', 'Add toppings', 'Serve immediately']
);
