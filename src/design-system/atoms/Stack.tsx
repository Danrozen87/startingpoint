
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const stackVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
      20: 'gap-20',
      24: 'gap-24',
    },
    wrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
  },
  defaultVariants: {
    direction: 'column',
    align: 'stretch',
    justify: 'start',
    gap: 0,
    wrap: 'nowrap',
  },
});

interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, align, justify, gap, wrap, as: Component = 'div', children, ...props }, ref) => {
    return (
      <Component
        className={cn(stackVariants({ direction, align, justify, gap, wrap, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Stack.displayName = 'Stack';

export { Stack, stackVariants };
export type { StackProps };
