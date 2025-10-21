import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { getButtonStyles } from '@/theme';

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
 * FormButton Component - Enhanced with Universal Theme + NativeWind Support
 *
 * Features:
 * - Uses enhanced universal theme system OR NativeWind classes
 * - Multiple variants and sizes (when using theme)
 * - Loading states with spinner
 * - Icon support (left/right)
 * - Computed styles for maintainability
 * - Proper accessibility support
 * - NativeWind className support for custom styling
 *
 * Usage:
 * - With theme: <FormButton variant="primary" title="Submit" />
 * - With NativeWind: <FormButton className="bg-white rounded-full" textClassName="text-brand-700" title="Custom" />
 */
export const FormButton: React.FC<FormButtonProps> = ({
  title,
  loading = false,
  variant,
  size = 'medium',
  fullWidth = true,
  leftIcon,
  rightIcon,
  disabled,
  onPress,
  className,
  textClassName,
  spinnerColor,
  ...props
}) => {
  const isDisabled = disabled || loading;

  // Use NativeWind if className provided, otherwise use theme variant
  const useNativeWind = !!className;

  // Get computed styles from enhanced universal theme (only if not using NativeWind)
  const themeStyles = !useNativeWind ? getButtonStyles({
    variant: variant || 'primary',
    size,
    fullWidth,
    disabled: isDisabled
  }) : null;

  const handlePress = (e: any) => {
    if (!isDisabled && onPress) {
      onPress(e);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isDisabled}
      className={className}
      style={!useNativeWind ? themeStyles?.button : undefined}
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
          color={spinnerColor || themeStyles?.spinnerColor || '#fff'}
          className="mr-2"
        />
      )}

      {/* Button Text */}
      <Text
        className={textClassName}
        style={!useNativeWind ? themeStyles?.text : undefined}
      >
        {loading ? 'Loading...' : title}
      </Text>

      {/* Right Icon */}
      {rightIcon && !loading && rightIcon}
    </TouchableOpacity>
  );
};
