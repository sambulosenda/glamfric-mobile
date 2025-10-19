# Zustand Store Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         React Native App                        │
│                         (Expo SDK 54)                           │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      App Layout (_layout.tsx)                   │
│                                                                 │
│  ┌──────────────┐  ┌────────────────┐  ┌──────────────┐       │
│  │SafeArea      │→ │StorageProvider │→ │Apollo        │       │
│  │Provider      │  │(Initializes    │  │Provider      │       │
│  │              │  │MMKV)           │  │              │       │
│  └──────────────┘  └────────────────┘  └──────────────┘       │
│                                                                 │
│  NO AuthProvider needed! ✅                                     │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Zustand Stores (Global)                    │
│                      No Provider Wrapper!                       │
│                                                                 │
│  ┌─────────────────────┐        ┌─────────────────────┐        │
│  │   Auth Store        │        │    UI Store         │        │
│  │   auth.store.ts     │        │   ui.store.ts       │        │
│  │                     │        │                     │        │
│  │  State:             │        │  State:             │        │
│  │  - user             │        │  - theme            │        │
│  │  - isLoading        │        │  - language         │        │
│  │  - error            │        │  - notifications    │        │
│  │  - isAuthenticated  │        │  - onboarding       │        │
│  │                     │        │  - compactMode      │        │
│  │  Actions:           │        │                     │        │
│  │  - login()          │        │  Actions:           │        │
│  │  - signup()         │        │  - setTheme()       │        │
│  │  - logout()         │        │  - setLanguage()    │        │
│  │  - setUser()        │        │  - etc...           │        │
│  └─────────────────────┘        └─────────────────────┘        │
│            │                              │                     │
│            │   ┌──────────────────────┐   │                     │
│            └──▶│  MMKV Persistence    │◀──┘                     │
│                │  Middleware          │                         │
│                │  mmkv-persist.ts     │                         │
│                └──────────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Storage Layer                           │
│                                                                 │
│  ┌────────────────────┐              ┌────────────────────┐    │
│  │  SecureStore       │              │  MMKV Storage      │    │
│  │  (Keychain)        │              │  (Encrypted)       │    │
│  │                    │              │                    │    │
│  │  - Auth Token      │              │  - User Data       │    │
│  │  - Encryption Key  │              │  - UI Preferences  │    │
│  │                    │              │                    │    │
│  │  Hardware-backed   │              │  Synchronous       │    │
│  │  Most Secure ⭐    │              │  Fast Access ⚡    │    │
│  └────────────────────┘              └────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Component Integration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     React Components                            │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐ │
│  │ Login Screen    │  │ Profile Screen  │  │ Settings       │ │
│  │                 │  │                 │  │                │ │
│  │ useAuthStore    │  │ useUser()       │  │ useTheme()     │ │
│  │ ├─ login        │  │ ├─ user.name    │  │ useUIStore     │ │
│  │ ├─ isLoading    │  │ └─ user.email   │  │ ├─ setTheme()  │ │
│  │ └─ error        │  │                 │  │ └─ language    │ │
│  └─────────────────┘  └─────────────────┘  └────────────────┘ │
│          │                     │                     │          │
│          └─────────────────────┼─────────────────────┘          │
│                                │                                │
│                                ▼                                │
│              ┌─────────────────────────────────┐               │
│              │  Zustand Stores (Subscribe)     │               │
│              │  - Granular re-renders          │               │
│              │  - Only when state changes      │               │
│              │  - Type-safe selectors          │               │
│              └─────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow: Login Example

