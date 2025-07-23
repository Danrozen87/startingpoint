export const animationTokens = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
    slowest: '1000ms',
    // Advanced durations for purposeful animations
    reveal: '800ms',
    showcase: '1200ms',
    ceremonial: '1500ms',
    // Semantic duration mapping
    interaction: '200ms',
    transition: '300ms',
    entrance: '600ms',
    exit: '400ms',
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    // Professional bezier curves for different animation personalities
    gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    elegant: 'cubic-bezier(0.23, 1, 0.32, 1)',
    organic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    purposeful: 'cubic-bezier(0.19, 1, 0.22, 1)',
    // Legacy curves
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    snappy: 'cubic-bezier(0.4, 0, 0.6, 1)',
    // Advanced curves for specific use cases
    anticipate: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    overshoot: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  keyframes: {
    'fade-in': {
      '0%': { opacity: '0', transform: 'translateY(10px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    'fade-out': {
      '0%': { opacity: '1', transform: 'translateY(0)' },
      '100%': { opacity: '0', transform: 'translateY(10px)' },
    },
    'scale-in': {
      '0%': { transform: 'scale(0.95)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    'scale-out': {
      '0%': { transform: 'scale(1)', opacity: '1' },
      '100%': { transform: 'scale(0.95)', opacity: '0' },
    },
    'slide-in-from-top': {
      '0%': { transform: 'translateY(-100%)' },
      '100%': { transform: 'translateY(0)' },
    },
    'slide-in-from-bottom': {
      '0%': { transform: 'translateY(100%)' },
      '100%': { transform: 'translateY(0)' },
    },
    'slide-in-from-left': {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(0)' },
    },
    'slide-in-from-right': {
      '0%': { transform: 'translateX(100%)' },
      '100%': { transform: 'translateX(0)' },
    },
    'spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
    'pulse': {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },
    'bounce': {
      '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
      '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
    },
    'hover-lift': {
      '0%': { transform: 'translateY(0) scale(1)' },
      '100%': { transform: 'translateY(-2px) scale(1.02)' },
    },
    
    // Advanced keyframes with smooth bezier curves
    'gentle-fade-up': {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    'elegant-scale-fade': {
      '0%': { opacity: '0', transform: 'scale(0.9) translateY(10px)' },
      '60%': { opacity: '0.8', transform: 'scale(1.02) translateY(-2px)' },
      '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
    },
    'organic-slide-reveal': {
      '0%': { opacity: '0', transform: 'translateX(-30px) scale(0.95)' },
      '70%': { opacity: '0.9', transform: 'translateX(5px) scale(1.02)' },
      '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
    },
    'purposeful-unveil': {
      '0%': { opacity: '0', transform: 'translateY(40px) scale(0.8)' },
      '30%': { opacity: '0.3', transform: 'translateY(20px) scale(0.9)' },
      '70%': { opacity: '0.8', transform: 'translateY(-5px) scale(1.05)' },
      '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
    },
    'ceremonial-entrance': {
      '0%': { opacity: '0', transform: 'translateY(60px) scale(0.7) rotateX(15deg)' },
      '20%': { opacity: '0.2', transform: 'translateY(40px) scale(0.8) rotateX(10deg)' },
      '50%': { opacity: '0.6', transform: 'translateY(10px) scale(0.95) rotateX(5deg)' },
      '80%': { opacity: '0.9', transform: 'translateY(-5px) scale(1.05) rotateX(-2deg)' },
      '100%': { opacity: '1', transform: 'translateY(0) scale(1) rotateX(0deg)' },
    },
    'staggered-reveal': {
      '0%': { opacity: '0', transform: 'translateY(20px) scale(0.9)' },
      '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
    },
    'morphing-container': {
      '0%': { borderRadius: '0.5rem', transform: 'scale(1)' },
      '50%': { borderRadius: '1.5rem', transform: 'scale(1.05)' },
      '100%': { borderRadius: '0.5rem', transform: 'scale(1)' },
    },
    'parallax-float': {
      '0%': { transform: 'translateY(0px) translateZ(0)' },
      '50%': { transform: 'translateY(-10px) translateZ(5px)' },
      '100%': { transform: 'translateY(0px) translateZ(0)' },
    },
  },
  
  // Animation presets for common use cases
  presets: {
    'hero-entrance': {
      animation: 'ceremonial-entrance 1.5s cubic-bezier(0.19, 1, 0.22, 1) both',
      willChange: 'transform, opacity',
    },
    'content-reveal': {
      animation: 'purposeful-unveil 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      willChange: 'transform, opacity',
    },
    'gentle-entrance': {
      animation: 'gentle-fade-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      willChange: 'transform, opacity',
    },
    'elegant-transition': {
      animation: 'elegant-scale-fade 0.5s cubic-bezier(0.23, 1, 0.32, 1) both',
      willChange: 'transform, opacity',
    },
    'organic-flow': {
      animation: 'organic-slide-reveal 0.7s cubic-bezier(0.645, 0.045, 0.355, 1) both',
      willChange: 'transform, opacity',
    },
    'staggered-list': {
      animation: 'staggered-reveal 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      willChange: 'transform, opacity',
    },
    'interaction-feedback': {
      animation: 'hover-lift 0.2s cubic-bezier(0.4, 0, 0.2, 1) both',
      willChange: 'transform',
    },
  },
  
  // Pre-defined animation classes for easy use
  classes: {
    'fade-in': 'animate-fade-in',
    'hover-lift': 'transition-all duration-200 hover:animate-hover-lift',
    'interactive': 'transition-all duration-200 hover:scale-105 active:scale-95',
    'text-gradient': 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent',
    'hover-glow': 'transition-all duration-300 hover:shadow-lg hover:shadow-primary/20',
    // Advanced animation classes
    'gentle-reveal': 'animate-gentle-fade-up',
    'elegant-enter': 'animate-elegant-scale-fade',
    'organic-slide': 'animate-organic-slide-reveal',
    'purposeful-show': 'animate-purposeful-unveil',
    'ceremonial-intro': 'animate-ceremonial-entrance',
    'staggered-item': 'animate-staggered-reveal',
    'morphing-shape': 'animate-morphing-container',
    'parallax-element': 'animate-parallax-float',
    
    // Reduced motion alternatives
    'reduced-motion': 'motion-reduce:animate-none motion-reduce:transition-none',
    'accessible-fade': 'motion-reduce:opacity-100 motion-reduce:transform-none',
  },
} as const;

export type AnimationToken = typeof animationTokens;
