
import { designTokens } from './index';

// Generate CSS custom properties from design tokens
export function generateCSSCustomProperties(): string {
  const cssProperties: string[] = [];

  // Generate color properties
  Object.entries(designTokens.colors.neutral).forEach(([key, value]) => {
    cssProperties.push(`  --color-neutral-${key}: ${value};`);
  });

  Object.entries(designTokens.colors.brand.primary).forEach(([key, value]) => {
    cssProperties.push(`  --color-primary-${key}: ${value};`);
  });

  Object.entries(designTokens.colors.brand.secondary).forEach(([key, value]) => {
    cssProperties.push(`  --color-secondary-${key}: ${value};`);
  });

  // Generate spacing properties
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    cssProperties.push(`  --spacing-${key}: ${value};`);
  });

  // Generate animation properties
  Object.entries(designTokens.animations.duration).forEach(([key, value]) => {
    cssProperties.push(`  --animation-duration-${key}: ${value};`);
  });

  Object.entries(designTokens.animations.easing).forEach(([key, value]) => {
    cssProperties.push(`  --animation-easing-${key}: ${value};`);
  });

  // Generate breakpoint properties
  Object.entries(designTokens.breakpoints).forEach(([key, value]) => {
    cssProperties.push(`  --breakpoint-${key}: ${value};`);
  });

  return `:root {\n${cssProperties.join('\n')}\n}`;
}

// Generate utility classes for design tokens
export function generateUtilityClasses(): string {
  const utilityClasses: string[] = [];

  // Spacing utilities
  Object.keys(designTokens.spacing).forEach(key => {
    utilityClasses.push(`
.p-${key} { padding: var(--spacing-${key}); }
.px-${key} { padding-left: var(--spacing-${key}); padding-right: var(--spacing-${key}); }
.py-${key} { padding-top: var(--spacing-${key}); padding-bottom: var(--spacing-${key}); }
.pt-${key} { padding-top: var(--spacing-${key}); }
.pr-${key} { padding-right: var(--spacing-${key}); }
.pb-${key} { padding-bottom: var(--spacing-${key}); }
.pl-${key} { padding-left: var(--spacing-${key}); }
.m-${key} { margin: var(--spacing-${key}); }
.mx-${key} { margin-left: var(--spacing-${key}); margin-right: var(--spacing-${key}); }
.my-${key} { margin-top: var(--spacing-${key}); margin-bottom: var(--spacing-${key}); }
.mt-${key} { margin-top: var(--spacing-${key}); }
.mr-${key} { margin-right: var(--spacing-${key}); }
.mb-${key} { margin-bottom: var(--spacing-${key}); }
.ml-${key} { margin-left: var(--spacing-${key}); }
    `);
  });

  return utilityClasses.join('\n');
}

// Performance optimization for CSS generation
export const cssGenerationUtils = {
  // Generate optimized CSS for production
  generateOptimizedCSS: (): string => {
    const customProperties = generateCSSCustomProperties();
    const utilityClasses = generateUtilityClasses();
    
    return `${customProperties}\n\n${utilityClasses}`.replace(/\s+/g, ' ').trim();
  },

  // Generate development CSS with comments
  generateDevelopmentCSS: (): string => {
    const customProperties = generateCSSCustomProperties();
    const utilityClasses = generateUtilityClasses();
    
    return `/* Design System CSS Custom Properties */\n${customProperties}\n\n/* Design System Utility Classes */\n${utilityClasses}`;
  },
};