```
1. User enters credentials in Login Screen
   │
   ▼
2. Component calls: await login(email, password)
   │
   ▼
3. Auth Store Action
   ├─ Set isLoading = true
   ├─ Call GraphQL mutation (Apollo)
   │  └─ Server authenticates user
   ├─ Receive token + user data
   │
   ▼
4. Storage Operations (Parallel)
   ├─ Save token → SecureStore (most secure)
   └─ Save user data → MMKV (encrypted, fast)
   │
   ▼
5. Update Store State
   ├─ Set user = userData
   ├─ Set isAuthenticated = true
   ├─ Set isLoading = false
   └─ Clear error
   │
   ▼
6. MMKV Middleware (Automatic)
   └─ Persist state to MMKV storage
   │
   ▼
7. Component Re-renders
   ├─ Login screen: detects isLoading = false
   ├─ Profile screen: receives user data
   └─ Navigation: redirects to home
```

## Storage Strategy

```
┌────────────────────────────────────────────────────────────┐
│                    Hybrid Storage Strategy                 │
└────────────────────────────────────────────────────────────┘

┌─────────────────────┐      ┌──────────────────────────────┐
│   Auth Token        │      │   User Data & Preferences    │
│   (SecureStore)     │      │   (MMKV)                     │
│                     │      │                              │
│   Most Sensitive    │      │   Less Sensitive             │
│   ⭐⭐⭐⭐⭐         │      │   ⭐⭐⭐                      │
│                     │      │                              │
│   - JWT Token       │      │   - User ID                  │
│   - Refresh Token   │      │   - Email                    │
│   - API Keys        │      │   - Name                     │
│                     │      │   - Role                     │
│   Hardware-backed   │      │   - Theme preference         │
│   Async read/write  │      │   - Language                 │
│   ❌ No direct      │      │   - UI settings              │
│      access         │      │                              │
│                     │      │   Encrypted (key in          │
│   Usage:            │      │   SecureStore)               │
│   - API auth        │      │   Sync read/write ⚡         │
│   - Token refresh   │      │   ✅ Fast access             │
│                     │      │                              │
│                     │      │   Usage:                     │
│                     │      │   - Display user info        │
│                     │      │   - App preferences          │
│                     │      │   - Cached data              │
└─────────────────────┘      └──────────────────────────────┘
```

## Store Lifecycle

```
App Start
   │
   ▼
┌─────────────────────────────────────────┐
│ 1. StorageProvider Initializes          │
│    - Get encryption key from SecureStore│
│    - Create MMKV instances              │
│    - Signal: Storage Ready              │
└─────────────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────────┐
│ 2. Zustand Stores Create                │
│    - Apply mmkvPersist middleware       │
│    - Load persisted state from MMKV     │
│    - Merge with initial state           │
│    - Call onHydrate callback            │
└─────────────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────────┐
│ 3. App Renders                          │
│    - Components use stores              │
│    - State already hydrated             │
│    - No loading flash! ⚡               │
└─────────────────────────────────────────┘
   │
   ▼
┌─────────────────────────────────────────┐
│ 4. User Interactions                    │
│    - Actions update store               │
│    - Middleware auto-persists           │
│    - Components re-render (granular)    │
└─────────────────────────────────────────┘
   │
   ▼
App Close
   │
   ▼
State persisted in MMKV (survives restart)
```

## Performance Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Performance Benefits                      │
└─────────────────────────────────────────────────────────────┘

Context API (Before)                Zustand (After)
─────────────────────              ─────────────────

Provider Re-renders                 No Provider
┌────────────────┐                 ┌────────────────┐
│ AuthProvider   │                 │ Direct Import  │
│   ├─ All       │                 │ useAuthStore() │
│   │  children  │                 │                │
│   │  re-render │                 │ Selective      │
│   │  on any    │    ══════►      │ subscriptions  │
│   │  change    │                 │                │
│   └─ Slow 🐌   │                 │ Fast ⚡        │
└────────────────┘                 └────────────────┘

Async Storage                       MMKV
┌────────────────┐                 ┌────────────────┐
│ AsyncStorage   │                 │ MMKV           │
│ - Async        │                 │ - Synchronous  │
│ - Slow         │    ══════►      │ - Fast         │
│ - JSON files   │                 │ - Native       │
│ 🐌 100-500ms   │                 │ ⚡ <1ms        │
└────────────────┘                 └────────────────┘

