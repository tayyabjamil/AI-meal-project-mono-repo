# MealAI — Development Progress

## Quick Start Commands

```bash
npm install                  # install all dependencies
npx expo start               # start dev server (scan QR with Expo Go)
npx expo start --ios         # run on iOS simulator
npx expo start --android     # run on Android emulator
npx expo start --clear       # clear Metro cache (run after config changes)
npx tsc --noEmit             # check TypeScript errors
```

---

## Session 1 — Project Bootstrap

**Command used:**
```bash
npx create-expo-app@latest mealApp --template blank-typescript
cd mealApp
```

Scaffolded a blank Expo + TypeScript project. Deleted the default `App.tsx` and set up Expo Router as the entry point.

**Changes to `package.json`:**
```json
"main": "expo-router/entry"
```

**Packages added:**
```bash
npx expo install expo-router expo-linking expo-constants expo-font expo-splash-screen expo-status-bar
npx expo install react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated
npm install @expo/vector-icons
```

---

## Session 2 — NativeWind Setup

Added NativeWind (Tailwind CSS for React Native).

**Packages added:**
```bash
npm install nativewind tailwindcss
```

**`tailwind.config.js`** created:
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
        'accent-light': '#fff7ed',
      },
    },
  },
};
```

**`global.css`** created:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**`babel.config.js`** updated:
```js
presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel']
```

**`metro.config.js`** created:
```js
const { withNativeWind } = require('nativewind/metro');
module.exports = withNativeWind(getDefaultConfig(__dirname), { input: './global.css' });
```

**`nativewind-env.d.ts`** created for TypeScript support.

---

## Session 3 — Folder Structure & Types

Created the scalable project structure:

```
app/
  (auth)/          ← auth screens group
  (onboarding)/    ← onboarding flow group
  (tabs)/          ← main tab navigation
  meal/            ← dynamic routes
components/        ← reusable UI components
constants/         ← colors, mock data
services/          ← data/API service layer
types/             ← TypeScript interfaces
```

**`types/index.ts`** defined interfaces:
- `Meal` — id, title, image, calories, protein, carbs, fat, prepTime, category, tags, description, ingredients, instructions
- `ChatMessage` — id, text, sender, timestamp
- `UserProfile` — name, email, avatar, goal, dailyCalorieTarget, dietType, allergies
- `DailyLog`, `LoggedMeal` — calorie tracking
- Union types: `MealCategory`, `GoalType`, `DietType`, `Cuisine`

**`constants/mockData.ts`** created with:
- `MOCK_MEALS` — 8 meals (Avocado Toast, Grilled Chicken Salad, Salmon Bowl, Greek Yogurt Parfait, Veggie Stir Fry, Overnight Oats, Turkey Wrap, Protein Smoothie Bowl)
- `MOCK_CHAT_MESSAGES` — 3 seed messages
- `MOCK_USER` — Alex Johnson profile

**`constants/colors.ts`** created with light/dark theme color tokens.

---

## Session 4 — Reusable Components

All components use NativeWind className styling.

### `components/Button.tsx`
Props: `title`, `onPress`, `variant` (primary | secondary | outline | ghost), `size` (sm | md | lg), `loading`, `disabled`, `fullWidth`, `icon`
- Loading state shows `ActivityIndicator`
- Disabled + loading reduces opacity to 50%

### `components/Input.tsx`
Props: `label`, `error`, `leftIcon`, `rightIcon`, `onRightIconPress`, `isPassword`
- Focus highlights border in primary green
- Password toggle with eye icon
- Ionicons support for left/right icons

### `components/Card.tsx`
Props: `variant` (default | elevated | flat), `padding` (none | sm | md | lg)
- Reusable card wrapper with rounded-3xl corners
- Elevated variant uses shadow

### `components/MealCard.tsx`
Props: `meal`, `onSave`, `isSaved`, `variant` (vertical | horizontal)
- **Vertical** — full image card with category badge + macro stats
- **Horizontal** — compact row layout (image left, info right)
- Bookmark toggle with green active state
- Tapping navigates to `/meal/[id]`

### `components/ChatBubble.tsx`
Props: `message: ChatMessage`
- User messages: right-aligned, green background
- AI messages: left-aligned, white/slate background with "AI" avatar
- Shows formatted timestamp below each bubble

---

## Session 5 — Navigation Layout

**`app/_layout.tsx`** (Root Stack):
- Wraps app in `SafeAreaProvider`
- `StatusBar` style auto
- Transparent header for meal detail route
- Titled headers for edit-profile and settings

**`app/(auth)/_layout.tsx`** — Stack, no header
**`app/(onboarding)/_layout.tsx`** — Stack, no header
**`app/(tabs)/_layout.tsx`** — Tabs with:
- 5 tabs: Home, Search, AI Chat, Saved, Profile
- Active tab icon highlighted with green pill background
- Tab bar height 70px with shadow
- Active color: `#22c55e`

