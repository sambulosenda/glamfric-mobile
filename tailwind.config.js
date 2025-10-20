/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class', // Enable dark mode with class strategy
  safelist: [
    // Safelist dynamic classes that might not be detected during build
    {
      pattern: /^(bg|text|border)-(brand|base|dark|system)-(0|1|2|3|50|100|200|300|400|500|600|700|800|900)$/,
      variants: ['dark', 'hover', 'active', 'focus'],
    },
    {
      pattern: /^(w|h)-(card-image|card-image-sm|card-image-lg)$/,
    },
    {
      pattern: /^font-(dm-sans|dm-sans-medium|dm-sans-semibold|dm-sans-bold)$/,
    },
  ],
  theme: {
    extend: {
      colors: {
        // Semantic colors for light/dark mode theming
        background: {
          DEFAULT: '#ffffff',
          dark: '#1C1C28',
          secondary: '#f9fafb',
          'secondary-dark': '#2C2C3A',
        },
        foreground: {
          DEFAULT: '#111827',
          dark: '#f9fafb',
          muted: '#6b7280',
          'muted-dark': '#8F90A6',
        },
        border: {
          DEFAULT: '#e5e7eb',
          dark: '#3C3C4C',
        },
        card: {
          DEFAULT: '#ffffff',
          dark: '#2C2C3A',
        },


        // Brand Primary (Blue/Purple)
        brand: {
          50: '#f5f3ff',   // Lightest purple/blue
          100: '#ede9fe',  // Light purple/blue
          200: '#CBBFFF',  // Light brand purple
          300: '#9880FE',  // Medium light brand purple
          400: '#6440FE',  // Medium brand purple
          500: '#3F13FE',  // Primary brand purple
          600: '#2C01E2',  // Dark brand purple (darkest)
          700: '#2201c7',  // Darker purple
          800: '#1a019f',  // Very dark purple
          900: '#120177',  // Darkest purple
        },

        // Dark colors from Figma
        dark: {
          0: '#1C1C28',    // Dark-Dark-0
          1: '#2C2C3A',    // Dark-Dark-1
          2: '#3C3C4C',    // Dark-Dark-2
          3: '#8F90A6',    // Dark-Dark-3
        },
        
        // Base/Neutral Colors (Grays)
        base: {
          50: '#f9fafb',   // Lightest gray
          100: '#f3f4f6',  // Light gray
          200: '#e5e7eb',  // Medium light gray
          300: '#d1d5db',  // Medium gray
          400: '#9ca3af',  // Gray
          500: '#6b7280',  // Medium dark gray
          600: '#4b5563',  // Dark gray
          700: '#374151',  // Darker gray
          800: '#1f2937',  // Very dark gray
          900: '#111827',  // Darkest gray/black
        },

        // System Colors
        system: {
          // Orange/Amber
          orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
          },
          
          // Blue (System)
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          
          // Yellow
          yellow: {
            50: '#fefce8',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
          
          // Green
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          
          // Red/Pink
          red: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
          },
        },
      },
      
      fontFamily: {
        'dm-sans': ['DM-Sans'],
        'dm-sans-medium': ['DM-Sans-Medium'],
        'dm-sans-semibold': ['DM-Sans-SemiBold'],
        'dm-sans-bold': ['DM-Sans-Bold'],
      },

      // Font sizes matching theme system
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '60px',
      },

      // Font weights matching theme system
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },

      // Border radius matching theme system
      borderRadius: {
        none: '0',
        sm: '4px',
        base: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
      },

      // Line heights matching theme system
      lineHeight: {
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },

      // Custom heights for common use cases
      height: {
        'card-image': '200px',
        'card-image-sm': '160px',
        'card-image-lg': '240px',
      },
    },
  },
  plugins: [],
}
