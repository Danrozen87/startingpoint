
export const breakpointTokens = {
  // Comprehensive breakpoint system from 320px to 8K
  xs: '320px',     // Extra small mobile
  sm: '480px',     // Small mobile
  md: '768px',     // Tablet
  lg: '1024px',    // Desktop
  xl: '1280px',    // Large desktop
  '2xl': '1536px', // Extra large desktop
  '3xl': '1920px', // Full HD
  '4xl': '2560px', // 2K/QHD
  '5xl': '3440px', // Ultra-wide
  '6xl': '3840px', // 4K
  '7xl': '5120px', // 5K
  '8xl': '7680px', // 8K
} as const;

export type BreakpointToken = keyof typeof breakpointTokens;

// Semantic breakpoint categories
export const breakpointCategories = {
  mobile: ['xs', 'sm'] as const,
  tablet: ['md'] as const,
  desktop: ['lg', 'xl', '2xl'] as const,
  wide: ['3xl', '4xl', '5xl'] as const,
  ultra: ['6xl', '7xl', '8xl'] as const,
} as const;

// Container max-widths for each breakpoint
export const containerSizes = {
  xs: '100%',
  sm: '100%',
  md: '100%',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
  '4xl': '2560px',
  '5xl': '3440px',
  '6xl': '3840px',
  '7xl': '5120px',
  '8xl': '7680px',
} as const;

// Fluid spacing scales that adjust to breakpoints
export const fluidSpacing = {
  xs: {
    section: '2rem',
    container: '1rem',
    component: '0.5rem',
  },
  sm: {
    section: '3rem',
    container: '1.5rem',
    component: '0.75rem',
  },
  md: {
    section: '4rem',
    container: '2rem',
    component: '1rem',
  },
  lg: {
    section: '6rem',
    container: '3rem',
    component: '1.5rem',
  },
  xl: {
    section: '8rem',
    container: '4rem',
    component: '2rem',
  },
  '2xl': {
    section: '10rem',
    container: '5rem',
    component: '2.5rem',
  },
  '3xl': {
    section: '12rem',
    container: '6rem',
    component: '3rem',
  },
  '4xl': {
    section: '16rem',
    container: '8rem',
    component: '4rem',
  },
  '5xl': {
    section: '20rem',
    container: '10rem',
    component: '5rem',
  },
  '6xl': {
    section: '24rem',
    container: '12rem',
    component: '6rem',
  },
  '7xl': {
    section: '28rem',
    container: '14rem',
    component: '7rem',
  },
  '8xl': {
    section: '32rem',
    container: '16rem',
    component: '8rem',
  },
} as const;
