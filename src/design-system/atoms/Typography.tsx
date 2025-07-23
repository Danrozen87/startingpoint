
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      // Rare headers - Playfair Display for special occasions
      heroTitle: 'font-rare text-5xl font-bold tracking-tight lg:text-6xl',
      heroSubtitle: 'font-rare text-lg font-medium tracking-tight lg:text-xl',
      sectionTitle: 'font-rare text-4xl font-semibold tracking-tight lg:text-5xl',
      
      // UI headers - Manrope for everyday interface
      pageTitle: 'font-ui text-3xl font-bold tracking-tight lg:text-4xl',
      cardTitle: 'font-ui text-xl font-semibold tracking-tight lg:text-2xl',
      sectionHeader: 'font-ui text-lg font-semibold tracking-tight lg:text-xl',
      subsectionHeader: 'font-ui text-base font-medium tracking-tight lg:text-lg',
      label: 'font-ui text-sm font-medium tracking-wide uppercase',
      caption: 'font-ui text-xs font-normal tracking-wide',
      
      // Body text - Inter for reading
      bodyLarge: 'font-body text-lg leading-relaxed',
      body: 'font-body text-base leading-relaxed',
      bodySmall: 'font-body text-sm leading-relaxed',
      
      // Legacy variants for backward compatibility
      h1: 'font-ui text-4xl font-bold tracking-tight lg:text-5xl',
      h2: 'font-ui text-3xl font-semibold tracking-tight lg:text-4xl',
      h3: 'font-ui text-2xl font-semibold tracking-tight lg:text-3xl',
      h4: 'font-ui text-xl font-semibold tracking-tight lg:text-2xl',
      h5: 'font-ui text-lg font-semibold tracking-tight lg:text-xl',
      h6: 'font-ui text-base font-semibold tracking-tight lg:text-lg',
      lead: 'font-body text-xl text-muted-foreground',
      large: 'font-ui text-lg font-semibold',
      small: 'font-ui text-sm font-medium leading-none',
      muted: 'font-body text-sm text-muted-foreground',
      code: 'font-mono relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-sm font-semibold',
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
    responsive: {
      true: 'text-balance',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'default',
    align: 'left',
    responsive: false,
  },
});

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
  fluid?: boolean;
}

// Optimized element mapping
const getDefaultElement = (variant: string | null | undefined): React.ElementType => {
  switch (variant) {
    case 'heroTitle':
    case 'h1':
      return 'h1';
    case 'pageTitle':
    case 'h2':
      return 'h2';
    case 'sectionTitle':
    case 'cardTitle':
    case 'h3':
      return 'h3';
    case 'sectionHeader':
    case 'h4':
      return 'h4';
    case 'subsectionHeader':
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'heroSubtitle':
    case 'lead':
    case 'bodyLarge':
    case 'body':
    case 'bodySmall':
      return 'p';
    case 'label':
      return 'span';
    case 'caption':
    case 'small':
    case 'muted':
      return 'small';
    case 'code':
      return 'code';
    default:
      return 'p';
  }
};

const Typography = React.memo(React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, color, align, responsive, as, children, fluid, ...props }, ref) => {
    const Component = as || getDefaultElement(variant);
    
    // Memoize className computation
    const memoizedClassName = React.useMemo(() => cn(
      typographyVariants({ variant, color, align, responsive }),
      fluid && 'text-pretty',
      className
    ), [variant, color, align, responsive, fluid, className]);
    
    return (
      <Component
        className={memoizedClassName}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
));

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
export type { TypographyProps };
