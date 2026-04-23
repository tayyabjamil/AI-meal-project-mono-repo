# Bug Fixes Log

---

## Bug — `Cannot find module 'react-native-worklets'`

**Error shown in simulator:**
```
node_modules/expo-router/entry.js: [BABEL] Cannot find module 'react-native-worklets-core'
```

**Why it happened:**
`nativewind` v4 uses an internal package called `react-native-css-interop`. Its babel config unconditionally loads `react-native-worklets/plugin` — even though this is only needed for React Native Reanimated v4+. The project uses Reanimated v3, so `react-native-worklets` was never installed. This caused Babel to crash before bundling any app code at all.

The exact line causing the issue in `node_modules/react-native-css-interop/babel.js`:
```js
plugins: [
  require("./dist/babel-plugin").default,
  ["@babel/plugin-transform-react-jsx", { ... }],
  "react-native-worklets/plugin",  // ← always loaded, even when not needed
]
```

**Solution applied:**
Installed the missing packages that the babel plugin was trying to load:
```bash
npm install react-native-worklets react-native-worklets-core --legacy-peer-deps
```

> `--legacy-peer-deps` was required because these packages have peer dependency conflicts with the React Native version in the project.

Then cleared Metro cache and restarted:
```bash
npx expo start --clear
```
