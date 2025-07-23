
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Typography, Stack, Container, Section } from "@/design-system";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Only log in development to avoid exposing information in production
    if (process.env.NODE_ENV === 'development') {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <Section size="xl" background="default" className="min-h-screen">
      <Container size="sm">
        <Stack direction="column" align="center" justify="center" gap={6} className="min-h-screen">
          <div className="flex items-center justify-center w-24 h-24 mx-auto bg-muted rounded-full">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
          </div>
          
          <Stack direction="column" align="center" gap={3}>
            <Typography variant="heroTitle" align="center" className="text-6xl">
              404
            </Typography>
            <Typography variant="sectionTitle" align="center" color="muted">
              Page Not Found
            </Typography>
            <Typography variant="body" align="center" color="muted" className="max-w-md">
              The page you're looking for doesn't exist or has been moved.
            </Typography>
          </Stack>
          
          <Button asChild size="lg" className="mt-4 hover-lift">
            <a href="/">Return to Home</a>
          </Button>
        </Stack>
      </Container>
    </Section>
  );
};

export default NotFound;
