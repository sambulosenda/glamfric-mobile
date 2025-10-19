import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Lock } from 'lucide-react-native';

export interface AuthPromptSheetProps {
  /**
   * Custom message to display
   */
  message?: string;

  /**
   * Return path to redirect to after authentication
   */
  returnPath?: string;
}

export interface AuthPromptSheetRef {
  /**
   * Show the auth prompt sheet
   */
  show: (options?: AuthPromptSheetProps) => void;

  /**
   * Hide the auth prompt sheet
   */
  hide: () => void;
}

/**
 * AuthPromptSheet Component
 *
 * A reusable bottom sheet that prompts users to sign in or create an account.
 * Provides better UX than Alert.alert with smooth animations and consistent design.
 *
 * Features:
 * - Smooth slide-up animation using Reanimated
 * - Backdrop tap to dismiss
 * - Consistent design across iOS and Android
 * - Automatic return path handling
 * - Accessible with proper labels
 *
 * @example
 * const authPromptRef = useRef<AuthPromptSheetRef>(null);
 *
 * const handleProtectedAction = () => {
 *   if (!isAuthenticated) {
 *     authPromptRef.current?.show({
 *       message: 'Sign in to book an appointment',
 *       returnPath: `/business/${businessId}`
 *     });
 *   }
 * };
 *
 * return (
 *   <>
 *     <YourComponent />
 *     <AuthPromptSheet ref={authPromptRef} />
 *   </>
 * );
 */
export const AuthPromptSheet = forwardRef<AuthPromptSheetRef, {}>((props, ref) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<AuthPromptSheetProps>({
    message: 'Sign in to continue',
  });

  const translateY = useSharedValue(400);
  const backdropOpacity = useSharedValue(0);

  const show = useCallback((newOptions?: AuthPromptSheetProps) => {
    setOptions(newOptions || { message: 'Sign in to continue' });
    setVisible(true);
    translateY.value = withSpring(0, { damping: 20, stiffness: 300 });
    backdropOpacity.value = withSpring(1);
  }, []);

  const hide = useCallback(() => {
    translateY.value = withSpring(400, { damping: 20, stiffness: 300 });
    backdropOpacity.value = withSpring(0, {}, (finished) => {
      if (finished) {
        runOnJS(setVisible)(false);
      }
    });
  }, []);

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const handleSignIn = () => {
    hide();
    const returnPath = options.returnPath || undefined;
    const href = returnPath
      ? `/(auth)/login?returnPath=${encodeURIComponent(returnPath)}`
      : '/(auth)/login';
    router.push(href as any);
  };

  const handleSignUp = () => {
    hide();
    const returnPath = options.returnPath || undefined;
    const href = returnPath
      ? `/(auth)/signup?returnPath=${encodeURIComponent(returnPath)}`
      : '/(auth)/signup';
    router.push(href as any);
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="none"
      onRequestClose={hide}
    >
      <View style={styles.container}>
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, animatedBackdropStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={hide} />
        </Animated.View>

        {/* Bottom Sheet */}
        <Animated.View style={[styles.sheet, animatedSheetStyle]}>
          {/* Handle */}
          <View style={styles.handle} />

          {/* Icon */}
          <View style={styles.iconContainer}>
            <Lock size={32} color="#6B7280" />
          </View>

          {/* Title */}
          <Text style={styles.title}>Sign In Required</Text>

          {/* Message */}
          <Text style={styles.message}>{options.message}</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSignIn}
              style={styles.primaryButton}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Sign in to continue"
            >
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignUp}
              style={styles.secondaryButton}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Create a new account"
            >
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={hide}
              style={styles.cancelButton}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Cancel and go back"
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 48, // Extra padding for home indicator on iOS
    minHeight: 400,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
});
