/**
 * Brand Color System
 * 
 * Based on the Glamfric brand guidelines with comprehensive color palettes
 * for brand, base, and system colors.
 */

export const colors = {
  // Brand Primary (Purple/Blue) - Main brand identity
  brand: {
    50: '#f5f3ff',   // Lightest purple - backgrounds, subtle elements
    100: '#ede9fe',  // Light purple - hover states, light backgrounds
    200: '#CBBFFF',  // Light brand purple - borders, dividers
    300: '#9880FE',  // Medium light brand purple - secondary actions
    400: '#6440FE',  // Medium brand purple - primary actions
    500: '#3F13FE',  // Primary brand purple - main CTAs, logos
    600: '#2C01E2',  // Dark brand purple - active states (darkest from your palette)
    700: '#2201c7',  // Darker purple - pressed states
    800: '#1a019f',  // Very dark purple - text on light backgrounds
    900: '#120177',  // Darkest purple - headers, strong emphasis
  },
  
  // Base/Neutral Colors (Grays) - UI foundation
  base: {
    50: '#f9fafb',   // Lightest gray - page backgrounds
    100: '#f3f4f6',  // Light gray - card backgrounds
    200: '#e5e7eb',  // Medium light gray - borders, dividers
    300: '#d1d5db',  // Medium gray - disabled states
    400: '#9ca3af',  // Gray - placeholder text
    500: '#6b7280',  // Medium dark gray - secondary text
    600: '#4b5563',  // Dark gray - body text
    700: '#374151',  // Darker gray - headings
    800: '#1f2937',  // Very dark gray - emphasis text
    900: '#111827',  // Darkest gray/black - primary text
  },

  // Figma Design Tokens
  figma: {
    darkDark4: '#C7C9D9',  // var(--Dark-Dark-4) - Input borders
    borderRadius: {
      sm: 4,
      md: 8,    // Standard input border radius
      lg: 12,
      xl: 16,
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,   // Standard padding vertical
      lg: 16,
      xl: 20,
    },
  },

  // System Colors - Functional colors for feedback and states
  system: {
    // Orange/Amber - Warnings, highlights
    orange: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',  // Primary orange
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    
    // Blue (System) - Information, links
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',  // Primary system blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    // Yellow - Caution, pending states
    yellow: {
      50: '#fefce8',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',  // Primary yellow
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    // Green - Success, positive actions
    green: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',  // Primary green
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    // Red/Pink - Errors, destructive actions
    red: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',  // Primary red
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
  },
} as const;

/**
 * Semantic color mappings for common use cases
 */
export const semanticColors = {
  // Primary brand colors
  primary: colors.brand[500],      // #3F13FE
  primaryHover: colors.brand[600], // #2C01E2
  primaryPressed: colors.brand[700], // #2201c7
  primaryLight: colors.brand[100], // #ede9fe
  
  // Text colors
  textPrimary: colors.base[900],
  textSecondary: colors.base[600],
  textTertiary: colors.base[500],
  textDisabled: colors.base[400],
  textOnBrand: '#ffffff',
  
  // Background colors
  backgroundPrimary: '#ffffff',
  backgroundSecondary: colors.base[50],
  backgroundTertiary: colors.base[100],
  
  // Border colors
  borderLight: colors.base[200],
  borderMedium: colors.base[300],
  borderStrong: colors.base[400],
  
  // Status colors
  success: colors.system.green[500],
  warning: colors.system.orange[500],
  error: colors.system.red[500],
  info: colors.system.blue[500],
  
  // Status backgrounds
  successLight: colors.system.green[50],
  warningLight: colors.system.orange[50],
  errorLight: colors.system.red[50],
  infoLight: colors.system.blue[50],
} as const;

/**
 * Color utility functions
 */
export const colorUtils = {
  /**
   * Get a color with opacity
   */
  withOpacity: (color: string, opacity: number): string => {
    // Convert hex to rgba
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },
  
  /**
   * Get brand color by weight
   */
  brand: (weight: keyof typeof colors.brand = 500) => colors.brand[weight],
  
  /**
   * Get base color by weight
   */
  base: (weight: keyof typeof colors.base = 500) => colors.base[weight],
  
  /**
   * Get system color by color and weight
   */
  system: (color: keyof typeof colors.system, weight: keyof typeof colors.system.orange = 500) => 
    colors.system[color][weight],
};

export default colors;