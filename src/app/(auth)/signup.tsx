import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput as RNTextInput, Keyboard } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useAuthStore } from '@/store';
import { signupSchema, SignupFormData, getPasswordStrength } from '@/features/auth/validation';
import { FormInput, PasswordInput, FormButton } from '@/components/forms';

/**
 * Signup Screen
 *
 * Production-ready signup form with:
 * - react-hook-form for form state management
 * - Zod validation with comprehensive rules
 * - Password strength indicator
 * - Password confirmation field
 * - Show/hide password toggles
 * - Keyboard-aware scrolling
 * - Proper focus management
 * - Form validation before submission
 * - Better error handling
 * - Accessibility support
 */
export default function SignupScreen() {
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Refs for focus management
  const emailRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);
  const confirmPasswordRef = useRef<RNTextInput>(null);

  // Password strength tracking
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
    color: '',
  });

  // Initialize react-hook-form with Zod validation
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Watch password field for strength indicator
  const password = watch('password');

  // Update password strength when password changes
  React.useEffect(() => {
    setPasswordStrength(getPasswordStrength(password));
  }, [password]);

  /**
   * Handle form submission
   * Called only when form validation passes
   */
  const onSubmit = async (data: SignupFormData) => {
    try {
      // Dismiss keyboard
      Keyboard.dismiss();

      // Call auth store signup action
      const result = await signup(data.email, data.password, data.name);

      // Navigate based on verification requirement
      if (result.requiresVerification) {
        // Navigate to verify-email screen with email parameter
        router.replace(`/(auth)/verify-email?email=${encodeURIComponent(data.email)}`);
      } else {
        // Signup successful without verification - navigate to main app
        // User is now authenticated and can access the app
        router.replace('/(tabs)');
      }
    } catch (error) {
      // Set form-level error from API
      const errorMessage = error instanceof Error ? error.message : 'Signup failed. Please try again.';

      // Set error on the most relevant field (email for duplicate accounts)
      setError('email', {
        type: 'manual',
        message: errorMessage,
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      bottomOffset={40}
    >
      <View className="flex-1 px-6 justify-center py-8">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900">Create Account</Text>
          <Text className="text-gray-600 mt-2">Sign up to get started with Glamfric</Text>
        </View>

        {/* Form */}
        <View>
          {/* Name Input */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Full Name"
                placeholder="Enter your full name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
                autoCapitalize="words"
                autoComplete="name"
                textContentType="name"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                disabled={isLoading}
                blurOnSubmit={false}
              />
            )}
          />

          {/* Email Input */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                ref={emailRef}
                label="Email"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                disabled={isLoading}
                blurOnSubmit={false}
              />
            )}
          />

          {/* Password Input with Strength Indicator */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInput
                ref={passwordRef}
                label="Password"
                placeholder="Minimum 8 characters"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                disabled={isLoading}
                showStrengthIndicator
                strengthScore={passwordStrength.score}
                strengthLabel={passwordStrength.label}
                strengthColor={passwordStrength.color}
                showRequirements
                password={value}
                blurOnSubmit={false}
              />
            )}
          />

          {/* Confirm Password Input */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInput
                ref={confirmPasswordRef}
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
                disabled={isLoading}
              />
            )}
          />

          {/* Submit Button */}
          <View className="mt-2">
            <FormButton
              title="Sign Up"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity disabled={isLoading}>
                <Text className="text-red-500 font-semibold">Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
