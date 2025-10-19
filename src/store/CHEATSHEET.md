# Zustand Store Cheat Sheet

Quick reference for using Zustand stores in Glamfric.

## Quick Import

```typescript
import {
  // Auth Store
  useAuthStore,
  useUser,
  useIsAuthenticated,
  useAuthLoading,
  useAuthError,
  authActions,

  // UI Store
  useUIStore,
  useTheme,
  useLanguage,
  uiActions,
} from '@/store';
```

## Auth Store Quick Reference

### Get User

```typescript
// Recommended (optimized selector)
const user = useUser();

// Alternative
const user = useAuthStore((state) => state.user);
```

### Check Authentication

```typescript
const isAuthenticated = useIsAuthenticated();

// Or
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
```

### Login

```typescript
const login = useAuthStore((state) => state.login);

await login(email, password);
```

### Signup

```typescript
const signup = useAuthStore((state) => state.signup);

await signup(email, password, name);
```

### Logout

```typescript
const logout = useAuthStore((state) => state.logout);

await logout();
```

### Get Loading State

```typescript
const isLoading = useAuthLoading();
```

### Get Error

```typescript
const error = useAuthError();
const clearError = useAuthStore((state) => state.clearError);
```

### Multiple Values at Once

```typescript
const { user, isLoading, error } = useAuthStore((state) => ({
  user: state.user,
  isLoading: state.isLoading,
  error: state.error,
}));
```

### Non-React Usage

```typescript
// In API interceptors, utilities, etc.
import { authActions, useAuthStore } from '@/store';

// Call actions
await authActions.login(email, password);
await authActions.logout();
authActions.clearError();

// Get current state
const user = useAuthStore.getState().user;
const isAuthenticated = useAuthStore.getState().isAuthenticated;
```

## UI Store Quick Reference

### Theme

```typescript
const theme = useTheme();
const setTheme = useUIStore((state) => state.setTheme);

setTheme('dark'); // 'light' | 'dark' | 'system'
```

### Language

```typescript
const language = useLanguage();
const setLanguage = useUIStore((state) => state.setLanguage);

setLanguage('es'); // 'en' | 'es' | 'fr'
```

### Notifications

```typescript
const enabled = useNotificationsEnabled();
const setEnabled = useUIStore((state) => state.setNotificationsEnabled);

setEnabled(true);
```

### Onboarding

```typescript
const completed = useOnboardingCompleted();
const setCompleted = useUIStore((state) => state.setOnboardingCompleted);

setCompleted(true);
```

### Compact Mode

```typescript
const compact = useUIStore((state) => state.compactMode);
const setCompact = useUIStore((state) => state.setCompactMode);

setCompact(true);
```

### Reset Preferences

```typescript
const reset = useUIStore((state) => state.resetPreferences);

reset(); // Resets to defaults (except onboarding)
```

### Non-React Usage

```typescript
import { uiActions } from '@/store';

uiActions.setTheme('dark');
uiActions.setLanguage('es');
uiActions.resetPreferences();
```

## Common Patterns

### Login Screen

```typescript
import { useAuthStore } from '@/store';

function LoginScreen() {
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
      <Button onPress={handleLogin}>Login</Button>
    </View>
  );
}
```

### Profile Display

```typescript
import { useUser } from '@/store';

function ProfileHeader() {
  const user = useUser();

  return (
    <View>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
}
```

### Protected Route

```typescript
import { useIsAuthenticated } from '@/store';

function ProtectedScreen() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Content />;
}
```

### Settings Screen

```typescript
import { useTheme, useLanguage, useUIStore } from '@/store';

function SettingsScreen() {
  const theme = useTheme();
  const language = useLanguage();
  const setTheme = useUIStore((state) => state.setTheme);
  const setLanguage = useUIStore((state) => state.setLanguage);

  return (
    <View>
      <Picker value={theme} onChange={setTheme}>
        <Picker.Item label="Light" value="light" />
        <Picker.Item label="Dark" value="dark" />
        <Picker.Item label="System" value="system" />
      </Picker>

      <Picker value={language} onChange={setLanguage}>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Español" value="es" />
        <Picker.Item label="Français" value="fr" />
      </Picker>
    </View>
  );
}
```

### Logout Button

```typescript
import { useAuthStore } from '@/store';
import { useRouter } from 'expo-router';

function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return <Button onPress={handleLogout}>Logout</Button>;
}
```

## Performance Tips

### 1. Use Specific Selectors

```typescript
// Bad - re-renders on any store change
const store = useAuthStore();

// Good - only re-renders when user changes
const user = useAuthStore((state) => state.user);

// Better - use provided selectors
const user = useUser();
```

### 2. Extract Actions Only

```typescript
// Component never re-renders from store changes
const login = useAuthStore((state) => state.login);
```

### 3. Combine Related State

```typescript
// If you need multiple values that change together
const { user, isAuthenticated } = useAuthStore((state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
}));
```

### 4. Memoize Complex Selectors

```typescript
import { useMemo } from 'react';

const userDisplayName = useAuthStore((state) =>
  state.user ? `${state.user.name} (${state.user.email})` : 'Guest'
);
```

## Debugging

### Log State Changes

```typescript
import { useAuthStore } from '@/store';

// Subscribe to all state changes
useAuthStore.subscribe((state) => {
  console.log('Auth state changed:', state);
});

// Subscribe to specific value
useAuthStore.subscribe(
  (state) => state.user,
  (user) => console.log('User changed:', user)
);
```

### Get Current State

```typescript
// Get state without subscribing (outside React)
const currentState = useAuthStore.getState();
console.log('Current user:', currentState.user);
```

### Reset Store (for testing)

```typescript
useAuthStore.setState({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
});
```

## TypeScript Tips

### Type Store Return

```typescript
type AuthStore = ReturnType<typeof useAuthStore.getState>;

function myFunction(store: AuthStore) {
  console.log(store.user);
}
```

### Type Selector Return

```typescript
type User = ReturnType<typeof useUser>;
// or
type User = NonNullable<ReturnType<typeof useUser>>;
```

### Custom Selector Hook

```typescript
function useUserDisplayName(): string {
  return useAuthStore((state) =>
    state.user ? state.user.name : 'Guest'
  );
}
```

## Remember

1. No `<Provider>` needed - import and use directly
2. Use selectors for better performance
3. State persists automatically via MMKV
4. Auth token stays in SecureStore (never in MMKV)
5. Multiple components can use same store without issues
6. Actions can be called outside React components
7. Type-safe by default with TypeScript
