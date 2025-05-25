
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import PageTransition from "./components/layout/PageTransition";

// Lazy load routes for better performance
const Projects = lazy(() => import("./pages/Projects"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Team = lazy(() => import("./pages/Team"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Reports = lazy(() => import("./pages/Reports"));
const Budget = lazy(() => import("./pages/Budget"));
const ProductionFlow = lazy(() => import("./pages/ProductionFlow"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen w-full">
            <Navbar />
            <main className="flex-1 w-full max-w-full sm:max-w-7xl mx-auto p-3 md:p-6 lg:p-8 overflow-x-hidden">
              <Suspense fallback={<div className="flex items-center justify-center h-[60vh]"><div className="animate-pulse-subtle text-muted-foreground">Carregando...</div></div>}>
                <Routes>
                  <Route path="/" element={<PageTransition><Index /></PageTransition>} />
                  <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                  <Route path="/tasks" element={<PageTransition><Tasks /></PageTransition>} />
                  <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
                  <Route path="/leaderboard" element={<PageTransition><Leaderboard /></PageTransition>} />
                  <Route path="/calendar" element={<PageTransition><Calendar /></PageTransition>} />
                  <Route path="/inventory" element={<PageTransition><Inventory /></PageTransition>} />
                  <Route path="/reports" element={<PageTransition><Reports /></PageTransition>} />
                  <Route path="/budget" element={<PageTransition><Budget /></PageTransition>} />
                  <Route path="/production-flow" element={<PageTransition><ProductionFlow /></PageTransition>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
