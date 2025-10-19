/**
 * Zustand Store Usage Examples
 *
 * This file contains practical examples of using Zustand stores
 * in different scenarios. Use these as reference patterns.
 */

import React, { useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import {
  useAuthStore,
  useUser,
  useIsAuthenticated,
  useAuthLoading,
  useTheme,
  useUIStore,
  authActions,
} from '@/store';

/**
 * Example 1: Login Form
 * Shows how to use auth actions and loading/error state
 */
export function LoginFormExample() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Get login action (component never re-renders from this)
  const login = useAuthStore((state) => state.login);

  // Subscribe to specific state slices
  const isLoading = useAuthLoading();
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const router = useRouter();

  // Clear error when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      // Error already set in store
      console.error('Login failed:', err);
    }
  };

  return (
    <View>
      {/* Email/password inputs */}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <Button onPress={handleLogin} disabled={isLoading} title="Login" />

      {isLoading && <ActivityIndicator />}
    </View>
  );
}

/**
 * Example 2: User Profile Display
 * Shows optimized selector usage for display-only components
 */
export function UserProfileExample() {
  // Use optimized selector - only re-renders when user changes
  const user = useUser();

  if (!user) {
    return <Text>Not logged in</Text>;
  }

  return (
    <View>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Role: {user.role}</Text>
    </View>
  );
}

/**
 * Example 3: Protected Route
 * Shows authentication check without unnecessary re-renders
 */
export function ProtectedRouteExample({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <ActivityIndicator />;
  }

  return <>{children}</>;
}

/**
 * Example 4: Logout Button
 * Shows how to use actions without subscribing to state
 */
export function LogoutButtonExample() {
  const router = useRouter();

  // Get logout action only - component never re-renders
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return <Button onPress={handleLogout} title="Logout" />;
}

/**
 * Example 5: Theme Toggle
 * Shows UI store usage
 */
export function ThemeToggleExample() {
  const theme = useTheme();
  const setTheme = useUIStore((state) => state.setTheme);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <Button
      onPress={toggleTheme}
      title={`Current theme: ${theme}`}
    />
  );
}

/**
 * Example 6: Multiple State Subscriptions
 * Shows how to subscribe to multiple state slices efficiently
 */
export function AuthStatusExample() {
  // Each selector only triggers re-render for its specific value
  const user = useUser();
  const isLoading = useAuthLoading();
  const error = useAuthStore((state) => state.error);

  return (
    <View>
      {isLoading && <ActivityIndicator />}

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {user && (
        <Text>Welcome, {user.name}!</Text>
      )}
    </View>
  );
}

/**
 * Example 7: Combined State Selector
 * For state that changes together, combine into one selector
 */
export function CombinedSelectorExample() {
  // Both values change together, so one selector is fine
  const { user, isAuthenticated } = useAuthStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }));

  return (
    <View>
      <Text>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</Text>
      {user && <Text>User: {user.name}</Text>}
    </View>
  );
}

/**
 * Example 8: Non-React Usage
 * Shows how to use stores in non-React code (API interceptors, utils, etc.)
 */

// API Interceptor Example
export async function apiInterceptorExample() {
  // Get current state without subscribing
  const user = useAuthStore.getState().user;

  if (!user) {
    // User not authenticated
    throw new Error('Not authenticated');
  }

  // Make API call with user data
  const response = await fetch('/api/data', {
    headers: {
      'User-ID': user.id,
    },
  });

  return response.json();
}

// Utility Function Example
export function checkAuthBeforeAction() {
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  if (!isAuthenticated) {
    // Redirect to login using actions
    authActions.logout();
    throw new Error('Please login to continue');
  }

  // Continue with action
  console.log('User is authenticated');
}

/**
 * Example 9: Store Subscription (for logging, analytics, etc.)
 */
export function setupStoreLogging() {
  // Subscribe to all auth state changes
  useAuthStore.subscribe((state) => {
    console.log('[Auth] State changed:', {
      isAuthenticated: state.isAuthenticated,
      userId: state.user?.id,
      isLoading: state.isLoading,
    });

    // Could send to analytics
    // analytics.track('auth_state_changed', { userId: state.user?.id });
  });

  // Subscribe to specific value changes
  useAuthStore.subscribe(
    (state) => state.user,
    (user, prevUser) => {
      if (user && !prevUser) {
        console.log('[Auth] User logged in:', user.id);
      } else if (!user && prevUser) {
        console.log('[Auth] User logged out');
      }
    }
  );
}

/**
 * Example 10: Settings Screen with Multiple Stores
 */
