# MealAI — Frontend Docs (Expo + React Native)

---

## Day 1 — Setup & Config

**Created the project:**
```bash
npx create-expo-app@latest mealApp --template blank-typescript
cd mealApp
```

**Set Expo Router as entry point in `package.json`:**
```json
"main": "expo-router/entry"
```

**Installed core dependencies:**
```bash
npx expo install expo-router expo-linking expo-constants expo-font expo-splash-screen expo-status-bar
npx expo install react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated
npm install @expo/vector-icons
```

**Added NativeWind (Tailwind for React Native):**
```bash
npm install nativewind tailwindcss
npm install react-native-worklets react-native-worklets-core --legacy-peer-deps
```

**Created `tailwind.config.js`:**
```js
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        'primary-dark': '#16a34a',
        'primary-light': '#dcfce7',
        accent: '#f97316',
      },
    },
  },
};
```

**Created `global.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Updated `babel.config.js`:**
```js
presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
plugins: ['react-native-reanimated/plugin'], // must be last
```

**Created `metro.config.js`:**
```js
const { withNativeWind } = require('nativewind/metro');
module.exports = withNativeWind(getDefaultConfig(__dirname), { input: './global.css' });
```

**Created `nativewind-env.d.ts`** — enables `className` prop in TypeScript.

**Added Supabase client:**
```bash
npm install @supabase/supabase-js expo-secure-store
```

Created `lib/supabase.ts` — Supabase client using `expo-secure-store` for secure session persistence on device.

---

## Day 1 — Folder Structure

```
app/
  (auth)/           ← login, signup, forgot-password
  (onboarding)/     ← 5-step onboarding flow
  (tabs)/           ← bottom tab navigation
  meal/[id].tsx     ← dynamic meal detail
  _layout.tsx       ← root stack layout
  index.tsx         ← redirects to splash
  splash.tsx
  edit-profile.tsx
  settings.tsx
components/         ← reusable UI components
constants/          ← colors, mock data
lib/
  supabase.ts       ← Supabase client instance
services/           ← data/chat service layer
types/              ← TypeScript interfaces
```

**Types defined in `types/index.ts`:**
- `Meal` — id, title, image, calories, protein, carbs, fat, prepTime, category, tags, description, ingredients, instructions
- `ChatMessage` — id, text, sender (`'user' | 'ai'`), timestamp
- `UserProfile` — name, email, avatar, goal, dailyCalorieTarget, dietType, allergies
- Union types: `MealCategory`, `GoalType`, `DietType`, `Cuisine`

**Mock data in `constants/mockData.ts`:**
- 8 meals (Avocado Toast, Grilled Chicken, Salmon Bowl, Greek Yogurt Parfait, Veggie Stir Fry, Overnight Oats, Turkey Wrap, Protein Smoothie Bowl)
- 3 seed chat messages
- 1 mock user profile

---

## Day 1 — Components

All components use NativeWind `className` and support `dark:` prefix for dark mode.

**`Button.tsx`**
- Props: `title`, `onPress`, `variant` (primary | secondary | outline | ghost), `size` (sm | md | lg), `loading`, `disabled`, `fullWidth`, `icon`
- Shows `ActivityIndicator` when `loading` is true

**`Input.tsx`**
- Props: `label`, `error`, `leftIcon`, `rightIcon`, `onRightIconPress`, `isPassword`
- Focus highlights border green, password toggle with eye icon

**`Card.tsx`**
- Props: `variant` (default | elevated | flat), `padding` (none | sm | md | lg)
- `rounded-3xl` corners, shadow on elevated variant

**`MealCard.tsx`**
- Props: `meal`, `onSave`, `isSaved`, `variant` (vertical | horizontal)
- Vertical: full image card with category badge, macro stats
- Horizontal: compact row with image left, info right
- Bookmark toggle, taps to `/meal/[id]`

**`ChatBubble.tsx`**
- Props: `message: ChatMessage`
- User → right-aligned, green background
- AI → left-aligned, white/slate background with "AI" avatar circle
- Shows formatted timestamp

---

## Day 1 — Navigation

**Root layout `app/_layout.tsx`:**
- `SafeAreaProvider` wraps the entire app
- `Stack` navigator — header hidden for auth/onboarding/tabs
- Transparent overlay header for meal detail screen
- Named headers for edit-profile and settings

**Tab layout `app/(tabs)/_layout.tsx`:**
- 5 tabs: Home, Search, AI Chat, Saved, Profile
- Active tab: green pill highlight behind icon
- Tab bar: 70px, shadow, `#22c55e` active color

**`app/index.tsx`** → redirects to `/splash`

---

## Day 2 — Screens

### Auth Screens
- **`splash.tsx`** — animated logo (fade + spring scale), auto-redirects to login after 2.2s
- **`(auth)/login.tsx`** — email/password, loading state, Google/Apple social buttons
- **`(auth)/signup.tsx`** — name, email, password, confirm password → onboarding
- **`(auth)/forgot-password.tsx`** — email input, success state after submit

### Onboarding (5 steps, progress bar at top)

| Step | Screen | Purpose |
|------|--------|---------|
| 1 | `welcome.tsx` | Intro + feature highlights |
| 2 | `goal-selection.tsx` | Lose weight / gain muscle / maintain |
| 3 | `preferences.tsx` | Cuisines + diet type |
| 4 | `allergies.tsx` | Food allergens |
| 5 | `calorie-setup.tsx` | Daily calorie target → main app |

### Tab Screens
- **Home** — calorie tracker card (progress + macros), horizontal quick meals, vertical recommended list
- **Search** — search input + category filter chips, real-time filtering, empty state
- **Chat** — AI assistant, message list, typing indicator (3 dots), suggestion chips, `KeyboardAvoidingView`
- **Saved** — saved meals list, unsave toggle, empty state
- **Profile** — avatar, stats card, daily progress, menu, sign out

### Additional Screens
- **`meal/[id].tsx`** — hero image, macro grid, ingredients, numbered instructions, fixed bottom CTA
- **`edit-profile.tsx`** — edit name, email, goal, calorie target
- **`settings.tsx`** — toggle switches, link rows, version footer

---

## Dev Commands

```bash
npx expo start              # start dev server
npx expo start --clear      # clear Metro cache (run after any config change)
npx expo start --ios        # iOS simulator
npx expo start --android    # Android emulator
npx tsc --noEmit            # TypeScript check
```

## Environment Variables

Copy `.env.example` to `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> Variables prefixed with `EXPO_PUBLIC_` are exposed to the app bundle. Never put secret/service-role keys here.
