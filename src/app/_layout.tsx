import { Stack } from 'expo-router';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { StorageProvider } from '@/providers/StorageProvider';
import { apolloClient } from '@/graphql/client';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import '../../global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

/**
 * Root Layout
 *
 * Note: No AuthProvider needed with Zustand!
 * Auth store is globally available without provider wrapping.
 * This reduces component tree depth and eliminates unnecessary re-renders.
 */
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'DM-Sans': require('../../assets/fonts/DMSans-Regular.ttf'),
    'DM-Sans-Bold': require('../../assets/fonts/DMSans-Bold.ttf'),
    'DM-Sans-Medium': require('../../assets/fonts/DMSans-Medium.ttf'),
    'DM-Sans-SemiBold': require('../../assets/fonts/DMSans-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <StorageProvider>
          <ApolloProvider client={apolloClient}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
          </ApolloProvider>
        </StorageProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
