
/**
 * @file InteractiveBox.tsx
 * @purpose Interactive container with comprehensive hover, focus, and accessibility features
 * @dependencies React, design system tokens, accessibility hooks
 * @ai-context Base interactive component for all clickable elements
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useAccessibility } from '@/lib/hooks/useAccessibility';

const interactiveBoxVariants = cva(
  [
    'relative inline-flex items-center justify-center',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'motion-reduce:transition-none motion-reduce:transform-none',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-background text-foreground',
          'hover:bg-accent hover:text-accent-foreground',
          'active:scale-[0.98]',
        ],
        primary: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5',
          'active:scale-[0.98]',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/80 hover:shadow-md hover:-translate-y-0.5',
          'active:scale-[0.98]',
        ],
        outline: [
          'border border-input bg-background',
          'hover:bg-accent hover:text-accent-foreground hover:border-accent',
          'active:scale-[0.98]',
        ],
        ghost: [
          'hover:bg-accent hover:text-accent-foreground',
          'active:scale-[0.98]',
        ],
        link: [
          'text-primary underline-offset-4',
          'hover:underline hover:text-primary/90',
          'active:text-primary/80',
        ],
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      intensity: {
        subtle: 'hover:transform hover:scale-[1.01]',
        medium: 'hover:transform hover:scale-[1.02] hover:-translate-y-0.5',
        strong: 'hover:transform hover:scale-[1.05] hover:-translate-y-1 hover:shadow-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      intensity: 'medium',
    },
  }
);

interface InteractiveBoxProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof interactiveBoxVariants> {
  asChild?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  children: React.ReactNode;
}

const InteractiveBox = React.forwardRef<HTMLButtonElement, InteractiveBoxProps>(
  ({ 
    className, 
    variant, 
    size, 
    intensity, 
    asChild = false, 
    children, 
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const { focus, motion, touch } = useAccessibility();
    const elementRef = React.useRef<HTMLButtonElement>(null);

    // Merge refs
    React.useImperativeHandle(ref, () => elementRef.current!, []);

    const handleFocus = React.useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
      focus.setFocusedElement(event.currentTarget);
      onFocus?.(event);
    }, [focus, onFocus]);

    const handleBlur = React.useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
      focus.setFocusedElement(null);
      onBlur?.(event);
    }, [focus, onBlur]);

    // Validate touch target size
    React.useEffect(() => {
      if (elementRef.current) {
        const isValidTouchTarget = touch.validateTouchTarget(elementRef.current);
        if (!isValidTouchTarget) {
          console.warn('InteractiveBox: Touch target may be too small for accessibility');
        }
      }
    }, [touch]);

    const Component = asChild ? React.Fragment : 'button';
    
    if (asChild) {
      return (
        <>{React.cloneElement(children as React.ReactElement, {
          className: cn(interactiveBoxVariants({ variant, size, intensity }), className),
          onFocus: handleFocus,
          onBlur: handleBlur,
          'aria-label': ariaLabel,
          'aria-describedby': ariaDescribedby,
          ...props,
        })}</>
      );
    }

    return (
      <Component
        className={cn(interactiveBoxVariants({ variant, size, intensity }), className)}
        ref={elementRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

InteractiveBox.displayName = 'InteractiveBox';

export { InteractiveBox, interactiveBoxVariants };
export type { InteractiveBoxProps };
