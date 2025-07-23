
# AI Development Cheatsheet

## 🎯 Quick Reference for AI Contributors

### 📁 File Navigation
```
KEY FILES TO UNDERSTAND:
├── PROJECT_CONTEXT.md           # Start here for project overview
├── GLOSSARY.md                  # Term definitions
├── src/design-system/index.ts   # Main design system exports
├── src/design-system/tokens/    # Design tokens (colors, spacing, etc.)
├── src/lib/hooks/               # Reusable React hooks
└── src/components/              # Application components
```

### 🏗️ Common Patterns

#### Creating New Components
```typescript
// @file: New component template
// @purpose: [Describe component purpose]
// @dependencies: [List key dependencies]
// @ai-context: [Specific AI guidance]

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Typography } from '@/design-system';

interface ComponentProps {
  // Define props with clear descriptions
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const Component = React.memo(React.forwardRef<HTMLElement, ComponentProps>(
  ({ children, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
));

Component.displayName = 'Component';
export { Component };
export type { ComponentProps };
```

#### Design Token Usage
```typescript
// ✅ Correct - Use design tokens
import { colorUtils, spacingTokens } from '@/design-system';

// Get colors semantically
const primaryColor = colorUtils.getColor('brand', 500);
const spacing = spacingTokens[4]; // 1rem

// ❌ Incorrect - Don't use hardcoded values
const primaryColor = '#3b82f6';
const spacing = '16px';
```

#### Animation Implementation
```typescript
// @ai-context: Animation utilities for smooth interactions
import { animationUtils } from '@/design-system';

// Staggered animations for lists
const staggeredStyle = animationUtils.createStaggeredAnimation(index, 100);

// Reveal animations for content
const revealStyle = animationUtils.createRevealAnimation('gentle');

// Respect reduced motion preferences
const accessibleStyle = animationUtils.createAccessibleAnimation(animation);
```

### 🎨 Styling Guidelines

#### Tailwind + Design System
```typescript
// ✅ Preferred - Use design system components
<Typography variant="heroTitle" color="primary">
  Welcome
</Typography>

// ✅ Acceptable - Use semantic Tailwind classes
<div className="bg-background text-foreground p-4">
  Content
</div>

// ❌ Avoid - Hardcoded colors
<div className="bg-blue-500 text-white p-4">
  Content
</div>
```

#### Responsive Design
```typescript
// ✅ Mobile-first responsive approach
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

// ✅ Use breakpoint utilities
import { breakpointUtils } from '@/design-system';
const isMobile = breakpointUtils.isMobile('md');
```

### 🧪 Testing Patterns

#### Component Testing
```typescript
// @ai-context: Testing utilities and patterns
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('should render with correct accessibility attributes', () => {
    render(<Component>Test content</Component>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### 🔧 Performance Optimizations

#### Memoization Guidelines
```typescript
// ✅ Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);

// ✅ Memoize callbacks passed to children
const handleClick = useCallback(() => {
  // Handle click
}, [dependency]);

// ✅ Memoize components with React.memo
const Component = React.memo(({ prop }) => {
  return <div>{prop}</div>;
});
```

### 🚨 Common Pitfalls to Avoid

#### ❌ Don't Do This
```typescript
// Don't use useCallback/useMemo at module level
const moduleFunction = useCallback(() => {}, []); // Error!

// Don't hardcode colors
const style = { color: '#ff0000' };

// Don't create large files (>300 lines)
// Don't skip TypeScript types
// Don't ignore accessibility
```

#### ✅ Do This Instead
```typescript
// Use regular functions at module level
const moduleFunction = () => {};

// Use design tokens
const style = { color: colorUtils.getColor('semantic', 'error') };

// Create focused, single-purpose files
// Add comprehensive TypeScript types
// Include accessibility attributes
```

### 📝 Documentation Standards

#### File Headers
```typescript
/**
 * @file component-name.tsx
 * @purpose Brief description of component purpose
 * @dependencies List of key dependencies
 * @ai-context Specific guidance for AI contributors
 * @performance Notes about performance considerations
 * @accessibility WCAG compliance notes
 */
```

#### Function Documentation
```typescript
/**
 * Brief description of function purpose
 * @param param1 Description of parameter
 * @param param2 Description of parameter
 * @returns Description of return value
 * @throws ErrorType When this error occurs
 * @example
 * const result = functionName(param1, param2);
 * console.log(result); // Expected output
 */
```

### 🔍 Debugging Helpers

#### Performance Monitoring
```typescript
// Use performance hooks for debugging
import { usePerformance } from '@/lib/hooks';

const Component = (props) => {
  const { renderCount } = usePerformance('ComponentName', props);
  
  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`Component rendered ${renderCount} times`);
  }
};
```

#### Error Boundaries
```typescript
// Wrap components in error boundaries
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```

### 🎯 AI-Specific Markers

#### Context Markers
```typescript
// @ai-context: This handles user authentication flows
// @ai-security: Contains sensitive operations - review carefully
// @ai-performance: Critical render path - optimize for speed
// @ai-accessibility: Screen reader compatibility required
```

#### Decision Documentation
```typescript
// @decision: Using React.memo for this component
// @reason: Prevents unnecessary re-renders with stable props
// @alternatives: Regular function component (causes re-renders)
// @date: 2024-01-15
```

### 🚀 Quick Commands

#### Creating New Features
1. Create component file with proper header
2. Add TypeScript interfaces
3. Implement with memoization
4. Add comprehensive tests
5. Update exports in index.ts
6. Document in README.md

#### Debugging Issues
1. Check console for errors
2. Verify TypeScript types
3. Test accessibility with screen reader
4. Check performance with React DevTools
5. Validate responsive behavior

### 📊 Quality Checklist

Before submitting code:
- [ ] TypeScript types defined
- [ ] JSDoc documentation added
- [ ] Accessibility attributes included
- [ ] Performance optimizations applied
- [ ] Tests written and passing
- [ ] Responsive design tested
- [ ] Error handling implemented
- [ ] Design tokens used consistently
