/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
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

        // Legacy colors (maintaining backward compatibility)
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#CBBFFF',
          300: '#9880FE',
          400: '#6440FE',
          500: '#3F13FE',  // Maps to brand.500
          600: '#2C01E2',
          700: '#2201c7',
          800: '#1a019f',
          900: '#120177',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      
      fontFamily: {
        'dm-sans': ['DM-Sans'],
      },
    },
  },
  plugins: [],
}
