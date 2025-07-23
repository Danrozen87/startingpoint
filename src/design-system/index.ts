
// Optimized barrel export for entire design system
// Tree-shaking optimized with granular exports

// === CORE TOKENS ===
export {
  designTokens,
  colorTokens,
  colorCategories,
  spacingTokens,
  getSpacing,
  typographyTokens,
  animationTokens,
  elevationTokens,
  breakpointTokens,
  breakpointCategories,
  containerSizes,
  fluidSpacing,
} from './tokens';

// === UTILITIES ===
export {
  colorUtils,
  themeUtils,
  performanceUtils,
  cssUtils,
  fontUtils,
  semanticUtils,
  validationUtils,
  animationUtils,
  animationPerformanceUtils,
  animationSystemUtils,
} from './tokens';

// === ATOMIC COMPONENTS ===
export { Typography } from './atoms/Typography';
export { Box } from './atoms/Box';
export { Stack } from './atoms/Stack';
export { Container } from './atoms/Container';
export { Section } from './atoms/Section';

// === MOLECULAR COMPONENTS ===
export { LoadingSpinner } from './molecules/LoadingSpinner';
export { EmptyState } from './molecules/EmptyState';
export { StatusIndicator } from './molecules/StatusIndicator';
export { AnimatedReveal } from './molecules/AnimatedReveal';
export { StaggeredList } from './molecules/StaggeredList';
export { MorphingContainer } from './molecules/MorphingContainer';
export { PurposefulFade } from './molecules/PurposefulFade';

// === DEVELOPMENT COMPONENTS ===
export { ColorPalette } from './components/ColorPalette';

// === TYPES ===
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
  TypographyProps,
  BoxProps,
  StackProps,
  ContainerProps,
  SectionProps,
  LoadingSpinnerProps,
  EmptyStateProps,
  StatusIndicatorProps,
  AnimatedRevealProps,
  StaggeredListProps,
  MorphingContainerProps,
  PurposefulFadeProps,
} from './tokens';

// === PERFORMANCE OPTIMIZATIONS ===
export const preloadDesignSystem = () => {
  if (typeof window !== 'undefined') {
    // Preload critical design tokens
    performanceUtils.preloadColors();
    
    // Preload critical fonts
    import('./tokens/typographyUtils').then(({ performanceUtils: typographyPerf }) => {
      typographyPerf.preloadFonts();
    });
    
    // Preload animation styles
    import('./tokens/animationUtils').then(({ animationPerformanceUtils }) => {
      animationPerformanceUtils.preloadAnimationStyles();
    });
  }
};
