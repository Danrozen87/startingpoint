
# Design Tokens

## 📖 Overview
Design tokens are the visual design atoms of our design system. They represent the smallest indivisible elements of a design system such as colors, typography, spacing, and animation values.

## 🎯 Purpose
- **Consistency**: Ensure visual consistency across all components
- **Maintainability**: Single source of truth for design values
- **Scalability**: Easy to update design across the entire system
- **Performance**: Optimized for tree-shaking and minimal bundle size

## 🏗️ Token Categories

### 🎨 Colors (`colors.ts`)
Low-cognitive-strain color palette optimized for accessibility and premium feel.

#### Color Structure
```typescript
// Semantic color usage
const primaryColor = colorUtils.getColor('brand', 500);
const successColor = colorUtils.getSemantic('success', 500);
const neutralColor = colorUtils.getNeutral(600);
```

#### Color Categories
- **Base**: Fundamental colors (white, black, transparent)
- **Neutral**: Grayscale from 50 to 900
- **Brand**: Primary and secondary brand colors
- **Semantic**: Status colors (success, warning, error, info)
- **Accent**: Supporting colors for emphasis
- **Theme**: CSS variable-based colors for theming

### 📏 Spacing (`spacing.ts`)
Consistent spacing scale based on rem units for scalability.

#### Spacing Scale
```typescript
// Usage examples
const spacing = spacingTokens[4];     // 1rem (16px)
const spacing = getSpacing(2);       // 0.5rem (8px)
```

#### Scale Values
- Base unit: `0.25rem` (4px)
- Scale: `0, px, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96`

### 🔤 Typography (`typography.ts`)
Three-font system optimized for different use cases.

#### Font Hierarchy
- **Rare Font (Playfair Display)**: Elegant headers for special occasions
- **UI Font (Manrope)**: Clean, modern for everyday interface
- **Body Font (Inter)**: Optimized for reading content
- **Mono Font (JetBrains Mono)**: Code and technical content

#### Semantic Typography
```typescript
// Usage with semantic names
<Typography variant="heroTitle">    // Playfair Display
<Typography variant="cardTitle">    // Manrope
<Typography variant="body">         // Inter
<Typography variant="code">         // JetBrains Mono
```

### 🎭 Animations (`animations.ts`)
Performance-optimized animation system with accessibility support.

#### Animation Categories
- **Duration**: Consistent timing scales
- **Easing**: Smooth, natural motion curves
- **Presets**: Pre-defined animation combinations

#### Usage Examples
```typescript
// Staggered animations
const style = animationUtils.createStaggeredAnimation(index, 100);

// Reveal animations
const style = animationUtils.createRevealAnimation('gentle');

// Accessible animations
const style = animationUtils.createAccessibleAnimation(animation);
```

### 💫 Elevation (`elevation.ts`)
Shadow and z-index system for layering.

#### Shadow Scale
- `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `inner`

#### Z-Index Scale
- Semantic z-index values: `dropdown`, `modal`, `tooltip`, etc.

### 📱 Breakpoints (`breakpoints.ts`)
Comprehensive responsive system from mobile to 8K displays.

#### Breakpoint Categories
- **Mobile**: `xs` (320px), `sm` (480px)
- **Tablet**: `md` (768px)
- **Desktop**: `lg` (1024px), `xl` (1280px), `2xl` (1536px)
- **Wide**: `3xl` (1920px), `4xl` (2560px), `5xl` (3440px)
- **Ultra**: `6xl` (3840px), `7xl` (5120px), `8xl` (7680px)

## 🔧 Token Utilities

### Color Utilities (`utilities.ts`)
```typescript
// Get colors by category
const color = colorUtils.getColor('brand', 500);
const semantic = colorUtils.getSemantic('success', 500);
const theme = colorUtils.getTheme('primary');
```

### Theme Utilities
```typescript
// Theme management
const currentTheme = themeUtils.getThemeMode();
themeUtils.toggleTheme();
themeUtils.setTheme('dark');
```

### Animation Utilities (`animationUtils.ts`)
```typescript
// Performance-optimized animations
const staggered = animationUtils.createStaggeredAnimation(index, 100);
const reveal = animationUtils.createRevealAnimation('gentle');
const morph = animationUtils.createMorphAnimation('0.8s');
```

## 📊 Performance Optimizations

### Tree Shaking
```typescript
// ✅ Good - Specific imports for tree shaking
import { colorUtils, spacingTokens } from '@/design-system/tokens';

// ❌ Bad - Imports everything
import * as tokens from '@/design-system/tokens';
```

### Memoization
```typescript
// Color calculations are memoized
const memoizedColor = performanceUtils.memoizeColor(colorUtils.getColor);
```

### Caching
```typescript
// Animation styles are cached
const cachedAnimation = animationUtils.createStaggeredAnimation(index, 100);
```

## 🎨 Usage Examples

### Component with Tokens
```tsx
import { colorUtils, spacingTokens, animationUtils } from '@/design-system/tokens';

const Component = () => {
  const styles = {
    color: colorUtils.getColor('brand', 500),
    padding: spacingTokens[4],
    ...animationUtils.createRevealAnimation('gentle')
  };
  
  return <div style={styles}>Content</div>;
};
```

### Responsive Design
```tsx
import { breakpointUtils } from '@/design-system/tokens';

const Component = () => {
  const isMobile = breakpointUtils.isMobile('md');
  const containerSize = breakpointUtils.getContainerSize('lg');
  
  return (
    <div style={{ maxWidth: containerSize }}>
      {isMobile ? 'Mobile view' : 'Desktop view'}
    </div>
  );
};
```

### Typography with Tokens
```tsx
import { Typography } from '@/design-system/atoms';
import { colorUtils } from '@/design-system/tokens';

const Component = () => (
  <Typography 
    variant="heroTitle" 
    style={{ color: colorUtils.getColor('brand', 600) }}
  >
    Styled Title
  </Typography>
);
```

## 🔍 Debugging

### Token Inspector
```typescript
// Debug token values
console.log('Available colors:', colorTokens);
console.log('Spacing scale:', spacingTokens);
console.log('Typography config:', typographyTokens);
```

### Performance Monitoring
```typescript
// Clear animation cache
animationUtils.clearCache();

// Preload critical colors
performanceUtils.preloadColors();
```

## 🧪 Testing

### Token Testing
```typescript
import { colorUtils, spacingTokens } from '@/design-system/tokens';

describe('Design Tokens', () => {
  it('should provide valid color values', () => {
    const color = colorUtils.getColor('brand', 500);
    expect(color).toMatch(/^hsl\(/);
  });
  
  it('should provide consistent spacing values', () => {
    const spacing = spacingTokens[4];
    expect(spacing).toBe('1rem');
  });
});
```

## 📚 Related Documentation
- [Color System](./colors.ts)
- [Typography System](./typography.ts)
- [Animation System](./animations.ts)
- [Breakpoint System](./breakpoints.ts)
- [Atomic Components](../atoms/README.md)
