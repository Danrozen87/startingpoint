
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Typography } from '../atoms/Typography';
import { Stack } from '../atoms/Stack';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = React.memo(React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center py-12 px-4',
          className
        )}
        role="region"
        aria-label="Empty state"
        {...props}
      >
        <Stack direction="column" align="center" gap={6}>
          {icon && (
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-muted rounded-full transition-colors">
              {icon}
            </div>
          )}
          <Stack direction="column" align="center" gap={2}>
            <Typography variant="h3" color="default" as="h2">
              {title}
            </Typography>
            {description && (
              <Typography variant="body" color="muted" className="max-w-md">
                {description}
              </Typography>
            )}
          </Stack>
          {action && (
            <div className="mt-2">
              {action}
            </div>
          )}
        </Stack>
      </div>
    );
  }
));

EmptyState.displayName = 'EmptyState';

export { EmptyState };
export type { EmptyStateProps };