Multiple Contexts                   Single Store
┌────────────────┐                 ┌────────────────┐
│ <Provider>     │                 │ useAuthStore   │
│  <Provider>    │                 │ useUIStore     │
│   <Provider>   │    ══════►      │                │
│    <App />     │                 │ No nesting     │
│   </Provider>  │                 │ Flat imports   │
│  </Provider>   │                 │ ✅ Clean       │
│ </Provider>    │                 │                │
│ ❌ Complex     │                 │                │
└────────────────┘                 └────────────────┘
```

## Re-render Optimization

```
Component Subscriptions (Smart Re-rendering)

┌─────────────────────────────────────────────────────────────┐
│  Component A                    Auth Store                  │
│  ─────────────                  ──────────                  │
│                                                              │
│  const user = useUser()         State:                      │
│         │                       - user ◄───────┐            │
│         │                       - isLoading    │ Subscribed │
│         │                       - error        │            │
│         └──────────────────────►- isAuth       │            │
│                                                 │            │
│  Re-renders ONLY when           Updates:       │            │
│  user changes ✅                - user changed ─┘            │
│                                 - isLoading changed (no render)
│                                 - error changed (no render)  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Component B                    Auth Store                  │
│  ─────────────                  ──────────                  │
│                                                              │
│  const login =                  Actions:                    │
│    useAuthStore(                - login ◄─────┐             │
│      state => state.login       - logout      │ Action only │
│    )                            - signup      │             │
│         └──────────────────────►              │             │
│                                                │             │
│  NEVER re-renders! ✅           State changes: │             │
│  Action is stable               - user changed (no render)  │
│                                 - any state change          │
│                                   (no render) ⚡             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Component C (Bad Example)      Auth Store                  │
│  ──────────────────────         ──────────                  │
│                                                              │
│  const auth =                   State:                      │
│    useAuthStore()               - user ◄──────┐             │
│         │                       - isLoading ◄─┤ All state   │
│         │                       - error ◄─────┤             │
│         └──────────────────────►- isAuth ◄────┘             │
│                                                              │
│  Re-renders on ANY              Updates:                    │
│  state change ❌                - Any change = re-render 🐌  │
│                                                              │
│  Solution: Use selectors! →     Use specific selectors ✅   │
└─────────────────────────────────────────────────────────────┘
```

## File Structure

```
glamfric/
├── src/
│   ├── store/                          # Zustand stores
│   │   ├── middleware/
│   │   │   └── mmkv-persist.ts        # Custom MMKV middleware
│   │   ├── auth.store.ts               # Auth state management
│   │   ├── ui.store.ts                 # UI preferences
│   │   ├── index.ts                    # Barrel exports
│   │   ├── examples.tsx                # Usage examples
│   │   ├── README.md                   # Store documentation
│   │   ├── CHEATSHEET.md               # Quick reference
│   │   └── ARCHITECTURE.md             # This file
│   │
│   ├── features/auth/
│   │   ├── AuthContext.tsx             # ⚠️ DEPRECATED (kept for reference)
│   │   └── authStorage.ts              # Storage utilities (still used)
│   │
│   ├── lib/storage/                    # MMKV utilities
│   │   ├── mmkv.ts                     # MMKV initialization
│   │   ├── index.ts                    # Storage helpers
│   │   └── keys.ts                     # Storage keys
│   │
│   └── app/
│       ├── _layout.tsx                 # App layout (no AuthProvider!)
│       ├── index.tsx                   # Root redirect
│       ├── (auth)/
│       │   ├── login.tsx               # Login screen
│       │   └── signup.tsx              # Signup screen
│       └── (tabs)/
│           └── profile.tsx             # Profile screen
│
├── ZUSTAND_MIGRATION.md                # Migration guide
├── ZUSTAND_IMPLEMENTATION_SUMMARY.md   # Implementation summary
└── package.json                        # Dependencies
```

## Dependencies

```
Production Dependencies:
┌────────────────────────────────────────┐
│ zustand@5.0.8                         │  State management
│ react-native-mmkv@3.3.3               │  Fast storage
│ expo-secure-store@15.0.7              │  Secure token storage
│ expo-crypto@15.0.7                    │  Encryption key generation
│ @apollo/client@3.11.0                 │  GraphQL client
└────────────────────────────────────────┘
```

## Integration Points

```
┌─────────────────────────────────────────────────────────────┐
│                   External Integrations                     │
└─────────────────────────────────────────────────────────────┘

