# Zustand Migration Guide

This document outlines the migration from Context API to Zustand for state management in Glamfric.

## What Changed?

### Before: Context API
- Required `<AuthProvider>` wrapper in `_layout.tsx`
- Used `useAuth()` hook with implicit context
- Could cause unnecessary re-renders throughout the component tree
- More boilerplate code

### After: Zustand
- No provider needed - direct store imports
- More explicit and granular state subscriptions
- Better performance with selective re-renders
- Less code, clearer patterns
- Automatic MMKV persistence

## File Changes

### Deleted/Deprecated
- `src/features/auth/AuthContext.tsx` (keep for reference, but deprecated)
  - This file is no longer used but kept for migration reference

### New Files
```
src/store/
├── middleware/
│   └── mmkv-persist.ts         # Custom MMKV persistence
├── auth.store.ts               # Auth state management
├── ui.store.ts                 # UI preferences
├── index.ts                    # Barrel exports
└── README.md                   # Store documentation
```

### Modified Files
- `src/app/_layout.tsx` - Removed `<AuthProvider>`
- `src/app/index.tsx` - Updated to use `useAuthStore`
- `src/app/(auth)/login.tsx` - Updated to use `useAuthStore`
- `src/app/(auth)/signup.tsx` - Updated to use `useAuthStore`
- `src/app/(tabs)/profile.tsx` - Updated to use `useAuthStore`

## Migration Examples

### Before (Context API)
```typescript
import { useAuth } from '@/features/auth/AuthContext';

function LoginScreen() {
  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
    </View>
  );
}
```

### After (Zustand)
```typescript
import { useAuthStore } from '@/store';

function LoginScreen() {
  // Option 1: Get everything at once
  const { login, isLoading, error } = useAuthStore((state) => ({
    login: state.login,
    isLoading: state.isLoading,
    error: state.error,
  }));

  // Option 2: Use provided selectors (recommended)
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthLoading();
  const error = useAuthError();

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
    </View>
  );
}
```

## Common Use Cases

### 1. Login/Signup Screens

```typescript
import { useAuthStore } from '@/store';

function AuthScreen() {
  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  // Use as before
  await login(email, password);
}
```

### 2. Profile/User Display

```typescript
import { useUser } from '@/store';

function ProfileScreen() {
  const user = useUser(); // Only re-renders when user changes

  return (
    <View>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
}
```

### 3. Protected Routes

```typescript
import { useIsAuthenticated } from '@/store';

function ProtectedRoute() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Content />;
}
```

### 4. Logout

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

### 5. Non-React Usage (API Interceptors, Utils)

```typescript
import { authActions } from '@/store';

// In API client or interceptor
async function refreshToken() {
  const newUser = await api.refresh();
  authActions.setUser(newUser);
}

// Or get current state
import { useAuthStore } from '@/store';
const currentUser = useAuthStore.getState().user;
```

## Performance Optimization Tips

### 1. Subscribe to Specific State Slices

**Bad (re-renders on ANY state change):**
```typescript
const auth = useAuthStore();
```

**Good (only re-renders when user changes):**
```typescript
const user = useAuthStore((state) => state.user);
```

**Better (use provided selectors):**
```typescript
const user = useUser();
```

### 2. Extract Actions to Prevent Re-renders

**If you only need actions:**
```typescript
function LoginButton() {
  // This component NEVER re-renders from store changes
  const login = useAuthStore((state) => state.login);

  return <Button onPress={() => login(email, password)}>Login</Button>;
}
```

### 3. Multiple Selectors for Granular Control

```typescript
function AuthStatus() {
  // Each selector only triggers re-render for its specific value
  const user = useUser();
  const isLoading = useAuthLoading();
  const error = useAuthError();

  return (
    <View>
      {user && <Text>Welcome {user.name}</Text>}
      {isLoading && <Spinner />}
      {error && <Error message={error} />}
    </View>
  );
}
```

## New Features (UI Store)

The migration introduced a new UI store for app preferences:

