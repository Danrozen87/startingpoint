
import { useEffect, useRef, useState } from 'react';
import { animationUtils } from '@/design-system/tokens/animationUtils';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animationType?: 'gentle' | 'elegant' | 'organic' | 'purposeful' | 'ceremonial';
  duration?: string;
  delay?: number;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    animationType = 'gentle',
    duration,
    delay = 0,
    triggerOnce = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (triggerOnce && hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) setHasAnimated(true);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, hasAnimated]);

  // Generate animation styles
  const animationStyles: React.CSSProperties = {
    ...(isVisible 
      ? animationUtils.createRevealAnimation(animationType, duration)
      : { opacity: 0 }
    ),
    animationDelay: `${delay}ms`,
  };

  return {
    elementRef,
    isVisible,
    animationStyles,
    hasAnimated,
  };
}
