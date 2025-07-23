
// Perfect barrel export for entire design system
// AI-optimized structure with logical organization

// === TOKENS ===
// Core design tokens - colors, spacing, typography, animations, elevation, breakpoints
export * from './tokens';

// === ATOMS ===
// Basic building blocks - typography, layout, containers
export * from './atoms';

// === MOLECULES ===
// Complex components built from atoms
export * from './molecules';

// === COMPONENTS ===
// Development and utility components
export * from './components';

// === UTILITIES ===
// Design system utilities and helpers
export { 
  colorUtils, 
  themeUtils, 
  performanceUtils,
  cssUtils,
  fontUtils,
  semanticUtils,
  validationUtils,
  performanceUtils as typographyPerformanceUtils,
  mediaQueries,
  containerQueries,
  responsiveUtils,
  viewportUtils,
} from './tokens';

// === TYPES ===
// All design system types for better TypeScript support
export type {
  ColorToken,
  ColorCategory,
  ColorScale,
  SemanticColor,
  BrandColor,
  AccentColor,
  SpacingToken,
  AnimationToken,
  TypographyToken,
  FontFamily,
  SemanticTypography,
  BreakpointToken,
} from './tokens';

export type {
  TypographyProps,
  BoxProps,
  StackProps,
  ContainerProps,
  SectionProps,
} from './atoms';

export type {
  LoadingSpinnerProps,
  EmptyStateProps,
  StatusIndicatorProps,
} from './molecules';

// === LEGACY SUPPORT ===
// Backward compatibility exports
export { tokens as legacyTokens } from './tokens';
