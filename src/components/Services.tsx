
import React from "react";
import { Shield, Clock, Users, Plane } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ServiceCard = ({ 
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
    <div className="p-5 sm:p-6 rounded-lg border border-gold/20 hover:border-gold/50 transition-all bg-black/40">
      <div className="mb-3">
        <Icon className="text-gold h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{t(titleKey)}</h3>
      <p className="text-white/70 text-sm sm:text-base">{t(descriptionKey)}</p>
    </div>
  );
};

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: Shield,
      titleKey: "services.safety.title",
      descriptionKey: "services.safety.description"
    },
    {
      icon: Clock,
      titleKey: "services.onDemand.title",
      descriptionKey: "services.onDemand.description"
    },
    {
      icon: Users,
      titleKey: "services.groupCharters.title",
      descriptionKey: "services.groupCharters.description"
    },
    {
      icon: Plane,
      titleKey: "services.privateJet.title",
      descriptionKey: "services.privateJet.description"
    }
  ];

  return (
    <section id="services" className="bg-black py-10 sm:py-16">
      <div className="section-container">
        <h2 className="section-title font-serif">{t("services.title")}</h2>
        <p className="section-subtitle">{t("services.subtitle")}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              titleKey={service.titleKey}
              descriptionKey={service.descriptionKey}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
