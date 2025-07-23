
import { useEffect, useRef, useState } from 'react';
import { animationUtils } from '@/design-system/tokens/animationUtils';

interface UseStaggeredRevealOptions {
  baseDelay?: number;
  animationType?: 'gentle' | 'elegant' | 'organic';
  trigger?: 'immediate' | 'scroll';
  threshold?: number;
}

export function useStaggeredReveal(
  itemCount: number,
  options: UseStaggeredRevealOptions = {}
) {
  const {
    baseDelay = 100,
    animationType = 'gentle',
    trigger = 'scroll',
    threshold = 0.1,
  } = options;

  const [isVisible, setIsVisible] = useState(trigger === 'immediate');
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll trigger
  useEffect(() => {
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

  // Generate animation styles for each item
  const getItemStyles = (index: number): React.CSSProperties => {
    if (!isVisible) return { opacity: 0 };
    
    if (animationUtils.prefersReducedMotion()) {
      return {
        opacity: 1,
        transform: 'none',
        transition: 'opacity 0.3s ease',
      };
    }

    return animationUtils.createStaggeredAnimation(index, baseDelay, `${animationType}-fade-up`);
  };

  return {
    containerRef,
    isVisible,
    getItemStyles,
    hasAnimated,
  };
}
