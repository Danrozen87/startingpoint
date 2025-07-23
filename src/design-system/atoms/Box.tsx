
import * as React from 'react';
import { cn } from '@/lib/utils';
import { type SpacingToken } from '../tokens/spacing';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  p?: SpacingToken;
  px?: SpacingToken;
  py?: SpacingToken;
  pt?: SpacingToken;
  pr?: SpacingToken;
  pb?: SpacingToken;
  pl?: SpacingToken;
  m?: SpacingToken;
  mx?: SpacingToken;
  my?: SpacingToken;
  mt?: SpacingToken;
  mr?: SpacingToken;
  mb?: SpacingToken;
  ml?: SpacingToken;
  children?: React.ReactNode;
}

// Optimized spacing class generation with memoization
const useSpacingClasses = (spacingProps: Pick<BoxProps, 'p' | 'px' | 'py' | 'pt' | 'pr' | 'pb' | 'pl' | 'm' | 'mx' | 'my' | 'mt' | 'mr' | 'mb' | 'ml'>) => {
  return React.useMemo(() => {
    const classes: string[] = [];
    const { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml } = spacingProps;
    
    if (p) classes.push(`p-${p}`);
    if (px) classes.push(`px-${px}`);
    if (py) classes.push(`py-${py}`);
    if (pt) classes.push(`pt-${pt}`);
    if (pr) classes.push(`pr-${pr}`);
    if (pb) classes.push(`pb-${pb}`);
    if (pl) classes.push(`pl-${pl}`);
    if (m) classes.push(`m-${m}`);
    if (mx) classes.push(`mx-${mx}`);
    if (my) classes.push(`my-${my}`);
    if (mt) classes.push(`mt-${mt}`);
    if (mr) classes.push(`mr-${mr}`);
    if (mb) classes.push(`mb-${mb}`);
    if (ml) classes.push(`ml-${ml}`);
    
    return classes;
  }, [p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml]);
};

const Box = React.memo(React.forwardRef<HTMLDivElement, BoxProps>(
  ({ 
    as: Component = 'div',
    className,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    children,
    ...props 
  }, ref) => {
    const spacingClasses = useSpacingClasses({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml });

    return (
      <Component
        className={cn(...spacingClasses, className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
));

Box.displayName = 'Box';

export { Box };
export type { BoxProps };
