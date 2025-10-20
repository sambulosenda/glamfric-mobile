# Airbnb-Inspired Design Specification
## Business Discovery Components

**Version:** 1.0
**Date:** October 20, 2025
**Tech Stack:** React Native + Expo, NativeWind, Lucide Icons
**Brand Color:** Red (#EF4444)

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Design System Foundations](#design-system-foundations)
3. [Component Specifications](#component-specifications)
4. [Implementation Guide](#implementation-guide)
5. [Interaction Patterns](#interaction-patterns)

---

## Design Philosophy

### Airbnb's Core Design Principles Applied

**1. Clarity & Simplicity**
- Clean, uncluttered layouts with generous white space
- Focus user attention on content (images and essential information)
- Reduce visual noise by eliminating unnecessary borders and decorations

**2. Image-First Approach**
- High-quality imagery takes center stage
- Images are given generous space and prominent positioning
- Content doesn't compete with imagery—it complements it

**3. Soft, Approachable Aesthetic**
- Rounded corners throughout (12px-16px standard)
- Subtle shadows for depth (avoid harsh, heavy shadows)
- Soft color palette with gentle contrasts

**4. Premium Feel**
- Attention to detail in spacing and alignment
- Smooth transitions and micro-interactions
- Professional typography hierarchy

**5. Functional Beauty**
- Every element serves a purpose
- Visual hierarchy guides the user journey
- Accessibility is built-in, not bolted on

---

## Design System Foundations

### Color Palette

#### Primary Colors
```
Brand Red:     #EF4444 (red-500)
Brand Red Hover: #DC2626 (red-600)
Brand Red Light: #FEE2E2 (red-50)
```

#### Neutral Grays (Airbnb-inspired)
```
Deep Charcoal:  #222222 (Primary text)
Slate Gray:     #484848 (Secondary text)
Medium Gray:    #717171 (Tertiary text, icons)
Light Gray:     #B0B0B0 (Disabled state, placeholder)
Soft Gray:      #DDDDDD (Borders, dividers)
Whisper Gray:   #F7F7F7 (Backgrounds, input fields)
Pure White:     #FFFFFF (Cards, surfaces)
```

#### NativeWind Mappings
```
text-gray-900   → #222222 (Primary text)
text-gray-700   → #484848 (Secondary text)
text-gray-600   → #717171 (Tertiary text)
text-gray-400   → #B0B0B0 (Placeholder)
text-gray-300   → #DDDDDD (Borders)

bg-gray-50      → #F7F7F7 (Light backgrounds)
bg-gray-100     → Slightly darker than F7F7F7
border-gray-200 → #DDDDDD (Soft borders)
```

#### Accent Colors
```
Star Gold:      #FBBF24 (yellow-400) - Ratings
Verified Blue:  #0EA5E9 (sky-500) - Trust badges
Heart Red:      #EF4444 (red-500) - Favorites
Success Green:  #10B981 (emerald-500) - Confirmations
```

### Typography Hierarchy

#### Font Weights
```
Regular:   400 (font-normal)   - Body text
Medium:    500 (font-medium)   - Emphasis, labels
Semibold:  600 (font-semibold) - Subheadings
Bold:      700 (font-bold)     - Headings
```

#### Type Scale
```
Display (32px):   text-3xl font-bold      - Page titles
Heading (24px):   text-2xl font-bold      - Section headers
Subhead (20px):   text-xl font-semibold   - Card titles
Body Large (18px): text-lg font-medium    - Business names
Body (16px):      text-base font-normal   - Standard text
Body Small (14px): text-sm font-normal    - Secondary info
Caption (12px):   text-xs font-medium     - Labels, tags
```

### Spacing Scale (Airbnb uses 4px base unit)

```
4px   → space-1  (0.25rem)  - Tiny gaps
8px   → space-2  (0.5rem)   - Small gaps
12px  → space-3  (0.75rem)  - Default spacing
16px  → space-4  (1rem)     - Standard spacing
20px  → space-5  (1.25rem)  - Comfortable spacing
24px  → space-6  (1.5rem)   - Section spacing
32px  → space-8  (2rem)     - Large spacing
48px  → space-12 (3rem)     - Extra large spacing
```

### Border Radius

Airbnb uses generous, consistent rounding:

```
Small:    8px  (rounded-lg)    - Chips, tags, small buttons
Medium:   12px (rounded-xl)    - Cards, inputs
Large:    16px (rounded-2xl)   - Large cards, modals
XLarge:   24px (rounded-3xl)   - Special emphasis
Full:     999px (rounded-full) - Pills, avatars, icon buttons
```

### Shadows & Elevation

Airbnb uses subtle shadows—never harsh or heavy.

#### Shadow Levels
```
Level 0 (None):
  No shadow - For elements on colored backgrounds

Level 1 (Subtle):
  shadow-sm
  iOS: shadowColor: #000, shadowOffset: {width: 0, height: 1},
       shadowOpacity: 0.05, shadowRadius: 2
  Android: elevation: 1
  Use for: Input fields (focused), subtle cards

Level 2 (Soft):
  shadow-md
  iOS: shadowColor: #000, shadowOffset: {width: 0, height: 2},
       shadowOpacity: 0.08, shadowRadius: 8
  Android: elevation: 3
  Use for: Cards, buttons, floating elements

Level 3 (Medium):
  shadow-lg
  iOS: shadowColor: #000, shadowOffset: {width: 0, height: 4},
       shadowOpacity: 0.1, shadowRadius: 12
  Android: elevation: 6
  Use for: Modals, popovers, elevated cards

Level 4 (Strong):
  shadow-xl
  iOS: shadowColor: #000, shadowOffset: {width: 0, height: 8},
       shadowOpacity: 0.12, shadowRadius: 16
  Android: elevation: 8
  Use for: Dropdowns, important modals
```

**Note:** In React Native, use `className="shadow-md"` for NativeWind, but for precise control on both platforms, define custom shadow styles.

---

## Component Specifications

### 1. SearchBar Component

#### Design Rationale
Airbnb's search is clean, prominent, and approachable. The search bar should feel inviting and easy to use, with clear affordances and gentle interaction states.

#### Visual Design

**Container:**
- Background: White (#FFFFFF)
- Remove bottom border (cleaner look)
- Padding: Horizontal 16px, Vertical 12px
- No separator line (use subtle shadow if needed for depth)

**Input Field:**
- Background: #F7F7F7 (Whisper Gray) - softer than gray-100
- Border: 1px solid #DDDDDD on focus, none on blur
- Border Radius: 12px (rounded-xl) - more generous than current
- Height: 52px (py-3.5 px-4) - taller for premium feel
- Font Size: 16px (text-base)
- Font Weight: 400 (font-normal)
- Text Color: #222222
- Placeholder Color: #B0B0B0

**Search Icon:**
- Size: 22px (increased from 20px)
- Color: #717171 (Gray 600)
- Position: Left side, 16px from edge
- Margin Right: 12px

**Clear Button:**
- Background: #EEEEEE circle when pressed
- Icon Size: 20px
- Icon Color: #717171
- Touch Area: 44x44px minimum (accessibility)
- Fade in/out animation (duration: 200ms)

**Focus State:**
- Border appears: 1px solid #DDDDDD
- Subtle shadow: shadow-sm
- Smooth transition (150ms ease)

#### NativeWind Classes

```tsx
// Container
className="px-4 py-3 bg-white"

// Input wrapper
className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3.5 border border-transparent focus:border-gray-300"

// Search icon
<Search size={22} color="#717171" className="mr-3" />

// Text input
className="flex-1 text-base text-gray-900 font-normal"

// Clear button container
className="ml-3 w-9 h-9 items-center justify-center rounded-full active:bg-gray-200"

// Clear icon
<X size={20} color="#717171" />
```

#### Interaction States

```
Default:
  Background: #F7F7F7, no border

Focus:
  Background: #FFFFFF
  Border: 1px solid #DDDDDD
  Shadow: shadow-sm
  Transition: 150ms ease

Active (Typing):
  Same as Focus
  Clear button fades in (opacity 0 → 1, 200ms)

Disabled:
  Background: #F7F7F7
  Text: #B0B0B0
  Opacity: 0.6
  Pointer events: none
```

#### Accessibility
- Label: "Search for businesses and services"
- Placeholder: Descriptive and friendly
- Clear button: Proper accessibility label and role
- Minimum touch target: 44x44px
- Keyboard type: Default (not search, for better UX)
- Return key: "search"

---

### 2. CategoryFilter Component

#### Design Rationale
Airbnb uses subtle, elegant category pills. The selected state should be clear but not overwhelming. Gentle colors, generous spacing, and smooth interactions.

#### Visual Design

**Container:**
- Background: White (#FFFFFF)
- No border (cleaner)
- Padding: Vertical 16px (py-4)
- Add subtle bottom shadow (shadow-sm) to separate from content

**Scroll Behavior:**
- Hide scroll indicators
- Content padding: Horizontal 16px (start and end)
- Snap scrolling: Optional (bounces: true for iOS feel)

**Category Chips (Unselected):**
- Background: Transparent
- Border: 1.5px solid #DDDDDD
- Border Radius: 24px (rounded-full) - full pill shape
- Padding: Horizontal 20px, Vertical 10px (px-5 py-2.5)
- Gap between chips: 10px (mr-2.5)
- Text: #484848 (Gray 700), 15px, font-medium
- Icon size: 20px (emoji naturally sized)

**Category Chips (Selected):**
- Background: #222222 (Deep Charcoal) - Airbnb uses dark, not brand color
- Border: None
- Text: #FFFFFF (White), 15px, font-semibold
- Icon: Same (emoji)
- Subtle shadow: shadow-sm

**Alternative Selected State (Brand-focused):**
If you want to emphasize brand:
- Background: #EF4444 (Brand Red)
- Text: White
- No border

**Icon + Label Layout:**
- Emoji Icon: 20px natural size
- Gap: 8px (mr-2)
- Alignment: Centered vertically

#### NativeWind Classes

```tsx
// Container
className="bg-white py-4 shadow-sm"

// ScrollView
contentContainerClassName="px-4 gap-2.5"

// Chip (Unselected)
className="flex-row items-center px-5 py-2.5 rounded-full border-[1.5px] border-gray-300 bg-white mr-2.5"

// Chip (Selected) - Dark variant (Airbnb style)
className="flex-row items-center px-5 py-2.5 rounded-full bg-gray-900 shadow-sm mr-2.5"

// Chip (Selected) - Brand variant
className="flex-row items-center px-5 py-2.5 rounded-full bg-red-500 shadow-sm mr-2.5"

// Icon
className="text-lg mr-2"

// Label (Unselected)
className="text-[15px] font-medium text-gray-700"

// Label (Selected - Dark)
className="text-[15px] font-semibold text-white"

// Label (Selected - Brand)
className="text-[15px] font-semibold text-white"
```

#### Interaction States

```
Default (Unselected):
  Background: Transparent
  Border: 1.5px solid #DDDDDD
  Text: #484848
  Scale: 1

Pressed (Unselected):
  Background: #F7F7F7
  Border: 1.5px solid #DDDDDD
  Scale: 0.96
  Transition: 100ms ease

Selected:
  Background: #222222 (or #EF4444 for brand)
  Border: None
  Text: White
  Shadow: shadow-sm

Pressed (Selected):
  Same as selected
  Scale: 0.96
  Opacity: 0.9
```

#### Accessibility
- Each chip: accessibilityRole="button"
- Label: Include category name
- State: accessibilityState={{ selected: isSelected }}
- Minimum touch target: 44px height

---

### 3. BusinessCard Component

#### Design Rationale
This is the hero component—Airbnb's listing cards are iconic. Large, beautiful images with minimal text overlay. Information is presented below the image in a clean hierarchy. Premium feel with attention to detail.

#### Visual Design

**Card Container:**
- Background: White (#FFFFFF)
- Border: None (remove current border)
- Border Radius: 16px (rounded-2xl) - more generous
- Shadow: shadow-md (soft, elevated feel)
- Margin Bottom: 16px (mb-4)
- Padding: 0 (image extends to edges)
- Overflow: hidden (for rounded corners on image)

**Image Section:**
- Aspect Ratio: 4:3 (more standard than arbitrary height)
- Suggested height: 200px for mobile
- Border Radius: Top only (16px)
- Resize Mode: Cover
- Background (no image): #F7F7F7 with centered icon

**Favorite Button (Heart):**
- Position: Absolute, top-right
- Top: 12px, Right: 12px
- Background: rgba(255, 255, 255, 0.95) - semi-transparent white
- Backdrop blur: blur-sm (if supported)
- Border Radius: Full (rounded-full)
- Size: 36x36px (w-9 h-9)
- Icon Size: 20px
- Icon Color (unfilled): #484848
- Icon Color (filled): #EF4444
- Shadow: shadow-md (floats above image)
- Active state: Scale 0.9, quick bounce back

**Verified Badge:**
- Position: Absolute, top-left
- Top: 12px, Left: 12px
- Background: #FFFFFF (not blue)
- Text Color: #0EA5E9 (sky-500)
- Border: 1px solid #E0F2FE (sky-100)
- Border Radius: 6px (rounded-md) - softer rectangle
- Padding: 4px 8px (px-2 py-1)
- Font: 11px (text-xs), font-semibold
- Icon: Checkmark icon (instead of emoji)
- Shadow: shadow-sm

**Content Section:**
- Padding: 16px all sides (p-4)
- Background: White

**Business Name:**
- Font Size: 18px (text-lg)
- Font Weight: 600 (font-semibold) - not bold, more refined
- Color: #222222
- Margin Bottom: 4px (mb-1)
- Max Lines: 1 (ellipsize)
- Letter Spacing: -0.2px (tracking-tight) - tighter, more premium

**Category:**
- Font Size: 14px (text-sm)
- Font Weight: 400 (font-normal)
- Color: #717171
- Margin Bottom: 8px (mb-2)

**Rating Row:**
- Margin Bottom: 8px (mb-2)
- Alignment: Flex row, centered

**Star Icon:**
- Size: 14px (smaller, more subtle)
- Color: #FBBF24 (filled)
- Margin Right: 4px

**Rating Text:**
- Font Size: 14px (text-sm)
- Font Weight: 600 (font-semibold)
- Color: #222222
- Margin Right: 4px

**Review Count:**
- Font Size: 14px (text-sm)
- Font Weight: 400 (font-normal)
- Color: #717171
- Format: "(123)" or "(123 reviews)" if space allows

**Location Row:**
- Alignment: Flex row, centered

**Map Pin Icon:**
- Size: 14px
- Color: #717171
- Margin Right: 4px

**Location Text:**
- Font Size: 14px (text-sm)
- Font Weight: 400 (font-normal)
- Color: #717171
- Max Lines: 1 (ellipsize)

#### NativeWind Classes

```tsx
// Card Container
className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden"

// Image
className="w-full h-[200px]"
resizeMode="cover"

// Image Placeholder
className="w-full h-[200px] bg-gray-50 items-center justify-center"

// Favorite Button
className="absolute top-3 right-3 w-9 h-9 bg-white/95 rounded-full items-center justify-center shadow-md active:scale-90"

// Heart Icon (unfilled)
<Heart size={20} color="#484848" fill="none" />

// Heart Icon (filled)
<Heart size={20} color="#EF4444" fill="#EF4444" />

// Verified Badge
className="absolute top-3 left-3 bg-white rounded-md px-2 py-1 flex-row items-center border border-sky-100 shadow-sm"

// Verified Icon
<CheckCircle size={12} color="#0EA5E9" />

// Verified Text
className="text-xs font-semibold text-sky-500 ml-1"

// Content Section
className="p-4"

// Business Name
className="text-lg font-semibold text-gray-900 mb-1 tracking-tight"

// Category
className="text-sm font-normal text-gray-600 mb-2"

// Rating Row
className="flex-row items-center mb-2"

// Star
<Star size={14} color="#FBBF24" fill="#FBBF24" />

// Rating Text
className="text-sm font-semibold text-gray-900 ml-1"

// Review Count
className="text-sm font-normal text-gray-600 ml-1"

// Location Row
className="flex-row items-center"

// Map Pin
<MapPin size={14} color="#717171" />

// Location Text
className="text-sm font-normal text-gray-600 ml-1 flex-1"
```

#### Interaction States

```
Default:
  Shadow: shadow-md
  Scale: 1

Pressed (entire card):
  Scale: 0.98
  Opacity: 0.95
  Transition: 150ms ease
  Shadow: shadow-lg (slight increase)

Favorite Button Pressed:
  Scale: 0.9
  Background: rgba(255, 255, 255, 1)
  Transition: 100ms ease with spring bounce
```

#### Responsive Behavior

**Grid Layout (2 columns):**
When showing in a grid:
- Card width: ~48% of screen width
- Image height: Maintain aspect ratio
- Reduce padding slightly: p-3
- Font sizes: Reduce by 1-2px if needed

**List Layout (1 column):**
- Full width with horizontal margins
- Image height: 200-240px
- Comfortable padding: p-4
- Full font sizes as specified

#### Accessibility
- Card: accessibilityRole="button"
- Label: "View [Business Name]"
- Hint: Include rating and location in accessibility label
- Favorite: Separate button with clear label
- Images: Meaningful alt text (business name + category)

---

### 4. EmptyState Component

#### Design Rationale
Airbnb's empty states are friendly, encouraging, and visually light. Large icons, friendly messaging, and subtle colors create a positive experience even when there's no content.

#### Visual Design

**Container:**
- Background: Transparent or White
- Padding: 32px horizontal, 64px vertical (px-8 py-16)
- Alignment: Center (items-center, justify-center)
- Min Height: 400px (or flex-1)

**Icon Section:**
- Icon Size: 64px (increased from 48px)
- Icon Color: #DDDDDD (lighter, softer)
- Margin Bottom: 24px (mb-6)
- For emoji: text-6xl
- Optional: Circular background (#F7F7F7, 120px diameter)

**Title:**
- Font Size: 22px (text-2xl)
- Font Weight: 600 (font-semibold)
- Color: #484848 (not pure black—softer)
- Margin Bottom: 12px (mb-3)
- Text Align: Center
- Max Width: 320px

**Description:**
- Font Size: 16px (text-base)
- Font Weight: 400 (font-normal)
- Color: #717171
- Line Height: 24px (leading-6)
- Text Align: Center
- Max Width: 300px

**Optional Action Button:**
For error states, consider adding a retry button:
- Background: White
- Border: 1.5px solid #DDDDDD
- Border Radius: 12px
- Padding: 12px 24px
- Text: #222222, 16px, font-medium
- Margin Top: 24px

#### NativeWind Classes

```tsx
// Container
className="flex-1 items-center justify-center px-8 py-16 bg-white"

// Icon Container (optional circular background)
className="w-[120px] h-[120px] rounded-full bg-gray-50 items-center justify-center mb-6"

// Icon
<Search size={64} color="#DDDDDD" />

// Or Emoji
className="text-6xl mb-6"

// Title
className="text-2xl font-semibold text-gray-700 mb-3 text-center max-w-[320px]"

// Description
className="text-base font-normal text-gray-600 leading-6 text-center max-w-[300px]"

// Optional Retry Button
className="mt-6 px-6 py-3 bg-white border-[1.5px] border-gray-300 rounded-xl active:bg-gray-50"

// Button Text
className="text-base font-medium text-gray-900"
```

#### Content Variations

**No Results (After Search):**
```
Icon: Search (64px, #DDDDDD)
Title: "No matches found"
Description: "Try adjusting your search or explore different categories"
```

**No Businesses (Category Empty):**
```
Icon: Store (64px, #DDDDDD)
Title: "No businesses yet"
Description: "We're always adding new businesses. Check back soon!"
```

**Error State:**
```
Icon: AlertCircle (64px, #DDDDDD) - not emoji
Title: "Something went wrong"
Description: "We couldn't load businesses right now. Please try again."
Action: Retry button
```

**No Connection:**
```
Icon: WifiOff (64px, #DDDDDD)
Title: "No internet connection"
Description: "Check your connection and try again"
Action: Retry button
```

#### Interaction States

```
Default:
  All elements at full opacity

Button Pressed:
  Background: #F7F7F7
  Scale: 0.96
  Transition: 100ms ease
```

#### Accessibility
- Container: accessibilityRole="none" or "text"
- Title: Announced first
- Description: Announced second
- Button: accessibilityRole="button", clear label
- Ensure proper reading order

---

## Implementation Guide

### Step 1: Update Design Tokens

Create or update a design tokens file to centralize the Airbnb-inspired values:

```typescript
// src/constants/designTokens.ts

export const colors = {
  // Text
  textPrimary: '#222222',
  textSecondary: '#484848',
  textTertiary: '#717171',
  textPlaceholder: '#B0B0B0',

  // Backgrounds
  bgWhite: '#FFFFFF',
  bgWhisper: '#F7F7F7',
  bgLight: '#EEEEEE',

  // Borders
  borderSoft: '#DDDDDD',
  borderLight: '#EEEEEE',

  // Brand
  brandRed: '#EF4444',
  brandRedHover: '#DC2626',
  brandRedLight: '#FEE2E2',

  // Accent
  starGold: '#FBBF24',
  verifiedBlue: '#0EA5E9',
  verifiedBlueBg: '#E0F2FE',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
};
```

### Step 2: Component Update Order

Recommended implementation order:

1. **SearchBar** (Simplest, establishes input patterns)
2. **CategoryFilter** (Builds on input interaction patterns)
3. **BusinessCard** (Most complex, hero component)
4. **EmptyState** (Simplest, can be done anytime)

### Step 3: Testing Checklist

For each component, verify:

- [ ] Visual appearance matches specification
- [ ] All interaction states work (default, pressed, focused, disabled)
- [ ] Animations are smooth (60fps)
- [ ] Touch targets meet 44x44px minimum
- [ ] Accessibility labels are clear
- [ ] Component works on iOS and Android
- [ ] Component works in light mode (dark mode future consideration)
- [ ] Spacing and alignment are pixel-perfect

### Step 4: Animation Implementation

Use React Native's Animated API or Reanimated for smooth interactions:

```typescript
// Example: Favorite button scale animation
import { Animated } from 'react-native';

const scaleAnim = useRef(new Animated.Value(1)).current;

const handlePressIn = () => {
  Animated.spring(scaleAnim, {
    toValue: 0.9,
    useNativeDriver: true,
    tension: 300,
    friction: 10,
  }).start();
};

const handlePressOut = () => {
  Animated.spring(scaleAnim, {
    toValue: 1,
    useNativeDriver: true,
    tension: 300,
    friction: 10,
  }).start();
};

// Apply to TouchableOpacity
<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
  <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
    {/* Content */}
  </TouchableOpacity>
</Animated.View>
```

---

## Interaction Patterns

### Touch Feedback

**Light Touch (Info elements):**
- Scale: 0.98
- Opacity: 0.95
- Duration: 150ms ease

**Medium Touch (Buttons, chips):**
- Scale: 0.96
- Background change (if applicable)
- Duration: 100ms ease

**Strong Touch (Important actions):**
- Scale: 0.9
- Spring bounce back
- Duration: 100ms with spring

### Transitions

**Page Transitions:**
- Fade + Slide: 300ms ease-out
- Element stagger: 50ms delay between items

**State Changes:**
- Color changes: 150ms ease
- Size changes: 200ms ease-out
- Opacity: 200ms ease

**Micro-interactions:**
- Icon changes: 150ms ease
- Badge appearance: Scale from 0 to 1, 200ms spring
- Loading states: Pulse animation, 1500ms infinite

### Loading States

**Card Loading (Skeleton):**
- Background: Linear gradient shimmer
- Colors: #F7F7F7 to #EEEEEE
- Animation: 1500ms infinite
- Border radius: Match component (16px)

**Inline Loading:**
- Small spinner (20px)
- Color: #717171
- Position: Inline with text

---

## Design Rationale Summary

### Why These Choices?

**1. Generous Rounded Corners (12px-16px)**
- Creates a softer, more approachable aesthetic
- Reduces visual harshness
- Aligns with modern design trends (Airbnb, Apple, Google)

**2. Subtle Shadows**
- Provides depth without overwhelming
- Creates hierarchy through elevation
- Avoids the "flat" look while staying minimal

**3. Neutral Gray Palette**
- Reduces cognitive load
- Lets content (images, business info) stand out
- Creates professional, timeless appearance
- Easier on the eyes than pure black/white

**4. Image-First Cards**
- Visual appeal drives engagement
- Images convey business quality instantly
- Mimics successful marketplace patterns (Airbnb, Etsy, etc.)
- Premium feel with generous image sizing

**5. Increased Spacing**
- Reduces clutter and visual noise
- Creates breathing room for content
- Improves readability and scannability
- Feels more premium and intentional

**6. Simplified Borders**
- Cleaner, less busy appearance
- Relies on shadows for separation instead
- More modern aesthetic
- Reduces visual boundaries between elements

**7. Darker Text (Not Pure Black)**
- Easier on the eyes (less contrast strain)
- More sophisticated appearance
- Follows Airbnb's exact approach
- Better for sustained reading

**8. Medium Font Weights**
- Semibold (600) instead of Bold (700) for headings
- More refined, less aggressive
- Better readability at smaller sizes
- Aligns with contemporary design standards

---

## Before & After Comparison

### SearchBar
**Before:**
- Gray-100 background (too dark)
- 8px border radius (too small)
- 20px icon (too small)
- Border on container (unnecessary)

**After:**
- Whisper Gray (#F7F7F7) background (softer)
- 12px border radius (more generous)
- 22px icon (more prominent)
- No border, shadow on focus (cleaner)

### CategoryFilter
**Before:**
- Solid red background when selected (too bold)
- 8px border radius (inconsistent)
- Gray-100 background unselected (visible background)
- Border on container (creates line)

**After:**
- Dark charcoal background when selected (sophisticated)
- Full pill shape (rounded-full) (more consistent)
- Transparent background with border (cleaner)
- No container border, subtle shadow (separation without lines)

### BusinessCard
**Before:**
- 12px border radius (small)
- Border + shadow (double outline)
- 48px image height (arbitrary)
- Bold font for business name (too heavy)
- Blue verified badge (competes with image)

**After:**
- 16px border radius (more generous)
- Shadow only, no border (cleaner edges)
- 200px image with 4:3 ratio (standard, professional)
- Semibold font for business name (refined)
- White verified badge with blue text (subtle, doesn't compete)

### EmptyState
**Before:**
- 48px icon (small)
- Pure black text (harsh)
- Centered but cramped (less padding)
- No optional background for icon

**After:**
- 64px icon (more prominent)
- Soft gray text (#484848) (friendlier)
- Generous padding (spacious, calm)
- Optional circular background (polished detail)

---

## Additional Recommendations

### 1. Motion & Animation Library

Consider adding `react-native-reanimated` for smoother, more performant animations:

```bash
npx expo install react-native-reanimated
```

Benefits:
- Runs on native thread (smoother animations)
- Better spring physics
- Layout animations
- Gesture handling integration

### 2. Image Optimization

For BusinessCard images:
- Use image caching: `expo-image` or `react-native-fast-image`
- Implement progressive loading (blur-up technique)
- Lazy load images below the fold
- Compress images on backend (WebP format)

### 3. Performance Optimization

For BusinessCard lists:
- Use `FlatList` with `windowSize` optimization
- Implement `getItemLayout` for consistent heights
- Use `removeClippedSubviews` on Android
- Add `maxToRenderPerBatch` and `updateCellsBatchingPeriod`

### 4. Dark Mode Considerations (Future)

When adding dark mode:
- Inverse colors (white cards → dark cards)
- Reduce shadow intensity
- Adjust image overlays for better contrast
- Use color semantic naming (`bg-primary` vs `bg-white`)

### 5. Accessibility Enhancements

Beyond basic labels:
- Implement focus order
- Add accessibility hints for complex interactions
- Support dynamic type sizing
- Test with VoiceOver (iOS) and TalkBack (Android)
- Ensure color contrast meets WCAG AA (4.5:1 for text)

### 6. Component Composition

Consider creating smaller, reusable components:
- `<Badge>` (for verified, featured, etc.)
- `<Rating>` (star + number)
- `<Chip>` (for categories)
- `<Card>` (base card with shadow/radius)

Benefits:
- Consistency across app
- Easier maintenance
- Smaller component files
- Reusable in other screens

---

## Implementation Code Examples

### SearchBar - Complete Implementation

```tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Search, X } from 'lucide-react-native';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search for salons, services...',
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View className="px-4 py-3 bg-white">
      <View
        className={`flex-row items-center rounded-xl px-4 py-3.5 ${
          isFocused
            ? 'bg-white border border-gray-300 shadow-sm'
            : 'bg-gray-50 border border-transparent'
        }`}
      >
        {/* Search Icon */}
        <Search size={22} color="#717171" className="mr-3" />

        {/* Text Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor="#B0B0B0"
          editable={!disabled}
          className="flex-1 text-base text-gray-900 font-normal"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="never"
        />

        {/* Clear Button */}
        {value.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            className="ml-3 w-9 h-9 items-center justify-center rounded-full active:bg-gray-200"
            activeOpacity={0.7}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <X size={20} color="#717171" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
```

### CategoryFilter - Complete Implementation

```tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BUSINESS_CATEGORIES } from '@/constants/categories';

export interface CategoryFilterProps {
  selectedCategory?: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory = 'all',
  onSelectCategory,
}) => {
  return (
    <View className="bg-white py-4 shadow-sm">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4"
        className="flex-row"
      >
        {BUSINESS_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.value;

          return (
            <TouchableOpacity
              key={category.value}
              onPress={() => onSelectCategory(category.value)}
              className={`flex-row items-center px-5 py-2.5 rounded-full mr-2.5 ${
                isSelected
                  ? 'bg-gray-900 shadow-sm'
                  : 'bg-white border-[1.5px] border-gray-300'
              }`}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Filter by ${category.label}`}
              accessibilityState={{ selected: isSelected }}
            >
              {/* Emoji Icon */}
              <Text className="text-lg mr-2">{category.icon}</Text>

              {/* Label */}
              <Text
                className={`text-[15px] ${
                  isSelected
                    ? 'font-semibold text-white'
                    : 'font-medium text-gray-700'
                }`}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
```

### BusinessCard - Complete Implementation

```tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Heart, Star, MapPin, CheckCircle } from 'lucide-react-native';
import type { Business } from '@/graphql/types/business';
import { getCategoryLabel } from '@/constants/categories';
import { useAuthGuard } from '@/hooks';

export interface BusinessCardProps {
  business: Business;
  onPress: () => void;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onPress,
  onFavorite,
  isFavorited = false,
}) => {
  const { requireAuth } = useAuthGuard();

  const handleFavoritePress = () => {
    if (!onFavorite) return;

    requireAuth(() => {
      onFavorite();
    }, {
      message: 'Sign in to save your favorite businesses',
    });
  };

  const imageUrl = business.profileImageUrl || business.coverImageUrl;
  const rating = business.rating ? Number(business.rating).toFixed(1) : null;
  const categoryLabel = getCategoryLabel(business.category);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden"
      accessibilityRole="button"
      accessibilityLabel={`View ${business.businessName}`}
    >
      {/* Image */}
      <View className="relative">
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-[200px]"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-[200px] bg-gray-50 items-center justify-center">
            <Text className="text-gray-400 text-sm">{categoryLabel}</Text>
          </View>
        )}

        {/* Favorite Button */}
        {onFavorite && (
          <TouchableOpacity
            onPress={handleFavoritePress}
            className="absolute top-3 right-3 w-9 h-9 bg-white/95 rounded-full items-center justify-center shadow-md active:scale-90"
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorited ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            <Heart
              size={20}
              color={isFavorited ? '#EF4444' : '#484848'}
              fill={isFavorited ? '#EF4444' : 'none'}
            />
          </TouchableOpacity>
        )}

        {/* Verified Badge */}
        {business.isVerified && (
          <View className="absolute top-3 left-3 bg-white rounded-md px-2 py-1 flex-row items-center border border-sky-100 shadow-sm">
            <CheckCircle size={12} color="#0EA5E9" />
            <Text className="text-xs font-semibold text-sky-500 ml-1">
              Verified
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Business Name */}
        <Text
          className="text-lg font-semibold text-gray-900 mb-1 tracking-tight"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {business.businessName}
        </Text>

        {/* Category */}
        <Text className="text-sm font-normal text-gray-600 mb-2">
          {categoryLabel}
        </Text>

        {/* Rating & Reviews */}
        {rating && (
          <View className="flex-row items-center mb-2">
            <Star size={14} color="#FBBF24" fill="#FBBF24" />
            <Text className="text-sm font-semibold text-gray-900 ml-1">
              {rating}
            </Text>
            {business.totalReviews > 0 && (
              <Text className="text-sm font-normal text-gray-600 ml-1">
                ({business.totalReviews})
              </Text>
            )}
          </View>
        )}

        {/* Location */}
        {business.city && (
          <View className="flex-row items-center">
            <MapPin size={14} color="#717171" />
            <Text
              className="text-sm font-normal text-gray-600 ml-1 flex-1"
              numberOfLines={1}
            >
              {business.city}
              {business.state ? `, ${business.state}` : ''}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
```

### EmptyState - Complete Implementation

```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Search, Store, AlertCircle, WifiOff } from 'lucide-react-native';

export interface EmptyStateProps {
  type?: 'no-results' | 'no-businesses' | 'error' | 'no-connection';
  message?: string;
  onRetry?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-results',
  message,
  onRetry,
}) => {
  const getContent = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: <Search size={64} color="#DDDDDD" />,
          title: 'No matches found',
          description:
            message || 'Try adjusting your search or explore different categories',
        };
      case 'no-businesses':
        return {
          icon: <Store size={64} color="#DDDDDD" />,
          title: 'No businesses yet',
          description:
            message || "We're always adding new businesses. Check back soon!",
        };
      case 'no-connection':
        return {
          icon: <WifiOff size={64} color="#DDDDDD" />,
          title: 'No internet connection',
          description: message || 'Check your connection and try again',
        };
      case 'error':
        return {
          icon: <AlertCircle size={64} color="#DDDDDD" />,
          title: 'Something went wrong',
          description:
            message || "We couldn't load businesses right now. Please try again.",
        };
      default:
        return {
          icon: <Search size={64} color="#DDDDDD" />,
          title: 'No results',
          description: message || 'Try a different search',
        };
    }
  };

  const content = getContent();
  const showRetryButton = (type === 'error' || type === 'no-connection') && onRetry;

  return (
    <View className="flex-1 items-center justify-center px-8 py-16 bg-white">
      {/* Icon with optional background */}
      <View className="w-[120px] h-[120px] rounded-full bg-gray-50 items-center justify-center mb-6">
        {content.icon}
      </View>

      {/* Title */}
      <Text className="text-2xl font-semibold text-gray-700 mb-3 text-center max-w-[320px]">
        {content.title}
      </Text>

      {/* Description */}
      <Text className="text-base font-normal text-gray-600 leading-6 text-center max-w-[300px]">
        {content.description}
      </Text>

      {/* Optional Retry Button */}
      {showRetryButton && (
        <TouchableOpacity
          onPress={onRetry}
          className="mt-6 px-6 py-3 bg-white border-[1.5px] border-gray-300 rounded-xl active:bg-gray-50"
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Retry loading"
        >
          <Text className="text-base font-medium text-gray-900">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
```

---

## Validation & Quality Assurance

### Visual QA Checklist

For each component, verify on both iOS and Android:

**SearchBar:**
- [ ] Border radius is 12px (rounded-xl)
- [ ] Background is #F7F7F7 when not focused
- [ ] Background is white with border when focused
- [ ] Search icon is 22px, color #717171
- [ ] Clear button appears/disappears smoothly
- [ ] Input text is 16px, color #222222
- [ ] Placeholder text is #B0B0B0
- [ ] Touch targets are at least 44x44px
- [ ] Focus state transitions smoothly (150ms)

**CategoryFilter:**
- [ ] Container has subtle shadow (shadow-sm)
- [ ] Chips are full pill shape (rounded-full)
- [ ] Unselected: transparent bg, 1.5px border #DDDDDD
- [ ] Selected: #222222 bg (or #EF4444), white text
- [ ] Text is 15px (custom size)
- [ ] Icon spacing is 8px (mr-2)
- [ ] Chip spacing is 10px (mr-2.5)
- [ ] Horizontal padding is 16px (contentContainerClassName="px-4")
- [ ] Active state shows scale reduction

**BusinessCard:**
- [ ] Card radius is 16px (rounded-2xl)
- [ ] Card has shadow-md
- [ ] Image height is 200px
- [ ] Favorite button is 36x36px circle
- [ ] Favorite button has semi-transparent white bg (bg-white/95)
- [ ] Verified badge is white with blue text
- [ ] Business name is 18px, semibold, #222222
- [ ] Category is 14px, normal, #717171
- [ ] Rating star is 14px, filled gold
- [ ] Location pin is 14px, #717171
- [ ] Content padding is 16px all sides
- [ ] Card press shows subtle scale (0.98)
- [ ] Favorite press shows scale (0.9)

**EmptyState:**
- [ ] Icon is 64px, color #DDDDDD
- [ ] Optional circular bg is 120px, #F7F7F7
- [ ] Title is 22px, semibold, #484848
- [ ] Description is 16px, normal, #717171
- [ ] Text is centered
- [ ] Max width constrains text (320px title, 300px description)
- [ ] Retry button appears for error states
- [ ] Retry button has border, rounded-xl

### Accessibility QA Checklist

- [ ] All interactive elements have accessibilityRole
- [ ] All buttons have meaningful accessibilityLabel
- [ ] Touch targets meet 44x44px minimum
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] VoiceOver/TalkBack announces elements correctly
- [ ] Focus order is logical
- [ ] State changes are announced (selected categories)
- [ ] Images have meaningful descriptions

### Performance QA Checklist

- [ ] Animations run at 60fps
- [ ] No dropped frames during scrolling
- [ ] Images load progressively
- [ ] List rendering is optimized (FlatList)
- [ ] No memory leaks from animations
- [ ] Touch feedback is immediate (<100ms)

---

## Conclusion

This design specification provides a comprehensive guide to redesigning your business discovery components following Airbnb's design principles. The focus is on:

1. **Visual Clarity:** Clean, minimal aesthetic with generous spacing
2. **Image-First:** Premium presentation of business imagery
3. **Soft Aesthetics:** Rounded corners, subtle shadows, approachable colors
4. **Premium Feel:** Attention to detail, refined typography, smooth interactions
5. **Accessibility:** Inclusive design for all users

By following this specification, you'll create a polished, professional experience that elevates your app's design quality and user engagement.

### Next Steps

1. Review this specification with your team
2. Implement components in the suggested order (SearchBar → CategoryFilter → BusinessCard → EmptyState)
3. Test each component thoroughly on both iOS and Android
4. Gather user feedback and iterate
5. Consider extending these patterns to other areas of the app

### Questions or Modifications?

This specification is meant to be a guide. Feel free to adjust:
- Brand color usage (red vs. neutral selected states)
- Shadow intensity (based on your app's overall aesthetic)
- Spacing values (to match your existing design system)
- Animation timing (based on performance and feel)

The goal is to capture Airbnb's spirit while maintaining your app's unique identity.

---

**Document prepared for:** Glamfric Business Discovery Redesign
**Based on:** Airbnb design patterns (2024-2025)
**Technology:** React Native, Expo, NativeWind, Lucide Icons
**Contact:** For questions or clarifications about this specification
