
import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stack, StatusIndicator } from '@/design-system';

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'success' | 'warning' | 'error' | 'info';
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = memo(({ feature, index }: FeatureCardProps) => {
  const { title, description, icon: Icon, status } = feature;

  return (
    <Card 
      className="hover-glow interactive animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader>
        <Stack direction="row" align="center" gap={3}>
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <Stack direction="column" gap={1}>
            <CardTitle className="text-lg">{title}</CardTitle>
            <StatusIndicator variant={status} size="sm">
              {status}
            </StatusIndicator>
          </Stack>
        </Stack>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
