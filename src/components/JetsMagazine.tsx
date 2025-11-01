// JetsMagazine.tsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { selectArticles, selectMagazineMeta } from "@/contexts/DatosParaArticulos";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

type Props = { forcedLang?: "en" | "es" };

const SITE = "https://www.vgoldenjets.com";

const JetsMagazine: React.FC<Props> = ({ forcedLang }) => {
  const ctx = useLanguage();
  const language = forcedLang ?? ctx.language;
  const isEN = language === "en";

  // ⬅️ literal local según el idioma efectivo del componente
  const READ_MORE = isEN ? "Read more →" : "Leer más →";

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

  // Meta + artículos localizados
  const magazine = useMemo(() => selectMagazineMeta(language), [language]);
  const localized = useMemo(() => selectArticles(language), [language]);

  // Orden por fecha
  const sorted = useMemo(() => [...localized].sort((a, b) => b.dateMs - a.dateMs), [localized]);
  const [featured, ...rest] = sorted;

  // SEO
  const ES_URL = `${SITE}/jetsmagazine`;
  const EN_URL = `${SITE}/en/jetsmagazine`;
  const CANONICAL = isEN ? EN_URL : ES_URL;

  const metaTitle = `Jets Magazine | V Golden Jets`;
  const metaDescription =
    magazine.subtitle ||
    (isEN
      ? "Articles, guides and news from the world of private flights."
      : "Artículos, guías y novedades del mundo de los vuelos privados.");

  return (
    <main className="bg-white">
      <Helmet>
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
        <meta property="og:image" content={magazine.heroImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={magazine.heroImage} />
      </Helmet>

      <Navbar />

      {/* HERO */}
      <section className="relative py-14 sm:py-20">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${magazine.heroImage})` }}
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="section-container relative z-10 text-center">
          <h1 className="section-title font-serif text-white">{magazine.title}</h1>
          <p className="section-subtitle text-white/85 max-w-2xl mx-auto">
            {magazine.subtitle}
          </p>
        </div>
      </section>

      {/* DESTACADO */}
      {featured && (
        <section>
          <div className="section-container">
            <Link
              to={`${isEN ? "/en" : ""}/jetsmagazine/${featured.slug}`}
              className="group grid md:grid-cols-12 items-stretch gap-4 sm:gap-6 rounded-2xl overflow-hidden bg-zinc-950 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            >
              <div className="md:col-span-7 lg:col-span-8 aspect-[16/9] md:aspect-auto">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <div className="md:col-span-5 lg:col-span-4 p-5 sm:p-6 flex flex-col">
                <div className="text-xs uppercase tracking-wide text-white/70">
                  {dateFmt.format(featured.dateMs)}
                </div>
                <h2 className="mt-1 text-2xl sm:text-3xl font-semibold text-white group-hover:text-gold transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-3 text-white/80 leading-relaxed line-clamp-5">
                  {featured.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  {featured.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white ring-1 ring-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-5 font-medium text-white">{READ_MORE}</div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* GRID */}
      <section>
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {rest.map((a) => (
              <Link
                key={a.slug}
                to={`${isEN ? "/en" : ""}/jetsmagazine/${a.slug}`}
                className="group block bg-zinc-950 rounded-2xl overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                <div className="aspect-[16/9] overflow-hidden bg-black">
                  <img
                    src={a.cover}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs uppercase tracking-wide text-white/70">
                      {dateFmt.format(a.dateMs)}
                    </div>
                    {a.tags?.[0] && (
                      <span className="text-[10px] md:text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-white ring-1 ring-white/20">
                        {a.tags[0]}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-white group-hover:text-gold transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-white/80 leading-relaxed line-clamp-3">
                    {a.excerpt}
                  </p>
                  <div className="mt-4 font-medium text-white group-hover:text-gold transition-colors">
                    {READ_MORE}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default JetsMagazine;
