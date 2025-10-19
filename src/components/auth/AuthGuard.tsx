import React from 'react';
import { useAuthStore } from '@/store';

export interface AuthGuardProps {
  /**
   * Content to display when user is authenticated
   */
  children: React.ReactNode;

  /**
   * Content to display when user is NOT authenticated
   */
  fallback: React.ReactNode;

  /**
   * Optional callback when auth is required but user is not authenticated
   * Note: This callback will only fire once when component mounts if user is not authenticated
   */
  onAuthRequired?: () => void;
}

/**
 * AuthGuard Component
 *
 * Conditionally renders content based on authentication status.
 * Shows fallback UI when user is not authenticated.
 *
 * Performance optimized:
 * - Uses React.memo to prevent unnecessary re-renders
 * - useRef for onAuthRequired to avoid dependency issues
 *
 * @example
 * <AuthGuard fallback={<LoginPrompt />}>
 *   <ProtectedContent />
 * </AuthGuard>
 */
export const AuthGuard: React.FC<AuthGuardProps> = React.memo(({
  children,
  fallback,
  onAuthRequired,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const onAuthRequiredRef = React.useRef(onAuthRequired);

  // Track if callback has been called to prevent multiple invocations
  const calledRef = React.useRef(false);

  // Keep ref in sync with latest callback
  React.useEffect(() => {
    onAuthRequiredRef.current = onAuthRequired;
  }, [onAuthRequired]);

  // Fire callback once when user is not authenticated
  React.useEffect(() => {
    if (!isAuthenticated && onAuthRequiredRef.current && !calledRef.current) {
      calledRef.current = true;
      onAuthRequiredRef.current();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
});
