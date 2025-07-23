
import { useEffect, useState } from 'react';
import { animationUtils } from '@/design-system/tokens/animationUtils';

interface UsePurposefulTransitionOptions {
  duration?: string;
  easing?: string;
  exitDelay?: number;
}

export function usePurposefulTransition(
  isVisible: boolean,
  options: UsePurposefulTransitionOptions = {}
) {
  const {
    duration = '0.6s',
    easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    exitDelay = 0,
  } = options;

  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setIsAnimating(true);
      
      // End animation after duration
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, parseFloat(duration) * 1000);
      
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);
      
      // Delay exit animation
      const exitTimer = setTimeout(() => {
        const hideTimer = setTimeout(() => {
          setShouldRender(false);
          setIsAnimating(false);
        }, parseFloat(duration) * 1000);
        
        return () => clearTimeout(hideTimer);
      }, exitDelay);
      
      return () => clearTimeout(exitTimer);
    }
  }, [isVisible, duration, exitDelay]);

  // Generate transition styles
  const transitionStyles: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `all ${duration} ${easing}`,
    willChange: 'transform, opacity',
  };

  // Apply reduced motion preferences
  const accessibleStyles = animationUtils.prefersReducedMotion()
    ? {
        opacity: isVisible ? 1 : 0,
        transform: 'none',
        transition: `opacity ${duration} ease`,
      }
    : transitionStyles;

  return {
    shouldRender,
    isAnimating,
    transitionStyles: accessibleStyles,
  };
}
