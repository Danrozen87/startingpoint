
import * as React from 'react';
import { cn } from '@/lib/utils';
import { animationUtils } from '../tokens/animationUtils';

interface PurposefulFadeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isVisible?: boolean;
  duration?: string;
  easing?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  distance?: number;
  className?: string;
}

const PurposefulFade = React.memo(React.forwardRef<HTMLDivElement, PurposefulFadeProps>(
  ({ 
    children, 
    isVisible = true,
    duration = '0.6s',
    easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    direction = 'up',
    distance = 20,
    className,
    ...props 
  }, ref) => {
    const [shouldRender, setShouldRender] = React.useState(isVisible);

    // Handle visibility changes
    React.useEffect(() => {
      if (isVisible) {
        setShouldRender(true);
      } else {
        // Delay unmounting to allow exit animation
        const timer = setTimeout(() => setShouldRender(false), parseFloat(duration) * 1000);
        return () => clearTimeout(timer);
      }
    }, [isVisible, duration]);

    // Create fade animation styles
    const fadeStyles = React.useMemo(() => {
      if (animationUtils.prefersReducedMotion()) {
        return {
          opacity: isVisible ? 1 : 0,
          transition: `opacity ${duration} ease`,
        };
      }

      const transforms = {
        up: `translateY(${isVisible ? 0 : distance}px)`,
        down: `translateY(${isVisible ? 0 : -distance}px)`,
        left: `translateX(${isVisible ? 0 : distance}px)`,
        right: `translateX(${isVisible ? 0 : -distance}px)`,
        scale: `scale(${isVisible ? 1 : 0.95})`,
      };

      return {
        opacity: isVisible ? 1 : 0,
        transform: transforms[direction],
        transition: `all ${duration} ${easing}`,
        willChange: 'transform, opacity',
      };
    }, [isVisible, duration, easing, direction, distance]);

    if (!shouldRender) return null;

    return (
      <div
        ref={ref}
        className={cn('transition-all', className)}
        style={fadeStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
));

PurposefulFade.displayName = 'PurposefulFade';

export { PurposefulFade };
export type { PurposefulFadeProps };
