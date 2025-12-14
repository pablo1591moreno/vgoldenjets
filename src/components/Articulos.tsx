// Articulos.tsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Clock, Share2, Quote, CheckCircle2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getArticleContent } from "@/data/articles";
import { ArticleView, LStr } from "@/types/article";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import QuoteForm from "./QuoteForm";

const SITE = "https://www.vgoldenjets.com";

// Helper to get localized string
function getLoc(content: LStr | string | undefined, lang: "en" | "es"): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  return (lang === "en" ? content.en : content.es) || content.es || "";
}

const Articulos = ({ forcedLang }: { forcedLang?: "en" | "es" }) => {
  const { slug } = useParams<{ slug: string }>();
  const ctx = useLanguage();
  const language = forcedLang ?? ctx.language;
  const isEN = language === "en";
  const currentLang = isEN ? "en" : "es";

  const [article, setArticle] = useState<ArticleView | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Fetch Article Data
  useEffect(() => {
    if (!slug) return;

    setIsLoading(true);
    setError(false);

    getArticleContent(slug)
      .then((data) => {
        if (data) {
          setArticle(data);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  // Reading Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-serif text-slate-900 mb-4">
          {isEN ? "Article not found" : "Artículo no encontrado"}
        </h1>
        <Link to={isEN ? "/en/jetsmagazine" : "/jetsmagazine"} className="text-gold hover:underline">
          {isEN ? "Back to Magazine" : "Volver a Magazine"}
        </Link>
      </div>
    );
  }

  // SEO
  const ES_URL = `${SITE}/jetsmagazine/${slug}`;
  const EN_URL = `${SITE}/en/jetsmagazine/${slug}`;
  const CANONICAL = isEN ? EN_URL : ES_URL;

  const title = getLoc(article.title, currentLang);
  const excerpt = getLoc(article.excerpt, currentLang);
  const category = getLoc(article.category, currentLang);

  // Helper to render content blocks
  const renderContent = () => {
    return article.content.map((block, idx) => {
      // Safe access to text property if it exists
      const text = 'text' in block ? block.text : undefined;
      const localizedText = text && (typeof text === 'object' ? getLoc(text, currentLang) : text);

      switch (block.type) {
        case "h2":
          return (
            <h2 key={idx} className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-12 mb-6 leading-tight">
              {localizedText}
            </h2>
          );
        case "h3":
          return (
            <h3 key={idx} className="text-2xl sm:text-3xl font-serif font-semibold text-slate-800 mt-10 mb-4">
              {localizedText}
            </h3>
          );
        case "p":
          return (
            <p key={idx} className="text-lg text-slate-700 leading-relaxed mb-6 font-light">
              {localizedText}
            </p>
          );
        case "img": {
          const alt = block.alt;
          const localizedAlt = typeof alt === 'object' ? getLoc(alt, currentLang) : alt;
          return (
            <figure key={idx} className="my-10 -mx-4 sm:mx-0">
              <img
                src={block.src}
                alt={localizedAlt}
                className="w-full h-auto rounded-none sm:rounded-xl shadow-lg"
                loading="lazy"
              />
              {localizedAlt && (
                <figcaption className="text-center text-sm text-slate-500 mt-3 italic">
                  {localizedAlt}
                </figcaption>
              )}
            </figure>
          );
        }
        case "cta":
          return (
            <div key={idx} className="my-12 p-8 bg-slate-50 border-l-4 border-gold rounded-r-xl">
              <p className="text-xl font-serif text-slate-900 italic mb-6">
                "{localizedText}"
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="btn-primary rounded-full w-full sm:w-auto px-6 py-2 text-sm shadow-md hover:shadow-lg transform transition-all hover:-translate-y-1">
                    {isEN ? "Request a Quote" : "Solicitar Cotización"}
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] bg-black/80 backdrop-blur-xl border border-gold/30 text-white shadow-2xl shadow-gold/5">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-serif text-gold text-center mb-4">
                      {isEN ? "Request a Quote" : "Solicitar Cotización"}
                    </DialogTitle>
                  </DialogHeader>
                  <QuoteForm className="mt-2" />
                </DialogContent>
              </Dialog>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-gold/30 selection:text-slate-900">
      <Helmet htmlAttributes={{ lang: language }}>
        <title>{title}</title>
        <meta name="description" content={excerpt} />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="es" href={ES_URL} />
        <link rel="alternate" hrefLang="en" href={EN_URL} />
        <link rel="alternate" hrefLang="x-default" href={ES_URL} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={article.cover} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={article.cover} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Jets Magazine",
                item: `${SITE}/jetsmagazine`
              },
              {
                "@type": "ListItem",
                position: 3,
                name: title,
                item: CANONICAL
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div
          className="h-full bg-gold transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <Navbar />

      {/* HERO PARALLAX */}
      <header className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${article.cover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />

        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl mt-20 animate-fade-in">
          <Link
            to={isEN ? "/en/jetsmagazine" : "/jetsmagazine"}
            className="inline-flex items-center text-white/80 hover:text-gold transition-colors mb-6 text-sm font-medium uppercase tracking-widest backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isEN ? "Back to Magazine" : "Volver a Magazine"}
          </Link>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm sm:text-base font-light">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gold" />
              {new Date(article.date).toLocaleDateString(language === "en" ? "en-US" : "es-AR", { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            {category && (
              <div className="flex items-center px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold">
                {category}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Excerpt */}
        <div className="text-xl sm:text-2xl font-serif text-slate-600 leading-relaxed mb-12 border-l-4 border-gold pl-6 italic">
          {excerpt}
        </div>

        {/* Main Content */}
        <div className="prose prose-lg prose-slate max-w-none">
          {renderContent()}
        </div>

        {/* Share & Tags */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-medium text-sm uppercase tracking-wider">
              {isEN ? "Share this article" : "Compartir este artículo"}
            </span>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-gold hover:text-white transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              {/* Add more social buttons here if needed */}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default Articulos;
