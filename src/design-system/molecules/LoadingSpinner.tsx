
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      color: {
        default: 'text-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'default',
    },
  }
);

interface LoadingSpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const LoadingSpinner = React.memo(React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, color, label = 'Loading...', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, color }), className)}
        role="status"
        aria-label={label}
        {...props}
      >
        <span className="sr-only">{label}</span>
      </div>
    );
  }
));

LoadingSpinner.displayName = 'LoadingSpinner';

export { LoadingSpinner, spinnerVariants };
export type { LoadingSpinnerProps };
