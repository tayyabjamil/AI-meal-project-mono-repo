# MealAI — Project Progress Log

---

## Day 1 — Project Setup

**Created the Expo project with TypeScript template:**
```bash
npx create-expo-app@latest mealApp --template blank-typescript
cd mealApp
```

**Set Expo Router as the entry point** (in `package.json`):
```json
"main": "expo-router/entry"
```

**Installed Expo Router and required dependencies:**
```bash
npx expo install expo-router expo-linking expo-constants expo-font expo-splash-screen expo-status-bar
npx expo install react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated
npm install @expo/vector-icons
```

**Started the dev server:**
```bash
npx expo start
```

---

## Day 2 — Added NativeWind (Tailwind CSS)

**Installed NativeWind and Tailwind:**
```bash
npm install nativewind tailwindcss
```

**Created `tailwind.config.js`** — tells Tailwind which files to scan and adds custom brand colors:
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

**Created `global.css`** — required entry point for Tailwind:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Updated `babel.config.js`** — added NativeWind preset and Reanimated plugin:
```js
presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
plugins: ['react-native-reanimated/plugin'],
```

**Created `metro.config.js`** — wires NativeWind into Metro bundler:
```js
const { withNativeWind } = require('nativewind/metro');
module.exports = withNativeWind(getDefaultConfig(__dirname), { input: './global.css' });
```

**Created `nativewind-env.d.ts`** — TypeScript support for `className` prop.

**Always clear cache after config changes:**
```bash
npx expo start --clear
```

---

## Day 3 — Folder Structure & Types

**Created the project structure:**
```
app/
  (auth)/           ← login, signup, forgot-password
  (onboarding)/     ← 5-step onboarding flow
  (tabs)/           ← main bottom tab navigation
  meal/[id].tsx     ← dynamic meal detail screen
components/         ← reusable UI components
constants/          ← colors, mock data
services/           ← data/chat service layer
types/              ← TypeScript type definitions
```

**Defined types in `types/index.ts`:**
- `Meal` — meal data shape (id, title, image, calories, protein, etc.)
- `ChatMessage` — chat message with sender and timestamp
- `UserProfile` — user data (goal, diet type, allergies, calorie target)
- Union types: `MealCategory`, `GoalType`, `DietType`, `Cuisine`

**Added mock data in `constants/mockData.ts`:**
- 8 sample meals (Avocado Toast, Grilled Chicken, Salmon Bowl, etc.)
- 3 seed chat messages
- 1 mock user profile (Alex Johnson)

---

## Day 4 — Reusable Components

**Built 5 reusable components in `/components`:**

- **`Button.tsx`** — variants: primary, secondary, outline, ghost. Sizes: sm, md, lg. Supports loading spinner and disabled state.
- **`Input.tsx`** — label, error message, left/right icons, password toggle with eye icon, focus border highlight.
- **`Card.tsx`** — wrapper with variants: default, elevated, flat. Padding options: none, sm, md, lg.
- **`MealCard.tsx`** — vertical (full image card) and horizontal (compact row) layouts. Shows image, title, calories, protein. Has bookmark toggle and navigates to meal detail on press.
- **`ChatBubble.tsx`** — user messages right-aligned (green), AI messages left-aligned (white/slate). Shows timestamp.

All components use **NativeWind `className`** for styling and support dark mode via `dark:` prefix.

---

## Day 5 — Navigation Setup

**Root layout (`app/_layout.tsx`):**
- Wrapped entire app in `SafeAreaProvider`
- Stack navigator — hides header for auth/onboarding/tabs groups
- Shows header for meal detail (transparent), edit-profile, and settings screens

**Tab layout (`app/(tabs)/_layout.tsx`):**
- 5 tabs: Home, Search, AI Chat, Saved, Profile
- Active tab shows green pill background behind icon
- Tab bar: 70px height, shadow, `#22c55e` active color

**Auth layout (`app/(auth)/_layout.tsx`)** — simple stack, no header.
**Onboarding layout (`app/(onboarding)/_layout.tsx`)** — simple stack, no header.

**Entry point (`app/index.tsx`):**
```tsx
return <Redirect href="/splash" />;
```

---

## Day 6 — Auth Screens

