
# React Hooks

## 📖 Overview
Custom React hooks for common functionality, performance optimization, and enhanced developer experience. All hooks are designed to be reusable, well-tested, and follow React best practices.

## 🎯 Available Hooks

### 📱 Media & Responsive Hooks

#### `useMediaQuery`
**Purpose**: Responsive breakpoint detection
**File**: `useMediaQuery.ts`
```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
const isDesktop = useMediaQuery('(min-width: 1024px)');
```

### 💾 Storage Hooks

#### `useLocalStorage`
**Purpose**: Persistent local storage with React state
**File**: `useLocalStorage.ts`
```tsx
const [value, setValue] = useLocalStorage('key', 'defaultValue');
```

### ⚡ Performance Hooks

#### `useDebounce`
**Purpose**: Debounce rapidly changing values
**File**: `useDebounce.ts`
```tsx
const debouncedValue = useDebounce(searchTerm, 300);
```

#### `usePerformance`
**Purpose**: Monitor component render performance
**File**: `usePerformance.ts`
```tsx
const { renderCount } = usePerformance('ComponentName', props);
```

### 🎭 Animation Hooks

#### `useStaggeredReveal`
**Purpose**: Staggered entrance animations for lists
**File**: `useStaggeredReveal.ts`
```tsx
const { ref, isVisible } = useStaggeredReveal(index, 100);
```

#### `useScrollAnimation`
**Purpose**: Scroll-triggered animations
**File**: `useScrollAnimation.ts`
```tsx
const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
```

#### `usePurposefulTransition`
**Purpose**: Purposeful, accessible transitions
**File**: `usePurposefulTransition.ts`
```tsx
const transition = usePurposefulTransition('fade', { duration: 300 });
```

### 🛠️ Utility Hooks

#### `useDesignSystem`
**Purpose**: Access design system tokens and utilities
**File**: `useDesignSystem.ts`
```tsx
const { tokens, getColor, theme, animations } = useDesignSystem();
```

#### `useLazyRoute`
**Purpose**: Lazy load route components
**File**: `useLazyRoute.ts`
```tsx
const LazyComponent = useLazyRoute(() => import('./Component'));
```

## 🔧 Usage Patterns

### Responsive Design
```tsx
import { useMediaQuery } from '@/lib/hooks';

const ResponsiveComponent = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  );
};
```

### Performance Optimization
```tsx
import { useDebounce, usePerformance } from '@/lib/hooks';

const SearchComponent = ({ searchTerm, ...props }) => {
  const debouncedTerm = useDebounce(searchTerm, 300);
  const { renderCount } = usePerformance('SearchComponent', props);
  
  // Only search when debounced value changes
  useEffect(() => {
    if (debouncedTerm) {
      performSearch(debouncedTerm);
    }
  }, [debouncedTerm]);
  
  return <div>Search results...</div>;
};
```

### Animation Sequences
```tsx
import { useStaggeredReveal, useScrollAnimation } from '@/lib/hooks';

const AnimatedList = ({ items }) => {
  const { ref: containerRef } = useScrollAnimation({ threshold: 0.1 });
  
  return (
    <div ref={containerRef}>
      {items.map((item, index) => (
        <AnimatedItem key={item.id} index={index} />
      ))}
    </div>
  );
};

const AnimatedItem = ({ index }) => {
  const { ref, isVisible } = useStaggeredReveal(index, 100);
  
  return (
    <div 
      ref={ref}
      className={`transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      Content
    </div>
  );
};
```

### Design System Integration
```tsx
import { useDesignSystem } from '@/lib/hooks';

const ThemedComponent = () => {
  const { getColor, theme, animations } = useDesignSystem();
  
  const styles = {
    color: getColor('brand', 500),
    backgroundColor: getColor('neutral', 50),
    ...animations?.createReveal('gentle')
  };
  
  return (
    <div style={styles}>
      <button onClick={theme.toggle}>
        Toggle Theme
      </button>
    </div>
  );
};
```

## 📊 Performance Considerations

### Memoization
All hooks use appropriate memoization to prevent unnecessary re-renders:
```tsx
const useOptimizedHook = (value) => {
  return useMemo(() => {
    return expensiveCalculation(value);
  }, [value]);
};
```

### Cleanup
Hooks properly clean up event listeners and timers:
```tsx
useEffect(() => {
  const cleanup = setupEventListener();
  return cleanup;
}, []);
```

### Memory Management
```tsx
const useMemoryOptimizedHook = () => {
  const cache = useRef(new Map());
  
  useEffect(() => {
    return () => {
      cache.current.clear();
    };
  }, []);
};
```

## 🧪 Testing

### Hook Testing
```tsx
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  it('should store and retrieve values', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );
    
    expect(result.current[0]).toBe('initial');
    
    act(() => {
      result.current[1]('updated');
    });
    
    expect(result.current[0]).toBe('updated');
  });
});
```

### Performance Testing
```tsx
import { renderHook } from '@testing-library/react';
import { usePerformance } from './usePerformance';

describe('usePerformance', () => {
  it('should track render count', () => {
    const { result, rerender } = renderHook(() => 
      usePerformance('TestComponent', {})
    );
    
    expect(result.current.renderCount).toBe(1);
    
    rerender();
    expect(result.current.renderCount).toBe(2);
  });
});
```

## ♿ Accessibility

### Reduced Motion Support
```tsx
const useAccessibleAnimation = () => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  return useMemo(() => ({
    duration: prefersReducedMotion ? 0 : 300,
    easing: prefersReducedMotion ? 'linear' : 'ease-out'
  }), [prefersReducedMotion]);
};
```

### Focus Management
```tsx
const useFocusManagement = () => {
  const focusRef = useRef(null);
  
  const focusElement = useCallback(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);
  
  return { focusRef, focusElement };
};
```

## 🔍 Debugging

### Development Logging
```tsx
const useDebugHook = (name, value) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${name}] Value changed:`, value);
    }
  }, [name, value]);
};
```

### Performance Monitoring
```tsx
const usePerformanceDebug = (hookName) => {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${hookName}] Render #${renderCount.current}`);
    }
  });
};
```

## 📚 Related Documentation
- [Design System](../../design-system/README.md)
- [Performance Utils](../utils/performance.ts)
- [Animation System](../../design-system/tokens/animations.ts)
- [Breakpoint System](../../design-system/tokens/breakpoints.ts)
