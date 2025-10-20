# Guest Browsing Implementation Examples

This document provides practical examples of how to implement guest browsing with auth guards in your React Native/Expo app.

## Table of Contents
1. [Protected Screens](#1-protected-screens)
2. [Protected Actions on Public Screens](#2-protected-actions-on-public-screens)
3. [Business Detail Page Example](#3-business-detail-page-example)
4. [Post-Auth Redirect Setup](#4-post-auth-redirect-setup)

---

## 1. Protected Screens

Use `<AuthGuard>` component for entire screens that require authentication.

### Example: Bookings Screen

```tsx
// src/app/(tabs)/bookings.tsx
import { View, Text } from 'react-native';
import { AuthGuard, LoginPrompt } from '@/components/auth';

export default function BookingsScreen() {
  return (
    <AuthGuard
      fallback={
        <LoginPrompt
          title="Your Bookings"
          message="Sign in to view and manage your appointments"
        />
      }
    >
      <BookingsContent />
    </AuthGuard>
  );
}

function BookingsContent() {
  // Your authenticated content here
  return (
    <View>
      <Text>My Bookings</Text>
    </View>
  );
}
```

### Custom Icons in LoginPrompt

```tsx
import { Heart } from 'lucide-react-native';

<LoginPrompt
  title="Your Favorites"
  message="Sign in to save your favorite businesses"
  icon={<Heart size={32} color="#EF4444" />}
/>
```

---

## 2. Protected Actions on Public Screens

For public screens with protected actions (like "Add to Favorites" or "Book Now"), use either:
- **Alert approach** (simpler, native feel) - `useAuthGuard`
- **Bottom sheet approach** (better UX, custom design) - `useAuthGuardWithSheet`

### Option A: Using Alert (Simpler)

```tsx
// src/app/business/[id].tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuthGuard } from '@/hooks';

export default function BusinessDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { requireAuth } = useAuthGuard();

  const handleAddToFavorites = () => {
    requireAuth(
      () => {
        // Add to favorites logic
        console.log('Adding to favorites:', id);
      },
      {
        message: 'Sign in to save your favorite businesses',
        returnPath: `/business/${id}`,
      }
    );
  };

  const handleBookNow = () => {
    requireAuth(
      () => {
        router.push(`/booking/${id}`);
      },
      {
        message: 'Sign in to book an appointment',
        returnPath: `/booking/${id}`,
      }
    );
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold">Business Details</Text>

      <TouchableOpacity
        onPress={handleAddToFavorites}
        className="bg-gray-200 p-4 rounded-lg mt-4"
      >
        <Text>Add to Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleBookNow}
        className="bg-red-500 p-4 rounded-lg mt-4"
      >
        <Text className="text-white text-center font-semibold">Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Option B: Using Bottom Sheet (Recommended for Production)

```tsx
// src/app/business/[id].tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuthGuardWithSheet } from '@/hooks';
import { AuthPromptSheet } from '@/components/auth';

export default function BusinessDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { requireAuth, authPromptRef } = useAuthGuardWithSheet();

  const handleAddToFavorites = () => {
    requireAuth(
      () => {
        // Add to favorites logic
        console.log('Adding to favorites:', id);
      },
      {
        message: 'Sign in to save your favorite businesses',
        returnPath: `/business/${id}`,
      }
    );
  };

  const handleBookNow = () => {
    requireAuth(
      () => {
        router.push(`/booking/${id}`);
      },
      {
        message: 'Sign in to book an appointment',
        returnPath: `/booking/${id}`,
      }
    );
  };

  return (
    <>
      <View className="flex-1 bg-white p-4">
        <Text className="text-2xl font-bold">Business Details</Text>

        <TouchableOpacity
          onPress={handleAddToFavorites}
          className="bg-gray-200 p-4 rounded-lg mt-4"
        >
          <Text>Add to Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBookNow}
          className="bg-red-500 p-4 rounded-lg mt-4"
        >
          <Text className="text-white text-center font-semibold">Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* Auth prompt sheet - only shown when needed */}
      <AuthPromptSheet ref={authPromptRef} />
    </>
  );
}
```

---

## 3. Business Detail Page Example

Complete implementation showing both public content and protected actions:

```tsx
// src/app/business/[id].tsx
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Heart, MapPin, Star, Clock } from 'lucide-react-native';
import { useAuthGuardWithSheet } from '@/hooks';
import { AuthPromptSheet } from '@/components/auth';
import { useAuthStore } from '@/store';
import { useState } from 'react';

