import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import CampaignLanding from "./pages/CampaignLanding";
import ThankYou from "./pages/ThankYou";
import LandingPage from "./components/LandingForm";
import Blog from "./components/JetsMagazine";
import Articulos from "./components/Articulos";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import EmptyLegs from "./components/EmptyLegs";

const queryClient = new QueryClient();

function StripEsRedirect() {
  const loc = useLocation();
  const to = loc.pathname.replace(/^\/es(?=\/|$)/, "") || "/";
  const finalTo = `${to}${loc.search}${loc.hash}`;
  return <Navigate to={finalTo} replace />;
}

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <HelmetProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <WhatsAppButton />
            <Routes>
              {/* ES (default) */}
              <Route path="/" element={<Index />} />
              <Route path="/landingForm" element={<LandingPage />} />
              <Route path="/form" element={<CampaignLanding />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/jetsmagazine" element={<Blog />} />
              <Route path="/jetsmagazine/:slug" element={<Articulos />} />
              <Route path="/emptylegs" element={<EmptyLegs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />

              {/* EN: magazine con prefijo /en y espejo básico para Index/Landing */}
              <Route path="/en" element={<Index />} />
              <Route path="/en/landingForm" element={<LandingPage />} />
              <Route path="/en/jetsmagazine" element={<Blog forcedLang="en" />} />
              <Route path="/en/jetsmagazine/:slug" element={<Articulos forcedLang="en" />} />
              <Route path="/en/emptylegs" element={<EmptyLegs forcedLang="en" />} />
              <Route path="/en/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/en/terms-conditions" element={<TermsConditions />} />

              {/* Cualquier /es/... se redirige a la versión sin prefijo */}
              <Route path="/es/*" element={<StripEsRedirect />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
