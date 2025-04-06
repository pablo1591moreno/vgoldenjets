
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import background from "@/img/527dfc_84ca4ea39e9147589e332ebe5810c677~mv2.gif";

const Hero = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section id="home" className={`relative ${isMobile ? 'pt-10' : 'pt-0'} min-h-[70vh] flex items-center`}>
      {/* Background image */}
      <div className="absolute inset-0 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${background})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-start max-w-3xl animate-fade-in">
          <p className="text-gold text-sm sm:text-base md:text-lg mb-2">{t("hero.location")}</p>
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5x1 font-bold tracking-tight font-serif">
            {t("hero.title")}
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5x1 font-bold tracking-tight font-serif px-24 lg:mb-6">
            {t("hero.title.two")}
          </h2>
          <p className="text-whit text-sm sm:text-base md:text-lg mb-1">{t("hero.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
            <a href="#contact" className="btn-primary flex items-center justify-center">
              {t("hero.contact")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
