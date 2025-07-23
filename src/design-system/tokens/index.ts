
export * from './colors';
export * from './spacing';
export * from './typography';
export * from './animations';
export * from './elevation';

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
