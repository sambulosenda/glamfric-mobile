import React, { forwardRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
} from 'react-native';
import { getInputStyles } from '@/theme';

export interface FormInputProps extends Omit<TextInputProps, 'onChange'> {
  label: string;
  error?: string;
  onSubmitEditing?: (e: NativeSyntheticEvent<{ text: string }>) => void;
  disabled?: boolean;
}

/**
 * FormInput Component - Enhanced with Universal Theme
 *
 * Features:
 * - Uses enhanced universal theme system
 * - Focus states with visual feedback
 * - Computed styles for maintainability
 * - Proper accessibility support
 * - Consistent with app-wide design tokens
 */
export const FormInput = forwardRef<TextInput, FormInputProps>(
  ({ label, error, disabled = false, onFocus, onBlur, ...props }, ref) => {
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

    return (
      <View 
        className="flex flex-col items-start self-stretch"
        style={styles.container}
      >
        {/* Label */}  
        <Text style={styles.label}>
          {label}
        </Text>
        
        {/* Input Field */}
        <TextInput
          ref={ref}
          className="self-stretch"
          style={styles.input}
          placeholderTextColor={styles.placeholderTextColor}
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
          <Text style={styles.error} accessibilityLiveRegion="polite">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

FormInput.displayName = 'FormInput';