```typescript
import { useTheme, useUIStore } from '@/store';

function Settings() {
  const theme = useTheme();
  const setTheme = useUIStore((state) => state.setTheme);
  const language = useUIStore((state) => state.language);
  const setLanguage = useUIStore((state) => state.setLanguage);

  return (
    <View>
      <ThemeToggle
        value={theme}
        onChange={setTheme}
        options={['light', 'dark', 'system']}
      />

      <LanguageSelect
        value={language}
        onChange={setLanguage}
        options={['en', 'es', 'fr']}
      />
    </View>
  );
}
```

## Persistence

### Auth Token (SecureStore)
- Still stored in `expo-secure-store` for maximum security
- Never stored in MMKV
- Retrieved asynchronously when needed for API calls

### User Data (MMKV)
- Automatically persisted via `mmkvPersist` middleware
- Encrypted using key from SecureStore
- Synchronous access (faster than SecureStore)
- Auto-hydrates on app start

### UI Preferences (MMKV)
- Persisted without encryption (better performance)
- Safe for non-sensitive preferences
- Auto-hydrates on app start

## Troubleshooting

### Store not hydrating

**Issue**: Store shows initial state instead of persisted data.

**Solution**: Ensure `StorageProvider` wraps your app and initializes before stores are used.

```typescript
// _layout.tsx
<StorageProvider>
  <App />
</StorageProvider>
```

### State not persisting

**Issue**: Changes don't persist after app restart.

**Solution**: Check that MMKV is initialized and store uses `mmkvPersist`:

```typescript
export const useMyStore = create<State>()(
  mmkvPersist(
    storeConfig,
    { name: 'my-store-key' } // Must have unique name
  )
);
```

### Type errors with selectors

**Issue**: TypeScript errors when using selectors.

**Solution**: Use proper typing with state parameter:

```typescript
// Good
const user = useAuthStore((state) => state.user);

// Bad (TypeScript may not infer correctly)
const user = useAuthStore(state => state.user);
```

### Performance issues

**Issue**: Component re-rendering too often.

**Solution**: Use specific selectors instead of whole store:

```typescript
// Bad (re-renders on any change)
const { user, isLoading, error } = useAuthStore();

// Good (only re-renders when user changes)
const user = useUser();
```

## Testing

### Unit Tests

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuthStore } from '@/store';

describe('AuthStore', () => {
  beforeEach(() => {
    // Reset store between tests
    useAuthStore.setState({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
    });
  });

  it('should set user on login', async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.user).toBeDefined();
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

### Component Tests

```typescript
import { render } from '@testing-library/react-native';
import { useAuthStore } from '@/store';

jest.mock('@/store', () => ({
  useAuthStore: jest.fn(),
}));

describe('ProfileScreen', () => {
  it('should display user name', () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      user: { name: 'Test User', email: 'test@example.com' },
    });

    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Test User')).toBeTruthy();
  });
});
```

## Best Practices

1. **Use Selectors**: Always subscribe to specific state slices
2. **Export Selectors**: Create reusable selectors for common patterns
3. **Extract Actions**: For components that only trigger actions
4. **Type Everything**: Leverage TypeScript for type safety
5. **Keep Stores Focused**: One store per domain (auth, ui, data, etc.)
6. **Persist Wisely**: Only persist what needs to survive app restarts
7. **Use Partialize**: Exclude transient state from persistence

## Further Reading

- [Store README](./src/store/README.md) - Detailed store documentation
- [Zustand Best Practices](https://docs.pmnd.rs/zustand/guides/practice-with-no-store-actions)
- [MMKV React Native](https://github.com/mrousavy/react-native-mmkv)
- [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/)

## Support

If you encounter issues during migration:

1. Check the store README for detailed examples
2. Review the migration examples above
3. Ensure MMKV is initialized before store access
4. Verify TypeScript types are correct
5. Use Redux DevTools for debugging store state

## Rollback Plan

If needed, you can temporarily revert by:

1. Restore `<AuthProvider>` in `_layout.tsx`
2. Update imports back to `useAuth` from `AuthContext`
3. Keep Zustand stores for gradual migration

However, this should not be necessary as the migration is complete and tested.