export function SettingsScreenExample() {
  const user = useUser();

  const {
    theme,
    language,
    notificationsEnabled,
    compactMode,
  } = useUIStore((state) => ({
    theme: state.theme,
    language: state.language,
    notificationsEnabled: state.notificationsEnabled,
    compactMode: state.compactMode,
  }));

  const setTheme = useUIStore((state) => state.setTheme);
  const setLanguage = useUIStore((state) => state.setLanguage);
  const setNotificationsEnabled = useUIStore((state) => state.setNotificationsEnabled);
  const setCompactMode = useUIStore((state) => state.setCompactMode);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View>
      {/* User Info */}
      <Text>Logged in as: {user?.name}</Text>

      {/* Theme Selection */}
      <View>
        <Text>Theme: {theme}</Text>
        <Button onPress={() => setTheme('light')} title="Light" />
        <Button onPress={() => setTheme('dark')} title="Dark" />
        <Button onPress={() => setTheme('system')} title="System" />
      </View>

      {/* Language Selection */}
      <View>
        <Text>Language: {language}</Text>
        <Button onPress={() => setLanguage('en')} title="English" />
        <Button onPress={() => setLanguage('es')} title="Español" />
        <Button onPress={() => setLanguage('fr')} title="Français" />
      </View>

      {/* Notification Toggle */}
      <Button
        onPress={() => setNotificationsEnabled(!notificationsEnabled)}
        title={`Notifications: ${notificationsEnabled ? 'On' : 'Off'}`}
      />

      {/* Compact Mode Toggle */}
      <Button
        onPress={() => setCompactMode(!compactMode)}
        title={`Compact Mode: ${compactMode ? 'On' : 'Off'}`}
      />

      {/* Logout */}
      <Button onPress={logout} title="Logout" />
    </View>
  );
}

/**
 * Example 11: Custom Hook for Complex Logic
 */
export function useAuthStatus() {
  const user = useUser();
  const isLoading = useAuthLoading();
  const error = useAuthStore((state) => state.error);

  // Derived state
  const isAuthenticated = !!user;
  const hasError = !!error;

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    hasError,
    userName: user?.name ?? 'Guest',
  };
}

// Usage of custom hook
export function CustomHookExample() {
  const {
    userName,
    isAuthenticated,
    hasError,
    error,
  } = useAuthStatus();

  return (
    <View>
      <Text>Welcome, {userName}!</Text>
      {!isAuthenticated && <Text>Please login</Text>}
      {hasError && <Text>Error: {error}</Text>}
    </View>
  );
}

/**
 * Example 12: Conditional Rendering Based on Auth
 */
export function ConditionalContentExample() {
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useAuthLoading();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!isAuthenticated) {
    return (
      <View>
        <Text>Please login to view this content</Text>
        <Button title="Go to Login" onPress={() => {/* navigate */}} />
      </View>
    );
  }

  return (
    <View>
      <Text>Protected content here</Text>
    </View>
  );
}

/**
 * Example 13: Testing Helper
 * How to reset store state in tests
 */
export function resetAuthStoreForTesting() {
  useAuthStore.setState({
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    _hasHydrated: false,
  });
}

/**
 * Example 14: Performance Optimization
 * Memoizing derived values to prevent unnecessary calculations
 */
export function OptimizedDerivedValueExample() {
  // Get user once
  const user = useUser();

  // Derived value only recalculates when user changes
  const displayName = React.useMemo(() => {
    if (!user) return 'Guest';
    return user.name || user.email.split('@')[0];
  }, [user]);

  return <Text>Hello, {displayName}!</Text>;
}

/**
 * Example 15: Handling Errors Gracefully
 */
export function ErrorHandlingExample() {
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // Success - navigate away
    } catch (err) {
      // Error already in store
      console.error('Login error:', err);
    }
  };

  useEffect(() => {
    // Clear error after 5 seconds
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <View>
      {error && (
        <View style={{ backgroundColor: 'red', padding: 10 }}>
          <Text style={{ color: 'white' }}>{error}</Text>
          <Button onPress={clearError} title="Dismiss" />
        </View>
      )}
    </View>
  );
}

/**
 * Key Takeaways:
 *
 * 1. Use specific selectors to minimize re-renders
 * 2. Extract actions if you only need to call them (no state needed)
 * 3. Combine related state into one selector if they change together
 * 4. Use provided selectors (useUser, useIsAuthenticated, etc.) for common cases
 * 5. Store actions work outside React - use getState() or exported actions
 * 6. Clear errors/cleanup on unmount when needed
 * 7. Memoize derived values to prevent recalculation
 * 8. Handle errors gracefully with auto-dismiss or manual clear
 */
