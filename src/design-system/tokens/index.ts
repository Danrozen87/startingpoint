
// Perfect barrel export for all design tokens
// AI-optimized structure with clear organization

// Core token imports
import { colorTokens, colorCategories, type ColorToken, type ColorCategory, type ColorScale, type SemanticColor, type BrandColor, type AccentColor } from './colors';
import { spacingTokens, type SpacingToken, getSpacing } from './spacing';
import { typographyTokens, type TypographyToken, type FontFamily, type SemanticTypography } from './typography';
import { animationTokens, type AnimationToken } from './animations';
import { elevationTokens } from './elevation';
import { breakpointTokens, breakpointCategories, containerSizes, fluidSpacing, type BreakpointToken } from './breakpoints';

// Combined tokens object - single source of truth
export const designTokens = {
  colors: colorTokens,
  spacing: spacingTokens,
  typography: typographyTokens,
  animations: animationTokens,
  elevation: elevationTokens,
  breakpoints: breakpointTokens,
  breakpointCategories,
  containerSizes,
  fluidSpacing,
} as const;

// Individual token exports
export {
  // Colors
  colorTokens,
  colorCategories,
  type ColorToken,
  type ColorCategory,
  type ColorScale,
  type SemanticColor,
  type BrandColor,
  type AccentColor,

  // Spacing
  spacingTokens,
  type SpacingToken,
  getSpacing,

  // Typography
  typographyTokens,
  type TypographyToken,
  type FontFamily,
  type SemanticTypography,

  // Animations
  animationTokens,
  type AnimationToken,

  // Elevation
  elevationTokens,

  // Breakpoints
  breakpointTokens,
  breakpointCategories,
  containerSizes,
  fluidSpacing,
  type BreakpointToken,
};

// Token utilities - centralized helpers
export * from './utilities';
export * from './typographyUtils';
export * from './breakpointUtils';

// Re-export legacy tokens for backward compatibility
export const tokens = designTokens;
