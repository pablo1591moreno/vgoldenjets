import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { selectArticles, selectMagazineMeta } from "@/contexts/DatosParaArticulos";

const ArticleCarousel = () => {
    const { language } = useLanguage();
    const articles = selectArticles(language);
    const meta = selectMagazineMeta(language);
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="bg-black py-16 border-t border-white/10">
            <div className="section-container">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="section-title font-serif text-white mb-2">{meta.title}</h2>
                        <p className="section-subtitle" style={{ color: "rgb(234 213 155 / 0.9)" }}>{meta.subtitle}</p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={scrollPrev}
                            className="p-2 rounded-full border border-white/20 text-white hover:bg-gold hover:border-gold transition-colors"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="p-2 rounded-full border border-white/20 text-white hover:bg-gold hover:border-gold transition-colors"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4">
                        {articles.map((article) => {
                            const linkPath = language === 'en'
                                ? `/en/jetsmagazine/${article.slug}`
                                : `/jetsmagazine/${article.slug}`;

                            return (
                                <div key={article.slug} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4">
                                    <Link to={linkPath} className="group block h-full">
                                        <article className="bg-white/5 border border-white/10 rounded-xl overflow-hidden h-full hover:border-gold/50 transition-all duration-300 flex flex-col">
                                            <div className="relative aspect-[16/9] overflow-hidden">
                                                <img
                                                    src={article.cover}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                            </div>

                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="text-gold text-sm mb-2 font-medium">
                                                    {article.date}
                                                </div>
                                                <h3 className="text-xl font-serif text-white mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                                                    {article.excerpt}
                                                </p>

                                                <div className="flex items-center text-gold text-sm font-medium mt-auto">
                                                    {language === 'es' ? 'Leer artículo' : 'Read article'}
                                                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        to={language === 'en' ? "/en/jetsmagazine" : "/jetsmagazine"}
                        className="inline-flex items-center text-white border border-white/30 px-6 py-2 rounded-full hover:bg-gold hover:border-gold transition-colors"
                    >
                        {language === 'es' ? 'Ver todos los artículos' : 'View all articles'}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ArticleCarousel;
