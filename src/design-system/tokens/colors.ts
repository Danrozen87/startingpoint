
// Optimized color system with low-cognitive-strain palette
// All colors designed for premium appearance and reduced eye strain

export const colorTokens = {
  // Base colors - optimized for non-glare experience
  base: {
    white: 'hsl(0, 0%, 98%)',      // Softer white, reduces glare
    black: 'hsl(0, 0%, 8%)',       // Charcoal instead of pure black
    transparent: 'transparent',
  },

  // Neutral scale - perceptually uniform lightness progression
  neutral: {
    50: 'hsl(210, 20%, 98%)',      // Subtle cool tint
    100: 'hsl(210, 15%, 95%)',
    200: 'hsl(210, 12%, 88%)',
    300: 'hsl(210, 10%, 78%)',
    400: 'hsl(210, 8%, 62%)',
    500: 'hsl(210, 6%, 45%)',
    600: 'hsl(210, 8%, 35%)',
    700: 'hsl(210, 10%, 25%)',
    800: 'hsl(210, 12%, 15%)',
    900: 'hsl(210, 15%, 8%)',
  },

  // Brand colors - reduced saturation for premium feel
  brand: {
    primary: {
      50: 'hsl(217, 65%, 96%)',
      100: 'hsl(217, 60%, 92%)',
      200: 'hsl(217, 58%, 84%)',
      300: 'hsl(217, 55%, 72%)',
      400: 'hsl(217, 50%, 58%)',
      500: 'hsl(217, 45%, 45%)',    // Reduced saturation
      600: 'hsl(217, 48%, 38%)',
      700: 'hsl(217, 52%, 28%)',
      800: 'hsl(217, 55%, 18%)',
      900: 'hsl(217, 60%, 12%)',
    },
    secondary: {
      50: 'hsl(270, 45%, 96%)',
      100: 'hsl(270, 40%, 92%)',
      200: 'hsl(270, 38%, 84%)',
      300: 'hsl(270, 35%, 72%)',
      400: 'hsl(270, 30%, 58%)',
      500: 'hsl(270, 25%, 45%)',
      600: 'hsl(270, 28%, 38%)',
      700: 'hsl(270, 32%, 28%)',
      800: 'hsl(270, 35%, 18%)',
      900: 'hsl(270, 40%, 12%)',
    },
  },

  // Semantic colors - optimized saturation for reduced strain
  semantic: {
    success: {
      50: 'hsl(142, 50%, 96%)',
      100: 'hsl(142, 45%, 92%)',
      200: 'hsl(142, 42%, 84%)',
      300: 'hsl(142, 38%, 72%)',
      400: 'hsl(142, 35%, 58%)',
      500: 'hsl(142, 30%, 45%)',    // Reduced from 71%
      600: 'hsl(142, 32%, 38%)',
      700: 'hsl(142, 35%, 28%)',
      800: 'hsl(142, 38%, 18%)',
      900: 'hsl(142, 42%, 12%)',
    },
    warning: {
      50: 'hsl(48, 65%, 96%)',
      100: 'hsl(48, 60%, 92%)',
      200: 'hsl(48, 58%, 84%)',
      300: 'hsl(48, 55%, 72%)',
      400: 'hsl(48, 50%, 58%)',
      500: 'hsl(48, 45%, 50%)',     // Reduced from 96%
      600: 'hsl(48, 48%, 42%)',
      700: 'hsl(48, 52%, 32%)',
      800: 'hsl(48, 55%, 22%)',
      900: 'hsl(48, 60%, 15%)',
    },
    error: {
      50: 'hsl(0, 55%, 96%)',
      100: 'hsl(0, 50%, 92%)',
      200: 'hsl(0, 48%, 84%)',
      300: 'hsl(0, 45%, 72%)',
      400: 'hsl(0, 42%, 58%)',
      500: 'hsl(0, 40%, 50%)',      // Reduced from 84%
      600: 'hsl(0, 42%, 42%)',
      700: 'hsl(0, 45%, 32%)',
      800: 'hsl(0, 48%, 22%)',
      900: 'hsl(0, 52%, 15%)',
    },
    info: {
      50: 'hsl(214, 60%, 96%)',
      100: 'hsl(214, 55%, 92%)',
      200: 'hsl(214, 52%, 84%)',
      300: 'hsl(214, 48%, 72%)',
      400: 'hsl(214, 45%, 58%)',
      500: 'hsl(214, 40%, 50%)',    // Reduced from 84%
      600: 'hsl(214, 42%, 42%)',
      700: 'hsl(214, 45%, 32%)',
      800: 'hsl(214, 48%, 22%)',
      900: 'hsl(214, 52%, 15%)',
    },
  },

  // Accent colors for premium feel
  accent: {
    purple: {
      50: 'hsl(270, 45%, 96%)',
      500: 'hsl(270, 25%, 45%)',
      900: 'hsl(270, 40%, 12%)',
    },
    emerald: {
      50: 'hsl(158, 45%, 96%)',
      500: 'hsl(158, 25%, 45%)',
      900: 'hsl(158, 40%, 12%)',
    },
    amber: {
      50: 'hsl(43, 65%, 96%)',
      500: 'hsl(43, 45%, 50%)',
      900: 'hsl(43, 60%, 15%)',
    },
  },

  // Theme-aware colors using CSS variables
  theme: {
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    card: 'hsl(var(--card))',
    cardForeground: 'hsl(var(--card-foreground))',
    popover: 'hsl(var(--popover))',
    popoverForeground: 'hsl(var(--popover-foreground))',
    primary: 'hsl(var(--primary))',
    primaryForeground: 'hsl(var(--primary-foreground))',
    secondary: 'hsl(var(--secondary))',
    secondaryForeground: 'hsl(var(--secondary-foreground))',
    muted: 'hsl(var(--muted))',
    mutedForeground: 'hsl(var(--muted-foreground))',
    accent: 'hsl(var(--accent))',
    accentForeground: 'hsl(var(--accent-foreground))',
    destructive: 'hsl(var(--destructive))',
    destructiveForeground: 'hsl(var(--destructive-foreground))',
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
  },
} as const;

// Color categories for better organization
export const colorCategories = {
  base: colorTokens.base,
  neutral: colorTokens.neutral,
  brand: colorTokens.brand,
  semantic: colorTokens.semantic,
  accent: colorTokens.accent,
  theme: colorTokens.theme,
} as const;

// Type definitions
export type ColorToken = typeof colorTokens;
export type ColorCategory = keyof typeof colorCategories;
export type ColorScale = keyof typeof colorTokens.neutral;
export type SemanticColor = keyof typeof colorTokens.semantic;
export type BrandColor = keyof typeof colorTokens.brand;
export type AccentColor = keyof typeof colorTokens.accent;
