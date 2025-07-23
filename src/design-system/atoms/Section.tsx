
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const sectionVariants = cva('', {
  variants: {
    size: {
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-20',
      '2xl': 'py-24',
      none: '',
    },
    background: {
      default: 'bg-background',
      muted: 'bg-muted',
      card: 'bg-card',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      none: '',
    },
  },
  defaultVariants: {
    size: 'md',
    background: 'default',
  },
});

interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, size, background, as: Component = 'section', children, ...props }, ref) => {
    return (
      <Component
        className={cn(sectionVariants({ size, background, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';

export { Section, sectionVariants };
export type { SectionProps };
