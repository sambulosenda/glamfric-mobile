import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Lock } from 'lucide-react-native';

export interface LoginPromptProps {
  /**
   * Title of the prompt
   */
  title?: string;

  /**
   * Message explaining why login is required
   */
  message?: string;

  /**
   * Icon to display (defaults to Lock)
   */
  icon?: React.ReactNode;

  /**
   * Show create account button
   */
  showSignUp?: boolean;

  /**
   * Custom return path after authentication
   * If not provided, uses current pathname
   */
  returnPath?: string;
}

/**
 * LoginPrompt Component
 *
 * Displays a centered prompt encouraging users to sign in.
 * Used as fallback content in AuthGuard for protected screens.
 *
 * Performance optimized with React.memo and useCallback
 *
 * @example
 * <LoginPrompt
 *   title="Your Bookings"
 *   message="Sign in to view and manage your appointments"
 * />
 */
export const LoginPrompt: React.FC<LoginPromptProps> = React.memo(({
  title = 'Sign In Required',
  message = 'Sign in to access this feature',
  icon,
  showSignUp = true,
  returnPath,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignIn = useCallback(() => {
    const path = returnPath || pathname;
    const href = `/(auth)/login?returnPath=${encodeURIComponent(path)}`;
    router.push(href as any);
  }, [router, returnPath, pathname]);

  const handleSignUp = useCallback(() => {
    const path = returnPath || pathname;
    const href = `/(auth)/signup?returnPath=${encodeURIComponent(path)}`;
    router.push(href as any);
  }, [router, returnPath, pathname]);

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      {/* Icon */}
      <View className="mb-6 items-center justify-center w-20 h-20 rounded-full bg-gray-100">
        {icon || <Lock size={32} color="#6B7280" />}
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
        {title}
      </Text>

      {/* Message */}
      <Text className="text-base text-gray-600 text-center mb-8 max-w-sm">
        {message}
      </Text>

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={handleSignIn}
        className="w-full bg-red-500 rounded-lg px-6 py-4 mb-3"
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Sign in to your account"
      >
        <Text className="text-white text-center font-semibold text-base">
          Sign In
        </Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      {showSignUp && (
        <TouchableOpacity
          onPress={handleSignUp}
          className="w-full border border-gray-300 rounded-lg px-6 py-4"
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Create a new account"
        >
          <Text className="text-gray-900 text-center font-semibold text-base">
            Create Account
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});
