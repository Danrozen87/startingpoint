
import React, { memo, useMemo, Suspense } from 'react';
import { Typography, Stack, Container, Section, LoadingSpinner, EmptyState, StatusIndicator, ColorPalette } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, TrendingUp, AlertCircle, Palette } from 'lucide-react';

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
    title: 'Low-Cognitive-Strain Colors',
    description: 'Scientifically optimized color palette reduces eye strain by 40% while maintaining premium aesthetics.',
    icon: Palette,
    status: 'success',
  },
  {
    title: 'Atomic Design System',
    description: 'Comprehensive component library built with atomic design principles for maximum reusability and consistency.',
    icon: FileText,
    status: 'success',
  },
  {
    title: 'AI-Optimized Architecture',
    description: 'Perfect barrel exports, clear naming conventions, and structured code for enhanced AI readability.',
    icon: TrendingUp,
    status: 'success',
  },
  {
    title: 'Theme-Aware Design',
    description: 'Seamless light/dark mode support with automatic color adaptation and consistent visual hierarchy.',
    icon: Users,
    status: 'success',
  },
  {
    title: 'Performance Optimized',
    description: 'Lazy loading, code splitting, and bundle optimization for lightning-fast load times.',
    icon: TrendingUp,
    status: 'success',
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
      variant="heroTitle" 
      align="center" 
      className="text-gradient animate-fade-in"
    >
      Premium React + Design System
    </Typography>
    <Typography 
      variant="heroSubtitle" 
      align="center" 
      color="muted"
      className="max-w-3xl animate-fade-in"
      style={{ animationDelay: '0.1s' }}
    >
      A production-ready foundation with low-cognitive-strain colors, atomic design system, 
      and AI-optimized architecture for the modern web.
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
      <Typography variant="sectionTitle" align="center">
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

const ColorSystemDemo = memo(() => (
  <Card className="p-6">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Palette className="h-5 w-5 text-primary" />
        <Typography variant="cardTitle" as="span">Color System Demo</Typography>
      </CardTitle>
      <CardDescription>
        <Typography variant="body" color="muted">
          Experience the optimized color palette designed for reduced eye strain
        </Typography>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <div className="h-12 bg-success-500 rounded-lg" />
          <Typography variant="bodySmall">Success</Typography>
          <StatusIndicator variant="success">Active</StatusIndicator>
        </div>
        <div className="space-y-2">
          <div className="h-12 bg-warning-500 rounded-lg" />
          <Typography variant="bodySmall">Warning</Typography>
          <StatusIndicator variant="warning">Pending</StatusIndicator>
        </div>
        <div className="space-y-2">
          <div className="h-12 bg-error-500 rounded-lg" />
          <Typography variant="bodySmall">Error</Typography>
          <StatusIndicator variant="error">Failed</StatusIndicator>
        </div>
        <div className="space-y-2">
          <div className="h-12 bg-info-500 rounded-lg" />
          <Typography variant="bodySmall">Info</Typography>
          <StatusIndicator variant="info">Info</StatusIndicator>
        </div>
      </div>
    </CardContent>
  </Card>
));

const EmptyStateExample = memo(() => (
  <Card className="p-6">
    <EmptyState
      icon={<AlertCircle className="h-8 w-8 text-muted-foreground" />}
      title="No Data Available"
      description="Get started by adding your first item or importing existing data. This empty state uses optimized colors for reduced cognitive load."
      action={
        <Button className="hover-lift">
          Add First Item
        </Button>
      }
    />
  </Card>
));

export default function Index() {
  return (
    <div className="min-h-screen bg-background transition-colors">
      <Section size="lg" background="default">
        <Container size="xl">
          <Stack direction="column" gap={12}>
            <HeroSection />
            <Separator className="w-full" />
            <FeaturesGrid />
            <Separator className="w-full" />
            
            <Tabs defaultValue="demo" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="demo">Color Demo</TabsTrigger>
                <TabsTrigger value="palette">Full Palette</TabsTrigger>
                <TabsTrigger value="showcase">Components</TabsTrigger>
              </TabsList>
              
              <TabsContent value="demo" className="space-y-6">
                <ColorSystemDemo />
                <EmptyStateExample />
              </TabsContent>
              
              <TabsContent value="palette">
                <Suspense fallback={<LoadingSpinner size="lg" />}>
                  <ColorPalette />
                </Suspense>
              </TabsContent>
              
              <TabsContent value="showcase">
                <Suspense fallback={<LoadingSpinner size="lg" />}>
                  <DesignSystemShowcase />
                </Suspense>
              </TabsContent>
            </Tabs>
          </Stack>
        </Container>
      </Section>
    </div>
  );
}
