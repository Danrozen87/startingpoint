
/**
 * @file useDesignSystem.ts
 * @purpose Hook for accessing design system tokens and utilities
 * @dependencies React, design system tokens
 * @ai-context Primary hook for design system integration
 * @performance Memoized token accessors for optimal performance
 * @accessibility Provides theme utilities for accessibility compliance
 */

import { useCallback, useMemo } from 'react';
import { 
  designTokens, 
  colorUtils, 
  themeUtils, 
  animationUtils,
  type ColorCategory,
  type ColorScale,
  type SpacingToken,
  type BreakpointToken 
} from '@/design-system';

interface UseDesignSystemOptions {
  enableAnimations?: boolean;
  cacheTokens?: boolean;
}

/**
 * Hook for accessing design system tokens and utilities
 * @param options Configuration options for the hook
 * @param options.enableAnimations Whether to enable animation utilities
 * @param options.cacheTokens Whether to cache token values for performance
 * @returns Object containing design system tokens and utilities
 * 
 * @example
 * const { tokens, getColor, theme, animations } = useDesignSystem();
 * const primaryColor = getColor('brand', 500);
 * 
 * @ai-context Use this hook for all design system access in components
 * @performance Memoized for optimal re-render performance
 */
export function useDesignSystem(options: UseDesignSystemOptions = {}) {
  const { enableAnimations = true, cacheTokens = true } = options;

  /**
   * Memoized color accessor function
   * @param category Color category (brand, semantic, neutral, etc.)
   * @param scale Color scale (50-900)
   * @returns HSL color string
   */
  const getColor = useCallback((category: ColorCategory, scale?: ColorScale) => {
    return colorUtils.getColor(category, scale);
  }, []);

  /**
   * Memoized spacing accessor function
   * @param token Spacing token key
   * @returns Spacing value in rem
   */
  const getSpacing = useCallback((token: SpacingToken) => {
    return designTokens.spacing[token];
  }, []);

  /**
   * Memoized breakpoint accessor function
   * @param token Breakpoint token key
   * @returns Breakpoint value in pixels
   */
  const getBreakpoint = useCallback((token: BreakpointToken) => {
    return designTokens.breakpoints[token];
  }, []);

  /**
   * Memoized theme utilities for theme management
   * @ai-context Use for theme switching and detection
   */
  const theme = useMemo(() => ({
    mode: themeUtils.getThemeMode(),
    toggle: themeUtils.toggleTheme,
    set: themeUtils.setTheme,
  }), []);

  /**
   * Memoized animation utilities (only if enabled)
   * @ai-context Animation utilities respect reduced motion preferences
   */
  const animations = useMemo(() => {
    if (!enableAnimations) return null;
    
    return {
      createStaggered: animationUtils.createStaggeredAnimation,
      createReveal: animationUtils.createRevealAnimation,
      createMorph: animationUtils.createMorphAnimation,
      prefersReducedMotion: animationUtils.prefersReducedMotion,
    };
  }, [enableAnimations]);

  /**
   * Performance utilities for optimization
   * @ai-context Use for performance monitoring and optimization
   */
  const performance = useMemo(() => ({
    clearAnimationCache: animationUtils.clearCache,
    preloadColors: () => {}, // Placeholder for color preloading
  }), []);

  return {
    tokens: designTokens,
    getColor,
    getSpacing,
    getBreakpoint,
    theme,
    animations,
    performance,
  };
}
