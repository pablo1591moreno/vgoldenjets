import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import img from "@/img/argus.png";
import imgBackgound from "@/img/jetAbout.webp";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-gray-100 py-10 sm:py-16 lg:py-20">
      <div
        className="section-container bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${imgBackgound})` }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-10 bg-white/80">
          <div>
            <h2 className="section-title font-serif text-black">{t("about.title")}</h2>
            <p className="text-gray-700 mb-6">{t("about.description1")}</p>
            <p className="text-gray-700 mb-6">{t("about.description2")}</p>
            <p className="text-gray-700 mb-6">{t("about.description3")}</p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <p className="text-5xl font-bold text-gold">15+</p>
                <p className="text-gray-600 mt-2">{t("about.years")}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-gold">5000+</p>
                <p className="text-gray-600 mt-2">{t("about.hours")}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-gold">100+</p>
                <p className="text-gray-600 mt-2">{t("about.destinations")}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-gold">98%</p>
                <p className="text-gray-600 mt-2">{t("about.satisfaction")}</p>
              </div>
            </div>
          </div>

          {/*
          <div className="lg:pl-10 flex justify-center items-start">
            <div className="relative overflow-hidden h-auto w-1/2"> 
              <img
                src={img}
                alt="Luxury private jet interior"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default About;
