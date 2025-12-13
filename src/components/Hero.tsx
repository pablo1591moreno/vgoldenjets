import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import background from "@/img//portada.webp";

const Hero = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section id="home" className={`relative ${isMobile ? 'pt-10' : 'pt-0'} min-h-[60vh] flex items-center `}>
      {/* Background image */}
      <div className="absolute inset-0 bg-black">
        <img
          src={background}
          alt="Private Jet Hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: isMobile ? '35% center' : 'center', // Adjusted for mobile to match previous -170px visual
          }}
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black" />
      </div>

      <div className={`section-container w-full px-4 sm:px-6 lg:px-8 relative z-10 ${isMobile ? 'mt-[20px]' : 'mt-[130px]'}`}>
        <div className="flex flex-col items-start max-w-3xl animate-fade-in">
          <h1 className={`text-white text-base sm:text-2xl md:text-2xl font-sans whitespace-nowrap sm:whitespace-normal mt-0`}>
            {t("hero.subtitle.line1")} {isMobile ? "" : <br />}
            {t("hero.subtitle.line2")}
          </h1>
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isMobile ? 'mt-[240px]' : 'mt-20'}`}>
            <a href="#contact" className="btn-primary flex items-center justify-center rounded-full">
              {t("hero.contact")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;