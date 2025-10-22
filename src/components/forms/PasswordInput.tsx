import React, { forwardRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  NativeSyntheticEvent,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

export interface PasswordInputProps extends Omit<TextInputProps, 'onChange' | 'secureTextEntry' | 'style' | 'className'> {
  label: string;
  error?: string;
  onSubmitEditing?: (e: NativeSyntheticEvent<{ text: string }>) => void;
  disabled?: boolean;
  showStrengthIndicator?: boolean;
  strengthScore?: number;
  strengthLabel?: string;
  strengthColor?: string;
  showRequirements?: boolean;
  password?: string;
  className?: string; // NativeWind className for container styles
  labelClassName?: string; // NativeWind className for label text styles
  inputClassName?: string; // NativeWind className for input field styles
  errorClassName?: string; // NativeWind className for error message styles
  toggleClassName?: string; // NativeWind className for eye icon positioning
  strengthClassName?: string; // NativeWind className for password strength indicator container
}

/**
 * PasswordInput Component - Pure NativeWind Implementation
 *
 * A specialized password input with:
 * - Show/hide password toggle
 * - Optional password strength indicator
 * - Password requirements checklist
 * - Inline error messages
 * - Disabled state styling
 * - Proper accessibility
 * - Forward ref support
 *
 * Usage:
 * - Default: <PasswordInput label="Password" />
 * - With error: <PasswordInput label="Password" error="Password required" />
 * - With strength: <PasswordInput label="Password" showStrengthIndicator strengthScore={3} strengthLabel="Strong" />
 * - Custom styling: <PasswordInput label="Password" inputClassName="bg-gray-100 border-2 border-brand-500" />
 */
export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  (
    {
      label,
      error,
      disabled = false,
      showStrengthIndicator = false,
      strengthScore = 0,
      strengthLabel = '',
      strengthColor = '',
      showRequirements = false,
      password = '',
      onFocus,
      onBlur,
      className,
      labelClassName,
      inputClassName,
      errorClassName,
      toggleClassName,
      strengthClassName,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);
    const hasError = !!error;

    const handleFocus = (e: any) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setFocused(false);
      onBlur?.(e);
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    // Password requirements checker
    const getPasswordRequirements = () => {
      return {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecial: /[^a-zA-Z0-9]/.test(password),
      };
    };

    const requirements = showRequirements && password ? getPasswordRequirements() : null;

    // Compute NativeWind classes based on state
    const getContainerClasses = () => {
      if (className) return className;
      return 'mb-4';
    };

    const getLabelClasses = () => {
      if (labelClassName) return labelClassName;
      return `text-[10px] font-normal font-dm-sans mb-1 ${disabled ? 'text-base-500' : 'text-base-900'}`;
    };

    const getInputClasses = () => {
      if (inputClassName) return inputClassName;

      // Match Figma design: px-2 py-3, rounded-base (8px), text-[15px], DM Sans 400
      // Extra right padding (pr-12) for eye icon
      const baseClasses = 'h-12 px-2 py-3 pr-12 rounded-base text-[15px] font-dm-sans font-normal self-stretch';
      const bgClasses = disabled ? 'bg-base-100 text-base-500' : 'bg-white text-base-900';

      let borderClasses = '';
      if (hasError) {
        borderClasses = 'border border-system-red-500';
      } else if (focused) {
        borderClasses = 'border-2 border-brand-500';
      } else {
        borderClasses = 'border border-base-300';
      }

      return `${baseClasses} ${bgClasses} ${borderClasses}`;
    };

    const getErrorClasses = () => {
      if (errorClassName) return errorClassName;
      return 'text-xs text-system-red-500 mt-1';
    };

    const getToggleClasses = () => {
      if (toggleClassName) return toggleClassName;
      return 'absolute right-3 top-3.5';
    };

    return (
      <View className={getContainerClasses()}>
        {/* Label */}
        <Text className={getLabelClasses()}>
          {label}
        </Text>

        {/* Input Container with Eye Icon */}
        <View className="relative self-stretch">
          <TextInput
            ref={ref}
            className={getInputClasses()}
            placeholderTextColor="#9ca3af"
            secureTextEntry={!showPassword}
            editable={!disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            textAlignVertical="center"
            accessible
            accessibilityLabel={label}
            accessibilityHint={error}
            accessibilityState={{ disabled }}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="password"
            {...props}
          />

          {/* Show/Hide Password Toggle */}
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            disabled={disabled}
            className={getToggleClasses()}
            accessible
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
          >
            {showPassword ? (
              <EyeOff size={20} color={disabled ? '#9ca3af' : '#6b7280'} />
            ) : (
              <Eye size={20} color={disabled ? '#9ca3af' : '#6b7280'} />
            )}
          </TouchableOpacity>
        </View>

        {/* Password Strength Indicator */}
        {showStrengthIndicator && strengthScore > 0 && !hasError && (
          <View className={strengthClassName || "mt-2"}>
            <View className="flex-row gap-1 mb-1">
              {[1, 2, 3, 4].map((level) => (
                <View
                  key={level}
                  className={`flex-1 h-1 rounded-full ${
                    level <= strengthScore
                      ? strengthScore === 1
                        ? 'bg-red-500'
                        : strengthScore === 2
                        ? 'bg-orange-500'
                        : strengthScore === 3
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </View>
            <Text className={`text-xs ${strengthColor}`}>{strengthLabel}</Text>
          </View>
        )}

        {/* Password Requirements Checklist */}
        {requirements && !hasError && (
          <View className="mt-2 space-y-1">
            <Text className={`text-xs ${requirements.minLength ? 'text-green-600' : 'text-gray-500'}`}>
              {requirements.minLength ? '✓' : '○'} At least 8 characters
            </Text>
            <Text className={`text-xs ${requirements.hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
              {requirements.hasUppercase ? '✓' : '○'} One uppercase letter
            </Text>
            <Text className={`text-xs ${requirements.hasLowercase ? 'text-green-600' : 'text-gray-500'}`}>
              {requirements.hasLowercase ? '✓' : '○'} One lowercase letter
            </Text>
            <Text className={`text-xs ${requirements.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
              {requirements.hasNumber ? '✓' : '○'} One number
            </Text>
            <Text className={`text-xs ${requirements.hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
              {requirements.hasSpecial ? '✓' : '○'} One special character
            </Text>
          </View>
        )}

        {/* Error Message */}
        {hasError && (
          <Text
            className={getErrorClasses()}
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>
        )}
      </View>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