export default function BusinessDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { requireAuth, authPromptRef } = useAuthGuardWithSheet();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock business data (replace with real GraphQL query)
  const business = {
    id,
    name: 'Glamorous Hair Salon',
    rating: 4.8,
    reviewCount: 124,
    address: '123 Beauty Street, London',
    image: 'https://placeholder.com/salon.jpg',
    description: 'Premium hair styling and beauty treatments',
  };

  const handleToggleFavorite = () => {
    requireAuth(
      () => {
        // Call your GraphQL mutation here
        setIsFavorite(!isFavorite);
      },
      {
        message: 'Sign in to save your favorite businesses',
        returnPath: `/business/${id}`,
      }
    );
  };

  const handleBookNow = () => {
    requireAuth(
      () => {
        router.push(`/booking/${id}` as any);
      },
      {
        message: 'Sign in to book an appointment',
        returnPath: `/booking/${id}`,
      }
    );
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        {/* Hero Image */}
        <View className="relative h-64">
          <Image
            source={{ uri: business.image }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Favorite Button - Protected Action */}
          <TouchableOpacity
            onPress={handleToggleFavorite}
            className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg"
            activeOpacity={0.8}
          >
            <Heart
              size={24}
              color={isFavorite ? '#EF4444' : '#6B7280'}
              fill={isFavorite ? '#EF4444' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Business Info - Public Content */}
        <View className="p-4">
          <Text className="text-3xl font-bold text-gray-900">
            {business.name}
          </Text>

          {/* Rating */}
          <View className="flex-row items-center mt-2">
            <Star size={20} color="#FBBF24" fill="#FBBF24" />
            <Text className="text-lg font-semibold text-gray-900 ml-2">
              {business.rating}
            </Text>
            <Text className="text-gray-600 ml-2">
              ({business.reviewCount} reviews)
            </Text>
          </View>

          {/* Address */}
          <View className="flex-row items-center mt-3">
            <MapPin size={20} color="#6B7280" />
            <Text className="text-gray-700 ml-2">{business.address}</Text>
          </View>

          {/* Description */}
          <Text className="text-gray-700 mt-4 leading-6">
            {business.description}
          </Text>

          {/* Services Section - Public */}
          <View className="mt-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">
              Services
            </Text>
            {/* Service list here */}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Book Button - Protected Action */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <TouchableOpacity
          onPress={handleBookNow}
          className="bg-red-500 rounded-lg py-4 px-6"
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Book Now
          </Text>
        </TouchableOpacity>
      </View>

      {/* Auth Prompt Sheet */}
      <AuthPromptSheet ref={authPromptRef} />
    </>
  );
}
```

---

## 4. Post-Auth Redirect Setup

Add `usePostAuthRedirect` to your login and signup screens to enable automatic return to original page after authentication.

### Login Screen

```tsx
// src/app/(auth)/login.tsx
import { usePostAuthRedirect } from '@/hooks';

export default function LoginScreen() {
  // This hook automatically redirects to returnPath after successful login
  usePostAuthRedirect();

  // ... rest of your login screen code
}
```

### Signup Screen

```tsx
// src/app/(auth)/signup.tsx
import { usePostAuthRedirect } from '@/hooks';

export default function SignupScreen() {
  // This hook automatically redirects to returnPath after successful signup
  usePostAuthRedirect();

  // ... rest of your signup screen code
}
```

### Complete Flow Example

```text
1. Guest User Journey:
   - Views business detail page (public) ✓
   - Clicks "Book Now" button
   - AuthPromptSheet appears with message "Sign in to book an appointment"
   - User clicks "Sign In"
   - Navigates to: /(auth)/login?returnPath=/booking/123

2. Authentication:
   - User enters credentials
   - Login successful
   - usePostAuthRedirect detects returnPath parameter
   - Automatically redirects to: /booking/123

