
import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Typography, Stack, StatusIndicator, LoadingSpinner } from '@/design-system';

const TypographyShowcase = memo(() => (
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
));

const StatusShowcase = memo(() => (
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
));

const DesignSystemShowcase = memo(() => (
  <Stack direction="column" gap={8}>
    <Typography variant="h2" align="center">
      Design System Components
    </Typography>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <TypographyShowcase />
      <StatusShowcase />
    </div>
  </Stack>
));

DesignSystemShowcase.displayName = 'DesignSystemShowcase';

export default DesignSystemShowcase;
