
import * as React from 'react';
import { cn } from '@/lib/utils';
import { animationUtils } from '../tokens/animationUtils';

interface StaggeredListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerDelay?: number;
  animationType?: 'gentle' | 'elegant' | 'organic';
  trigger?: 'immediate' | 'scroll';
  threshold?: number;
  className?: string;
}

const StaggeredList = React.memo(React.forwardRef<HTMLDivElement, StaggeredListProps>(
  ({ 
    children, 
    staggerDelay = 100,
    animationType = 'gentle',
    trigger = 'scroll',
    threshold = 0.1,
    className,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(trigger === 'immediate');
    const [hasAnimated, setHasAnimated] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

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

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, [trigger, threshold, hasAnimated]);

    // Apply staggered animations to children
    const staggeredChildren = React.useMemo(() => {
      if (!isVisible) return children;

      return React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const animationStyles = animationUtils.prefersReducedMotion() 
          ? { opacity: 1, transform: 'none' }
          : animationUtils.createStaggeredAnimation(index, staggerDelay, `${animationType}-fade-up`);

        return React.cloneElement(child, {
          style: {
            ...child.props.style,
            ...animationStyles,
          },
          className: cn(
            child.props.className,
            !isVisible && 'opacity-0',
            'transition-opacity duration-300'
          ),
        });
      });
    }, [children, isVisible, staggerDelay, animationType]);

    return (
      <div
        ref={containerRef}
        className={cn('space-y-2', className)}
        {...props}
      >
        {staggeredChildren}
      </div>
    );
  }
));

StaggeredList.displayName = 'StaggeredList';

export { StaggeredList };
export type { StaggeredListProps };
