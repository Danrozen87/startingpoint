
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusVariants = cva(
  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
  {
    variants: {
      variant: {
        success: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-red-800',
        warning: 'bg-yellow-100 text-yellow-800',
        info: 'bg-blue-100 text-blue-800',
        default: 'bg-gray-100 text-gray-800',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const dotVariants = cva('mr-1.5 h-1.5 w-1.5 rounded-full', {
  variants: {
    variant: {
      success: 'bg-green-400',
      error: 'bg-red-400',
      warning: 'bg-yellow-400',
      info: 'bg-blue-400',
      default: 'bg-gray-400',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusVariants> {
  children: React.ReactNode;
  showDot?: boolean;
}

const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ className, variant, size, showDot = true, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(statusVariants({ variant, size, className }))}
        {...props}
      >
        {showDot && <span className={cn(dotVariants({ variant }))} />}
        {children}
      </span>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

export { StatusIndicator, statusVariants };
export type { StatusIndicatorProps };
