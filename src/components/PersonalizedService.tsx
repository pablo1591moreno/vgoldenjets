import React from "react";
import { Star, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import img2 from "@/img/img 2.webp";

const ReasonCard = ({ 
  icon: Icon,
  titleKey, 
  descriptionKey 
}: { 
  icon: React.ElementType; 
  titleKey: string; 
  descriptionKey: string 
}) => {
  const { t } = useLanguage();

  return (
    <div className="p-5 sm:p-6 border border-gold/20 hover:border-gold/50 transition-all bg-white">
      <div className="mb-3">
        <Icon className="text-gold h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-black">{t(titleKey)}</h3>
      <p className="text-gray-700 text-sm sm:text-base">{t(descriptionKey)}</p>
    </div>
  );
};

const PersonalizedService = () => {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: Star,
      titleKey: "reasons.luxury.title",
      descriptionKey: "reasons.luxury.description"
    },
    {
      icon: Shield,
      titleKey: "reasons.discretion.title",
      descriptionKey: "reasons.discretion.description"
    },
    {
      icon: Clock,
      titleKey: "reasons.schedule.title",
      descriptionKey: "reasons.schedule.description"
    }
  ];

  return (
    <>
      {/* Our Service Section */}
      <section id="our-service" className="bg-gray-100 py-10 sm:py-16 relative">
        {/* Background image with low opacity */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-100" 
            style={{ 
              backgroundImage:`url(${img2})`
            }}
          />
          <div className="absolute inset-0 bg-gray-100/20" />
        </div>

        <div className="section-container relative z-10">
          <h2 className="section-title font-serif text-black">{t("personalizedService.title")}</h2>
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="p-6 sm:p-8 bg-white">
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed">
                {t("personalizedService.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="bg-white py-10 sm:py-16">
        <div className="section-container">
          <h2 className="section-title font-serif text-black">{t("reasons.title")}</h2>
          <p className="section-subtitle text-gray-700">{t("reasons.subtitle")}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {reasons.map((reason, index) => (
              <ReasonCard 
                key={index}
                icon={reason.icon}
                titleKey={reason.titleKey}
                descriptionKey={reason.descriptionKey}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PersonalizedService;
