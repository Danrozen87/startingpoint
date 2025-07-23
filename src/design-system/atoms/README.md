
# Atomic Components

## 📖 Overview
Atomic components are the foundational building blocks of our design system. They represent the smallest, most basic UI elements that cannot be broken down further while maintaining their functionality.

## 🎯 Philosophy
- **Single Responsibility**: Each atom has one clear purpose
- **Composable**: Can be combined to create more complex components
- **Consistent**: Follow unified design patterns and APIs
- **Accessible**: WCAG 2.1 AA compliant by default
- **Performant**: Optimized with React.memo and proper prop handling

## 🧩 Available Atoms

### Typography
**Purpose**: Handles all text rendering with semantic variants
**File**: `Typography.tsx`
**Usage**: Headers, body text, labels, captions
```tsx
<Typography variant="heroTitle" color="primary">
  Welcome
</Typography>
```

### Box
**Purpose**: Flexible container with spacing utilities
**File**: `Box.tsx`
**Usage**: Layout containers, spacing control
```tsx
<Box p={4} m={2} as="section">
  Content
</Box>
```

### Stack
**Purpose**: Flexbox-based layout component
**File**: `Stack.tsx`
**Usage**: Vertical/horizontal layouts with consistent spacing
```tsx
<Stack direction="column" gap={4} align="center">
  <Item />
  <Item />
</Stack>
```

### Container
**Purpose**: Responsive container with max-width constraints
**File**: `Container.tsx`
**Usage**: Page sections, content wrapping
```tsx
<Container size="lg" centered>
  Page content
</Container>
```

### Section
**Purpose**: Semantic section wrapper with background variants
**File**: `Section.tsx`
**Usage**: Page sections, background areas
```tsx
<Section size="lg" background="muted">
  Section content
</Section>
```

## 🔧 Common Props

### Shared Props
- `as`: Override default HTML element
- `className`: Additional CSS classes
- `children`: Child elements
- `ref`: Forward ref support

### Spacing Props (Box)
- `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`: Padding
- `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`: Margin

### Typography Props
- `variant`: Style variant (heroTitle, body, etc.)
- `color`: Text color (primary, secondary, etc.)
- `align`: Text alignment
- `responsive`: Enable responsive behavior
- `fluid`: Enable fluid typography

## 📏 Size Variants

### Typography Sizes
- `heroTitle`, `heroSubtitle`: Large display text
- `pageTitle`, `cardTitle`: Page/section headers
- `sectionHeader`, `subsectionHeader`: Smaller headers
- `body`, `bodyLarge`, `bodySmall`: Content text
- `label`, `caption`: UI labels and captions

### Container Sizes
- `sm`: 576px max-width
- `md`: 768px max-width
- `lg`: 1024px max-width
- `xl`: 1280px max-width
- `2xl`: 1536px max-width
- `full`: 100% width

### Section Sizes
- `sm`: 2rem padding
- `md`: 3rem padding
- `lg`: 4rem padding
- `xl`: 5rem padding
- `2xl`: 6rem padding

## 🎨 Styling Guidelines

### Use Design Tokens
```tsx
// ✅ Good - Uses design system colors
<Typography color="primary">Text</Typography>

// ❌ Bad - Hardcoded styles
<div style={{ color: '#3b82f6' }}>Text</div>
```

### Responsive Design
```tsx
// ✅ Good - Responsive variants
<Typography variant="heroTitle" className="text-4xl lg:text-6xl">
  Title
</Typography>

// ✅ Good - Responsive containers
<Container size="lg">
  <Stack direction="column" gap={4}>
    Content
  </Stack>
</Container>
```

## 🚀 Performance Considerations

### Memoization
All atoms are wrapped with `React.memo` to prevent unnecessary re-renders:
```tsx
const Typography = React.memo(React.forwardRef<HTMLElement, TypographyProps>(
  ({ ...props }, ref) => {
    // Component implementation
  }
));
```

### Optimized className Computation
Complex className calculations are memoized:
```tsx
const memoizedClassName = React.useMemo(() => cn(
  variants({ variant, color }),
  className
), [variant, color, className]);
```

## ♿ Accessibility

### Semantic HTML
Components automatically select appropriate HTML elements:
```tsx
<Typography variant="heroTitle"> // Renders as <h1>
<Typography variant="body">      // Renders as <p>
<Typography variant="label">     // Renders as <span>
```

### ARIA Support
All components support ARIA attributes:
```tsx
<Typography 
  variant="label" 
  aria-label="Required field"
  role="note"
>
  Email *
</Typography>
```

## 🧪 Testing

### Component Testing
```tsx
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders with correct semantic element', () => {
    render(<Typography variant="heroTitle">Test</Typography>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
```

### Accessibility Testing
```tsx
import { axe } from 'jest-axe';

it('should not have accessibility violations', async () => {
  const { container } = render(<Typography>Test</Typography>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 🔄 Migration Guide

### From Legacy Components
```tsx
// Old
<h1 className="text-4xl font-bold">Title</h1>

// New
<Typography variant="heroTitle">Title</Typography>
```

### From Hardcoded Styles
```tsx
// Old
<div style={{ padding: '16px', margin: '8px' }}>
  Content
</div>

// New
<Box p={4} m={2}>
  Content
</Box>
```

## 📚 Related Documentation
- [Design Tokens](../tokens/README.md)
- [Molecules](../molecules/README.md)
- [Typography System](../tokens/typography.ts)
- [Spacing System](../tokens/spacing.ts)
