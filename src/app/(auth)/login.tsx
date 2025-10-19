import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput as RNTextInput, Keyboard } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useAuthStore } from '@/store';
import { loginSchema, LoginFormData } from '@/features/auth/validation';
import { FormInput, PasswordInput, FormButton } from '@/components/forms';

/**
 * Login Screen
 *
 * Production-ready login form with:
 * - react-hook-form for form state management
 * - Zod validation with inline error messages
 * - Show/hide password toggle
 * - Keyboard-aware scrolling
 * - Proper focus management
 * - Form validation before submission
 * - Better error handling
 * - Accessibility support
 */
export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Refs for focus management
  const passwordRef = useRef<RNTextInput>(null);

  // Initialize react-hook-form with Zod validation
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * Handle form submission
   * Called only when form validation passes
   */
  const onSubmit = async (data: LoginFormData) => {
    try {
      // Dismiss keyboard
      Keyboard.dismiss();

      // Call auth store login action
      await login(data.email, data.password);

      // Navigate to tabs on success
      router.replace('/(tabs)');
    } catch (error) {
      // Set form-level error from API
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';

      // Set error on the most relevant field (email for invalid credentials)
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
          <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
          <Text className="text-gray-600 mt-2">Login to your Glamfric account</Text>
        </View>

        {/* Form */}
        <View>
          {/* Email Input */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
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

          {/* Password Input */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordInput
                ref={passwordRef}
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
                disabled={isLoading}
              />
            )}
          />

          {/* Submit Button */}
          <View className="mt-2">
            <FormButton
              title="Login"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              disabled={!isValid || isLoading}
            />
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Don't have an account? </Text>
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity disabled={isLoading}>
                <Text className="text-red-500 font-semibold">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
