import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

type Translations = Record<Language, Record<string, string>>;

// English and Spanish translations
const translations: Translations = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.fleet": "Fleet",
    "nav.about": "About",
    "nav.contact": "Contact",

    // Hero
    "hero.title": "PRIVATE FLIGHTS",
    "hero.subtitle.line1": "VGoldenjets, Your Time,",
    "hero.subtitle.line2": "Our Priority",
    "hero.services": "Our Services",
    "hero.contact": "Contact Us",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Experience luxury travel tailored to your needs",
    "services.privateJet.title": "Private Jet Charter",
    "services.privateJet.description":
      "Access to a global fleet of high-end private jets for your travel needs with no ownership commitment.",
    "services.groupCharters.title": "Group Charters",
    "services.groupCharters.description":
      "Specialized solutions for corporate travel, sports teams, music tours, and more.",
    "services.events.title": "Events & Occasions",
    "services.events.description":
      "Special packages for important life events, anniversaries, and exclusive gatherings.",
    "services.safety.title": "Safety",
    "services.safety.description":
      "Vgoldenjets has been providing aircraft charter services since 2018 with an impeccable safety record (Argus Gold). Our air charter crews are highly trained professionals and we maintain our aircraft to the highest standards.",
    "services.onDemand.title": "On-Demand Booking",
    "services.onDemand.description":
      "Book a flight whenever you want and wherever you are; your private flight is just a phone call, WhatsApp, or email away.",
    "services.global.title": "Global Access",
    "services.global.description":
      "Reach remote destinations and enjoy flexibility in arrival and departure locations.",

    // Personalized Service
    "personalizedService.title": "Our Service",
    "personalizedService.description":
      "At VGOLDEN JETS LLC, we understand that your time is your most valuable asset. As your aircraft charter agent, our obsession is to maximize every minute of your journey, whether for business or leisure. With a dedicated expert at your disposal, your time becomes our priority from the first contact. We record and remember your preferences so you'll find your favorite drink, snack, or perfect coffee waiting for you on board, without having to ask. We free up your time from every small detail, so you can focus on what truly matters. We believe your private jet experience should align flawlessly with your unique needs and schedule. We personalize every detail and precisely adapt each aircraft, because your time is priceless, and our priority is for you to make the most of it.",

    // Why Choose Us
    "reasons.title": "Why Choose Vgoldenjets?",
    "reasons.subtitle": "Experience the difference with our premium service",
    "reasons.luxury.title": "Luxury and Comfort",
    "reasons.luxury.description":
      "Flying should be a pleasure and we'll make your charter experience as luxurious and comfortable as possible.",
    "reasons.discretion.title": "Discretion and Security",
    "reasons.discretion.description":
      "Vgoldenjets guarantees your privacy, and we will work closely with your security provider on all aspects of your charter.",
    "reasons.schedule.title": "Create Your Schedule",
    "reasons.schedule.description":
      "Connect with commercial flights or fly to your bespoke timetable – whatever your requirements, we'll create the private jet charter to suit you.",
    "reasons.choice.title": "Choice of Aircraft",
    "reasons.choice.description":
      "With access to 2500 aircraft and 90 different aircraft types, we will always source the right aircraft for your requirements.",
    "reasons.cost.title": "Cost Efficiency",
    "reasons.cost.description":
      "Our buying power and reputation allows us to find you the best private jet charter prices, ensuring you always receive the most cost-effective solution.",

    // About
    "about.title": "About Us",
    "about.description1":
      "VGoldenjets provides premium private jet charter services, catering to discerning clients who value luxury, privacy, and efficiency in their travel experiences.",
    "about.description2":
      "Founded with a passion for aviation excellence, our team brings decades of industry experience to every flight. We maintain the highest standards of safety, service, and discretion.",
    "about.description3":
      "Our commitment to personalized service means we handle every detail of your journey, from ground transportation to in-flight dining preferences and special accommodations.",
    "about.years": "Years Experience",
    "about.hours": "Flight Hours",
    "about.destinations": "Global Destinations",
    "about.satisfaction": "Client Satisfaction",

    // Fleet
    "fleet.title": "Our Fleet",
    "fleet.subtitle": "Explore our collection of luxury private jets",
    "fleet.lightJets.title": "Light Jets",
    "fleet.lightJets.description":
      "Light jets provide a flight range of around three to five hours, covering approximately 1,600 nautical miles. Ideal for short runways, these jets are perfect for business trips or vacations, offering easy access to limited airports.",
    "fleet.midSizeJets.title": "Mid-Size Jets",
    "fleet.midSizeJets.description":
      "Mid-size jets typically provide a flight duration of four to five hours, covering approximately 2,800 nautical miles. While some are capable of non-stop coast-to-coast flights, others may require a brief fuel stop. The versatility of mid-size jets makes them well-suited for comfortable and convenient coast-to-coast travel.",
    "fleet.heavyJets.title": "Heavy Jets",
    "fleet.heavyJets.description":
      "When selecting a private jet charter, heavy jets stand out for their extended range and greater interior space compared to smaller counterparts. For VIP jet charters, there are also ultra-long-range heavy jets that provide the pinnacle of luxury, bridging the gap between private jets and executive airliners.",
    "fleet.capacity": "Capacity",
    "fleet.range": "Range",
    "fleet.speed": "Speed",
    "fleet.features": "Features",
    "fleet.availableJets": "Private Jets Available",
    "fleet.jetModels":
      "Global 6000, Gulfstream G650, Embraer Legacy 650, Falcon 7X, Gulfstream GIV, Hawker 800XP, Lear 60, Citation, Challenger 350, Embraer Legacy 500, Citation CJ3, Hawker 400XP, Phenom 300",

    // Popular Destinations
    "destinations.title": "Popular Destinations",
    "destinations.routes":
      "Miami to New York, Miami to Los Angeles, Los Angeles to New York, New York to Los Angeles, New York to Las Vegas, Miami to Las Vegas, Miami to Aspen, Los Angeles to Aspen, New York to Aspen, Teterboro to Napa Valley, Miami to London, Los Angeles to Miami",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Reach out for personalized flight solutions",
    "contact.form.title": "Send Us a Message",
    "contact.form.fullName": "Full Name",
    "contact.form.fullName.placeholder": "Your full name",
    "contact.form.origin": "Origin (Country/State)",
    "contact.form.origin.placeholder": "Enter country or state of origin",
    "contact.form.destination": "Destination (Country/State)",
    "contact.form.destination.placeholder": "Enter country or state of destination",
    "contact.form.tripType": "Trip Type",
    "contact.form.tripType.placeholder": "Select a trip type",
    "contact.form.tripType.oneWay": "One Way",
    "contact.form.tripType.roundTrip": "Round Trip",
    "contact.form.departureDate": "Departure Date",
    "contact.form.departureDate.placeholder": "Select departure date",
    "contact.form.returnDate": "Return Date",
    "contact.form.returnDate.placeholder": "Select return date",
    "contact.form.passengers": "Number of Passengers",
    "contact.form.passengers.placeholder": "Number of passengers",
    "contact.form.email": "Email Address",
    "contact.form.email.placeholder": "your@email.com",
    "contact.form.phone": "Phone Number",
    "contact.form.phone.placeholder": "+1 (xxx) xxx-xxxx",
    "contact.form.message": "Message",
    "contact.form.message.placeholder": "Tell us about your travel needs...",
    "contact.form.submit": "Send Message",
    "contact.info.title": "Contact Information",
    "contact.info.description":
      "Have questions or ready to book your next flight? Contact our team of aviation experts for immediate assistance.",
    "contact.info.address.title": "Office Address",
    "contact.info.address.content": "USA Fort Lauderdale Executive Airport ( fxe )",
    "contact.info.phone.title": "Phone USA",
    "contact.info.phone.title2": "Phone SOUTH AMERICA",
    "contact.info.email.title": "Email Address",
    "contact.info.hours.title": "Business Hours",
    "contact.info.hours.content": "Available 24/7 for charter inquiries",
    "contact.hotline.title": "Private Charter Hotline",
    "contact.hotline.hours": "Available 24/7 for urgent bookings",
    "contact.toast.title": "Message Sent",
    "contact.toast.description":
      "Thank you for your inquiry. We'll get back to you shortly.",

    // Footer
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.fleet": "Our Fleet",
    "footer.destinations": "Destinations",
    "footer.about": "About Us",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.ourServices": "Our Services",
    "footer.privateJet": "Private Jet Charter",
    "footer.groupCharters": "Group Charters",
    "footer.vipConcierge": "VIP Concierge",
    "footer.luxuryGround": "Luxury Ground Transit",
    "footer.corporate": "Corporate Travel",
    "footer.contactUs": "Contact Us",
    "footer.rights": "All rights reserved.",
    "footer.backToTop": "Back to top",
    "footer.companyInfo":
      "Experience luxury private aviation with a fleet of modern aircraft and exceptional service."
  },
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.fleet": "Flota",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",

    // Hero
    "hero.title": "VUELOS PRIVADOS",
    "hero.subtitle.line1": "VGoldenjets, Tu Tiempo,",
    "hero.subtitle.line2": "Nuestra Prioridad",
    "hero.services": "Nuestros Servicios",
    "hero.contact": "Contáctenos",

    // Services
    "services.title": "Nuestros Servicios",
    "services.subtitle": "Experimente viajes de lujo adaptados a sus necesidades",
    "services.privateJet.title": "Charter de Jet Privado",
    "services.privateJet.description":
      "Acceso a una flota global de jets privados de alta gama para sus necesidades de viaje sin compromiso de propiedad.",
    "services.groupCharters.title": "Charters Grupales",
    "services.groupCharters.description":
      "Soluciones especializadas para viajes corporativos, equipos deportivos, giras musicales y más.",
    "services.events.title": "Eventos y Ocasiones",
    "services.events.description":
      "Paquetes especiales para eventos importantes de la vida, aniversarios y reuniones exclusivas.",
    "services.safety.title": "Seguridad",
    "services.safety.description":
      "Vgoldenjets ha estado proporcionando servicios de charter de aeronaves desde 2018 con un historial de seguridad impecable (Argus Gold). Nuestras tripulaciones de charter aéreo son profesionales altamente capacitados y mantenemos nuestras aeronaves con los más altos estándares.",
    "services.onDemand.title": "Reserva Bajo Demanda",
    "services.onDemand.description":
      "Reserve un vuelo cuando quiera y donde esté; su vuelo privado está a solo una llamada telefónica, WhatsApp o correo electrónico de distancia.",
    "services.global.title": "Acceso Global",
    "services.global.description":
      "Llegue a destinos remotos y disfrute de flexibilidad en los lugares de llegada y salida.",

    // Personalized Service
    "personalizedService.title": "Servicio Personalizado",
    "personalizedService.description":
      "En VGOLDEN JETS LLC, comprendemos que tu tiempo es tu activo más valioso. Como tu agente de chárter de aeronaves, nuestra obsesión es maximizar cada minuto de tu viaje, ya sea por negocios o placer. Con un experto dedicado a tu disposición, tu tiempo se convierte en nuestra prioridad desde el primer contacto. Registramos y recordamos tus preferencias para que encuentres a bordo tu bebida favorita, aperitivo o café perfecto, sin tener que pedirlo. Liberamos tu tiempo de cada pequeña gestión, para que te concentres en lo que realmente importa. Creemos que tu experiencia en jet privado debe alinearse impecablemente con tus necesidades y horarios únicos. Personalizamos cada detalle y adaptamos cada avión con precisión, porque tu tiempo no tiene precio y nuestra prioridad es que lo aproveches al máximo.",

    // Why Choose Us
    "reasons.title": "¿Por qué elegirnos?",
    "reasons.subtitle": "Experimente la diferencia con nuestro servicio premium",
    "reasons.luxury.title": "Lujo y Comodidad",
    "reasons.luxury.description":
      "Volar debe ser un placer y haremos que su experiencia de charter sea lo más lujosa y cómoda posible.",
    "reasons.discretion.title": "Discreción y Seguridad",
    "reasons.discretion.description":
      "Vgoldenjets garantiza su privacidad y trabajaremos estrechamente con su proveedor de seguridad en todos los aspectos de su charter.",
    "reasons.schedule.title": "Cree Su Horario",
    "reasons.schedule.description":
      "Conéctese con vuelos comerciales o vuele según su horario personalizado – cualesquiera que sean sus requisitos, crearemos el charter de jet privado que se adapte a usted.",
    "reasons.choice.title": "Elección de Aeronave",
    "reasons.choice.description":
      "Con acceso a 2500 aeronaves y 90 tipos diferentes de aeronaves, siempre encontraremos la aeronave adecuada para sus requisitos.",
    "reasons.cost.title": "Eficiencia de Costos",
    "reasons.cost.description":
      "Nuestro poder de compra y reputación nos permite encontrarle los mejores precios de charter de jet privado, asegurando que siempre reciba la solución más rentable.",

    // About
    "about.title": "Sobre Nosotros",
    "about.description1":
      "VGoldenjets proporciona servicios premium de charter de jets privados, atendiendo a clientes exigentes que valoran el lujo, la privacidad y la eficiencia en sus experiencias de viaje.",
    "about.description2":
      "Fundada con pasión por la excelencia en aviación, nuestro equipo aporta décadas de experiencia en la industria a cada vuelo. Mantenemos los más altos estándares de seguridad, servicio y discreción.",
    "about.description3":
      "Nuestro compromiso con el servicio personalizado significa que nos encargamos de cada detalle de su viaje, desde el transporte terrestre hasta las preferencias gastronómicas a bordo y alojamientos especiales.",
    "about.years": "Años de Experiencia",
    "about.hours": "Horas de Vuelo",
    "about.destinations": "Destinos Globales",
    "about.satisfaction": "Satisfacción del Cliente",

    // Fleet
    "fleet.title": "Nuestra Flota",
    "fleet.subtitle": "Explore nuestra colección de jets privados de lujo",
    "fleet.lightJets.title": "Jets Ligeros",
    "fleet.lightJets.description":
      "Los jets ligeros proporcionan un rango de vuelo de alrededor de tres a cinco horas, cubriendo aproximadamente 1,600 millas náuticas. Ideales para pistas cortas, estos jets son perfectos para viajes de negocios o vacaciones, ofreciendo fácil acceso a aeropuertos limitados.",
    "fleet.midSizeJets.title": "Jets de Tamaño Medio",
    "fleet.midSizeJets.description":
      "Los jets de tamaño medio típicamente proporcionan una duración de vuelo de cuatro a cinco horas, cubriendo aproximadamente 2,800 millas náuticas. Mientras que algunos son capaces de vuelos sin escalas de costa a costa, otros pueden requerir una breve parada para repostar. La versatilidad de los jets de tamaño medio los hace muy adecuados para viajes cómodos y convenientes de costa a costa.",
    "fleet.heavyJets.title": "Jets Pesados",
    "fleet.heavyJets.description":
      "Al seleccionar un charter de jet privado, los jets pesados destacan por su alcance extendido y mayor espacio interior en comparación con sus contrapartes más pequeñas. Para charters de jets VIP, también hay jets pesados de ultra largo alcance que proporcionan el pináculo del lujo, cerrando la brecha entre jets privados y aerolíneas ejecutivas.",
    "fleet.capacity": "Capacidad",
    "fleet.range": "Alcance",
    "fleet.speed": "Velocidad",
    "fleet.features": "Características",
    "fleet.availableJets": "Jets Privados Disponibles",
    "fleet.jetModels":
      "Global 6000, Gulfstream G650, Embraer Legacy 650, Falcon 7X, Gulfstream GIV, Hawker 800XP, Lear 60, Citation, Challenger 350, Embraer Legacy 500, Citation CJ3, Hawker 400XP, Phenom 300",

    // Popular Destinations
    "destinations.title": "Destinos Populares",
    "destinations.routes":
      "Miami a Nueva York, Miami a Los Ángeles, Los Ángeles a Nueva York, Nueva York a Los Ángeles, Nueva York a Las Vegas, Miami a Las Vegas, Miami a Aspen, Los Ángeles a Aspen, Nueva York a Aspen, Teterboro a Valle de Napa, Miami a Londres, Los Ángeles a Miami",

    // Contacto
    "contact.title": "Contáctenos",
    "contact.subtitle": "Comuníquese para soluciones de vuelo personalizadas",
    "contact.form.title": "Envíenos un Mensaje",
    "contact.form.fullName": "Nombre Completo",
    "contact.form.fullName.placeholder": "Su nombre completo",
    "contact.form.origin": "Origen (País/Estado)",
    "contact.form.origin.placeholder": "Ingrese país o estado de origen",
    "contact.form.destination": "Destino (País/Estado)",
    "contact.form.destination.placeholder": "Ingrese país o estado de destino",
    "contact.form.tripType": "Tipo de Viaje",
    "contact.form.tripType.placeholder": "Seleccione un tipo de viaje",
    "contact.form.tripType.oneWay": "Solo Ida",
    "contact.form.tripType.roundTrip": "Ida y Vuelta",
    "contact.form.departureDate": "Fecha de Ida",
    "contact.form.departureDate.placeholder": "Seleccione fecha de ida",
    "contact.form.returnDate": "Fecha de Vuelta",
    "contact.form.returnDate.placeholder": "Seleccione fecha de vuelta",
    "contact.form.passengers": "Cantidad de Pasajeros",
    "contact.form.passengers.placeholder": "Número de pasajeros",
    "contact.form.email": "Correo Electrónico",
    "contact.form.email.placeholder": "su@correo.com",
    "contact.form.phone": "Número de Teléfono",
    "contact.form.phone.placeholder": "+1 (xxx) xxx-xxxx",
    "contact.form.message": "Mensaje",
    "contact.form.message.placeholder":
      "Cuéntenos sobre sus necesidades de viaje...",
    "contact.form.submit": "Enviar Mensaje",
    "contact.info.title": "Información de Contacto",
    "contact.info.description":
      "¿Tiene preguntas o desea reservar su próximo vuelo? Contacte a nuestro equipo de expertos en aviación para recibir asistencia inmediata.",
    "contact.info.address.title": "Dirección de Oficina",
    "contact.info.address.content":
      "USA Fort Lauderdale Executive Airport ( fxe )",
    "contact.info.phone.title": "Teléfono USA",
    "contact.info.phone.title2": "Teléfono SOUTH AMERICA",
    "contact.info.email.title": "Correo Electrónico",
    "contact.info.hours.title": "Horario de Atención",
    "contact.info.hours.content":
      "Disponibilidad 24/7 para consultas de vuelos charter",
    "contact.hotline.title": "Línea Directa de Charter Privado",
    "contact.hotline.hours": "Disponible 24/7 para reservas urgentes",
    "contact.toast.title": "Mensaje enviado",
    "contact.toast.description":
      "Gracias por tu consulta. Te responderemos pronto.",

    // Footer
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.services": "Servicios",
    "footer.fleet": "Nuestra Flota",
    "footer.destinations": "Destinos",
    "footer.about": "Sobre Nosotros",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos de Servicio",
    "footer.ourServices": "Nuestros Servicios",
    "footer.privateJet": "Charter de Jet Privado",
    "footer.groupCharters": "Charters Grupales",
    "footer.vipConcierge": "Concierge VIP",
    "footer.luxuryGround": "Transporte Terrestre de Lujo",
    "footer.corporate": "Viajes Corporativos",
    "footer.contactUs": "Contáctenos",
    "footer.rights": "Todos los derechos reservados.",
    "footer.backToTop": "Volver arriba",
    "footer.companyInfo":
      "Experimente la aviación privada de lujo con una flota de aeronaves modernas y un servicio excepcional."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// --- Helpers de URL / normalización ---
