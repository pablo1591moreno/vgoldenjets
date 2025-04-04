
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="bg-black py-16 sm:py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title font-serif">{t("about.title")}</h2>
            <p className="text-white/80 mb-6">
              {t("about.description1")}
            </p>
            <p className="text-white/80 mb-6">
              {t("about.description2")}
            </p>
            <p className="text-white/80 mb-6">
              {t("about.description3")}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <p className="text-5xl font-bold text-gold">15+</p>
                <p className="text-white/70 mt-2">{t("about.years")}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-gold">5000+</p>
                <p className="text-white/70 mt-2">{t("about.hours")}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-gold">100+</p>
                <p className="text-white/70 mt-2">{t("about.destinations")}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-gold">98%</p>
                <p className="text-white/70 mt-2">{t("about.satisfaction")}</p>
              </div>
            </div>
          </div>
          
          <div className="lg:pl-10">
            <div className="relative rounded-xl overflow-hidden h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80" 
                alt="Luxury private jet interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <blockquote className="text-white italic text-lg">
                  {t("about.quote")}
                </blockquote>
                <div className="mt-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black font-bold">
                    V
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-semibold">Victor Graham</p>
                    <p className="text-gold/80 text-sm">{t("about.ceo")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
