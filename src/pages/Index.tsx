
import React, { memo, useMemo, Suspense } from 'react';
import { Typography, Stack, Container, Section, LoadingSpinner, EmptyState, StatusIndicator } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, Users, TrendingUp, AlertCircle } from 'lucide-react';

// Lazy load heavy components
const FeatureCard = React.lazy(() => import('@/components/features/FeatureCard'));
const DesignSystemShowcase = React.lazy(() => import('@/components/showcase/DesignSystemShowcase'));

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'success' | 'warning' | 'error' | 'info';
}

const features: Feature[] = [
  {
    title: 'Atomic Design System',
    description: 'Comprehensive component library built with atomic design principles for maximum reusability and consistency.',
    icon: FileText,
    status: 'success',
  },
  {
    title: 'Design Tokens',
    description: 'Semantic design tokens for colors, typography, spacing, and animations with full theme support.',
    icon: TrendingUp,
    status: 'success',
  },
  {
    title: 'Type Safety',
    description: 'Full TypeScript support with strict typing, auto-completion, and compile-time error checking.',
    icon: Users,
    status: 'success',
  },
  {
    title: 'Performance Optimized',
    description: 'Lazy loading, code splitting, and bundle optimization for lightning-fast load times.',
    icon: TrendingUp,
    status: 'warning',
  },
  {
    title: 'Accessibility First',
    description: 'WCAG 2.1 AA compliant components with proper ARIA attributes and keyboard navigation.',
    icon: Users,
    status: 'warning',
  },
  {
    title: 'Developer Experience',
    description: 'Hot reload, component documentation, and developer tools for enhanced productivity.',
    icon: FileText,
    status: 'info',
  },
];

const HeroSection = memo(() => (
  <Stack direction="column" align="center" gap={6}>
    <Typography 
      variant="h1" 
      align="center" 
      className="text-gradient animate-fade-in"
    >
      Perfect React + Supabase Boilerplate
    </Typography>
    <Typography 
      variant="lead" 
      align="center" 
      className="max-w-3xl animate-fade-in"
      style={{ animationDelay: '0.1s' }}
    >
      A production-ready foundation with atomic design system, comprehensive design tokens, 
      and enterprise-grade architecture patterns.
    </Typography>
    <Stack direction="row" gap={4} className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <Button size="lg" className="hover-lift">
        Get Started
      </Button>
      <Button variant="outline" size="lg" className="hover-lift">
        View Documentation
      </Button>
    </Stack>
  </Stack>
));

const FeaturesGrid = memo(() => {
  const memoizedFeatures = useMemo(() => features, []);

  return (
    <Stack direction="column" gap={8}>
      <Typography variant="h2" align="center">
        Enterprise-Ready Features
      </Typography>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<LoadingSpinner size="md" />}>
          {memoizedFeatures.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </Suspense>
      </div>
    </Stack>
  );
});

const EmptyStateExample = memo(() => (
  <Card className="p-6">
    <EmptyState
      icon={<AlertCircle className="h-8 w-8 text-muted-foreground" />}
      title="No Data Available"
      description="Get started by adding your first item or importing existing data."
      action={
        <Button>
          Add First Item
        </Button>
      }
    />
  </Card>
));

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Section size="lg" background="default">
        <Container size="xl">
          <Stack direction="column" gap={12}>
            <HeroSection />
            <Separator className="w-full" />
            <FeaturesGrid />
            <Separator className="w-full" />
            <Suspense fallback={<LoadingSpinner size="lg" />}>
              <DesignSystemShowcase />
            </Suspense>
            <EmptyStateExample />
          </Stack>
        </Container>
      </Section>
    </div>
  );
}
