import { useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'expo-router';
import { useAuthStore } from '@/store';
import type { AuthPromptSheetRef } from '@/components/auth/AuthPromptSheet';

export interface UseAuthGuardWithSheetOptions {
  /**
   * Custom message to show when auth is required
   */
  message?: string;

  /**
   * Return path after authentication
   * If not provided, uses current pathname
   */
  returnPath?: string;

  /**
   * Redirect to login silently (no sheet shown)
   */
  redirectToLogin?: boolean;
}

export interface UseAuthGuardWithSheetReturn {
  /**
   * Wraps an action that requires authentication
   * Shows auth prompt sheet if user is not authenticated
   * Executes action if user is authenticated
   */
  requireAuth: (action: () => void, options?: UseAuthGuardWithSheetOptions) => void;

  /**
   * Current authentication status
   */
  isAuthenticated: boolean;

  /**
   * Ref to pass to AuthPromptSheet component
   */
  authPromptRef: React.RefObject<AuthPromptSheetRef | null>;
}

/**
 * useAuthGuardWithSheet Hook
 *
 * Enhanced version of useAuthGuard that uses a bottom sheet for better UX.
 * Requires <AuthPromptSheet ref={authPromptRef} /> in your component tree.
 *
 * @example
 * function BusinessDetailScreen() {
 *   const { requireAuth, authPromptRef } = useAuthGuardWithSheet();
 *
 *   const handleBookNow = () => {
 *     requireAuth(() => {
 *       router.push(`/booking/${businessId}`);
 *     }, {
 *       message: 'Sign in to book an appointment',
 *       returnPath: `/booking/${businessId}`
 *     });
 *   };
 *
 *   return (
 *     <>
 *       <YourContent />
 *       <AuthPromptSheet ref={authPromptRef} />
 *     </>
 *   );
 * }
 */
export const useAuthGuardWithSheet = (): UseAuthGuardWithSheetReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const authPromptRef = useRef<AuthPromptSheetRef | null>(null);

  const requireAuth = useCallback(
    (action: () => void, options?: UseAuthGuardWithSheetOptions) => {
      if (isAuthenticated) {
        // User is authenticated, execute the action
        action();
      } else {
        // User is not authenticated
        const returnPath = options?.returnPath || pathname;

        if (options?.redirectToLogin) {
          // Redirect to login silently (for protected screens)
          const href = `/(auth)/login?returnPath=${encodeURIComponent(returnPath)}`;
          router.push(href as any);
        } else {
          // Show auth prompt sheet (for protected actions)
          authPromptRef.current?.show({
            message: options?.message || 'Sign in to continue',
            returnPath,
          });
        }
      }
    },
    [isAuthenticated, router, pathname]
  );

  return {
    requireAuth,
    isAuthenticated,
    authPromptRef,
  };
};
