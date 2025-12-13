
import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EmptyLegsBanner from "@/components/EmptyLegsBanner";

// Lazy load below-the-fold components
const Services = React.lazy(() => import("@/components/Services"));
const Gallery = React.lazy(() => import("@/components/Gallery"));
const PersonalizedService = React.lazy(() => import("@/components/PersonalizedService"));
const ArticleCarousel = React.lazy(() => import("@/components/ArticleCarousel"));
const WhyChooseUs = React.lazy(() => import("@/components/WhyChooseUs"));
const PopularDestinations = React.lazy(() => import("@/components/PopularDestinations"));
const About = React.lazy(() => import("@/components/About"));
const Contact = React.lazy(() => import("@/components/Contact"));
const Footer = React.lazy(() => import("@/components/Footer"));

const Index = () => {
  const { language } = useLanguage();
  const isEN = language === "en";

  const SITE = "https://www.vgoldenjets.com";
  const ES_URL = `${SITE}/`;
  const EN_URL = `${SITE}/en`;
  const CANONICAL = isEN ? EN_URL : ES_URL;

  const title = isEN
    ? "V Golden Jets | Private Jet Charters & Luxury Aviation"
    : "V Golden Jets | Vuelos Privados y Aviación de Lujo";

  const description = isEN
    ? "Experience the ultimate in luxury and efficiency with V Golden Jets. Private jet charters in Argentina and worldwide. Personalized service, safety, and comfort."
    : "Experimente lo último en lujo y eficiencia con V Golden Jets. Vuelos privados en Argentina y el mundo. Servicio personalizado, seguridad y confort.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "V Golden Jets",
    url: SITE,
    logo: `${SITE}/logo192.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1168668170",
      contactType: "customer service",
      areaServed: ["AR", "US", "BR", "CL", "UY"],
      availableLanguage: ["es", "en"],
    },
    sameAs: [
      "https://www.instagram.com/vgoldenjets",
      "https://www.facebook.com/vgoldenjets",
      "https://www.linkedin.com/company/vgoldenjets",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "V Golden Jets",
    url: SITE,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/jetsmagazine?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet htmlAttributes={{ lang: language }}>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="es" href={ES_URL} />
        <link rel="alternate" hrefLang="en" href={EN_URL} />
        <link rel="alternate" hrefLang="x-default" href={ES_URL} />
        <meta name="robots" content="index,follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={`${SITE}/og-home.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE}/og-home.jpg`} />

        <script type="application/ld+json">{JSON.stringify([jsonLd, websiteSchema])}</script>
      </Helmet>

      <Navbar />
      <Hero />
      <EmptyLegsBanner />

      <Suspense fallback={<div className="py-20 bg-black" />}>
        <Contact />
        <Services />
        <div className="border-t border-white/10" />
        <Gallery />
        <ArticleCarousel />
        <WhyChooseUs />
        <PersonalizedService />
        <PopularDestinations />
        <About />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
