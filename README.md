# Glamfric Customer Mobile App

Beauty & Wellness booking platform mobile app built with React Native and Expo.

## Tech Stack

- **Framework**: React Native with Expo
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router (file-based routing)
- **API**: Apollo Client + GraphQL
- **Authentication**: JWT with Expo SecureStore
- **Icons**: Lucide React Native
- **Language**: TypeScript

## Project Structure

```
src/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Authentication screens
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)/            # Main app tabs
│   │   ├── index.tsx      # Discover screen
│   │   ├── bookings.tsx   # My Bookings
│   │   ├── favorites.tsx  # Saved businesses
│   │   └── profile.tsx    # User profile
│   ├── _layout.tsx        # Root layout with providers
│   └── index.tsx          # Entry redirect
├── features/              # Feature-based modules
│   └── auth/             # Authentication logic
├── graphql/              # GraphQL queries & mutations
│   ├── client.ts         # Apollo Client setup
│   ├── queries/
│   └── mutations/
├── shared/               # Shared code
│   ├── ui/              # Reusable UI components
│   ├── types/           # TypeScript types
│   └── constants/       # App constants
├── components/          # General components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── theme/              # Theme configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Install dependencies
bun install

# Start the development server
bun start

# Run on iOS
bun ios

# Run on Android
bun android
```

### Environment Configuration

Update `.env` file with your GraphQL backend URL:

```env
EXPO_PUBLIC_GRAPHQL_URL=http://localhost:3000/api/graphql
```

For development on physical device, use ngrok or your local IP address.

## Features

### Current Features ✅

- User authentication (login/signup)
- Secure token storage
- Tab navigation
- GraphQL integration
- NativeWind styling
- TypeScript support
- Absolute imports (@/ paths)

### Upcoming Features 🚧

- Business discovery and search
- Location-based business browsing
- Service browsing
- Booking flow
- Booking management
- Reviews and ratings
- Push notifications
- Payment integration

## GraphQL Backend

This app connects to the GraphQL backend at `/Users/sambulosenda/Documents/businesportal`.

Available GraphQL operations:
- Authentication (login, signup)
- Business search and discovery
- Service browsing
- Booking management
- Reviews
- Promotions

## Development

### Adding New Screens

Create a new file in `src/app/` following Expo Router conventions:

```tsx
// src/app/business/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function BusinessDetailScreen() {
  const { id } = useLocalSearchParams();
  // Your screen code
}
```

### Using NativeWind

Use Tailwind classes with the `className` prop:

```tsx
<View className="flex-1 bg-white p-4">
  <Text className="text-2xl font-bold text-gray-900">Hello</Text>
</View>
```

### GraphQL Queries

Add queries in `src/graphql/queries/`:

```tsx
import { gql } from '@apollo/client';

export const GET_BUSINESSES = gql`
  query SearchBusinesses($input: SearchBusinessesInput!) {
    searchBusinesses(input: $input) {
      businesses {
        id
        businessName
        rating
      }
    }
  }
`;
```

Use with Apollo Client:

```tsx
import { useQuery } from '@apollo/client';
import { GET_BUSINESSES } from '@/graphql/queries/business';

const { data, loading } = useQuery(GET_BUSINESSES, {
  variables: { input: { limit: 20 } }
});
```

## Troubleshooting

### Clear Cache

```bash
bun run reset
```

### Metro Bundler Issues

```bash
rm -rf node_modules
bun install
```

### TypeScript Errors

Make sure your IDE is using the workspace TypeScript version.

## License

Private
