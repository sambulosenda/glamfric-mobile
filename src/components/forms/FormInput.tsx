import React, { forwardRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
} from 'react-native';

export interface FormInputProps extends Omit<TextInputProps, 'onChange' | 'style' | 'className'> {
  label: string;
  error?: string;
  onSubmitEditing?: (e: NativeSyntheticEvent<{ text: string }>) => void;
  disabled?: boolean;
  className?: string; // NativeWind className for container styles
  labelClassName?: string; // NativeWind className for label text styles
  inputClassName?: string; // NativeWind className for input field styles
  errorClassName?: string; // NativeWind className for error message styles
}

/**
 * FormInput Component - Pure NativeWind Implementation
 *
 * Features:
 * - Pure NativeWind/Tailwind utility classes
 * - Focus states with visual feedback
 * - Error state styling
 * - Disabled state support
 * - Proper accessibility support
 * - Custom className overrides for all elements
 *
 * Usage:
 * - Default: <FormInput label="Email" />
 * - With error: <FormInput label="Email" error="Invalid email" />
 * - Custom styling: <FormInput label="Email" inputClassName="bg-gray-100 border-2 border-brand-500" />
 */
export const FormInput = forwardRef<TextInput, FormInputProps>(
  ({
    label,
    error,
    disabled = false,
    onFocus,
    onBlur,
    className,
    labelClassName,
    inputClassName,
    errorClassName,
    ...props
  }, ref) => {
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
      const baseClasses = 'h-12 px-2 py-3 rounded-base text-[15px] font-dm-sans font-normal self-stretch';
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

    return (
      <View className={getContainerClasses()}>
        {/* Label */}
        <Text className={getLabelClasses()}>
          {label}
        </Text>

        {/* Input Field */}
        <TextInput
          ref={ref}
          className={getInputClasses()}
          placeholderTextColor="#9ca3af"
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          textAlignVertical="center"
          accessible
          accessibilityLabel={label}
          accessibilityHint={error}
          accessibilityState={{ disabled }}
          {...props}
        />

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

FormInput.displayName = 'FormInput';
