# Glamfric Color System Usage Guide

This guide shows how to use the new brand color system in your Glamfric app.

## Quick Start

### Import the colors

```tsx
import { colors, semanticColors } from '@/theme/colors';
import { theme } from '@/theme';
```

### Using colors in components

```tsx
// Using brand colors
<View style={{ backgroundColor: colors.brand[500] }}>
  <Text style={{ color: '#ffffff' }}>Primary Brand</Text>
</View>

// Using semantic colors
<Text style={{ color: semanticColors.textPrimary }}>Primary text</Text>
<Text style={{ color: semanticColors.textSecondary }}>Secondary text</Text>
```

### Using with Tailwind classes

```tsx
// Brand colors
<View className="bg-brand-500">
  <Text className="text-white">Primary Brand</Text>
</View>

// Base colors
<View className="bg-base-50 border border-base-200">
  <Text className="text-base-900">Content</Text>
</View>

// System colors
<View className="bg-system-green-500">
  <Text className="text-white">Success</Text>
</View>
```

## Color Categories

### 1. Brand Colors (Purple/Blue Palette)
Primary brand identity colors based on your brand guidelines.

```tsx
// Usage examples
className="bg-brand-500"     // Primary brand purple (#3F13FE)
className="bg-brand-600"     // Hover state (#2C01E2)
className="bg-brand-700"     // Pressed state
className="bg-brand-200"     // Light background (#CBBFFF)

// Your exact brand colors:
// #2C01E2 (brand-600) - Darkest
// #3F13FE (brand-500) - Primary 
// #6440FE (brand-400) - Medium
// #9880FE (brand-300) - Light
// #CBBFFF (brand-200) - Lightest
```

### 2. Base Colors (Gray Palette)
Neutral colors for UI foundation.

```tsx
// Usage examples
className="text-base-900"    // Primary text
className="text-base-600"    // Secondary text
className="bg-base-50"       // Page background
className="border-base-200"  // Light borders
```

### 3. System Colors
Functional colors for feedback and states.

```tsx
// Success
className="bg-system-green-500 text-white"

// Warning
className="bg-system-orange-500 text-white"

// Error
className="bg-system-red-500 text-white"

// Info
className="bg-system-blue-500 text-white"
```

## Component Examples

### Primary Button

```tsx
<TouchableOpacity 
  className="bg-brand-500 px-6 py-3 rounded-lg"
  style={{ backgroundColor: colors.brand[500] }}
>
  <Text className="text-white font-semibold text-center">
    Book Now
  </Text>
</TouchableOpacity>
```

### Secondary Button

```tsx
<TouchableOpacity 
  className="border border-brand-500 px-6 py-3 rounded-lg"
>
  <Text className="text-brand-500 font-semibold text-center">
    Learn More
  </Text>
</TouchableOpacity>
```

### Card Component

```tsx
<View 
  className="bg-white rounded-xl p-4 border border-base-200"
  style={theme.shadows.base}
>
  <Text className="text-base-900 font-semibold mb-2">
    Business Name
  </Text>
  <Text className="text-base-600">
    Business description here...
  </Text>
</View>
```

### Status Messages

```tsx
// Success message
<View className="bg-system-green-50 border border-system-green-200 rounded-lg p-3">
  <Text className="text-system-green-800">Booking confirmed!</Text>
</View>

// Error message
<View className="bg-system-red-50 border border-system-red-200 rounded-lg p-3">
  <Text className="text-system-red-800">Something went wrong</Text>
</View>

// Warning message
<View className="bg-system-orange-50 border border-system-orange-200 rounded-lg p-3">
  <Text className="text-system-orange-800">Please verify your email</Text>
</View>
```

## Updating Existing Components

To update your existing components to use the new brand colors:

1. **Replace red colors** with brand colors:
   ```tsx
   // Old
   className="bg-red-500"
   
   // New
   className="bg-brand-500"
   ```

2. **Use semantic colors for text**:
   ```tsx
   // Old
   style={{ color: '#000000' }}
   
   // New
   style={{ color: semanticColors.textPrimary }}
   ```

3. **Update button components** to use brand colors:
   ```tsx
   // Old
   className="bg-red-500 hover:bg-red-600"
   
   // New
   className="bg-brand-500 hover:bg-brand-600"
   ```

## Color Utility Functions

```tsx
import { colorUtils } from '@/theme/colors';

// Get brand color with specific weight
const primaryColor = colorUtils.brand(500);

// Get system color
const successColor = colorUtils.system('green', 500);

// Add opacity to color
const transparentBrand = colorUtils.withOpacity(colors.brand[500], 0.5);
```

## Best Practices

1. **Use semantic colors** for consistent text and UI elements
2. **Stick to the brand palette** for primary actions and branding
3. **Use system colors** for status messages and feedback
4. **Test accessibility** - ensure sufficient contrast ratios
5. **Be consistent** - use the same color weights for similar elements

## Migration Checklist

- [ ] Update Tailwind config with new colors ✅
- [ ] Create color constants file ✅
- [ ] Update existing components to use brand colors
- [ ] Test color contrast for accessibility
- [ ] Update design system documentation
- [ ] Train team on new color usage

Your brand color system is now ready to use! 🎨