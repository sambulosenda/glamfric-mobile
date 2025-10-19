import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

export interface FormButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

/**
 * FormButton Component
 *
 * A reusable form button with:
 * - Loading state with spinner
 * - Multiple variants (primary, secondary, outline)
 * - Disabled state styling
 * - Proper accessibility
 * - Full width option
 */
export const FormButton: React.FC<FormButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  fullWidth = true,
  disabled,
  className,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const variantStyles = {
    primary: {
      container: 'bg-red-500',
      containerDisabled: 'bg-red-300',
      text: 'text-white',
    },
    secondary: {
      container: 'bg-gray-600',
      containerDisabled: 'bg-gray-300',
      text: 'text-white',
    },
    outline: {
      container: 'bg-transparent border-2 border-red-500',
      containerDisabled: 'bg-transparent border-2 border-red-300',
      text: 'text-red-500',
    },
  };

  const styles = variantStyles[variant];

  return (
    <TouchableOpacity
      className={`
        rounded-lg py-4 items-center justify-center
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? styles.containerDisabled : styles.container}
        ${className || ''}
      `.trim()}
      disabled={isDisabled}
      accessible
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? '#EF4444' : '#FFFFFF'}
          testID="form-button-spinner"
        />
      ) : (
        <Text
          className={`font-semibold text-base ${styles.text}`}
          style={{ opacity: isDisabled ? 0.6 : 1 }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
