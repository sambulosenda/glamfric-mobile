import { useCallback } from 'react';
import { useRouter, usePathname } from 'expo-router';
import { useAuthStore } from '@/store';
import { Alert } from 'react-native';

export interface UseAuthGuardOptions {
  /**
   * Custom message to show when auth is required
   */
  message?: string;

  /**
   * Redirect to login instead of showing alert
   */
  redirectToLogin?: boolean;

  /**
   * Return path after authentication
   * If not provided, uses current pathname
   */
  returnPath?: string;
}

export interface UseAuthGuardReturn {
  /**
   * Wraps an action that requires authentication
   * Shows login prompt if user is not authenticated
   * Executes action if user is authenticated
   */
  requireAuth: (action: () => void, options?: UseAuthGuardOptions) => void;

  /**
   * Current authentication status
   */
  isAuthenticated: boolean;
}

/**
 * useAuthGuard Hook
 *
 * Provides utilities to protect actions that require authentication.
 * Shows login prompts or redirects when guests try to access protected features.
 *
 * Features:
 * - Automatic return path handling after authentication
 * - Supports both Alert and direct redirect flows
 * - Encodes return path in navigation params for post-auth redirect
 *
 * @example
 * const { requireAuth } = useAuthGuard();
 *
 * // Option 1: Execute action after auth (recommended for navigation)
 * const handleBookNow = () => {
 *   requireAuth(() => {
 *     router.push(`/booking/${businessId}`);
 *   }, {
 *     message: 'Sign in to book an appointment',
 *     returnPath: `/booking/${businessId}` // Will redirect here after login
 *   });
 * };
 *
 * // Option 2: Silent redirect (for protected screens)
 * requireAuth(() => {}, { redirectToLogin: true });
 */
export const useAuthGuard = (): UseAuthGuardReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const requireAuth = useCallback(
    (action: () => void, options?: UseAuthGuardOptions) => {
      if (isAuthenticated) {
        // User is authenticated, execute the action
        action();
      } else {
        // User is not authenticated, show prompt
        const message = options?.message || 'Sign in to continue';
        const returnPath = options?.returnPath || pathname;

        // Encode return path as URL parameter for post-auth redirect
        const loginHref = `/(auth)/login?returnPath=${encodeURIComponent(returnPath)}` as const;
        const signupHref = `/(auth)/signup?returnPath=${encodeURIComponent(returnPath)}` as const;

        if (options?.redirectToLogin) {
          // Redirect to login immediately (for protected screens)
          router.push(loginHref);
        } else {
          // Show alert with option to sign in (for protected actions)
          Alert.alert(
            'Sign In Required',
            message,
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Sign In',
                onPress: () => router.push(loginHref),
              },
              {
                text: 'Create Account',
                onPress: () => router.push(signupHref),
              },
            ],
            { cancelable: true }
          );
        }
      }
    },
    [isAuthenticated, router, pathname]
  );

  return {
    requireAuth,
    isAuthenticated,
  };
};
