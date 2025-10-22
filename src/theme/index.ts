/**
 * Glamfric Theme Configuration
 * 
 * Comprehensive theme system including colors, typography, spacing,
 * and component styles based on the brand guidelines.
 */

import { colors, semanticColors } from './colors';

// Shadows definition (moved before theme to avoid circular reference)
const shadows = {
  sm: {
    shadowColor: colors.base[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: colors.base[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: colors.base[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: colors.base[900],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  xl: {
    shadowColor: colors.base[900],
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 15,
  },
};

export const theme = {
  colors,
  semanticColors,
  // Shadows
  shadows,
  
  // Typography scale
  typography: {
    // Font families
    fontFamily: {
      sans: ['DM-Sans', 'Arial', 'sans-serif'],
      mono: ['SF Mono', 'Monaco', 'monospace'],
    },
    
    // Font sizes
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
    },
    
    // Line heights
    lineHeight: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    
    // Font weights
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  
  // Spacing scale (based on 4px grid)
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
  },
  
  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  
  // Component styles
  components: {
    // Button styles
    button: {
      // Primary button
      primary: {
        backgroundColor: colors.brand[500],
        borderColor: colors.brand[500],
        color: '#ffffff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        fontWeight: '600',
        fontSize: 16,
        hover: {
          backgroundColor: colors.brand[600],
          borderColor: colors.brand[600],
        },
        pressed: {
          backgroundColor: colors.brand[700],
          borderColor: colors.brand[700],
        },
        disabled: {
          backgroundColor: colors.base[300],
          borderColor: colors.base[300],
          color: colors.base[500],
        },
      },
      
      // Secondary button
      secondary: {
        backgroundColor: 'transparent',
        borderColor: colors.brand[500],
        color: colors.brand[500],
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 1,
        fontWeight: '600',
        fontSize: 16,
        hover: {
          backgroundColor: colors.brand[50],
          borderColor: colors.brand[600],
          color: colors.brand[600],
        },
        pressed: {
          backgroundColor: colors.brand[100],
          borderColor: colors.brand[700],
          color: colors.brand[700],
        },
        disabled: {
          backgroundColor: 'transparent',
          borderColor: colors.base[300],
          color: colors.base[400],
        },
      },
      
      // Ghost button
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: colors.brand[500],
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        fontWeight: '600',
        fontSize: 16,
        hover: {
          backgroundColor: colors.brand[50],
          color: colors.brand[600],
        },
        pressed: {
          backgroundColor: colors.brand[100],
          color: colors.brand[700],
        },
        disabled: {
          backgroundColor: 'transparent',
          color: colors.base[400],
        },
      },

      
    // Input styles (Design Tokens)
    input: {
      base: {
        backgroundColor: '#ffffff',
        borderColor: colors.figma.darkDark4,        // #C7C9D9 from Figma
        borderWidth: 1,                             // 1px solid border
        borderRadius: colors.figma.borderRadius.md, // 8px radius
        paddingVertical: colors.figma.spacing.md,   // 12px vertical padding
        paddingHorizontal: colors.figma.spacing.sm, // 8px horizontal padding (Figma spec)
        fontSize: 16,
        color: colors.base[900],
        placeholderTextColor: colors.base[400],
        
        // Container layout (Figma flex specs)
        containerStyle: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 10,  // 10px gap from Figma
          alignSelf: 'stretch',
          paddingVertical: colors.figma.spacing.md,  // 12px
          paddingHorizontal: colors.figma.spacing.sm, // 8px
        },
        
        // State variations
        focus: {
          borderColor: colors.brand[500],
          borderWidth: 2,
        },
        error: {
          borderColor: colors.system.red[500],
          borderWidth: 1,
        },
        disabled: {
          backgroundColor: colors.base[100],
          borderColor: colors.base[200],
          color: colors.base[500],
        },
      },
    },
    
    // Card styles
    card: {
      base: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        ...shadows.base,
      },
      elevated: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        ...shadows.lg,
      },
    },
  },
} as const;

/**
 * Enhanced Computed Style Functions
 * 
 * These functions provide clean APIs for complex components while using
 * the universal theme tokens for consistency.
 */

/**
 * Get computed input styles based on current state
 * Uses universal theme tokens for consistency
 */
