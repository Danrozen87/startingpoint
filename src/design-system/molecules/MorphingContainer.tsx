
import * as React from 'react';
import { cn } from '@/lib/utils';
import { animationUtils } from '../tokens/animationUtils';

interface MorphingContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  morphDuration?: string;
  morphEasing?: string;
  trigger?: 'hover' | 'focus' | 'active' | 'auto';
  autoMorphInterval?: number;
  className?: string;
}

const MorphingContainer = React.memo(React.forwardRef<HTMLDivElement, MorphingContainerProps>(
  ({ 
    children, 
    morphDuration = '0.8s',
    morphEasing = 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    trigger = 'hover',
    autoMorphInterval = 3000,
    className,
    ...props 
  }, ref) => {
    const [isMorphing, setIsMorphing] = React.useState(false);
    const intervalRef = React.useRef<NodeJS.Timeout>();

    // Auto morph effect
    React.useEffect(() => {
      if (trigger === 'auto') {
        intervalRef.current = setInterval(() => {
          setIsMorphing(true);
          setTimeout(() => setIsMorphing(false), parseFloat(morphDuration) * 1000);
        }, autoMorphInterval);
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [trigger, morphDuration, autoMorphInterval]);

    // Handle trigger events
    const handleMouseEnter = React.useCallback(() => {
      if (trigger === 'hover') setIsMorphing(true);
    }, [trigger]);

    const handleMouseLeave = React.useCallback(() => {
      if (trigger === 'hover') setIsMorphing(false);
    }, [trigger]);

    const handleFocus = React.useCallback(() => {
      if (trigger === 'focus') setIsMorphing(true);
    }, [trigger]);

    const handleBlur = React.useCallback(() => {
      if (trigger === 'focus') setIsMorphing(false);
    }, [trigger]);

    const handleMouseDown = React.useCallback(() => {
      if (trigger === 'active') setIsMorphing(true);
    }, [trigger]);

    const handleMouseUp = React.useCallback(() => {
      if (trigger === 'active') setIsMorphing(false);
    }, [trigger]);

    // Create morph animation styles
    const morphStyles = React.useMemo(() => {
      if (animationUtils.prefersReducedMotion()) {
        return {
          transition: 'none',
        };
      }

      return isMorphing 
        ? animationUtils.createMorphAnimation(morphDuration, morphEasing)
        : {};
    }, [isMorphing, morphDuration, morphEasing]);

    return (
      <div
        ref={ref}
        className={cn(
          'transition-all duration-300',
          'rounded-lg border border-border bg-card p-4',
          className
        )}
        style={morphStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        {children}
      </div>
    );
  }
));

MorphingContainer.displayName = 'MorphingContainer';

export { MorphingContainer };
export type { MorphingContainerProps };
