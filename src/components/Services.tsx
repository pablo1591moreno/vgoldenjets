import React from "react";
import { Shield, Clock, Users, Plane } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// ⬇️ Importá tus imágenes
import imgSafety from "@/img/Services/Seguridad.webp";
import imgOnDemand from "@/img/Services/ReservaDemanda.webp";
import imgGroups from "@/img/Services/ChartersGrupales.webp";
import imgPrivateJet from "@/img/Services/CharterPrivado.webp";

type ServiceCardProps = {
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
  imgSrc: string;
  imgAltKey?: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  titleKey,
  descriptionKey,
  imgSrc,
  imgAltKey,
}) => {
  const { t } = useLanguage();
  const alt = imgAltKey ? t(imgAltKey) : t(titleKey);

  return (
    <article className="rounded-2xl overflow-hidden border border-gold/20 bg-black/80 hover:border-gold/50 transition-all">
      {/* Imagen superior con alto 30% más chico */}
      <div className="relative aspect-[21/9] sm:aspect-[16/7] overflow-hidden">
        <img
          src={imgSrc}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-black/0" />
      </div>

      {/* Contenido */}
      <div className="p-5 sm:p-6">
        <div className="mb-3">
          <Icon className="text-gold h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
          {t(titleKey)}
        </h3>
        <p className="text-white/70 text-sm sm:text-base">
          {t(descriptionKey)}
        </p>
      </div>
    </article>
  );
};

const Services = () => {
  const { t } = useLanguage();

  const services: ServiceCardProps[] = [
    {
      icon: Shield,
      titleKey: "services.safety.title",
      descriptionKey: "services.safety.description",
      imgSrc: imgSafety,
    },
    {
      icon: Clock,
      titleKey: "services.onDemand.title",
      descriptionKey: "services.onDemand.description",
      imgSrc: imgOnDemand,
    },
    {
      icon: Users,
      titleKey: "services.groupCharters.title",
      descriptionKey: "services.groupCharters.description",
      imgSrc: imgGroups,
    },
    {
      icon: Plane,
      titleKey: "services.privateJet.title",
      descriptionKey: "services.privateJet.description",
      imgSrc: imgPrivateJet,
    },
  ];

  return (
    <section id="services" className="bg-black py-10 sm:py-16">
      <div className="section-container">
        <h2 className="section-title font-serif">{t("services.title")}</h2>
        <p className="section-subtitle">{t("services.subtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
