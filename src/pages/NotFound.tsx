import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Home, ArrowRight } from "lucide-react";

const NotFound = () => {
  const { language, t } = useLanguage();
  const isEN = language === "en";

  const title = isEN ? "Page Not Found | V Golden Jets" : "Página No Encontrada | V Golden Jets";
  const heading = isEN ? "404 - Page Not Found" : "404 - Página No Encontrada";
  const description = isEN
    ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
    : "La página que está buscando podría haber sido eliminada, cambiado de nombre o no estar disponible temporalmente.";
  const backHome = isEN ? "Back to Home" : "Volver al Inicio";
  const visitBlog = isEN ? "Visit our Magazine" : "Visite nuestro Magazine";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Helmet htmlAttributes={{ lang: language }}>
        <title>{title}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl mx-auto animate-fade-in">
          <h1 className="text-6xl sm:text-8xl font-serif text-gold mb-6">404</h1>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">{heading}</h2>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={isEN ? "/en" : "/"}
              className="btn-primary flex items-center gap-2 px-8 py-3 rounded-full"
            >
              <Home className="w-5 h-5" />
              {backHome}
            </Link>
            <Link
              to={isEN ? "/en/jetsmagazine" : "/jetsmagazine"}
              className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              {visitBlog}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
