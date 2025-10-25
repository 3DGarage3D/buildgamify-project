
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
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Auth from "./pages/Auth";

// Lazy load routes for better performance
const Projects = lazy(() => import("./pages/Projects"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Team = lazy(() => import("./pages/Team"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Reports = lazy(() => import("./pages/Reports"));
const Budget = lazy(() => import("./pages/Budget"));
const Production = lazy(() => import("./pages/Production"));
const Manual = lazy(() => import("./pages/Manual"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen w-full">
              <Navbar />
              <main className="flex-1 w-full max-w-full sm:max-w-7xl mx-auto p-3 md:p-6 lg:p-8 overflow-x-hidden">
                <Suspense fallback={<div className="flex items-center justify-center h-[60vh]"><div className="animate-pulse-subtle text-muted-foreground">Carregando...</div></div>}>
                  <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/" element={<ProtectedRoute><PageTransition><Index /></PageTransition></ProtectedRoute>} />
                    <Route path="/projects" element={<ProtectedRoute><PageTransition><Projects /></PageTransition></ProtectedRoute>} />
                    <Route path="/tasks" element={<ProtectedRoute><PageTransition><Tasks /></PageTransition></ProtectedRoute>} />
                    <Route path="/team" element={<ProtectedRoute allowedRoles={["admin"]}><PageTransition><Team /></PageTransition></ProtectedRoute>} />
                    <Route path="/leaderboard" element={<ProtectedRoute><PageTransition><Leaderboard /></PageTransition></ProtectedRoute>} />
                    <Route path="/calendar" element={<ProtectedRoute><PageTransition><Calendar /></PageTransition></ProtectedRoute>} />
                    <Route path="/inventory" element={<ProtectedRoute><PageTransition><Inventory /></PageTransition></ProtectedRoute>} />
                    <Route path="/reports" element={<ProtectedRoute allowedRoles={["admin", "financeiro"]}><PageTransition><Reports /></PageTransition></ProtectedRoute>} />
                    <Route path="/budget" element={<ProtectedRoute allowedRoles={["admin", "financeiro"]}><PageTransition><Budget /></PageTransition></ProtectedRoute>} />
                    <Route path="/production" element={<ProtectedRoute><PageTransition><Production /></PageTransition></ProtectedRoute>} />
                    <Route path="/manual" element={<ProtectedRoute><PageTransition><Manual /></PageTransition></ProtectedRoute>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
            </div>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
