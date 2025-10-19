import { useEffect, useRef } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuthStore } from '@/store';

/**
 * usePostAuthRedirect Hook
 *
 * Handles automatic redirection after successful authentication.
 * Reads the returnPath from URL params and redirects when user becomes authenticated.
 *
 * Usage in Login/Signup screens:
 * @example
 * export default function LoginScreen() {
 *   usePostAuthRedirect();
 *   // ... rest of login screen logic
 * }
 *
 * This enables the flow:
 * 1. Guest clicks "Book Now" on business detail page
 * 2. useAuthGuard redirects to: /(auth)/login?returnPath=/business/123
 * 3. User logs in successfully
 * 4. usePostAuthRedirect reads returnPath and navigates to /business/123
 * 5. User continues their original booking flow
 */
export const usePostAuthRedirect = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ returnPath?: string }>();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Track if we've already redirected to prevent redirect loops
  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    // Only redirect if:
    // 1. User just became authenticated
    // 2. We have a return path
    // 3. We haven't already redirected
    if (isAuthenticated && params.returnPath && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true;

      // Small delay to ensure auth state is fully settled
      const timer = setTimeout(() => {
        try {
          const decodedPath = decodeURIComponent(params.returnPath as string);

          // Validate path starts with / to prevent open redirect vulnerabilities
          if (decodedPath.startsWith('/')) {
            router.replace(decodedPath as any);
          } else {
            // Invalid path, go to default (tabs)
            router.replace('/(tabs)');
          }
        } catch (error) {
          // Decode failed, go to default
          console.warn('[usePostAuthRedirect] Failed to decode return path:', error);
          router.replace('/(tabs)');
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, params.returnPath, router]);
};
