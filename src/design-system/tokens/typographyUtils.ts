
import { typographyTokens, type FontFamily, type SemanticTypography } from './typography';

// Font family utilities
export const fontUtils = {
  // Get font family CSS string
  getFontFamily: (family: FontFamily): string => {
    return typographyTokens.fontFamily[family].map(font => 
      font.includes(' ') ? `"${font}"` : font
    ).join(', ');
  },
  
  // Get font weight for specific family
  getFontWeight: (family: FontFamily, weight: keyof typeof typographyTokens.fontWeight.ui): number => {
    return typographyTokens.fontWeight[family][weight] || typographyTokens.fontWeight[family].normal;
  },
  
  // Get font size and line height
  getFontSize: (family: FontFamily, size: keyof typeof typographyTokens.fontSize.ui): [string, { lineHeight: string; letterSpacing?: string }] => {
    return typographyTokens.fontSize[family][size] || typographyTokens.fontSize[family].base;
  },
  
  // Get letter spacing for family
  getLetterSpacing: (family: FontFamily, spacing: keyof typeof typographyTokens.letterSpacing.ui): string => {
    return typographyTokens.letterSpacing[family][spacing] || typographyTokens.letterSpacing[family].normal;
  },
};

// Semantic typography utilities
export const semanticUtils = {
  // Get semantic typography configuration
  getSemanticConfig: (semantic: SemanticTypography) => {
    return typographyTokens.semantic[semantic];
  },
  
  // Generate CSS for semantic typography
  getSemanticCSS: (semantic: SemanticTypography): string => {
    const config = typographyTokens.semantic[semantic];
    const family = config.family as FontFamily;
    const fontFamily = fontUtils.getFontFamily(family);
    const fontWeight = fontUtils.getFontWeight(family, config.weight as any);
    const [fontSize, { lineHeight, letterSpacing }] = fontUtils.getFontSize(family, config.size as any);
    
    return `
      font-family: ${fontFamily};
      font-weight: ${fontWeight};
      font-size: ${fontSize};
      line-height: ${lineHeight};
      ${letterSpacing ? `letter-spacing: ${letterSpacing};` : ''}
    `.trim();
  },
  
  // Get Tailwind classes for semantic typography
  getSemanticClasses: (semantic: SemanticTypography): string => {
    const config = typographyTokens.semantic[semantic];
    const family = config.family;
    
    // Map to Tailwind classes
    const familyClass = family === 'rare' ? 'font-rare' : 
                       family === 'ui' ? 'font-ui' : 
                       family === 'body' ? 'font-body' : 'font-mono';
    
    const weightClass = `font-${config.weight}`;
    const sizeClass = `text-${config.size}`;
    
    return `${familyClass} ${weightClass} ${sizeClass}`;
  },
};

// Typography validation utilities
export const validationUtils = {
  // Validate font family
  isFontFamily: (value: string): value is FontFamily => {
    return Object.keys(typographyTokens.fontFamily).includes(value);
  },
  
  // Validate semantic typography
  isSemanticTypography: (value: string): value is SemanticTypography => {
    return Object.keys(typographyTokens.semantic).includes(value);
  },
  
  // Check if font is loaded
  isFontLoaded: (family: FontFamily): boolean => {
    if (typeof document === 'undefined') return false;
    
    const fontName = typographyTokens.fontFamily[family][0];
    return document.fonts.check(`12px ${fontName}`);
  },
  
  // Wait for font to load
  waitForFont: async (family: FontFamily): Promise<void> => {
    if (typeof document === 'undefined') return;
    
    const fontName = typographyTokens.fontFamily[family][0];
    await document.fonts.load(`12px ${fontName}`);
  },
};

// Performance utilities
export const performanceUtils = {
  // Preload critical fonts
  preloadFonts: (): void => {
    if (typeof document === 'undefined') return;
    
    const criticalFonts = [
      { family: 'Inter', weight: '400' },
      { family: 'Inter', weight: '500' },
      { family: 'Manrope', weight: '500' },
      { family: 'Manrope', weight: '600' },
    ];
    
    criticalFonts.forEach(({ family, weight }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = `https://fonts.gstatic.com/s/${family.toLowerCase()}/v1/${family}-${weight}.woff2`;
      document.head.appendChild(link);
    });
  },
  
  // Optimize font loading
  optimizeFontLoading: (): void => {
    if (typeof document === 'undefined') return;
    
    // Add font-display: swap to all font faces
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
      @font-face {
        font-family: 'Manrope';
        font-display: swap;
      }
      @font-face {
        font-family: 'Playfair Display';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  },
};
