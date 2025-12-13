import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import img from "@/img/argus.png";
import imgBackgound from "@/img/jetAbout.webp";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden bg-zinc-50">
      {/* Subtle background texture or image */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <img src={imgBackgound} alt="" className="w-full h-full object-cover grayscale" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[1px] bg-gold"></span>
                <span className="text-sm font-bold tracking-widest text-gold uppercase">VGolden Jets</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                {t("about.title")}
              </h2>
            </div>

            <div className="text-slate-600 text-lg leading-relaxed space-y-6">
              <p>{t("about.description1")}</p>
              <p>{t("about.description2")}</p>
              <p>{t("about.description3")}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-slate-200">
              <div>
                <div className="text-4xl font-serif font-bold text-slate-900">15+</div>
                <div className="text-xs font-bold text-gold uppercase tracking-widest mt-2">{t("about.years")}</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-slate-900">5k+</div>
                <div className="text-xs font-bold text-gold uppercase tracking-widest mt-2">{t("about.hours")}</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-slate-900">100+</div>
                <div className="text-xs font-bold text-gold uppercase tracking-widest mt-2">{t("about.destinations")}</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-slate-900">98%</div>
                <div className="text-xs font-bold text-gold uppercase tracking-widest mt-2">{t("about.satisfaction")}</div>
              </div>
            </div>
          </div>

          {/* Image Content - Restored & Styled */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative p-8 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center transform transition-transform hover:scale-105 duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-transparent rounded-2xl -z-10"></div>
              <img
                src={img}
                alt="Argus Certified"
                className="w-full max-w-[240px] h-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
