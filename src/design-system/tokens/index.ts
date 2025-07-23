
// Import tokens for combined export
import { colorTokens } from './colors';
import { spacingTokens } from './spacing';
import { typographyTokens } from './typography';
import { animationTokens } from './animations';
import { elevationTokens } from './elevation';

// Combined tokens object
export const tokens = {
  colors: colorTokens,
  spacing: spacingTokens,
  typography: typographyTokens,
  animations: animationTokens,
  elevation: elevationTokens,
} as const;

// Export individual token modules
export * from './colors';
export * from './spacing';
export * from './typography';
export * from './animations';
export * from './elevation';

// CSS-in-JS utilities for design tokens
export const getCSSVariable = (token: string): string => `var(--${token})`;
export const getSpacing = (key: keyof typeof spacingTokens): string => spacingTokens[key];
export const getColor = (category: keyof typeof colorTokens, shade?: string): string => {
  const colorCategory = colorTokens[category];
  if (typeof colorCategory === 'string') return colorCategory;
  return shade ? (colorCategory as any)[shade] : (colorCategory as any)[500];
};
