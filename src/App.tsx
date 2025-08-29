import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductionDetails from "./pages/ProductionDetails";
import GasCuttingDetails from "./pages/GasCuttingDetails";
import ShotBlastingDetails from "./pages/ShotBlastingDetails";
import FitUpDetails from "./pages/FitUpDetails";
import FitBottomDetails from "./pages/FitBottomDetails";
import FlangeStraightening from "./pages/FlangeStraightening";
import OperatorProductivity from "./pages/OperatorProductivity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gas-cutting-gp-31" element={<GasCuttingDetails />} />
          <Route path="/shot-blasting" element={<ShotBlastingDetails />} />         
          <Route path="/fit-up-welding-top-details" element={<FitUpDetails />} />
          <Route path="/fit-up-welding-bottom-details" element={<FitBottomDetails />} />
          <Route path="/flange-straightening" element={<FlangeStraightening />} />
          <Route path="/production/:id" element={<ProductionDetails />} />
          <Route path="/operator-productivity" element={<OperatorProductivity />} />
          <Route path="/production/fit-up-welding" element={<ProductionDetails />} />
          <Route path="/production/fit-up-welding-top" element={<ProductionDetails />} />
          <Route path="/production/fit-up-welding-bottom" element={<ProductionDetails />} />
          <Route path="/production/flange-straightening" element={<ProductionDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
