import { Redirect } from 'expo-router';

// Entry point: redirect to splash screen
export default function Index() {
  return <Redirect href="/splash" />;
}
