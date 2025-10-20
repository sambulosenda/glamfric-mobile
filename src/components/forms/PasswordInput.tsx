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
import { getInputStyles } from '@/theme';

export interface PasswordInputProps extends Omit<TextInputProps, 'onChange' | 'secureTextEntry'> {
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
}

/**
 * PasswordInput Component
 *
 * A specialized password input with:
 * - Show/hide password toggle
 * - Optional password strength indicator
 * - Inline error messages
 * - Disabled state styling
 * - Proper accessibility
 * - Forward ref support
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
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);
    const hasError = !!error;

    // Get computed styles from enhanced universal theme
    const styles = getInputStyles({ hasError, disabled, focused });
    
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

    return (
      <View 
        className="flex flex-col items-start self-stretch"
        style={styles.container}
      >
        {/* Label */}
        <Text style={styles.label}>
          {label}
        </Text>
        
        {/* Input Container with Eye Icon */}
        <View className="relative self-stretch">
          <TextInput
            ref={ref}
            className="self-stretch"
            style={{
              ...styles.input,
              paddingRight: 48, // Space for eye icon
            }}
            placeholderTextColor={styles.placeholderTextColor}
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
            className="absolute right-3 top-3.5"
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
          <View className="mt-2">
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
          <Text style={styles.error} accessibilityLiveRegion="polite">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
