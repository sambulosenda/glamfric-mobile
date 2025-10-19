# MMKV Storage Usage Guide

This project uses [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) for high-performance key-value storage.

## Quick Start

The storage is automatically initialized when the app starts via `StorageProvider` in `_layout.tsx`.

### Basic Usage

```typescript
import { storage, StorageKeys } from '@/lib/storage';

// Set values
storage.set('user_name', 'John Doe');
storage.set(StorageKeys.THEME, 'dark');
storage.set('preferences', { notifications: true, language: 'en' });

// Get values
const name = storage.getString('user_name'); // "John Doe"
const theme = storage.getString(StorageKeys.THEME); // "dark"
const prefs = storage.get('preferences'); // { notifications: true, language: 'en' }

// Remove values
storage.remove('user_name');

// Check if key exists
if (storage.has(StorageKeys.THEME)) {
  console.log('Theme is set');
}
```

### React Hooks

Use hooks for reactive storage values in components:

```typescript
import { useMMKVString, useMMKVBoolean, useMMKVStorage } from '@/lib/storage';

function SettingsScreen() {
  const [theme, setTheme] = useMMKVString('theme', 'light');
  const [notifications, setNotifications] = useMMKVBoolean('notifications', true);
  const [preferences, setPreferences] = useMMKVStorage('preferences', {
    language: 'en',
    timezone: 'UTC',
  });

  return (
    <View>
      <Button
        title={`Theme: ${theme}`}
        onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      <Switch value={notifications} onValueChange={setNotifications} />
    </View>
  );
}
```

### Cache Storage

For temporary data with TTL (time-to-live):

```typescript
import { cache } from '@/lib/storage';

// Set cache with 5-minute TTL
cache.set('api_response', data, 5 * 60 * 1000);

// Get cached data (returns null if expired)
const cachedData = cache.get('api_response');

// Clear specific cache
cache.remove('api_response');

// Clear all cache
cache.clear();
```

## Storage Architecture

### App Storage (Encrypted)
- Used for: User preferences, app state, settings
- Encryption: Yes (AES-256)
- Location: `src/lib/storage/mmkv.ts`

### Cache Storage (Non-encrypted)
- Used for: API responses, temporary data
- Encryption: No (for better performance)
- TTL Support: Yes

### Secure Storage (expo-secure-store)
- Used for: Auth tokens, API keys, sensitive credentials
- Encryption: Device keychain/keystore
- Size limit: < 2KB per item
- Location: `src/features/auth/authStorage.ts`

## Best Practices

1. **Use StorageKeys constants** to avoid typos:
   ```typescript
   storage.set(StorageKeys.THEME, 'dark'); // Good
   storage.set('theme', 'dark'); // Avoid
   ```

2. **Keep auth tokens in SecureStore**, not MMKV:
   ```typescript
   // Good - tokens in SecureStore
   await SecureStore.setItemAsync('auth_token', token);

   // Bad - don't store tokens in MMKV
   storage.set('auth_token', token);
   ```

3. **Use cache for API responses**:
   ```typescript
   const cachedSalons = cache.get('salons');
   if (!cachedSalons) {
     const salons = await fetchSalons();
     cache.set('salons', salons, 10 * 60 * 1000); // 10 min
     return salons;
   }
   return cachedSalons;
   ```

4. **Use hooks in components** for reactive updates:
   ```typescript
   // Hooks automatically update component when storage changes
   const [theme] = useMMKVString('theme');
   ```

## Performance

- **10-100x faster** than AsyncStorage
- **Synchronous API** - no await needed for reads/writes
- **Encrypted** storage for security
- **~100KB** bundle size impact

## Migration from AsyncStorage

If you have existing AsyncStorage code:

```typescript
// Before (AsyncStorage)
await AsyncStorage.setItem('key', value);
const value = await AsyncStorage.getItem('key');

// After (MMKV)
storage.set('key', value);
const value = storage.getString('key');
```

## Adding New Storage Keys

1. Add key to `src/lib/storage/keys.ts`:
   ```typescript
   export const StorageKeys = {
     // ... existing keys
     NEW_FEATURE_FLAG: 'new_feature_flag',
   } as const;
   ```

2. Use the key in your code:
   ```typescript
   storage.set(StorageKeys.NEW_FEATURE_FLAG, true);
   ```
