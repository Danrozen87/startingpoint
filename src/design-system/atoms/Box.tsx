
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

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
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
    const spacingClasses = [
      p && `p-${p}`,
      px && `px-${px}`,
      py && `py-${py}`,
      pt && `pt-${pt}`,
      pr && `pr-${pr}`,
      pb && `pb-${pb}`,
      pl && `pl-${pl}`,
      m && `m-${m}`,
      mx && `mx-${mx}`,
      my && `my-${my}`,
      mt && `mt-${mt}`,
      mr && `mr-${mr}`,
      mb && `mb-${mb}`,
      ml && `ml-${ml}`,
    ].filter(Boolean);

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
);

Box.displayName = 'Box';

export { Box };
export type { BoxProps };
