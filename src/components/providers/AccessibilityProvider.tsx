
/**
 * @file AccessibilityProvider.tsx
 * @purpose Global accessibility provider for app-wide accessibility features
 * @dependencies React, accessibility hooks
 * @ai-context Central provider for accessibility state management
 */

import * as React from 'react';
import { useAccessibility } from '@/lib/hooks/useAccessibility';

interface AccessibilityContextType {
  focus: ReturnType<typeof useAccessibility>['focus'];
  screenReader: ReturnType<typeof useAccessibility>['screenReader'];
  keyboard: ReturnType<typeof useAccessibility>['keyboard'];
  contrast: ReturnType<typeof useAccessibility>['contrast'];
  motion: ReturnType<typeof useAccessibility>['motion'];
  highContrast: ReturnType<typeof useAccessibility>['highContrast'];
  touch: ReturnType<typeof useAccessibility>['touch'];
}

const AccessibilityContext = React.createContext<AccessibilityContextType | null>(null);

export function useAccessibilityContext() {
  const context = React.useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibilityContext must be used within AccessibilityProvider');
  }
  return context;
}

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const accessibility = useAccessibility();

  // Global keyboard event handling
  React.useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      // Escape key to close modals/dialogs
      if (event.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement?.closest('[role="dialog"]') || activeElement?.closest('[role="alertdialog"]')) {
          const closeButton = activeElement.closest('[role="dialog"], [role="alertdialog"]')?.querySelector('[data-close]') as HTMLElement;
          closeButton?.click();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Apply high contrast mode classes
  React.useEffect(() => {
    if (accessibility.highContrast.isActive) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [accessibility.highContrast.isActive]);

  // Apply reduced motion classes
  React.useEffect(() => {
    if (accessibility.motion.prefersReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [accessibility.motion.prefersReducedMotion]);

  return (
    <AccessibilityContext.Provider value={accessibility}>
      {children}
      {/* Live region for screen reader announcements */}
      <div
        ref={accessibility.screenReader.liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:no-underline"
      >
        Skip to main content
      </a>
    </AccessibilityContext.Provider>
  );
}
