/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/forgot-password` | `/(auth)/login` | `/(auth)/signup` | `/(onboarding)` | `/(onboarding)/allergies` | `/(onboarding)/calorie-setup` | `/(onboarding)/goal-selection` | `/(onboarding)/preferences` | `/(onboarding)/welcome` | `/(tabs)` | `/(tabs)/` | `/(tabs)/chat` | `/(tabs)/profile` | `/(tabs)/saved` | `/(tabs)/search` | `/_sitemap` | `/allergies` | `/calorie-setup` | `/chat` | `/edit-profile` | `/forgot-password` | `/goal-selection` | `/login` | `/preferences` | `/profile` | `/saved` | `/search` | `/settings` | `/signup` | `/splash` | `/welcome`;
      DynamicRoutes: `/meal/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/meal/[id]`;
    }
  }
}
