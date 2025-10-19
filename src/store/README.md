# Zustand Store Architecture

This directory contains all Zustand stores for global state management in the Glamfric app.

## Why Zustand?

We migrated from Context API to Zustand for several key benefits:

1. **Better Performance**: No unnecessary re-renders from Context propagation
2. **No Provider Hell**: Direct imports, no wrapping components in providers
3. **Simpler API**: Less boilerplate, more intuitive
4. **DevTools Support**: Built-in Redux DevTools integration
5. **Smaller Bundle**: ~1KB vs Context's overhead
6. **Better Testing**: Easy to test without provider wrappers

## Architecture Overview

```
src/store/
├── middleware/
│   └── mmkv-persist.ts    # Custom MMKV persistence middleware
├── auth.store.ts          # Authentication state & actions
├── ui.store.ts            # UI preferences & theme
├── index.ts               # Barrel exports
└── README.md              # This file
```

## Store Structure

Each store follows this pattern:

```typescript
// 1. Define state interface
interface StoreState {
  // State properties
  someValue: string;

  // Actions
  setSomeValue: (value: string) => void;
}

// 2. Create store with persistence
export const useStore = create<StoreState>()(
  mmkvPersist(
    (set, get) => ({
      // Initial state
      someValue: '',

      // Actions
      setSomeValue: (value) => set({ someValue: value }),
    }),
    {
      name: 'store-key',
      partialize: (state) => ({ someValue: state.someValue }),
    }
  )
);

// 3. Export selectors for optimized re-renders
export const useSomeValue = () => useStore((state) => state.someValue);

// 4. Export actions for non-React usage
export const storeActions = {
  setSomeValue: (value: string) => useStore.getState().setSomeValue(value),
};
```

## Available Stores

### Auth Store (`auth.store.ts`)

Manages user authentication state.

**State:**
- `user: UserData | null` - Current authenticated user
- `isLoading: boolean` - Loading state for auth operations
- `isAuthenticated: boolean` - Computed auth status
- `error: string | null` - Last auth error

**Actions:**
- `login(email, password)` - Authenticate user
- `signup(email, password, name)` - Create new account
- `logout()` - Clear auth state
- `setUser(user)` - Update user data
- `clearError()` - Clear error state

**Usage in Components:**
```typescript
import { useAuthStore, useUser, useIsAuthenticated } from '@/store';

function MyComponent() {
  // Option 1: Get specific values (optimized)
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();

  // Option 2: Get multiple values at once
  const { login, isLoading, error } = useAuthStore(
    (state) => ({
      login: state.login,
      isLoading: state.isLoading,
      error: state.error,
    })
  );

  // Option 3: Get actions only (no re-renders on state change)
  const login = useAuthStore((state) => state.login);
}
```

**Usage outside React:**
```typescript
import { authActions } from '@/store';

// In a utility function, API interceptor, etc.
await authActions.logout();
```

### UI Store (`ui.store.ts`)

Manages app-wide UI preferences and settings.

**State:**
- `theme: 'light' | 'dark' | 'system'` - App theme
- `language: 'en' | 'es' | 'fr'` - Selected language
- `notificationsEnabled: boolean` - Notification preference
- `onboardingCompleted: boolean` - Onboarding status
- `isFirstLaunch: boolean` - First app launch flag
- `compactMode: boolean` - Compact UI layout preference

**Actions:**
- `setTheme(theme)` - Change app theme
- `setLanguage(language)` - Change language
- `setNotificationsEnabled(enabled)` - Toggle notifications
- `setOnboardingCompleted(completed)` - Mark onboarding done
- `setCompactMode(enabled)` - Toggle compact mode
- `resetPreferences()` - Reset to defaults

**Usage:**
```typescript
import { useTheme, useUIStore, uiActions } from '@/store';

function ThemeToggle() {
  const theme = useTheme();
  const setTheme = useUIStore((state) => state.setTheme);

  return (
    <Button onPress={() => setTheme('dark')}>
      Toggle Dark Mode
    </Button>
  );
}

// Outside React
uiActions.setTheme('dark');
```

## MMKV Persistence Middleware

Our custom middleware (`mmkv-persist.ts`) provides automatic state persistence:

**Features:**
- Synchronous operations (faster than AsyncStorage)
- Automatic serialization/deserialization
- Partial persistence (exclude transient state)
- Hydration callbacks
- Type-safe

**How it works:**
1. On store creation, loads persisted state from MMKV
2. Merges persisted state with initial state (preserves new properties)
3. On every state update, saves to MMKV automatically
4. Supports partializing to exclude certain keys

**Configuration:**
```typescript
mmkvPersist(
  storeConfig,
  {
    name: 'storage-key',           // Required: MMKV key
    partialize: (state) => ({      // Optional: What to persist
      user: state.user,            // Include
      // isLoading not included     // Exclude
    }),
    onHydrate: (state) => {        // Optional: Post-hydration
      console.log('Loaded:', state);
    },
  }
)
```

## Performance Best Practices

### 1. Use Selectors

**Bad (causes re-render on any state change):**
```typescript
const { user, isLoading, error } = useAuthStore();
```

**Good (only re-renders when user changes):**
```typescript
const user = useAuthStore((state) => state.user);
```

