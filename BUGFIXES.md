# Bug Fixes Log

---

## Bug 1 — `Cannot find module 'react-native-worklets-core'`

**Error shown:**
```
node_modules/expo-router/entry.js: [BABEL] Cannot find module 'react-native-worklets-core'
```

**Why it happened:**
`nativewind` v4 uses an internal package called `react-native-css-interop`. Its babel config (`react-native-css-interop/babel.js`) unconditionally loads `react-native-worklets/plugin` — even though this is only needed for React Native Reanimated v4+. The project was using Reanimated v3, so the `react-native-worklets` package was never installed, causing Babel to crash on startup before bundling any app code.

**Root cause file:**
```js
// node_modules/react-native-css-interop/babel.js
plugins: [
  "react-native-worklets/plugin",  // ← always loaded, even if not needed
]
```

**Solution applied:**
Installed the missing package that the babel plugin was trying to load:
```bash
npm install react-native-worklets --legacy-peer-deps
```
(`--legacy-peer-deps` was needed because `react-native-worklets` has a peer dependency conflict with the existing React Native version.)

After installing, cleared Metro cache and restarted:
```bash
npx expo start --clear
```

---

## Bug 2 — VS Code showing 10,000+ changes in Source Control

**What happened:**
VS Code's Source Control panel showed "Too many changes were detected. Only the first 10000 changes will be shown." even though `git status` in the terminal showed "nothing to commit, working tree clean".

**Why it happened:**
`node_modules` was added to `.gitignore` so git correctly ignores it. However, VS Code's file watcher watches the entire project directory including `node_modules` (1,200+ packages = thousands of files). VS Code was counting all of those as potential untracked changes, hitting the 10k display limit.

**Solution applied:**
Created `.vscode/settings.json` to tell VS Code to exclude `node_modules` and `.expo` from its file watcher entirely:
```json
{
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.expo/**": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.expo": true
  }
}
```
After reloading VS Code (Cmd+Shift+P → Reload Window), Source Control showed 0 changes.

---

## Bug 3 — `node_modules` committed to GitHub

**What happened:**
When running `git add .` for the first time, the `.gitignore` file was present but `node_modules` was already staged. Git committed all 37,000+ files from `node_modules` to the remote repo.

**Why it happened:**
`git add .` stages everything in the working directory. Even though `.gitignore` existed, it only prevents *untracked* files from being staged — if files are already staged (or tracked), `.gitignore` has no effect on them.

**Solution applied:**
Removed `node_modules` from git tracking without deleting the actual files:
```bash
git rm -r --cached node_modules .expo
```
Then committed the removal and pushed:
```bash
git add .gitignore
git commit -m "Remove node_modules from tracking, add proper .gitignore"
git push
```
The repo now only contains source files. Anyone cloning runs `npm install` to get dependencies.

**Lesson:** Always create `.gitignore` and verify it before the first `git add .`.

---

## Bug 4 — `react-native-reanimated/plugin` missing from babel config

**Error shown:**
App would crash or animations wouldn't work because the Reanimated Babel plugin wasn't configured.

**Why it happened:**
`react-native-reanimated` requires its Babel plugin to be explicitly added to `babel.config.js`. Without it, the library's worklet functions (animations that run on the UI thread) don't get transformed correctly at build time.

**Solution applied:**
Added the plugin to `babel.config.js` — it must always be the **last** plugin:
```js
plugins: [
  'react-native-reanimated/plugin', // must be last
],
```
Then cleared Metro cache:
```bash
npx expo start --clear
```

---

## Bug 5 — TypeScript errors in VS Code ("Cannot use JSX unless --jsx flag is provided")

**What happened:**
VS Code showed dozens of TypeScript errors like "Cannot use JSX unless the '--jsx' flag is provided" and "Parameter implicitly has an 'any' type" across `.tsx` files — but the app compiled and ran fine.

**Why it happened:**
VS Code's TypeScript language server was using its own TypeScript version instead of the project's `tsconfig.json`. The project's `tsconfig.json` extends `expo/tsconfig.base` which sets `"jsx": "react-native"` and all required options. But the IDE picked up a different config context.

**Solution applied:**
These are **false positives** — they don't affect the actual build. The Expo bundler (Metro + Babel) handles JSX transformation correctly via `babel-preset-expo`. No code change was needed. To suppress in VS Code, ensure the workspace uses the project's TypeScript version: Cmd+Shift+P → "TypeScript: Select TypeScript Version" → "Use Workspace Version".