**Splash screen (`app/splash.tsx`):**
- Animated logo (fade in + spring scale using `Animated` from React Native)
- Auto-redirects to login after 2.2 seconds

**Login screen (`app/(auth)/login.tsx`):**
- Email + password inputs
- Loading state on sign in (1.2s mock delay) → navigates to main tabs
- Google + Apple social buttons
- Links to signup and forgot password

**Signup screen (`app/(auth)/signup.tsx`):**
- Name, email, password, confirm password
- On success → navigates to onboarding welcome

**Forgot password screen (`app/(auth)/forgot-password.tsx`):**
- Email input → send reset link
- Shows success message after submit

---

## Day 7 — Onboarding Flow

5-step flow with a progress bar at the top showing current step.

| Step | Screen | What it does |
|------|--------|--------------|
| 1 | `welcome.tsx` | App intro + feature highlights |
| 2 | `goal-selection.tsx` | Pick goal: lose weight, gain muscle, maintain |
| 3 | `preferences.tsx` | Choose cuisines + diet type |
| 4 | `allergies.tsx` | Select allergens to avoid |
| 5 | `calorie-setup.tsx` | Set daily calorie target → enters main app |

Each step's Continue button is disabled until a selection is made.

---

## Day 8 — Main Tab Screens

**Home (`(tabs)/index.tsx`):**
- Greeting + avatar header
- Calorie tracker card with circular progress and macro breakdown
- Horizontal scroll: Quick & Easy meals (≤10 min prep)
- Vertical list: Recommended meals

**Search (`(tabs)/search.tsx`):**
- Search input with clear button
- Category filter chips: All, Breakfast, Lunch, Dinner, Snack, Healthy
- Real-time filtering, result count, empty state

**Chat (`(tabs)/chat.tsx`):**
- AI assistant header with online indicator
- Message list using `ChatBubble`
- Typing indicator (3 animated dots while AI "thinks")
- Quick suggestion chips
- Multiline input + send button, `KeyboardAvoidingView` for keyboard handling

**Saved (`(tabs)/saved.tsx`):**
- Pre-saved meals list, toggle to unsave
- Empty state with icon + message

**Profile (`(tabs)/profile.tsx`):**
- Avatar, name, email, goal badge
- Stats: meals logged, streak, avg calories
- Menu: Edit Profile, Settings, Notifications, Privacy, Help
- Sign Out button

---

## Day 9 — Detail & Settings Screens

**Meal Detail (`app/meal/[id].tsx`):**
- Dynamic route — gets meal ID from URL params
- Hero image with back/bookmark buttons
- Macro grid (calories, protein, carbs, fat)
- Ingredients list + numbered instructions
- Fixed bottom "Add to Today's Log" CTA

**Edit Profile (`app/edit-profile.tsx`):**
- Edit name, email, goal, calorie target
- Camera button on avatar

**Settings (`app/settings.tsx`):**
- Toggle switches: Meal Reminders, Dark Mode, Metric Units, Share Progress
- Link rows: Terms, Privacy, Help, Rate App
- App version at bottom

---

## Day 10 — Services Layer

**`services/mealService.ts`** — data access layer for meals:
- `getAll()`, `getById(id)`, `getByCategory()`, `search()`, `getQuickMeals()`, `getRecommended()`

**`services/chatService.ts`** — chat logic extracted from screen:
- `getAIResponse(message)` — async mock response with random delay
- `createUserMessage()` / `createAIMessage()` — message factory functions

---

## Git Setup

```bash
echo "# AI-meal-project-mono-repo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/tayyabjamil/AI-meal-project-mono-repo.git
git push -u origin main
```

Added `.gitignore` to exclude:
```
node_modules/
.expo/
.env / .env.* / *.env
dist/
```

Added `.vscode/settings.json` to stop VS Code from watching node_modules (fixes 10k changes in Source Control).

---

## Dev Commands Reference

```bash
npx expo start              # start dev server
npx expo start --clear      # clear Metro cache (use after config changes)
npx expo start --ios        # open iOS simulator
npx expo start --android    # open Android emulator
npx tsc --noEmit            # TypeScript check without building
git status                  # check working tree
git add . && git commit -m "message" && git push
```
