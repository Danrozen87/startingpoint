
export const colorTokens = {
  // Semantic colors
  semantic: {
    success: {
      50: 'hsl(142, 76%, 96%)',
      100: 'hsl(142, 77%, 89%)',
      500: 'hsl(142, 71%, 45%)',
      600: 'hsl(142, 71%, 39%)',
      700: 'hsl(142, 72%, 29%)',
      900: 'hsl(142, 76%, 14%)',
    },
    error: {
      50: 'hsl(0, 86%, 97%)',
      100: 'hsl(0, 93%, 94%)',
      500: 'hsl(0, 84%, 60%)',
      600: 'hsl(0, 72%, 51%)',
      700: 'hsl(0, 74%, 42%)',
      900: 'hsl(0, 63%, 31%)',
    },
    warning: {
      50: 'hsl(48, 100%, 96%)',
      100: 'hsl(48, 96%, 89%)',
      500: 'hsl(48, 96%, 53%)',
      600: 'hsl(48, 89%, 46%)',
      700: 'hsl(48, 76%, 37%)',
      900: 'hsl(48, 76%, 19%)',
    },
    info: {
      50: 'hsl(214, 100%, 97%)',
      100: 'hsl(214, 95%, 93%)',
      500: 'hsl(214, 84%, 56%)',
      600: 'hsl(214, 84%, 49%)',
      700: 'hsl(214, 84%, 42%)',
      900: 'hsl(214, 84%, 22%)',
    },
  },
  // Brand colors
  brand: {
    primary: {
      50: 'hsl(var(--primary-50))',
      100: 'hsl(var(--primary-100))',
      500: 'hsl(var(--primary))',
      600: 'hsl(var(--primary-600))',
      700: 'hsl(var(--primary-700))',
      900: 'hsl(var(--primary-900))',
    },
    secondary: {
      50: 'hsl(var(--secondary-50))',
      100: 'hsl(var(--secondary-100))',
      500: 'hsl(var(--secondary))',
      600: 'hsl(var(--secondary-600))',
      700: 'hsl(var(--secondary-700))',
      900: 'hsl(var(--secondary-900))',
    },
  },
  // Neutral colors
  neutral: {
    white: 'hsl(0, 0%, 100%)',
    black: 'hsl(0, 0%, 0%)',
    50: 'hsl(var(--neutral-50))',
    100: 'hsl(var(--neutral-100))',
    200: 'hsl(var(--neutral-200))',
    300: 'hsl(var(--neutral-300))',
    400: 'hsl(var(--neutral-400))',
    500: 'hsl(var(--neutral-500))',
    600: 'hsl(var(--neutral-600))',
    700: 'hsl(var(--neutral-700))',
    800: 'hsl(var(--neutral-800))',
    900: 'hsl(var(--neutral-900))',
  },
} as const;

export type ColorToken = typeof colorTokens;
