
export * from './colors';
export * from './spacing';
export * from './typography';
export * from './animations';
export * from './elevation';

// Combined tokens object
export const tokens = {
  colors: require('./colors').colorTokens,
  spacing: require('./spacing').spacingTokens,
  typography: require('./typography').typographyTokens,
  animations: require('./animations').animationTokens,
  elevation: require('./elevation').elevationTokens,
} as const;
