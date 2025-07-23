
import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Typography, Stack, StatusIndicator, LoadingSpinner } from '@/design-system';

const TypographyShowcase = memo(() => (
  <Card className="p-6 border-neutral-200">
    <Stack direction="column" gap={4}>
      <Typography variant="cardTitle">Typography System</Typography>
      <Stack direction="column" gap={3}>
        <Typography variant="heroTitle">Hero Title (Playfair Display)</Typography>
        <Typography variant="pageTitle">Page Title (Manrope)</Typography>
        <Typography variant="sectionTitle">Section Title (Playfair Display)</Typography>
        <Typography variant="cardTitle">Card Title (Manrope)</Typography>
        <Typography variant="sectionHeader">Section Header (Manrope)</Typography>
        <Typography variant="bodyLarge">Body Large (Inter) - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
        <Typography variant="body">Body Text (Inter) - Regular body text with proper line height and spacing for optimal readability.</Typography>
        <Typography variant="bodySmall">Body Small (Inter) - Smaller text for secondary information.</Typography>
        <Typography variant="label">Label Text (Manrope)</Typography>
        <Typography variant="caption">Caption text for additional context</Typography>
        <Typography variant="muted">Muted text for less important content</Typography>
        <Typography variant="code">Code text (JetBrains Mono)</Typography>
      </Stack>
    </Stack>
  </Card>
));

const StatusShowcase = memo(() => (
  <Card className="p-6 border-neutral-200">
    <Stack direction="column" gap={4}>
      <Typography variant="cardTitle">Status Indicators & Components</Typography>
      <Stack direction="column" gap={3}>
        <Stack direction="row" gap={2} wrap="wrap">
          <StatusIndicator variant="success">Success</StatusIndicator>
          <StatusIndicator variant="warning">Warning</StatusIndicator>
          <StatusIndicator variant="error">Error</StatusIndicator>
          <StatusIndicator variant="info">Info</StatusIndicator>
          <StatusIndicator variant="neutral">Neutral</StatusIndicator>
        </Stack>
        <Stack direction="row" align="center" gap={4}>
          <LoadingSpinner size="sm" color="primary" />
          <LoadingSpinner size="md" color="success" />
          <LoadingSpinner size="lg" color="warning" />
        </Stack>
      </Stack>
    </Stack>
  </Card>
));

const ColorShowcase = memo(() => (
  <Card className="p-6 border-neutral-200">
    <Stack direction="column" gap={4}>
      <Typography variant="cardTitle">Color System</Typography>
      <Stack direction="column" gap={3}>
        <div className="grid grid-cols-5 gap-2">
          <div className="space-y-1">
            <div className="h-8 bg-success-500 rounded"></div>
            <Typography variant="caption">Success</Typography>
          </div>
          <div className="space-y-1">
            <div className="h-8 bg-warning-500 rounded"></div>
            <Typography variant="caption">Warning</Typography>
          </div>
          <div className="space-y-1">
            <div className="h-8 bg-error-500 rounded"></div>
            <Typography variant="caption">Error</Typography>
          </div>
          <div className="space-y-1">
            <div className="h-8 bg-info-500 rounded"></div>
            <Typography variant="caption">Info</Typography>
          </div>
          <div className="space-y-1">
            <div className="h-8 bg-neutral-500 rounded"></div>
            <Typography variant="caption">Neutral</Typography>
          </div>
        </div>
      </Stack>
    </Stack>
  </Card>
));

const DesignSystemShowcase = memo(() => (
  <Stack direction="column" gap={8}>
    <Typography variant="sectionHeader" align="center">
      Design System Components
    </Typography>
    
    <div className="grid grid-cols-1 gap-8">
      <TypographyShowcase />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StatusShowcase />
        <ColorShowcase />
      </div>
    </div>
  </Stack>
));

DesignSystemShowcase.displayName = 'DesignSystemShowcase';

export default DesignSystemShowcase;
