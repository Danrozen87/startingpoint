
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

export function useDesignSystem(options: UseDesignSystemOptions = {}) {
  const { enableAnimations = true, cacheTokens = true } = options;

  // Memoized token accessors for performance
  const getColor = useCallback((category: ColorCategory, scale?: ColorScale) => {
    return colorUtils.getColor(category, scale);
  }, []);

  const getSpacing = useCallback((token: SpacingToken) => {
    return designTokens.spacing[token];
  }, []);

  const getBreakpoint = useCallback((token: BreakpointToken) => {
    return designTokens.breakpoints[token];
  }, []);

  // Memoized theme utilities
  const theme = useMemo(() => ({
    mode: themeUtils.getThemeMode(),
    toggle: themeUtils.toggleTheme,
    set: themeUtils.setTheme,
  }), []);

  // Memoized animation utilities (only if enabled)
  const animations = useMemo(() => {
    if (!enableAnimations) return null;
    
    return {
      createStaggered: animationUtils.createStaggeredAnimation,
      createReveal: animationUtils.createRevealAnimation,
      createMorph: animationUtils.createMorphAnimation,
      prefersReducedMotion: animationUtils.prefersReducedMotion,
    };
  }, [enableAnimations]);

  // Performance monitoring
  const performance = useMemo(() => ({
    clearAnimationCache: animationUtils.clearCache,
    preloadColors: colorUtils.preloadColors,
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
