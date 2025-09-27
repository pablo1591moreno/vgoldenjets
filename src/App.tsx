import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";

import LandingPage from "./components/LandingForm";
import Blog from "./components/JetsMagazine";
import Articulos from "./components/Articulos";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <HelmetProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/landingForm" element={<LandingPage />} />

              {/* ES (default) */}
              <Route path="/jetsmagazine" element={<Blog />} />
              <Route path="/jetsmagazine/:slug" element={<Articulos />} />

              {/* EN (prefijo /en) → fuerza idioma inglés en los componentes */}
              <Route path="/en/jetsmagazine" element={<Blog forcedLang="en" />} />
              <Route path="/en/jetsmagazine/:slug" element={<Articulos forcedLang="en" />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
