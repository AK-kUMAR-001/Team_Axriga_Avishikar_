import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ScenarioLearn from "./pages/ScenarioLearn";
import ScenarioSimulate from "./pages/ScenarioSimulate";
import ScenarioResults from "./pages/ScenarioResults";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import Judge from "./pages/Judge";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scenario/:id/learn" element={<ScenarioLearn />} />
          <Route path="/scenario/:id/simulate" element={<ScenarioSimulate />} />
          <Route path="/scenario/:id/results" element={<ScenarioResults />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/about" element={<About />} />
          <Route path="/judge" element={<Judge />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