function stripPrefix(pathname: string, prefix: "/en" | "/es"): string {
  if (pathname === prefix) return "/";
  return pathname.replace(new RegExp(`^\\${prefix}(?=\\/|$)`), "") || "/";
}

function addPrefix(pathname: string, prefix: "/en"): string {
  return pathname.startsWith(prefix) ? pathname : `${prefix}${pathname === "/" ? "" : pathname}`;
}

// Detecta idioma inicial: localStorage > URL (/en) > default "es"
function getInitialLanguage(): Language {
  if (typeof window !== "undefined") {
    const saved = window.localStorage.getItem("lang") as Language | null;
    if (saved === "en" || saved === "es") return saved;

    const path = window.location.pathname;
    if (path.startsWith("/en")) return "en";
  }
  return "es"; // default: ES
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Normaliza si entra con /es/... (no usamos /es como prefijo nunca)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pathname, search, hash } = window.location;
    if (pathname.startsWith("/es")) {
      const normalized = stripPrefix(pathname, "/es");
      window.history.replaceState({}, "", `${normalized}${search}${hash}`);
    }
  }, []);

  // Mantiene <html lang="">
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", language);
    }
  }, [language]);

  // setLanguage que además sincroniza la URL
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", lang);

      const { pathname, search, hash } = window.location;

      // Normalizá cualquier /es al entrar
      const withoutEs = stripPrefix(pathname, "/es");

      let newPath = withoutEs;

      const isMagazine =
        withoutEs.startsWith("/jetsmagazine") ||
        withoutEs.startsWith("/en/jetsmagazine");

      if (lang === "en") {
        // Solo prefijar /en para rutas del magazine
        newPath = isMagazine ? addPrefix(withoutEs, "/en") : withoutEs; // Index, Landing, etc.: no tocar URL
      } else {
        // Volver a ES: quitar /en siempre
        newPath = stripPrefix(withoutEs, "/en");
      }

      if (newPath !== pathname) {
        window.history.replaceState({}, "", `${newPath}${search}${hash}`);
      }
    }

    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
