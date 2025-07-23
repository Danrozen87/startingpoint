
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useAccessibilityContext } from "@/components/providers/AccessibilityProvider"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "motion-reduce:transition-none motion-reduce:transform-none",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5",
          "active:scale-[0.98]",
          "focus-visible:ring-primary/50",
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive/90 hover:shadow-md hover:-translate-y-0.5",
          "active:scale-[0.98]",
          "focus-visible:ring-destructive/50",
        ],
        outline: [
          "border border-input bg-background",
          "hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-sm",
          "active:scale-[0.98]",
          "focus-visible:ring-accent/50",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80 hover:shadow-md hover:-translate-y-0.5",
          "active:scale-[0.98]",
          "focus-visible:ring-secondary/50",
        ],
        ghost: [
          "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
          "active:scale-[0.98]",
          "focus-visible:ring-accent/50",
        ],
        link: [
          "text-primary underline-offset-4",
          "hover:underline hover:text-primary/90",
          "active:text-primary/80",
          "focus-visible:ring-primary/50",
        ],
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  'aria-label'?: string
  'aria-describedby'?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, 'aria-label': ariaLabel, 'aria-describedby': ariaDescribedby, onFocus, onBlur, ...props }, ref) => {
    const { focus, screenReader, touch } = useAccessibilityContext();
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

    const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      // Announce button action to screen readers
      if (ariaLabel) {
        screenReader.announce(`${ariaLabel} activated`);
      }
      props.onClick?.(event);
    }, [ariaLabel, screenReader, props.onClick]);

    // Validate touch target size
    React.useEffect(() => {
      if (elementRef.current) {
        const isValidTouchTarget = touch.validateTouchTarget(elementRef.current);
        if (!isValidTouchTarget && size !== 'sm') {
          console.warn('Button: Touch target may be too small for accessibility');
        }
      }
    }, [touch, size]);

    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={elementRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
