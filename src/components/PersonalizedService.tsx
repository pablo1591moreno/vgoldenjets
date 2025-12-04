import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import img2 from "@/img/img 2.webp";

const PersonalizedService = () => {
  const { t } = useLanguage();

  return (
    <section id="our-service" className="bg-black py-10 sm:py-16 relative">
      {/* Background image with low opacity */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url(${img2})`
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="section-container relative z-10">
        <h2 className="section-title font-serif text-white">{t("personalizedService.title")}</h2>
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl">
            <p className="text-white text-base sm:text-lg leading-relaxed">
              {t("personalizedService.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedService;
