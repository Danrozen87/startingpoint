
import { animationTokens } from './animations';

// Animation utility functions for composition and advanced use cases
export const animationUtils = {
  // Create staggered animation with delay
  createStaggeredAnimation: (
    index: number,
    baseDelay: number = 100,
    animation: string = 'gentle-fade-up'
  ): React.CSSProperties => ({
    animation: `${animation} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both`,
    animationDelay: `${index * baseDelay}ms`,
    willChange: 'transform, opacity',
  }),

  // Create parallax animation with depth
  createParallaxAnimation: (
    depth: number = 1,
    direction: 'up' | 'down' = 'up'
  ): React.CSSProperties => ({
    transform: `translateZ(${depth * 10}px)`,
    animation: `parallax-float ${2 + depth}s ease-in-out infinite ${direction === 'down' ? 'reverse' : ''}`,
    willChange: 'transform',
  }),

  // Create morphing animation for containers
  createMorphAnimation: (
    duration: string = '0.8s',
    easing: string = 'cubic-bezier(0.645, 0.045, 0.355, 1)'
  ): React.CSSProperties => ({
    animation: `morphing-container ${duration} ${easing} both`,
    willChange: 'border-radius, transform',
  }),

  // Create reveal animation with custom timing
  createRevealAnimation: (
    type: 'gentle' | 'elegant' | 'organic' | 'purposeful' | 'ceremonial' = 'gentle',
    duration?: string
  ): React.CSSProperties => {
    const animations = {
      gentle: `gentle-fade-up ${duration || '0.6s'} cubic-bezier(0.25, 0.46, 0.45, 0.94) both`,
      elegant: `elegant-scale-fade ${duration || '0.5s'} cubic-bezier(0.23, 1, 0.32, 1) both`,
      organic: `organic-slide-reveal ${duration || '0.7s'} cubic-bezier(0.645, 0.045, 0.355, 1) both`,
      purposeful: `purposeful-unveil ${duration || '0.8s'} cubic-bezier(0.19, 1, 0.22, 1) both`,
      ceremonial: `ceremonial-entrance ${duration || '1.5s'} cubic-bezier(0.19, 1, 0.22, 1) both`,
    };

    return {
      animation: animations[type],
      willChange: 'transform, opacity',
    };
  },

  // Get animation preset
  getPreset: (presetName: keyof typeof animationTokens.presets): React.CSSProperties => {
    return animationTokens.presets[presetName];
  },

  // Create responsive animation (respects reduced motion)
  createAccessibleAnimation: (
    animation: React.CSSProperties,
    fallback: React.CSSProperties = {}
  ): React.CSSProperties => ({
    ...animation,
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
      transition: 'none',
      transform: 'none',
      ...fallback,
    },
  }),

  // Create entrance animation sequence
  createEntranceSequence: (
    elements: number,
    baseDelay: number = 150,
    animationType: 'gentle' | 'elegant' | 'organic' = 'gentle'
  ): React.CSSProperties[] => {
    return Array.from({ length: elements }, (_, index) => 
      animationUtils.createStaggeredAnimation(index, baseDelay, `${animationType}-fade-up`)
    );
  },

  // Create interaction feedback animation
  createInteractionFeedback: (
    type: 'hover' | 'focus' | 'active' | 'disabled' = 'hover',
    intensity: 'subtle' | 'medium' | 'strong' = 'medium'
  ): React.CSSProperties => {
    const intensityMap = {
      subtle: { scale: 1.02, translateY: '-1px' },
      medium: { scale: 1.05, translateY: '-2px' },
      strong: { scale: 1.08, translateY: '-4px' },
    };

    const config = intensityMap[intensity];
    
    return {
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'transform',
      ...(type === 'hover' && {
        ':hover': {
          transform: `scale(${config.scale}) translateY(${config.translateY})`,
        },
      }),
      ...(type === 'focus' && {
        ':focus': {
          transform: `scale(${config.scale}) translateY(${config.translateY})`,
          outline: '2px solid hsl(var(--primary))',
          outlineOffset: '2px',
        },
      }),
      ...(type === 'active' && {
        ':active': {
          transform: 'scale(0.95) translateY(1px)',
        },
      }),
      ...(type === 'disabled' && {
        ':disabled': {
          transform: 'none',
          opacity: '0.5',
          cursor: 'not-allowed',
        },
      }),
    };
  },

  // Performance optimization helpers
  enableGPUAcceleration: (element: HTMLElement): void => {
    element.style.willChange = 'transform';
    element.style.transform = 'translateZ(0)';
  },

  disableGPUAcceleration: (element: HTMLElement): void => {
    element.style.willChange = 'auto';
    element.style.transform = '';
  },

  // Check if reduced motion is preferred
  prefersReducedMotion: (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
};

// Performance utilities for animations
export const animationPerformanceUtils = {
  // Optimize animation performance
  optimizeAnimation: (element: HTMLElement, animation: string): void => {
    element.style.willChange = 'transform, opacity';
    element.style.animation = animation;
    
    // Clean up after animation
    element.addEventListener('animationend', () => {
      element.style.willChange = 'auto';
    }, { once: true });
  },

  // Batch DOM updates for staggered animations
  batchStaggeredAnimations: (
    elements: NodeListOf<HTMLElement>,
    baseDelay: number = 100
  ): void => {
    requestAnimationFrame(() => {
      elements.forEach((element, index) => {
        element.style.animationDelay = `${index * baseDelay}ms`;
        element.classList.add('animate-staggered-reveal');
      });
    });
  },

  // Preload animation styles
  preloadAnimationStyles: (): void => {
    const style = document.createElement('style');
    style.textContent = `
      .will-change-transform { will-change: transform; }
      .will-change-opacity { will-change: opacity; }
      .will-change-auto { will-change: auto; }
    `;
    document.head.appendChild(style);
  },
};

// Export all animation utilities
export const animationSystemUtils = {
  ...animationUtils,
  performance: animationPerformanceUtils,
  tokens: animationTokens,
};
