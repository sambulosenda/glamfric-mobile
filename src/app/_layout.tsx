import { Stack } from 'expo-router';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { StorageProvider } from '@/providers/StorageProvider';
import { apolloClient } from '@/graphql/client';
import '../../global.css';

/**
 * Root Layout
 *
 * Note: No AuthProvider needed with Zustand!
 * Auth store is globally available without provider wrapping.
 * This reduces component tree depth and eliminates unnecessary re-renders.
 */
export default function RootLayout() {
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
