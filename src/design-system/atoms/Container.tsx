
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva('mx-auto px-4 sm:px-6 lg:px-8', {
  variants: {
    size: {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-8xl',
      full: 'max-w-full',
      none: 'max-w-none',
    },
    centered: {
      true: 'mx-auto',
      false: '',
    },
  },
  defaultVariants: {
    size: 'xl',
    centered: true,
  },
});

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, centered, as: Component = 'div', children, ...props }, ref) => {
    return (
      <Component
        className={cn(containerVariants({ size, centered, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export { Container, containerVariants };
export type { ContainerProps };
