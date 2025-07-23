
import { Typography, Stack, Container, Section, LoadingSpinner, EmptyState, StatusIndicator } from '@/design-system';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Users, TrendingUp, AlertCircle } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Section size="lg" background="default">
        <Container size="xl">
          <Stack direction="column" gap={12}>
            {/* Hero Section */}
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

            <Separator className="w-full" />

            {/* Features Grid */}
            <Stack direction="column" gap={8}>
              <Typography variant="h2" align="center">
                Enterprise-Ready Features
              </Typography>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card 
                    key={feature.title} 
                    className="hover-glow interactive animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <Stack direction="row" align="center" gap={3}>
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <Stack direction="column" gap={1}>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                          <StatusIndicator variant={feature.status} size="sm">
                            {feature.status}
                          </StatusIndicator>
                        </Stack>
                      </Stack>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Stack>

            <Separator className="w-full" />

            {/* Design System Showcase */}
            <Stack direction="column" gap={8}>
              <Typography variant="h2" align="center">
                Design System Components
              </Typography>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Typography Showcase */}
                <Card className="p-6">
                  <Stack direction="column" gap={4}>
                    <Typography variant="h3">Typography Scale</Typography>
                    <Stack direction="column" gap={2}>
                      <Typography variant="h1">Heading 1</Typography>
                      <Typography variant="h2">Heading 2</Typography>
                      <Typography variant="h3">Heading 3</Typography>
                      <Typography variant="body">Body text with proper line height and spacing</Typography>
                      <Typography variant="small">Small text for captions</Typography>
                      <Typography variant="muted">Muted text for less important content</Typography>
                    </Stack>
                  </Stack>
                </Card>

                {/* Status & Loading States */}
                <Card className="p-6">
                  <Stack direction="column" gap={4}>
                    <Typography variant="h3">Status Indicators</Typography>
                    <Stack direction="column" gap={3}>
                      <Stack direction="row" gap={2} wrap="wrap">
                        <StatusIndicator variant="success">Active</StatusIndicator>
                        <StatusIndicator variant="warning">Pending</StatusIndicator>
                        <StatusIndicator variant="error">Failed</StatusIndicator>
                        <StatusIndicator variant="info">Info</StatusIndicator>
                      </Stack>
                      <Stack direction="row" align="center" gap={4}>
                        <LoadingSpinner size="sm" />
                        <LoadingSpinner size="md" />
                        <LoadingSpinner size="lg" />
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>
              </div>
            </Stack>

            {/* Empty State Example */}
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
          </Stack>
        </Container>
      </Section>
    </div>
  );
}

const features = [
  {
    title: 'Atomic Design System',
    description: 'Comprehensive component library built with atomic design principles for maximum reusability and consistency.',
    icon: FileText,
    status: 'success' as const,
  },
  {
    title: 'Design Tokens',
    description: 'Semantic design tokens for colors, typography, spacing, and animations with full theme support.',
    icon: TrendingUp,
    status: 'success' as const,
  },
  {
    title: 'Type Safety',
    description: 'Full TypeScript support with strict typing, auto-completion, and compile-time error checking.',
    icon: Users,
    status: 'success' as const,
  },
  {
    title: 'Performance Optimized',
    description: 'Lazy loading, code splitting, and bundle optimization for lightning-fast load times.',
    icon: TrendingUp,
    status: 'warning' as const,
  },
  {
    title: 'Accessibility First',
    description: 'WCAG 2.1 AA compliant components with proper ARIA attributes and keyboard navigation.',
    icon: Users,
    status: 'warning' as const,
  },
  {
    title: 'Developer Experience',
    description: 'Hot reload, component documentation, and developer tools for enhanced productivity.',
    icon: FileText,
    status: 'info' as const,
  },
];