**`app/index.tsx`** — Redirects to `/splash`

---

## Session 6 — Auth Screens

### `app/splash.tsx`
- Animated logo (fade + spring scale)
- Auto-redirects to login after 2.2s
- Full-screen primary green background

### `app/(auth)/login.tsx`
- Email + password inputs
- Forgot password link → `/(auth)/forgot-password`
- Sign In button with loading state → navigates to `/(tabs)`
- Google + Apple social auth buttons
- Sign up link → `/(auth)/signup`

### `app/(auth)/signup.tsx`
- Name, email, password, confirm password inputs
- Terms acceptance note
- Create Account button → navigates to `/(onboarding)/welcome`
- Sign in link

### `app/(auth)/forgot-password.tsx`
- Email input
- Send Reset Link button with loading + success state
- Back to login link

---

## Session 7 — Onboarding Flow (5 steps)

Progress bar at top shows current step (1 of 5 highlighted).

### `app/(onboarding)/welcome.tsx` — Step 0
- Large emoji illustration area
- Feature highlights: personalized meals, AI guidance, calorie tracking
- "Get Started" → `goal-selection`

### `app/(onboarding)/goal-selection.tsx` — Step 1
- 3 goal cards: Lose Weight 🏃, Gain Muscle 💪, Maintain ⚖️
- Selected state: primary border + green check
- "Continue" disabled until selection made

### `app/(onboarding)/preferences.tsx` — Step 2
- Cuisine selection: American, Italian, Asian, Mexican, Mediterranean, Indian
- Diet type: None, Vegetarian, Vegan, Keto, Paleo, Gluten-Free
- Multi-select chips with active state

### `app/(onboarding)/allergies.tsx` — Step 3
- Common allergens: Peanuts, Tree Nuts, Dairy, Gluten, Eggs, Shellfish, Soy, Fish
- Toggle chips (can select multiple or none)
- "None" option available

### `app/(onboarding)/calorie-setup.tsx` — Step 4
- Slider or preset buttons for daily calorie target
- Presets: 1200, 1500, 1800, 2000, 2500 kcal
- "Finish Setup" → `/(tabs)` (main app)

---

## Session 8 — Main Tab Screens

### `app/(tabs)/index.tsx` — Home
- Greeting header with user avatar
- Calorie tracker card: consumed vs. remaining, circular progress, macro bars
- Horizontal scroll: Quick & Easy meals (≤10 min prep)
- Vertical list: Recommended meals
- Uses `MealCard` in both vertical and horizontal variants

### `app/(tabs)/search.tsx` — Search
- Search input with clear button
- Horizontal category filter chips: All, Breakfast, Lunch, Dinner, Snack, Healthy
- Filtered results count
- Empty state with emoji + message
- Real-time filtering by query + category

