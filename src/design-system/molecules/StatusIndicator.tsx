
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusVariants = cva(
  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
  {
    variants: {
      variant: {
        success: 'bg-green-50 text-green-700 ring-green-600/20',
        error: 'bg-red-50 text-red-700 ring-red-600/20',
        warning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
        info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
        default: 'bg-gray-50 text-gray-700 ring-gray-600/20',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-xs',
        md: 'px-2 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const dotVariants = cva('mr-1.5 rounded-full', {
  variants: {
    variant: {
      success: 'bg-green-400',
      error: 'bg-red-400',
      warning: 'bg-yellow-400',
      info: 'bg-blue-400',
      default: 'bg-gray-400',
    },
    size: {
      sm: 'h-1 w-1',
      md: 'h-1.5 w-1.5',
      lg: 'h-2 w-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusVariants> {
  children: React.ReactNode;
  showDot?: boolean;
}

const StatusIndicator = React.memo(React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ className, variant, size, showDot = true, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(statusVariants({ variant, size, className }))}
        role="status"
        aria-label={`Status: ${children}`}
        {...props}
      >
        {showDot && <span className={cn(dotVariants({ variant, size }))} aria-hidden="true" />}
        {children}
      </span>
    );
  }
));

StatusIndicator.displayName = 'StatusIndicator';

export { StatusIndicator, statusVariants };
export type { StatusIndicatorProps };
