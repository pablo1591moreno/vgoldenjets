// JetsMagazine.tsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { articlesMeta } from "@/data/articles"; // New data source
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Search, X } from "lucide-react"; // Icons for search
import magazineHero from "@/img/527dfc_84ca4ea39e9147589e332ebe5810c677~mv2.gif";
import { LStr } from "@/types/article";

type Props = { forcedLang?: "en" | "es" };

const SITE = "https://www.vgoldenjets.com";

// Helper to get localized string
function getLoc(content: LStr | string, lang: "en" | "es"): string {
  if (typeof content === "string") return content;
  return (lang === "en" ? content.en : content.es) || content.es || "";
}

const JetsMagazine: React.FC<Props> = ({ forcedLang }) => {
  const ctx = useLanguage();
  const language = forcedLang ?? ctx.language;
  const isEN = language === "en";
  const currentLang = isEN ? "en" : "es";

  // State for Search and Filter
  const [searchQuery, setSearchQuery] = useState("");
  // We store the category OBJECT (or string) reference for filtering
  const [selectedCategory, setSelectedCategory] = useState<LStr | string | null>(null);

  // ⬅️ literal local según el idioma efectivo del componente
  const READ_MORE = isEN ? "Read more →" : "Leer más →";
  const SEARCH_PLACEHOLDER = isEN ? "Search articles..." : "Buscar artículos...";
  const ALL_CATEGORIES = isEN ? "All" : "Todos";
  const NO_RESULTS = isEN ? "No articles found matching your criteria." : "No se encontraron artículos con esos criterios.";

  // Locale para fechas
  const locale = isEN ? "en-US" : "es-AR";

  const dateFmt = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
    [locale]
  );

  // Extract unique categories
  const categories = useMemo(() => {
    // Since we use constants in data/articles/index.ts, reference equality works!
    const cats = new Set(articlesMeta.map(a => a.category).filter(Boolean));
    return Array.from(cats);
  }, []);

  // Filter Logic
  const filteredArticles = useMemo(() => {
    return articlesMeta.filter((article) => {
      const title = getLoc(article.title, currentLang).toLowerCase();
      const excerpt = getLoc(article.excerpt, currentLang).toLowerCase();

      const matchesSearch =
        title.includes(searchQuery.toLowerCase()) ||
        excerpt.includes(searchQuery.toLowerCase());

      // Compare references for category
      const matchesCategory = selectedCategory ? article.category === selectedCategory : true;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => b.dateMs - a.dateMs);
  }, [searchQuery, selectedCategory, currentLang]);

  const [featured, ...rest] = filteredArticles;

  // SEO
  const ES_URL = `${SITE}/jetsmagazine`;
  const EN_URL = `${SITE}/en/jetsmagazine`;
  const CANONICAL = isEN ? EN_URL : ES_URL;

  const metaTitle = `Jets Magazine | V Golden Jets`;
  const metaDescription = isEN
    ? "Articles, guides and news from the world of private flights."
    : "Artículos, guías y novedades del mundo de los vuelos privados.";

  const heroImage = articlesMeta[0]?.cover; // Use latest cover as hero fallback

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Helmet htmlAttributes={{ lang: language }}>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={CANONICAL} />
        <link rel="alternate" hrefLang="es" href={ES_URL} />
        <link rel="alternate" hrefLang="en" href={EN_URL} />
        <link rel="alternate" hrefLang="x-default" href={ES_URL} />
        <meta name="robots" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={heroImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={heroImage} />

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
                item: CANONICAL
              }
            ]
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* HERO */}
      <section className="relative py-24 sm:py-32 bg-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${magazineHero})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/50 to-slate-900" />
        </div>

        <div className="section-container relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-serif text-white mb-6 tracking-tight">
            Jets Magazine
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {metaDescription}
          </p>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="py-8 border-b border-gray-100 sticky top-0 z-30 bg-white/80 backdrop-blur-md">
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === null
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                }`}
            >
              {ALL_CATEGORIES}
            </button>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                  }`}
              >
                {getLoc(cat, currentLang)}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={SEARCH_PLACEHOLDER}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all sm:text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* CONTENT */}
      <div className="flex-grow">
        {filteredArticles.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-slate-500 text-lg">{NO_RESULTS}</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory(null) }}
              className="mt-4 text-gold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* DESTACADO (Only show if no search/filter active, or if it matches) */}
            {/* Actually, let's just show the first result as featured if we are on page 1 equivalent */}
            {featured && (
              <section className="py-12 sm:py-16">
                <div className="section-container">
                  <Link
                    to={`${isEN ? "/en" : ""}/jetsmagazine/${featured.slug}`}
                    className="group grid md:grid-cols-12 items-stretch gap-0 rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="md:col-span-7 lg:col-span-8 aspect-[16/9] md:aspect-auto overflow-hidden relative">
                      <img
                        src={featured.cover}
                        alt={getLoc(featured.title, currentLang)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-900 shadow-sm">
                        {getLoc(featured.category, currentLang)}
                      </div>
                    </div>
                    <div className="md:col-span-5 lg:col-span-4 p-8 sm:p-10 flex flex-col justify-center bg-white">
                      <div className="text-xs font-bold uppercase tracking-widest text-gold mb-3">
                        {dateFmt.format(featured.dateMs)}
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 group-hover:text-gold transition-colors mb-4 leading-tight">
                        {getLoc(featured.title, currentLang)}
                      </h2>
                      <p className="text-slate-600 leading-relaxed line-clamp-4 mb-6">
                        {getLoc(featured.excerpt, currentLang)}
                      </p>

                      <div className="mt-auto font-medium text-slate-900 group-hover:text-gold transition-colors flex items-center">
                        {READ_MORE}
                      </div>
                    </div>
                  </Link>
                </div>
              </section>
            )}

            {/* GRID */}
            {rest.length > 0 && (
              <section className="pb-20 sm:pb-28">
                <div className="section-container">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rest.map((a) => (
                      <Link
                        key={a.slug}
                        to={`${isEN ? "/en" : ""}/jetsmagazine/${a.slug}`}
                        className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="aspect-[16/10] overflow-hidden relative">
                          <img
                            src={a.cover}
                            alt={getLoc(a.title, currentLang)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm">
                            {getLoc(a.category, currentLang)}
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="text-xs font-bold uppercase tracking-widest text-gold mb-3">
                            {dateFmt.format(a.dateMs)}
                          </div>
                          <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-gold transition-colors mb-3 leading-snug">
                            {getLoc(a.title, currentLang)}
                          </h3>
                          <p className="text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-grow">
                            {getLoc(a.excerpt, currentLang)}
                          </p>
                          <div className="mt-auto font-medium text-slate-900 group-hover:text-gold transition-colors text-sm">
                            {READ_MORE}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default JetsMagazine;
