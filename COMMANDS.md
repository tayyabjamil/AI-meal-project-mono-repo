# MealAI — Project Progress Log

---

## Day 1 — Project Setup, Config & Structure

**Created the Expo project with TypeScript template:**
```bash
npx create-expo-app@latest mealApp --template blank-typescript
cd mealApp
```

**Set Expo Router as the entry point** (in `package.json`):
```json
"main": "expo-router/entry"
```

**Installed all dependencies:**
```bash
npx expo install expo-router expo-linking expo-constants expo-font expo-splash-screen expo-status-bar
npx expo install react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated
npm install @expo/vector-icons
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
plugins: ['react-native-reanimated/plugin'],
```

**Created `metro.config.js`:**
```js
const { withNativeWind } = require('nativewind/metro');
module.exports = withNativeWind(getDefaultConfig(__dirname), { input: './global.css' });
```

**Created `nativewind-env.d.ts`** — TypeScript support for `className` prop.

**Created folder structure:**
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
- `Meal` — id, title, image, calories, protein, carbs, fat, prepTime, category, tags, description, ingredients, instructions
- `ChatMessage` — id, text, sender, timestamp
- `UserProfile` — name, email, avatar, goal, dailyCalorieTarget, dietType, allergies
- Union types: `MealCategory`, `GoalType`, `DietType`, `Cuisine`

**Added mock data in `constants/mockData.ts`:**
- 8 sample meals (Avocado Toast, Grilled Chicken, Salmon Bowl, etc.)
- 3 seed chat messages
- 1 mock user (Alex Johnson)

**Built 5 reusable components in `/components`:**
- **`Button.tsx`** — variants: primary, secondary, outline, ghost. Sizes: sm, md, lg. Loading spinner + disabled state.
- **`Input.tsx`** — label, error, left/right icons, password toggle, focus border highlight.
- **`Card.tsx`** — variants: default, elevated, flat. Padding: none, sm, md, lg.
- **`MealCard.tsx`** — vertical (full image) and horizontal (compact row) layouts. Bookmark toggle, navigates to meal detail.
- **`ChatBubble.tsx`** — user messages right-aligned (green), AI messages left-aligned (white/slate) with timestamp.

**Set up navigation layouts:**
- `app/_layout.tsx` — root stack, `SafeAreaProvider`, transparent header for meal detail
- `app/(tabs)/_layout.tsx` — 5 tabs (Home, Search, AI Chat, Saved, Profile), green active color, 70px tab bar
- `app/(auth)/_layout.tsx` and `app/(onboarding)/_layout.tsx` — simple stacks, no header
- `app/index.tsx` — redirects to `/splash`

**Started dev server:**
```bash
npx expo start --clear
```

---

## Day 2 — All Screens, Services & Git

**Auth screens:**
- `splash.tsx` — animated logo (fade + spring), auto-redirects to login after 2.2s
- `(auth)/login.tsx` — email/password, loading state, Google/Apple buttons, links to signup + forgot password
- `(auth)/signup.tsx` — name, email, password, confirm password → navigates to onboarding
- `(auth)/forgot-password.tsx` — email input, send reset link, success message

**Onboarding flow** (5 steps, progress bar at top):

| Step | Screen | What it does |
|------|--------|--------------|
| 1 | `welcome.tsx` | App intro + feature highlights |
| 2 | `goal-selection.tsx` | Pick goal: lose weight / gain muscle / maintain |
| 3 | `preferences.tsx` | Choose cuisines + diet type |
| 4 | `allergies.tsx` | Select allergens to avoid |
| 5 | `calorie-setup.tsx` | Set daily calorie target → enters main app |

**Main tab screens:**
- `(tabs)/index.tsx` — greeting header, calorie tracker card with circular progress + macros, horizontal quick meals scroll, vertical recommended list
- `(tabs)/search.tsx` — search input, category filter chips, real-time filtering, empty state
- `(tabs)/chat.tsx` — AI assistant header, message list, typing indicator (3 dots), suggestion chips, multiline input + send button, `KeyboardAvoidingView`
- `(tabs)/saved.tsx` — saved meals list, unsave toggle, empty state
- `(tabs)/profile.tsx` — avatar, stats card, calorie progress, menu, sign out

**Additional screens:**
- `meal/[id].tsx` — dynamic route, hero image, macro grid, ingredients list, numbered instructions, fixed bottom CTA
- `edit-profile.tsx` — edit name, email, goal, calorie target
- `settings.tsx` — toggle switches (reminders, dark mode, units), link rows, version footer

**Services layer:**
- `services/mealService.ts` — `getAll()`, `getById()`, `getByCategory()`, `search()`, `getQuickMeals()`, `getRecommended()`
- `services/chatService.ts` — `getAIResponse()`, `createUserMessage()`, `createAIMessage()`

**Git setup and pushed to GitHub:**
```bash
echo "# AI-meal-project-mono-repo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/tayyabjamil/AI-meal-project-mono-repo.git
git push -u origin main
git add .
git commit -m "Add full MealAI Expo app"
git push
```

**Added `.gitignore`:**
```
node_modules/
.expo/
.env / .env.* / *.env
dist/
```

**Added `.vscode/settings.json`** — excludes `node_modules` from VS Code file watcher (fixes 10k phantom changes in Source Control).

---

## Dev Commands Reference

```bash
npx expo start              # start dev server
npx expo start --clear      # clear Metro cache (always run after config changes)
npx expo start --ios        # open iOS simulator
npx expo start --android    # open Android emulator
npx tsc --noEmit            # TypeScript check without building
git status                  # check working tree
git add . && git commit -m "message" && git push
```