### `app/(tabs)/chat.tsx` — AI Chat
- Header: NutriAI Assistant with online indicator
- Message list using `ChatBubble` component
- Typing indicator (3 animated dots)
- Suggestion chips: quick prompt shortcuts
- Input with multiline support + send button
- `KeyboardAvoidingView` for iOS/Android

### `app/(tabs)/saved.tsx` — Saved Meals
- Pre-seeded with 3 saved meal IDs
- Toggle unsave directly from list
- Empty state with bookmark icon + CTA text

### `app/(tabs)/profile.tsx` — Profile
- Avatar with edit camera button
- User name, email, goal badge
- Stats card: meals logged, streak days, avg calories
- Daily calorie progress bar
- Menu: Edit Profile, Settings, Notifications, Privacy, Help
- Sign Out button (red) → navigates back to login

---

## Session 9 — Additional Screens

### `app/meal/[id].tsx` — Meal Detail (dynamic route)
- Hero image with back + bookmark buttons
- Category badge overlay
- Prep time
- Tags row
- Macro grid: calories, protein, carbs, fat
- About / description section
- Ingredients list with bullet dots
- Numbered instructions
- Fixed bottom "Add to Today's Log" CTA button

### `app/edit-profile.tsx` — Edit Profile
- Avatar with camera icon
- Editable: name, email
- Goal selector
- Calorie target
- Save Changes button

### `app/settings.tsx` — Settings
- Toggle switches: Meal Reminders, Dark Mode, Metric Units, Share Progress
- Link rows: Terms of Service, Privacy Policy, Help Center, Rate the App
- App version footer

---

## Session 10 — Services Layer

**`services/mealService.ts`**
- `getAll()` — return all meals
- `getById(id)` — find meal by id
- `getByCategory(category)` — filter by category
- `search(query, category)` — combined search + filter
- `getQuickMeals(maxPrepTime)` — meals under time threshold
- `getRecommended(limit)` — top N meals

**`services/chatService.ts`**
- `getAIResponse(userMessage)` — async mock AI response with delay
- `createUserMessage(text)` — factory for user `ChatMessage`
- `createAIMessage(text)` — factory for AI `ChatMessage`

---

## Final Project Structure

```
mealApp/
├── app/
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   ├── (onboarding)/
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── goal-selection.tsx
│   │   ├── preferences.tsx
│   │   ├── allergies.tsx
│   │   └── calorie-setup.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx        ← Home
│   │   ├── search.tsx
│   │   ├── chat.tsx
│   │   ├── saved.tsx
│   │   └── profile.tsx
│   ├── meal/
│   │   └── [id].tsx         ← dynamic meal detail
│   ├── _layout.tsx          ← root stack
│   ├── index.tsx            ← redirect to splash
│   ├── splash.tsx
│   ├── edit-profile.tsx
│   └── settings.tsx
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ChatBubble.tsx
│   ├── Input.tsx
│   └── MealCard.tsx
├── constants/
│   ├── colors.ts
│   └── mockData.ts
├── services/
│   ├── mealService.ts
│   └── chatService.ts
├── types/
│   └── index.ts
├── global.css
├── tailwind.config.js
├── babel.config.js
├── metro.config.js
├── nativewind-env.d.ts
├── tsconfig.json
└── app.json
```

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| expo | ~51.0.28 | Core Expo SDK |
| expo-router | ~3.5.23 | File-based routing |
| expo-status-bar | ~1.12.1 | Status bar control |
| expo-splash-screen | ~0.27.5 | Splash screen API |
| react-native | 0.74.5 | Core RN |
| react-native-safe-area-context | 4.10.5 | Safe area insets |
| react-native-screens | 3.31.1 | Native screen optimization |
| react-native-gesture-handler | ~2.16.1 | Gesture support |
| react-native-reanimated | ~3.10.1 | Animations |
| nativewind | ^4.0.36 | Tailwind CSS for RN |
| tailwindcss | 3.4.10 | Tailwind core |
| @expo/vector-icons | ^14.0.2 | Ionicons + icon sets |
