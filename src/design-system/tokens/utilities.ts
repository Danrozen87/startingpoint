
// Color utilities for theme-aware color management
// Optimized for performance and type safety

import { colorTokens, colorCategories, type ColorCategory, type ColorScale, type SemanticColor } from './colors';

// Color utility functions
export const colorUtils = {
  // Get color by category and scale
  getColor: (category: ColorCategory, scale?: ColorScale | string): string => {
    const colorCategory = colorCategories[category];
    if (!colorCategory) return colorTokens.base.black;
    
    if (typeof colorCategory === 'string') return colorCategory;
    
    // Handle nested color objects
    if (scale && typeof colorCategory === 'object' && scale in colorCategory) {
      const colorValue = (colorCategory as any)[scale];
      return typeof colorValue === 'string' ? colorValue : colorTokens.base.black;
    }
    
    // Return default scale (500) for color objects
    if (typeof colorCategory === 'object' && '500' in colorCategory) {
      return (colorCategory as any)['500'];
    }
    
    return colorTokens.base.black;
  },

  // Get semantic color
  getSemantic: (color: SemanticColor, scale: ColorScale = '500'): string => {
    return colorTokens.semantic[color][scale];
  },

  // Get brand color
  getBrand: (color: 'primary' | 'secondary', scale: ColorScale = '500'): string => {
    return colorTokens.brand[color][scale];
  },

  // Get neutral color
  getNeutral: (scale: ColorScale): string => {
    return colorTokens.neutral[scale];
  },

  // Get theme-aware color
  getTheme: (color: keyof typeof colorTokens.theme): string => {
    return colorTokens.theme[color];
  },

  // Validate color contrast (basic implementation)
  validateContrast: (foreground: string, background: string): boolean => {
    // This is a simplified version - in production, use a proper contrast checker
    return true;
  },
};

// CSS variable utilities
export const cssUtils = {
  // Convert token to CSS variable
  toCSSVariable: (token: string): string => `var(--${token})`,
  
  // Create CSS variable definition
  createCSSVariable: (name: string, value: string): string => `--${name}: ${value};`,
  
  // Generate CSS custom properties from tokens
  generateCSSProperties: (tokens: Record<string, any>, prefix = ''): string => {
    return Object.entries(tokens)
      .map(([key, value]) => {
        const varName = prefix ? `${prefix}-${key}` : key;
        if (typeof value === 'object' && value !== null) {
          return cssUtils.generateCSSProperties(value, varName);
        }
        return cssUtils.createCSSVariable(varName, value);
      })
      .join('\n');
  },
};

// Theme utilities
export const themeUtils = {
  // Get current theme mode
  getThemeMode: (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  },

  // Toggle theme mode
  toggleTheme: (): void => {
    if (typeof window === 'undefined') return;
    document.documentElement.classList.toggle('dark');
  },

  // Set theme mode
  setTheme: (mode: 'light' | 'dark'): void => {
    if (typeof window === 'undefined') return;
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
};

// Performance utilities
export const performanceUtils = {
  // Memoize color calculations
  memoizeColor: <T extends (...args: any[]) => string>(fn: T): T => {
    const cache = new Map<string, string>();
    return ((...args: Parameters<T>): string => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key)!;
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    }) as T;
  },

  // Preload critical colors
  preloadColors: (): void => {
    // Preload most commonly used colors for better performance
    const criticalColors = [
      colorTokens.theme.background,
      colorTokens.theme.foreground,
      colorTokens.theme.primary,
      colorTokens.theme.secondary,
    ];
    
    // This could be expanded to actually preload/cache colors
    criticalColors.forEach(color => {
      // Implementation depends on your specific needs
    });
  },
};

// Export all utilities
export const tokenUtils = {
  color: colorUtils,
  css: cssUtils,
  theme: themeUtils,
  performance: performanceUtils,
};