GraphQL / Apollo
────────────────
Auth Store ─────► Apollo Client
  │                    │
  ├─ Login mutation    │
  ├─ Signup mutation   │
  └─ Clear cache       │
       on logout       │
                       ▼
              GraphQL Server

Expo Router
───────────
Components ─────► useRouter()
  │                    │
  ├─ useAuthStore      │
  │   └─ isAuthenticated
  │                    │
  └─ Navigate based    │
     on auth status    │
                       ▼
              Route handling

React Navigation (via expo-router)
──────────────────────────────────
Auth checks ────► Protected routes
  │                    │
  └─ Redirect if       │
     not authenticated │
                       ▼
              Screen transitions
```

## Security Model

```
┌─────────────────────────────────────────────────────────────┐
│                     Security Layers                         │
└─────────────────────────────────────────────────────────────┘

Layer 1: Hardware Security
──────────────────────────
SecureStore (Keychain/Keystore)
  ├─ Auth tokens (JWT)
  ├─ Encryption key for MMKV
  └─ Hardware-backed encryption
     (iOS: Secure Enclave, Android: KeyStore)

Layer 2: Application Encryption
────────────────────────────────
MMKV Encrypted Storage
  ├─ User data encrypted
  ├─ Key from SecureStore (Layer 1)
  ├─ AES-256 encryption
  └─ Fast synchronous access

Layer 3: Application Logic
───────────────────────────
Zustand Store
  ├─ Auth state validation
  ├─ Token refresh logic
  ├─ Automatic cleanup
  └─ Type-safe operations

Layer 4: Network Security
──────────────────────────
Apollo Client
  ├─ HTTPS only
  ├─ Token in headers
  ├─ Request signing
  └─ Response validation
```

## Best Practices Summary

```
✅ DO:
─────
• Use specific selectors (useUser, useIsAuthenticated)
• Extract actions if you only need to call them
• Clear errors on component unmount
• Use provided selectors for common cases
• Type everything with TypeScript
• Keep stores focused (one domain per store)
• Persist only what needs to survive restarts

❌ DON'T:
─────────
• Subscribe to entire store (causes excessive re-renders)
• Store sensitive tokens in MMKV (use SecureStore)
• Create providers (Zustand doesn't need them)
• Ignore TypeScript errors
• Mix concerns across stores
• Persist transient state (loading, errors)
```

## Future Enhancements

```
Potential Additions:
────────────────────
1. Redux DevTools integration
   └─ devtools(store, { name: 'StoreName' })

2. Immer middleware for complex updates
   └─ immer((set) => { state.nested.value = x })

3. Additional stores:
   ├─ cart.store.ts (shopping cart)
   ├─ bookings.store.ts (appointments)
   ├─ favorites.store.ts (saved items)
   └─ search.store.ts (search state)

4. Middleware enhancements:
   ├─ TTL support (cache expiration)
   ├─ Compression (large objects)
   └─ Migrations (schema changes)

5. Analytics integration:
   └─ Subscribe to state changes → track events
```

This architecture provides a **scalable, performant, and maintainable** foundation for state management in the Glamfric app.
