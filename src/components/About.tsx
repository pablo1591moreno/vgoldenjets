import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import img from "@/img/about.png";

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
                src={img}
                alt="Luxury private jet interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
