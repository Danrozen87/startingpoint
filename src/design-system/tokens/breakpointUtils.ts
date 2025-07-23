
import { breakpointTokens, breakpointCategories, containerSizes, fluidSpacing, type BreakpointToken } from './breakpoints';

// Media query utilities
export const mediaQueries = {
  // Min-width media queries
  up: (breakpoint: BreakpointToken): string => `@media (min-width: ${breakpointTokens[breakpoint]})`,
  
  // Max-width media queries
  down: (breakpoint: BreakpointToken): string => {
    const breakpointValue = parseInt(breakpointTokens[breakpoint]);
    return `@media (max-width: ${breakpointValue - 1}px)`;
  },
  
  // Range media queries
  between: (min: BreakpointToken, max: BreakpointToken): string => {
    const minValue = breakpointTokens[min];
    const maxValue = parseInt(breakpointTokens[max]) - 1;
    return `@media (min-width: ${minValue}) and (max-width: ${maxValue}px)`;
  },
  
  // Only specific breakpoint
  only: (breakpoint: BreakpointToken): string => {
    const breakpoints = Object.keys(breakpointTokens) as BreakpointToken[];
    const currentIndex = breakpoints.indexOf(breakpoint);
    const nextBreakpoint = breakpoints[currentIndex + 1];
    
    if (!nextBreakpoint) {
      return mediaQueries.up(breakpoint);
    }
    
    return mediaQueries.between(breakpoint, nextBreakpoint);
  },
};

// Container query utilities
export const containerQueries = {
  up: (size: string): string => `@container (min-width: ${size})`,
  down: (size: string): string => `@container (max-width: ${size})`,
  between: (min: string, max: string): string => `@container (min-width: ${min}) and (max-width: ${max})`,
};

// Responsive design utilities
export const responsiveUtils = {
  // Check if breakpoint is mobile
  isMobile: (breakpoint: BreakpointToken): boolean => {
    return breakpointCategories.mobile.includes(breakpoint as any);
  },
  
  // Check if breakpoint is tablet
  isTablet: (breakpoint: BreakpointToken): boolean => {
    return breakpointCategories.tablet.includes(breakpoint as any);
  },
  
  // Check if breakpoint is desktop
  isDesktop: (breakpoint: BreakpointToken): boolean => {
    return breakpointCategories.desktop.includes(breakpoint as any);
  },
  
  // Check if breakpoint is wide screen
  isWide: (breakpoint: BreakpointToken): boolean => {
    return breakpointCategories.wide.includes(breakpoint as any);
  },
  
  // Check if breakpoint is ultra-wide
  isUltra: (breakpoint: BreakpointToken): boolean => {
    return breakpointCategories.ultra.includes(breakpoint as any);
  },
  
  // Get container size for breakpoint
  getContainerSize: (breakpoint: BreakpointToken): string => {
    return containerSizes[breakpoint];
  },
  
  // Get fluid spacing for breakpoint
  getFluidSpacing: (breakpoint: BreakpointToken, type: keyof typeof fluidSpacing.xs): string => {
    return fluidSpacing[breakpoint][type];
  },
};

// Viewport detection utilities (for client-side usage)
export const viewportUtils = {
  // Get current breakpoint based on window width
  getCurrentBreakpoint: (): BreakpointToken => {
    if (typeof window === 'undefined') return 'lg';
    
    const width = window.innerWidth;
    const breakpoints = Object.entries(breakpointTokens) as [BreakpointToken, string][];
    
    // Find the largest breakpoint that the current width exceeds
    for (let i = breakpoints.length - 1; i >= 0; i--) {
      const [breakpoint, value] = breakpoints[i];
      if (width >= parseInt(value)) {
        return breakpoint;
      }
    }
    
    return 'xs';
  },
  
  // Check if current viewport matches breakpoint
  matches: (breakpoint: BreakpointToken): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(`(min-width: ${breakpointTokens[breakpoint]})`).matches;
  },
  
  // Create a media query listener
  createListener: (breakpoint: BreakpointToken, callback: (matches: boolean) => void): (() => void) => {
    if (typeof window === 'undefined') return () => {};
    
    const mediaQuery = window.matchMedia(`(min-width: ${breakpointTokens[breakpoint]})`);
    const handler = (e: MediaQueryListEvent) => callback(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    
    // Return cleanup function
    return () => mediaQuery.removeEventListener('change', handler);
  },
};

// CSS-in-JS utilities
export const cssUtils = {
  // Generate responsive CSS
  responsive: (styles: Partial<Record<BreakpointToken, string>>): string => {
    return Object.entries(styles)
      .map(([breakpoint, style]) => {
        const bp = breakpoint as BreakpointToken;
        return `${mediaQueries.up(bp)} { ${style} }`;
      })
      .join('\n');
  },
  
  // Generate fluid typography
  fluidTypography: (min: string, max: string, minVw: string, maxVw: string): string => {
    return `clamp(${min}, ${min} + (${parseFloat(max)} - ${parseFloat(min)}) * ((100vw - ${minVw}) / (${parseFloat(maxVw)} - ${parseFloat(minVw)})), ${max})`;
  },
};