export const getInputStyles = ({
  hasError = false,
  disabled = false,
  focused = false,
}: {
  hasError?: boolean;
  disabled?: boolean;
  focused?: boolean;
}) => {
  const baseInput = theme.components.input.base;
  
  return {
    container: {
      ...baseInput.containerStyle,
      gap: 4,
    },
    label: {
      fontSize: theme.typography.fontSize.sm,
      fontWeight: theme.typography.fontWeight.medium,
      color: disabled ? colors.base[500] : colors.base[900],
    },
    input: {
      height: 48,
      paddingHorizontal: baseInput.paddingHorizontal,
      paddingVertical: baseInput.paddingVertical,
      borderRadius: baseInput.borderRadius,
      borderWidth: focused ? baseInput.focus.borderWidth : baseInput.borderWidth,
      borderColor: hasError 
        ? baseInput.error.borderColor
        : focused 
        ? baseInput.focus.borderColor 
        : baseInput.borderColor,
      backgroundColor: disabled ? baseInput.disabled.backgroundColor : baseInput.backgroundColor,
      color: disabled ? baseInput.disabled.color : baseInput.color,
      fontSize: baseInput.fontSize,
    },
    placeholderTextColor: baseInput.placeholderTextColor,
    error: {
      fontSize: theme.typography.fontSize.xs,
      color: colors.system.red[500],
      marginTop: 4,
    },
  };
};

/**
 * Get computed button styles based on variant, size, and state
 * Uses universal theme tokens for consistency
 */
export const getButtonStyles = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = true,
  disabled = false,
}: {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glassmorphic' | 'onboarding-primary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
}) => {
  const variantStyles = theme.components.button[variant];

  // Size configurations
  const sizeConfig = {
    small: { height: 36, paddingHorizontal: 12, fontSize: theme.typography.fontSize.sm },
    medium: { height: 48, paddingHorizontal: 16, fontSize: variantStyles.fontSize },
    large: { height: 56, paddingHorizontal: 20, fontSize: theme.typography.fontSize.lg },
  };

  const sizeStyles = sizeConfig[size];

  const buttonStyle = {
    height: sizeStyles.height,
    paddingHorizontal: sizeStyles.paddingHorizontal,
    paddingVertical: variantStyles.paddingVertical,
    borderRadius: variantStyles.borderRadius,
    backgroundColor: disabled
      ? variantStyles.disabled.backgroundColor
      : variantStyles.backgroundColor,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
    ...(fullWidth && { alignSelf: 'stretch' as const }),
    // Add border styles conditionally for secondary and glassmorphic variants
    ...((variant === 'secondary' || variant === 'glassmorphic') && {
      borderWidth: (variantStyles as any).borderWidth || 1,
      borderColor: disabled
        ? (variantStyles.disabled as any).borderColor
        : variantStyles.borderColor,
    }),
  };

  const textStyle = {
    fontSize: sizeStyles.fontSize,
    fontWeight: variantStyles.fontWeight,
    color: disabled ? variantStyles.disabled.color : variantStyles.color,
  };

  const spinnerColor = disabled ? variantStyles.disabled.color : variantStyles.color;

  return {
    button: buttonStyle,
    text: textStyle,
    spinnerColor,
  };
};

/**
 * Theme utility functions
 */
export const themeUtils = {
  /**
   * Get spacing value
   */
  spacing: (value: keyof typeof theme.spacing) => theme.spacing[value],
  
  /**
   * Get border radius value
   */
  borderRadius: (value: keyof typeof theme.borderRadius) => theme.borderRadius[value],
  
  /**
   * Get typography values
   */
  fontSize: (size: keyof typeof theme.typography.fontSize) => theme.typography.fontSize[size],
  fontWeight: (weight: keyof typeof theme.typography.fontWeight) => theme.typography.fontWeight[weight],
  lineHeight: (height: keyof typeof theme.typography.lineHeight) => theme.typography.lineHeight[height],
  
  /**
   * Get component styles
   */
  button: (variant: keyof typeof theme.components.button) => theme.components.button[variant],
  input: () => theme.components.input.base,
  card: (variant: keyof typeof theme.components.card = 'base') => theme.components.card[variant],
};

export default theme;