**Better (use provided selectors):**
```typescript
const user = useUser();
```

### 2. Extract Actions

If you only need actions (no state), extract them to prevent re-renders:

```typescript
// Component re-renders when user changes
const { user, login } = useAuthStore((state) => ({
  user: state.user,
  login: state.login,
}));

// Component NEVER re-renders (login is stable)
const user = useUser();
const login = useAuthStore((state) => state.login);
```

### 3. Use Multiple Selectors

For multiple state slices, use separate selectors:

```typescript
// Re-renders when user OR isLoading changes
const { user, isLoading } = useAuthStore((state) => ({
  user: state.user,
  isLoading: state.isLoading,
}));

// More granular control
const user = useUser();
const isLoading = useAuthLoading();
```

### 4. Shallow Equality

For objects/arrays, use shallow equality:

```typescript
import { shallow } from 'zustand/shallow';

const { user, settings } = useAuthStore(
  (state) => ({ user: state.user, settings: state.settings }),
  shallow
);
```

## Adding New Stores

1. **Create store file**: `src/store/new-feature.store.ts`

```typescript
import { create } from 'zustand';
import { mmkvPersist } from './middleware/mmkv-persist';

interface NewFeatureState {
  data: string;
  setData: (data: string) => void;
}

export const useNewFeatureStore = create<NewFeatureState>()(
  mmkvPersist(
    (set) => ({
      data: '',
      setData: (data) => set({ data }),
    }),
    { name: 'new-feature-storage' }
  )
);

export const useData = () => useNewFeatureStore((state) => state.data);
```

2. **Export from index**: Add to `src/store/index.ts`

```typescript
export {
  useNewFeatureStore,
  useData,
} from './new-feature.store';
```

3. **Use in components**:

```typescript
import { useData, useNewFeatureStore } from '@/store';
```

## Storage Details

### Auth Storage Strategy

We use a **hybrid storage approach** for security and performance:

1. **Auth Token**: Stored in `expo-secure-store` (device keychain/keystore)
   - Most secure option
   - Hardware-backed encryption
   - Never stored in MMKV

2. **User Data**: Stored in MMKV (encrypted)
   - Fast synchronous access
   - Encrypted with key from SecureStore
   - Safe for non-sensitive user info (id, email, name, role)

3. **UI Preferences**: Stored in MMKV (non-encrypted)
   - Better performance for frequently accessed data
   - No sensitive information

### State Hydration

State hydration happens in this order:

1. `StorageProvider` initializes MMKV (gets encryption key from SecureStore)
2. Zustand stores create and immediately hydrate from MMKV
3. App renders with hydrated state
4. No loading flash for persisted state!

## Testing

### Testing Components with Stores

```typescript
import { renderHook } from '@testing-library/react-hooks';
import { useAuthStore } from '@/store';

describe('AuthStore', () => {
  beforeEach(() => {
    // Reset store state
    useAuthStore.setState({ user: null, isLoading: false });
  });

  it('should login user', async () => {
    const { result } = renderHook(() => useAuthStore());

    await result.current.login('test@example.com', 'password');

    expect(result.current.user).toBeDefined();
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

### Mocking Stores

```typescript
jest.mock('@/store', () => ({
  useAuthStore: jest.fn(),
  useUser: jest.fn(),
}));

// In test
(useUser as jest.Mock).mockReturnValue({ id: '1', name: 'Test' });
```

## Migration from Context API

The migration from Context API to Zustand is complete. Key changes:

### Before (Context API):
```typescript
// Provider needed
<AuthProvider>
  <App />
</AuthProvider>

// Hook usage
const { user, login } = useAuth();
```

### After (Zustand):
```typescript
// No provider needed!
<App />

// Hook usage (same API)
const user = useUser();
const login = useAuthStore((state) => state.login);

// Or use full store
const { user, login } = useAuthStore((state) => ({
  user: state.user,
  login: state.login,
}));
```

## Common Patterns

### Derived State

```typescript
export const useAuthStore = create<AuthState>()(
  mmkvPersist(
    (set, get) => ({
      user: null,

      // Computed value
      get isAuthenticated() {
        return !!get().user;
      },
    }),
    { name: 'auth' }
  )
);
```

### Async Actions

```typescript
const useDataStore = create<DataState>((set) => ({
  data: null,
  isLoading: false,

  fetchData: async () => {
    set({ isLoading: true });
    try {
      const data = await api.getData();
      set({ data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },
}));
```

### Immer for Complex Updates

For complex nested state, consider using Immer middleware:

```typescript
import { immer } from 'zustand/middleware/immer';

const useStore = create<State>()(
  immer((set) => ({
    nested: { deeply: { nested: { value: 0 } } },

    updateNested: (value) => set((state) => {
      state.nested.deeply.nested.value = value;
    }),
  }))
);
```

## DevTools

Enable Redux DevTools for debugging:

```typescript
import { devtools } from 'zustand/middleware';

export const useAuthStore = create<AuthState>()(
  devtools(
    mmkvPersist(
      // ... store config
      { name: 'auth' }
    ),
    { name: 'AuthStore' }
  )
);
```

## Further Reading

- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [MMKV Documentation](https://github.com/mrousavy/react-native-mmkv)
- [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/)
