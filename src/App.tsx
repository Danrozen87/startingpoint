import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LazyIndexPage from "./pages/LazyIndex";
import LazyNotFoundPage from "./pages/LazyNotFound";
import PerformanceMonitor from "./components/dev/PerformanceMonitor";
import EnhancedLoggingDashboard from "./components/dev/EnhancedLoggingDashboard";
import { AccessibilityProvider } from '@/components/providers/AccessibilityProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime)
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

export default function App() {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-background font-sans antialiased">
        <div id="main-content" className="relative flex min-h-screen flex-col">
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LazyIndexPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<LazyNotFoundPage />} />
                </Routes>
              </BrowserRouter>
              <PerformanceMonitor />
              <EnhancedLoggingDashboard />
            </TooltipProvider>
          </QueryClientProvider>
        </div>
      </div>
    </AccessibilityProvider>
  );
}
