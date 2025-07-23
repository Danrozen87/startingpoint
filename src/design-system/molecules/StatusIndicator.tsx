
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { colorUtils } from '../tokens/utilities';

const statusVariants = cva(
  'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors',
  {
    variants: {
      variant: {
        success: 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-500/30',
        error: 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-500/30',
        warning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-300 dark:ring-yellow-500/30',
        info: 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-500/30',
        default: 'bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-900/20 dark:text-gray-300 dark:ring-gray-500/30',
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

const dotVariants = cva('mr-1.5 rounded-full transition-colors', {
  variants: {
    variant: {
      success: 'bg-green-400 dark:bg-green-500',
      error: 'bg-red-400 dark:bg-red-500',
      warning: 'bg-yellow-400 dark:bg-yellow-500',
      info: 'bg-blue-400 dark:bg-blue-500',
      default: 'bg-gray-400 dark:bg-gray-500',
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
