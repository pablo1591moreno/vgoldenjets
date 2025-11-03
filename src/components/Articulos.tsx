import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { selectArticleBySlug, selectMagazineMeta } from "@/contexts/DatosParaArticulos";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ShareBar from "./ShareBar";

type Props = { forcedLang?: "en" | "es" };

const SITE = "https://www.vgoldenjets.com";

function truncate(s: string, n = 160) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

/** Asegura URL absoluta para crawlers (OpenGraph/Twitter) */
function toAbsoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

const Articulos: React.FC<Props> = ({ forcedLang }) => {
  const { slug } = useParams();
  const ctx = useLanguage();
  const language = forcedLang ?? ctx.language;
  const isEN = language === "en";

  const { volver: backLabel, heroImage } = useMemo(
    () => selectMagazineMeta(language),
    [language]
  );

  const article = useMemo(
    () => (slug ? selectArticleBySlug(slug, language) : undefined),
    [slug, language]
  );

  if (!article) {
    return (
      <div className="section-container py-16">
        <Link
          to={`${isEN ? "/en" : ""}/jetsmagazine`}
          className="inline-flex items-center text-gold hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {backLabel}
        </Link>
        <h1 className="mt-6 text-2xl font-semibold text-black">{"Artículo no encontrado"}</h1>
        <p className="mt-2 text-gray-700">{"El contenido que buscás no existe o fue movido."}</p>
      </div>
    );
  }

  // SEO dinámico
  const ES_URL = `${SITE}/jetsmagazine/${article.slug}`;
  const EN_URL = `${SITE}/en/jetsmagazine/${article.slug}`;
  const CANONICAL = isEN ? EN_URL : ES_URL;

  const title = `${article.title} | V Golden Jets`;
  const description = truncate(article.excerpt || article.subtitle || article.title, 160);

  // Preferir JPG/PNG social si existe; si no, caer en cover
  const ogImageAbs = toAbsoluteUrl(article.ogImage || article.cover);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description,
    image: [ogImageAbs],
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: CANONICAL,
    publisher: {
      "@type": "Organization",
      name: "V Golden Jets",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/logo192.png`,
      },
    },
  };

  return (
    <article>
      <Helmet>
        {/* Básico */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={CANONICAL} />

        {/* hreflang */}
        <link rel="alternate" hrefLang="es" href={ES_URL} />
        <link rel="alternate" hrefLang="en" href={EN_URL} />
        <link rel="alternate" hrefLang="x-default" href={ES_URL} />
        <meta name="robots" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="V Golden Jets" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={ogImageAbs} />
        <meta property="og:image:secure_url" content={ogImageAbs} />
        <meta property="og:image:alt" content={article.title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:modified_time" content={article.date} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageAbs} />

        {/* Structured data */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      {/* HERO del artículo */}
      <section className="relative h-[38vh] min-h-[260px]">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
        </div>
        <div className="section-container h-full flex items-end pb-8">
          <div className="max-w-3xl">
            <Link
              to={`${isEN ? "/en" : ""}/jetsmagazine`}
              className="inline-flex items-center text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded px-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> {backLabel}
            </Link>
            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold font-serif text-white">
              {article.title}
            </h1>
            <p className="mt-2 text-white/85 text-base sm:text-lg">{article.subtitle}</p>
          </div>
        </div>
      </section>

      {/* CUERPO */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-gray-800 text-lg leading-relaxed space-y-6">
            {article.content.map((block, idx) => {
              switch (block.type) {
                case "h1":
                  return (
                    <h1 key={idx} className="text-3xl sm:text-4xl font-semibold font-serif text-black mt-8">
                      {block.text}
                    </h1>
                  );
                case "h2":
                  return (
                    <h2 key={idx} className="text-2xl sm:text-3xl font-semibold font-serif text-black mt-8">
                      {block.text}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={idx} className="text-xl sm:text-2xl font-semibold font-serif text-black mt-6">
                      {block.text}
                    </h3>
                  );
                case "p":
                  return <p key={idx}>{block.text}</p>;
                case "img":
                  return (
                    <figure key={idx} className="my-6">
                      <img
                        src={block.src}
                        alt={block.alt || "Imagen del artículo"}
                        className="w-full rounded-2xl shadow-sm"
                        loading="lazy"
                        decoding="async"
                      />
                      {block.alt ? (
                        <figcaption className="mt-2 text-sm text-gray-500">{block.alt}</figcaption>
                      ) : null}
                    </figure>
                  );
                default:
                  return null;
              }
            })}

            {/* Barra de compartir */}
            <ShareBar url={CANONICAL} title={article.title} text={description} />
          </div>
        </div>
      </section>

      <Footer />
    </article>
  );
};

export default Articulos;