3. Booking Flow Continues:
   - User is now on booking page (as authenticated user)
   - Can complete their original intended action
```

---

## Best Practices

### 1. Always Provide Return Paths
```tsx
// Good
requireAuth(() => {
  router.push(`/booking/${id}`);
}, {
  returnPath: `/booking/${id}` // User returns here after login
});

// Bad
requireAuth(() => {
  router.push(`/booking/${id}`);
}); // Uses current pathname, might not be what you want
```

### 2. Use Meaningful Messages
```tsx
// Good
requireAuth(() => {
  addToCart(item);
}, {
  message: 'Sign in to add items to your cart'
});

// Bad
requireAuth(() => {
  addToCart(item);
}); // Generic "Sign in to continue" message
```

### 3. Choose the Right Approach

**Use Alert (`useAuthGuard`):**
- Quick prototyping
- Simple apps
- Native platform feel preferred

**Use Bottom Sheet (`useAuthGuardWithSheet`):**
- Production apps
- Custom branding important
- Better UX desired
- Consistent cross-platform design

### 4. Public vs Protected Screens

**Public Screens with Protected Actions:**
- Business listings ✓
- Business details ✓
- Service browsing ✓
- Search results ✓

**Protected Screens:**
- Bookings ✓
- Favorites ✓
- Profile ✓
- Order history ✓
- Payment methods ✓

### 5. Accessibility

Always add accessibility labels:

```tsx
<TouchableOpacity
  onPress={handleBookNow}
  accessibilityRole="button"
  accessibilityLabel="Book an appointment at this business"
>
  <Text>Book Now</Text>
</TouchableOpacity>
```

---

## Testing Guest Browsing

1. **Test as Guest:**
   - Clear app data
   - Navigate to protected screens → should see LoginPrompt
   - Try protected actions → should see auth prompt
   - Cancel prompt → should stay on current screen

2. **Test Return Path:**
   - As guest, click "Book Now" on business detail
   - Note the current screen
   - Complete login
   - Should return to booking screen (not tabs)

3. **Test Logout:**
   - Logout from Profile screen
   - Should stay on Profile tab but see LoginPrompt
   - Navigate to other tabs → should work normally

---

## Migration Checklist

- [ ] Update root `index.tsx` to use `<Redirect />`
- [ ] Add `usePostAuthRedirect` to login screen
- [ ] Add `usePostAuthRedirect` to signup screen
- [ ] Wrap protected screens with `<AuthGuard>`
- [ ] Update protected actions to use `requireAuth`
- [ ] Add `<AuthPromptSheet>` to screens with protected actions
- [ ] Test guest browsing flow end-to-end
- [ ] Test return path after authentication
- [ ] Verify logout behavior
- [ ] Add analytics tracking for auth prompts (optional)

---

## Common Patterns

### Pattern 1: Conditional Rendering Based on Auth

```tsx
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

return (
  <View>
    {isAuthenticated ? (
      <TouchableOpacity onPress={handleViewOrders}>
        <Text>View My Orders</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
        <Text>Sign In to View Orders</Text>
      </TouchableOpacity>
    )}
  </View>
);
```

### Pattern 2: Guest Welcome Banner

```tsx
function GuestWelcomeBanner() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  if (isAuthenticated) return null;

  return (
    <View className="bg-blue-50 p-4 m-4 rounded-lg">
      <Text className="text-blue-900 font-semibold mb-2">
        Welcome to Glamfric!
      </Text>
      <Text className="text-blue-800 mb-3">
        Sign in to book appointments and save your favorites
      </Text>
      <TouchableOpacity
        onPress={() => router.push('/(auth)/login')}
        className="bg-blue-500 py-2 px-4 rounded"
      >
        <Text className="text-white text-center">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Pattern 3: Optimistic UI with Auth Check

```tsx
const handleToggleFavorite = async () => {
  requireAuth(async () => {
    // Optimistic update
    setIsFavorite(!isFavorite);

    try {
      await toggleFavoriteMutation({ variables: { businessId: id } });
    } catch (error) {
      // Revert on error
      setIsFavorite(isFavorite);
      Alert.alert('Error', 'Failed to update favorites');
    }
  }, {
    message: 'Sign in to save your favorites'
  });
};
```
