
export const animationTokens = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
    slowest: '1000ms',
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'snappy': 'cubic-bezier(0.4, 0, 0.6, 1)',
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
  },
} as const;

export type AnimationToken = typeof animationTokens;
