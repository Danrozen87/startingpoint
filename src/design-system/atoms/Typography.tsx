
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold tracking-tight lg:text-5xl',
      h2: 'text-3xl font-semibold tracking-tight lg:text-4xl',
      h3: 'text-2xl font-semibold tracking-tight lg:text-3xl',
      h4: 'text-xl font-semibold tracking-tight lg:text-2xl',
      h5: 'text-lg font-semibold tracking-tight lg:text-xl',
      h6: 'text-base font-semibold tracking-tight lg:text-lg',
      body: 'text-base leading-7',
      bodySmall: 'text-sm leading-6',
      caption: 'text-xs leading-5',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive',
      success: 'text-green-600',
      warning: 'text-yellow-600',
      info: 'text-blue-600',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'default',
    align: 'left',
  },
});

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, color, align, as, children, ...props }, ref) => {
    const Component = as || getDefaultElement(variant);
    
    return (
      <Component
        className={cn(typographyVariants({ variant, color, align }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

function getDefaultElement(variant: string | null | undefined): React.ElementType {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'lead':
      return 'p';
    case 'large':
      return 'div';
    case 'small':
      return 'small';
    case 'muted':
      return 'p';
    case 'code':
      return 'code';
    default:
      return 'p';
  }
}

export { Typography, typographyVariants };
export type { TypographyProps };
