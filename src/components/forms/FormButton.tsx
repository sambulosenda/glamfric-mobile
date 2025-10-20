import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { getButtonStyles } from '@/theme';

export interface FormButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * FormButton Component - Enhanced with Universal Theme
 *
 * Features:
 * - Uses enhanced universal theme system
 * - Multiple variants and sizes
 * - Loading states with spinner
 * - Icon support (left/right)
 * - Computed styles for maintainability
 * - Proper accessibility support
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
  ...props
}) => {
  const isDisabled = disabled || loading;
  
  // Get computed styles from enhanced universal theme
  const styles = getButtonStyles({ 
    variant, 
    size, 
    fullWidth, 
    disabled: isDisabled 
  });

  const handlePress = (e: any) => {
    if (!isDisabled && onPress) {
      onPress(e);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isDisabled}
      style={styles.button}
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
          color={styles.spinnerColor}
          style={{ marginRight: 8 }}
        />
      )}
      
      {/* Button Text */}
      <Text style={styles.text}>
        {loading ? 'Loading...' : title}
      </Text>
      
      {/* Right Icon */}
      {rightIcon && !loading && rightIcon}
    </TouchableOpacity>
  );
};
