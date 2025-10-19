import React, { forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
} from 'react-native';

export interface FormInputProps extends Omit<TextInputProps, 'onChange'> {
  label: string;
  error?: string;
  onSubmitEditing?: (e: NativeSyntheticEvent<{ text: string }>) => void;
  disabled?: boolean;
}

/**
 * FormInput Component
 *
 * A reusable form input with:
 * - Label
 * - Inline error messages
 * - Disabled state styling
 * - Proper accessibility labels
 * - Forward ref support for focus management
 */
export const FormInput = forwardRef<TextInput, FormInputProps>(
  ({ label, error, disabled, className, ...props }, ref) => {
    const hasError = !!error;

    return (
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">
          {label}
        </Text>
        <TextInput
          ref={ref}
          className={`
            border rounded-lg px-4 py-3 text-base
            ${hasError ? 'border-red-500' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}
            ${className || ''}
          `.trim()}
          placeholderTextColor="#9CA3AF"
          textAlignVertical="center"
          editable={!disabled}
          accessible
          accessibilityLabel={label}
          accessibilityHint={error}
          accessibilityState={{ disabled: !!disabled }}
          {...props}
        />
        {hasError && (
          <Text className="text-red-600 text-sm mt-1.5" accessibilityLiveRegion="polite">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

FormInput.displayName = 'FormInput';
