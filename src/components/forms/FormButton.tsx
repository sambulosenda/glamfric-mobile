import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { tv } from 'tailwind-variants';

// Tailwind Variants configuration for button styles
const buttonVariants = tv({
  base: 'flex-row items-center justify-center rounded-base',
  variants: {
    variant: {
      primary: 'bg-brand-500',
      secondary: 'bg-transparent border border-brand-500',
      ghost: 'bg-transparent',
    },
    size: {
      small: 'h-9 px-3',
      medium: 'h-12 px-4',
      large: 'h-14 px-5',
    },
    fullWidth: {
      true: 'self-stretch',
      false: '',
    },
    disabled: {
      true: '',
    },
  },
  compoundVariants: [
    // Primary disabled state
    {
      variant: 'primary',
      disabled: true,
      class: 'bg-base-300',
    },
    // Secondary disabled state
    {
      variant: 'secondary',
      disabled: true,
      class: 'border-base-300',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    fullWidth: true,
  },
});

// Tailwind Variants configuration for text styles
const textVariants = tv({
  base: 'font-semibold',
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'text-brand-500',
      ghost: 'text-brand-500',
    },
    size: {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    },
    disabled: {
      true: '',
    },
  },
  compoundVariants: [
    // Primary disabled state
    {
      variant: 'primary',
      disabled: true,
      class: 'text-base-500',
    },
    // Secondary/Ghost disabled state
    {
      variant: ['secondary', 'ghost'],
      disabled: true,
      class: 'text-base-400',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

export interface FormButtonProps extends Omit<TouchableOpacityProps, 'style' | 'className'> {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string; // NativeWind className for custom button styles
  textClassName?: string; // NativeWind className for custom text styles
  spinnerColor?: string; // Custom spinner color for themed buttons
}

/**
 * FormButton Component - Tailwind Variants
 *
 * Features:
 * - Type-safe variants using tailwind-variants
 * - Loading states with spinner
 * - Icon support (left/right)
 * - Proper accessibility support
 * - Custom className override support
 *
 * Usage:
 * <FormButton variant="primary" size="medium" title="Submit" />
 * <FormButton className="bg-custom-500" textClassName="text-white" title="Custom" />
 */
export const FormButton: React.FC<FormButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  size = 'medium',
  fullWidth = true,
  leftIcon,
  rightIcon,
  disabled,
  onPress,
  className,
  textClassName,
  spinnerColor = '#fff',
  ...props
}) => {
  const isDisabled = disabled || loading;

  const handlePress = (e: any) => {
    if (!isDisabled && onPress) {
      onPress(e);
    }
  };

  // Generate button and text classes using tailwind-variants
  const buttonClass = className || buttonVariants({ variant, size, fullWidth, disabled: isDisabled });
  const textClass = textClassName || textVariants({ variant, size, disabled: isDisabled });

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isDisabled}
      className={buttonClass}
      accessible
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      {...props}
    >
      {/* Left Icon */}
      {leftIcon && !loading && leftIcon}

      {/* Loading Spinner */}
      {loading && (
        <ActivityIndicator
          size="small"
          color={spinnerColor}
          className="mr-2"
        />
      )}

      {/* Button Text */}
      <Text className={textClass}>
        {loading ? 'Loading...' : title}
      </Text>

      {/* Right Icon */}
      {rightIcon && !loading && rightIcon}
    </TouchableOpacity>
  );
};
