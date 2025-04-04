
import React from "react";
import { Plane } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import img3 from "@/img/img 3.png";

const DestinationCard = ({ route }: { route: string }) => {
  return (
    <div className="bg-black/40 p-3 sm:p-4 rounded-lg hover:bg-black/60 transition-colors flex items-center space-x-3">
      <Plane size={18} className="text-gold" />
      <span className="text-white text-sm sm:text-base">{route}</span>
    </div>
  );
};

const PopularDestinations = () => {
  const { t } = useLanguage();
  
  const destinations = t("destinations.routes").split(",");

  return (
    <section id="destinations" className="bg-black py-10 sm:py-16 relative">
      {/* Background image with low opacity */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80" 
          style={{ 
            backgroundImage:`url(${img3})`
          }}
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>
      
      <div className="section-container relative z-10">
        <h2 className="section-title font-serif">{t("destinations.title")}</h2>
        <p className="section-subtitle">{t("destinations.subtitle")}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-8">
          {destinations.map((destination, index) => (
            <DestinationCard key={index} route={destination.trim()} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
