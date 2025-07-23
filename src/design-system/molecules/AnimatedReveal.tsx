
import * as React from 'react';
import { cn } from '@/lib/utils';
import { animationUtils } from '../tokens/animationUtils';

interface AnimatedRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?: 'gentle' | 'elegant' | 'organic' | 'purposeful' | 'ceremonial';
  duration?: string;
  delay?: number;
  trigger?: 'immediate' | 'scroll' | 'hover' | 'focus';
  threshold?: number;
  className?: string;
}

const AnimatedReveal = React.memo(React.forwardRef<HTMLDivElement, AnimatedRevealProps>(
  ({ 
    children, 
    type = 'gentle', 
    duration,
    delay = 0,
    trigger = 'immediate',
    threshold = 0.1,
    className,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(trigger === 'immediate');
    const [hasAnimated, setHasAnimated] = React.useState(false);
    const elementRef = React.useRef<HTMLDivElement>(null);

    // Intersection Observer for scroll trigger
    React.useEffect(() => {
      if (trigger !== 'scroll' || hasAnimated) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        },
        { threshold }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }, [trigger, threshold, hasAnimated]);

    // Handle hover/focus triggers
    const handleMouseEnter = React.useCallback(() => {
      if (trigger === 'hover') setIsVisible(true);
    }, [trigger]);

    const handleFocus = React.useCallback(() => {
      if (trigger === 'focus') setIsVisible(true);
    }, [trigger]);

    // Create animation styles
    const animationStyles = React.useMemo(() => {
      if (!isVisible) return { opacity: 0 };
      
      const baseAnimation = animationUtils.createRevealAnimation(type, duration);
      
      if (animationUtils.prefersReducedMotion()) {
        return {
          opacity: 1,
          transform: 'none',
          transition: 'opacity 0.3s ease',
        };
      }

      return {
        ...baseAnimation,
        animationDelay: `${delay}ms`,
      };
    }, [isVisible, type, duration, delay]);

    return (
      <div
        ref={elementRef}
        className={cn(
          'transition-opacity duration-300',
          !isVisible && 'opacity-0',
          className
        )}
        style={animationStyles}
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        {...props}
      >
        {children}
      </div>
    );
  }
));

AnimatedReveal.displayName = 'AnimatedReveal';

export { AnimatedReveal };
export type { AnimatedRevealProps };
