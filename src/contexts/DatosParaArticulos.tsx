// @/contexts/DatosParaArticulos.ts
// Importo imágenes y las uso directo en los artículos (sin mapa de imágenes, sin tags)

import magazineHero from "@/img/527dfc_84ca4ea39e9147589e332ebe5810c677~mv2.gif";
import defaultHero from "@/img/img 2.webp";
import uno from "@/img/Articulos/miamiNewYork.webp";
import dos from "@/img/Articulos/CuántoCuesta.jpg";
import personas from "@/img/Articulos/8personas.jpg"
import bussines from "@/img/Articulos/bussines.png"
import ultimahora from "@/img/Articulos/ultimaHora.png"
import jetAeropuerto from "@/img/Articulos/jetaeropuerto.png"
import mexico from "@/img/Articulos/Mexico.jpg"
import avionEjecutivo from "@/img/Articulos/avionEjecutivo.jpg"
import charterNegociosLatam from "@/img/Articulos/charterNegociosLatam.jpg"
import emptyLegsArgentina from "@/img/Articulos/emptyLegsArgentina.jpg"
import jetCardPrevisibilidad from "@/img/Articulos/jetCardPrevisibilidad.jpg"
import seguridadBioseguridad from "@/img/Articulos/seguridadBioseguridad.jpg"
import accesoAeropuertosMenores from "@/img/Articulos/accesoAeropuertosMenores.jpg"

/*
import viajesFamiliaresConoSur from "@/img/Articulos/viajesFamiliaresConoSur.jpg"
import comparativaAccesoJet from "@/img/Articulos/comparativaAccesoJet.jpg"
import iaOptimizaVuelos from "@/img/Articulos/iaOptimizaVuelos.jpg"
import inversionVsGasto from "@/img/Articulos/inversionVsGasto.jpg"
import seguridadVuelosFamiliares from "@/img/Articulos/seguridadVuelosFamiliares.jpg"
*/

import { fromTheme } from "tailwind-merge";

export type Language = "en" | "es";

/** String localizado con fallback */
type LStr = Partial<Record<Language, string>> & { es?: string; en?: string };

const fallbackLang: Language = "es";
function lx(s: LStr, lang: Language): string {
  return (
    s?.[lang] ??
    s?.[fallbackLang] ??
    (s?.en ?? s?.es ?? Object.values(s || {}).find(Boolean)) ??
    ""
  );
}

export function selectArticles(lang: Language): ArticleView[] {
  return [...articlesJSON]            // clon para no mutar el original
    .reverse()                        // último agregado → primero
    .map((a) => projectArticle(lang, a));
}


/* ===========================
   META DE JETSMAGAZINE (HERO)
   =========================== */

interface MagazineMetaI18n {
  heroImage: string;
  title: LStr;
  subtitle: LStr;
  volver: LStr;
}

const magazine: MagazineMetaI18n = {
  heroImage: magazineHero,
  title: { es: "Jets Magazine", en: "Jets Magazine" },
  subtitle: {
    es: "Artículos, guías y novedades del mundo de los vuelos privados.",
    en: "Articles, guides and news from the world of private flights.",
  },
  volver: { es: "Volver", en: "Back" },
};

export function selectMagazineMeta(lang: Language) {
  return {
    heroImage: magazine.heroImage,
    title: lx(magazine.title, lang),
    subtitle: lx(magazine.subtitle, lang),
    volver: lx(magazine.volver, lang),
  };
}

/* ===========================
   ARTÍCULOS (ESTILO JSON)
   =========================== */

type JsonContentBlock =
  | { type: "h1"; text: LStr }
  | { type: "h2"; text: LStr }
  | { type: "h3"; text: LStr }
  | { type: "p"; text: LStr }
  | { type: "img"; src: string; alt?: LStr };

interface JsonArticle {
  slug: string;
  date: string;
  cover: string;
  title: LStr;
  subtitle: LStr;
  excerpt: LStr;
  content: JsonContentBlock[];
}

export type ContentBlock =
  | { type: "h1"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "img"; src: string; alt?: string };

export interface ArticleView {
  slug: string;
  date: string;
  dateMs: number;
  cover: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: ContentBlock[];
}

/* ===========================
   PROYECCIÓN
   =========================== */

function projectBlock(lang: Language, b: JsonContentBlock): ContentBlock {
  if (b.type === "img") {
    return {
      type: "img",
      src: b.src || defaultHero,
      alt: b.alt ? lx(b.alt, lang) : undefined,
    };
  }
  return { type: b.type, text: lx(b.text, lang) };
}

function projectArticle(lang: Language, a: JsonArticle): ArticleView {
  return {
    slug: a.slug,
    date: a.date,
    dateMs: Date.parse(a.date) || 0,
    cover: a.cover || defaultHero,
    title: lx(a.title, lang),
    subtitle: lx(a.subtitle, lang),
    excerpt: lx(a.excerpt, lang),
    content: a.content.map((b) => projectBlock(lang, b)),
  };
}

/* ===========================
   DATA (usando imports directo)
   =========================== */

const articlesJSON: JsonArticle[] = [
  //----------------------------------------------------------------------ARTICULO 1
  {
    slug: "vuelo-privado-miami-a-nueva-york",
    date: "2025-09-20",
    cover: uno,
    title: {
      es: "Vuelo privado de Miami a Nueva York: La máxima eficiencia para tu agenda",
      en: "Private flight from Miami to New York: The ultimate efficiency for your schedule",
    },
    subtitle: {
      es: "Olvídate de las largas colas y los horarios rígidos.",
      en: "Forget long queues and rigid schedules.",
    },
    excerpt: {
      es: "Cuando el tiempo es tu activo más valioso, un vuelo comercial de Miami a Nueva York no es una opción. Con Vgolden jets, te llevamos de manera directa, eficiente y en total privacidad, para que llegues a tu destino listo para conquistar la ciudad.",
      en: "When time is your most valuable asset, a commercial flight from Miami to New York is not an option. With Vgolden jets, we take you directly, efficiently, and in complete privacy, so you arrive at your destination ready to conquer the city.",
    },
    content: [
      { type: "p", text: { es: "Cuando el tiempo es tu activo más valioso, un vuelo comercial de Miami a Nueva York no es una opción. Con Vgolden jets, te llevamos de manera directa, eficiente y en total privacidad, para que llegues a tu destino listo para conquistar la ciudad.", en: "When time is your most valuable asset, a commercial flight from Miami to New York is not an option. With Vgolden jets, we take you directly, efficiently, and in complete privacy, so you arrive at your destination ready to conquer the city." } },
      { type: "img", src: uno },
      { type: "h2", text: { es: "Flexibilidad a tu medida", en: "Flexibility tailored to you" } },
      { type: "p", text: { es: "La flexibilidad es la clave. Tu agenda cambia y nosotros nos adaptamos. No te limites a los horarios fijos de las aerolíneas. Vuela cuando lo necesites, y llega a tu destino en el momento exacto.", en: "Flexibility is key. Your schedule changes and we adapt. Don't limit yourself to fixed airline schedules. Fly when you need to, and arrive at your destination at the exact moment." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 2
  {
    slug: "precio-charter-jet-privado",
    date: "2025-09-16",
    cover: dos,
    title: {
      es: "¿Cuánto cuesta un jet privado? Precios transparentes para tu charter",
      en: "How much does a private jet cost? Transparent pricing for your charter",
    },
    subtitle: {
      es: "El costo de un jet privado no es un gasto, sino una inversión en productividad.",
      en: "The cost of a private jet is not an expense, but an investment in productivity.",
    },
    excerpt: {
      es: "A diferencia de las tarifas escondidas, te ofrecemos una cotización transparente, eliminando sorpresas. Así, puedes planificar tu viaje sabiendo que el valor que obtienes supera el costo.",
      en: "Unlike hidden fees, we offer you a transparent quote, eliminating surprises. Thus, you can plan your trip knowing that the value you get exceeds the cost.",
    },
    content: [
      { type: "p", text: { es: "El costo de un jet privado no es un gasto, sino una inversión en productividad. A diferencia de las tarifas escondidas, te ofrecemos una cotización transparente, eliminando sorpresas. Así, puedes planificar tu viaje sabiendo que el valor que obtienes supera el costo.", en: "The cost of a private jet is not an expense, but an investment in productivity. Unlike hidden fees, we offer you a transparent quote, eliminating surprises. Thus, you can plan your trip knowing that the value you get exceeds the cost." } },
      { type: "img", src: dos },
      { type: "h2", text: { es: "Valoramos tu tiempo", en: "We value your time" } },
      { type: "p", text: { es: "Cada minuto que ahorras es valioso. Los retrasos, las esperas y las ineficiencias de los vuelos comerciales tienen un costo real. Con un charter privado, eliminas estos costos y maximizas tu tiempo productivo, lo que hace que la inversión sea justificable.", en: "Every minute you save is valuable. Delays, waits, and inefficiencies of commercial flights have a real cost. With a private charter, you eliminate these costs and maximize your productive time, which makes the investment justifiable." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 3
  {
    slug: "alquilar-jet-privado-para-8-personas",
    date: "2025-09-15",
    cover: personas,
    title: {
      es: "Alquila un jet privado para 8 personas: Espacio, comodidad y privacidad",
      en: "Rent a private jet for 8 people: Space, comfort and privacy",
    },
    subtitle: {
      es: "El espacio, la privacidad y la atención personalizada son nuestra prioridad.",
      en: "Space, privacy and personalized attention are our priority.",
    },
    excerpt: {
      es: "Ya sea un viaje de negocios en equipo o una escapada familiar, la experiencia debe ser cómoda y sin estrés. Nuestros jets para 8 pasajeros ofrecen un ambiente ideal para reuniones discretas o para disfrutar de un viaje en familia.",
      en: "Whether it's a business trip with a team or a family getaway, the experience should be comfortable and stress-free. Our jets for 8 passengers offer an ideal environment for discreet meetings or to enjoy a trip with family.",
    },
    content: [
      { type: "p", text: { es: "Ya sea un viaje de negocios en equipo o una escapada familiar, la experiencia debe ser cómoda y sin estrés. Nuestros jets para 8 pasajeros ofrecen un ambiente ideal para reuniones discretas o para disfrutar de un viaje en familia. El espacio, la privacidad y la atención personalizada son nuestra prioridad.", en: "Whether it's a business trip with a team or a family getaway, the experience should be comfortable and stress-free. Our jets for 8 passengers offer an ideal environment for discreet meetings or to enjoy a trip with family. Space, privacy and personalized attention are our priority." } },
      { type: "img", src: personas },
      { type: "h2", text: { es: "Reuniones en las nubes", en: "Meetings in the clouds" } },
      { type: "p", text: { es: "Utiliza el tiempo de vuelo para reuniones importantes con tu equipo, o simplemente para relajarte con tu familia. La cabina es tuya y la adaptamos para que tengas la mejor experiencia posible.", en: "Use flight time for important meetings with your team, or just to relax with your family. The cabin is yours and we adapt it so you have the best possible experience." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 4
  {
    slug: "charter-jet-privado-para-negocios",
    date: "2025-09-13",
    cover: bussines,
    title: {
      es: "Charter de jet privado para negocios: Tu oficina en las nubes",
      en: "Private jet charter for business: Your office in the clouds",
    },
    subtitle: {
      es: "Vuela a múltiples destinos con flexibilidad y en un entorno de trabajo productivo.",
      en: "Fly to multiple destinations with flexibility and in a productive work environment.",
    },
    excerpt: {
      es: "El tiempo es dinero, y los retrasos comerciales pueden ser costosos. Un jet privado te permite manejar tu agenda de negocios de manera eficiente, visitando múltiples ubicaciones en un solo día si es necesario.",
      en: "Time is money, and commercial delays can be costly. A private jet allows you to manage your business schedule efficiently, visiting multiple locations in a single day if needed.",
    },
    content: [
      { type: "p", text: { es: "El tiempo es dinero, y los retrasos comerciales pueden ser costosos. Un jet privado te permite manejar tu agenda de negocios de manera eficiente, visitando múltiples ubicaciones en un solo día si es necesario. Tu jet se convierte en una extensión de tu oficina, con todas las comodidades que necesitas para seguir siendo productivo.", en: "Time is money, and commercial delays can be costly. A private jet allows you to manage your business schedule efficiently, visiting multiple locations in a single day if needed. Your jet becomes an extension of your office, with all the amenities you need to stay productive." } },
      { type: "img", src: bussines },
      { type: "h2", text: { es: "Productividad sin límites", en: "Limitless productivity" } },
      { type: "p", text: { es: "Un jet privado te da el control total sobre tu tiempo. Elige tus horarios de salida, rutas y destinos, lo que es ideal para ejecutivos que necesitan llegar a múltiples lugares rápidamente.", en: "A private jet gives you total control over your time. Choose your own departure times, routes, and destinations, which is ideal for executives who need to get to multiple places quickly." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 5
  {
    slug: "vuelo-privado-de-ultima-hora",
    date: "2025-09-11",
    cover: ultimahora,
    title: {
      es: "¿Necesitas un vuelo privado de última hora? Estamos listos para ti",
      en: "Need a last-minute private flight? We are ready for you",
    },
    subtitle: {
      es: "Tu agenda cambia y nosotros nos adaptamos.",
      en: "Your schedule changes and we adapt.",
    },
    excerpt: {
      es: "La vida no se detiene, y tampoco debería tu capacidad para moverte. Nuestro servicio de vuelos de último minuto está diseñado para darte la flexibilidad que los vuelos comerciales no pueden.",
      en: "Life doesn't stop, and neither should your ability to move. Our last-minute flight service is designed to give you the flexibility that commercial flights cannot.",
    },
    content: [
      { type: "p", text: { es: "La vida no se detiene, y tampoco debería tu capacidad para moverte. Nuestro servicio de vuelos de último minuto está diseñado para darte la flexibilidad que los vuelos comerciales no pueden. Solo necesitas una llamada para que todo el equipo se active y tu jet esté listo para el despegue.", en: "Life doesn't stop, and neither should your ability to move. Our last-minute flight service is designed to give you the flexibility that commercial flights cannot. You just need a call for the entire team to activate and your jet to be ready for takeoff." } },
      { type: "img", src: ultimahora },
      { type: "h2", text: { es: "Libertad y conveniencia", en: "Freedom and convenience" } },
      { type: "p", text: { es: "A diferencia de las aerolíneas comerciales, un jet privado ofrece una flexibilidad sin igual, lo que te permite elegir tus propios horarios de salida, rutas y destinos.", en: "Unlike commercial airlines, a private jet offers unparalleled flexibility, allowing you to choose your own departure times, routes, and destinations." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 6
  {
    slug: "vuelos-privados-tramo-vacio",
    date: "2025-09-10",
    cover: jetAeropuerto,
    title: {
      es: "Vuelos privados de tramo vacío: Lujo accesible y responsable",
      en: "Empty leg private flights: Accessible and responsible luxury",
    },
    subtitle: {
      es: "Aprovecha las tarifas especiales de nuestros vuelos de tramo vacío.",
      en: "Take advantage of special rates on our empty leg flights.",
    },
    excerpt: {
      es: "Nuestros vuelos de tramo vacío son una forma inteligente de disfrutar de la experiencia de la aviación privada, optimizando costos sin comprometer el servicio.",
      en: "Our empty leg flights are a smart way to enjoy the private aviation experience, optimizing costs without compromising on service.",
    },
    content: [
      { type: "p", text: { es: "Nuestros vuelos de tramo vacío son una forma inteligente de disfrutar de la experiencia de la aviación privada, optimizando costos sin comprometer el servicio. Es la puerta de entrada perfecta para quienes buscan la privacidad y eficiencia de un jet privado a un precio más atractivo.", en: "Our empty leg flights are a smart way to enjoy the private aviation experience, optimizing costs without compromising on service. It's the perfect entry point for those seeking the privacy and efficiency of a private jet at a more attractive price." } },
      { type: "img", src: jetAeropuerto },
      { type: "h2", text: { es: "La puerta de entrada a la aviación privada", en: "The gateway to private aviation" } },
      { type: "p", text: { es: "Este modelo de negocio, también conocido como 'empty legs', se considera la puerta de entrada más flexible al mundo de la aviación privada.", en: "This business model, also known as 'empty legs', is considered the most flexible gateway to the world of private aviation." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 7
  {
    slug: "costo-jet-privado-mexico-a-los-angeles",
    date: "2025-09-03",
    cover: mexico,
    title: {
      es: "Vuelo privado de México a Los Ángeles: Una conexión sin igual",
      en: "Private flight from Mexico to Los Angeles: An unparalleled connection",
    },
    subtitle: {
      es: "Viaja entre México y Los Ángeles con la comodidad y eficiencia de un jet privado.",
      en: "Travel between Mexico and Los Angeles with the comfort and efficiency of a private jet.",
    },
    excerpt: {
      es: "Con la creciente conexión entre México y Los Ángeles, la demanda de viajes eficientes es mayor que nunca. Evita las fronteras y los largos procesos comerciales. Te ofrecemos un servicio de puerta a puerta que prioriza tu tiempo y seguridad.",
      en: "With the growing connection between Mexico and Los Angeles, the demand for efficient travel is higher than ever. Avoid borders and long commercial processes. We offer a door-to-door service that prioritizes your time and safety.",
    },
    content: [
      { type: "p", text: { es: "Con la creciente conexión entre México y Los Ángeles, la demanda de viajes eficientes es mayor que nunca. Evita las fronteras y los largos procesos comerciales. Te ofrecemos un servicio de puerta a puerta que prioriza tu tiempo y seguridad.", en: "With the growing connection between Mexico and Los Angeles, the demand for efficient travel is higher than ever. Avoid borders and long commercial processes. We offer a door-to-door service that prioritizes your time and safety." } },
      { type: "img", src: mexico },
      { type: "h2", text: { es: "Un mercado en crecimiento", en: "A growing market" } },
      { type: "p", text: { es: "El mercado latinoamericano se proyecta con un crecimiento acelerado, con una Tasa Compuesta Anual (CAGR) del 15.66% hasta 2029.", en: "The Latin American market is projected to have an accelerated growth, with a Compound Annual Growth Rate (CAGR) of 15.66% until 2029." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 8
  {
    slug: "charter-negocios-latam-rutas",
    date: "2025-10-22",
    cover: avionEjecutivo,
    title: {
      es: "La Ruta de Negocios Inteligente: Vuelos Chárter en América Latina sin demoras comerciales",
      en: "The Smart Business Route: Charter Flights in Latin America without Commercial Delays",
    },
    subtitle: {
      es: "Maximice la eficiencia de su agenda: Vuelos chárter ejecutivos en Buenos Aires, Santiago y São Paulo. Su tiempo es su activo más valioso.",
      en: "Maximize your agenda's efficiency: Executive charter flights in Buenos Aires, Santiago, and São Paulo. Your time is your most valuable asset.",
    },
    excerpt: {
      es: "América Latina está experimentando un dinamismo considerablemente mayor que el promedio global en la aviación. Le ofrecemos la herramienta estratégica esencial para gestionar agendas complejas en Argentina y más allá, asegurando control y puntualidad.",
      en: "Latin America is experiencing considerably greater dynamism than the global average in aviation. We offer you the essential strategic tool for managing complex agendas in Argentina and beyond, ensuring control and punctuality.",
    },
    content: [
      { type: "p", text: { es: "América Latina, con una proyección de crecimiento del mercado de aviones comerciales alcanzando los USD 1,310 millones para 2029, se ha consolidado como una región prioritaria para los negocios y la inversión. La eficiencia es la clave en este auge. Los viajes aéreos comerciales tradicionales simplemente no satisfacen la necesidad de flexibilidad y rapidez de los ejecutivos y líderes corporativos. Nuestro servicio de chárter elimina los largos periodos de espera y el control limitado sobre el itinerario, elementos característicos de la experiencia comercial.", en: "Latin America, with a projected commercial aircraft market growth reaching USD 1.31 billion by 2029, has been consolidated as a priority region for business and investment. Efficiency is the key to this boom. Traditional commercial air travel simply does not meet the flexibility and speed requirements of executives and corporate leaders. Our charter service eliminates long waiting periods and limited control over the itinerary, characteristic elements of the commercial experience." } },
      { type: "img", src: avionEjecutivo },
      { type: "h2", text: { es: "Por qué el Jet Privado es una Herramienta, no un Lujo, en Latam", en: "Why the Private Jet is a Tool, Not a Luxury, in Latam" } },
      { type: "p", text: { es: "Para los multimillonarios y altos funcionarios, la aeronave se percibe como una herramienta estratégica indispensable para gestionar agendas complejas y proteger la privacidad. En el contexto del auge de las economías emergentes de la región, esta percepción es aún más aguda: la aviación privada es vista como una herramienta esencial para la eficiencia y el estatus. Con Vgolden jets, usted garantiza un proceso de embarque y seguridad considerablemente más rápido, lo cual transforma el tiempo perdido en tiempo productivo. Nos enfocamos en ofrecer una solución financiera y logística que minimiza los costos de oportunidad de los viajes comerciales.", en: "For billionaires and high-ranking officials, the aircraft is perceived as an indispensable strategic tool for managing complex agendas and protecting privacy. In the context of the region's emerging economies boom, this perception is even sharper: private aviation is seen as an essential tool for efficiency and status. With Vgolden jets, you guarantee a considerably faster boarding and security process, which transforms lost time into productive time. We focus on offering a financial and logistical solution that minimizes the opportunity costs of commercial travel." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 9
  {
    slug: "charter-negocios-latam-rutas",
    date: "2025-10-14",
    cover: charterNegociosLatam,
    title: {
      es: "La Ruta de Negocios Inteligente: Vuelos Chárter en América Latina sin demoras comerciales",
      en: "The Smart Business Route: Charter Flights in Latin America without Commercial Delays",
    },
    subtitle: {
      es: "Maximice la eficiencia de su agenda: Vuelos chárter ejecutivos en Buenos Aires, Santiago y São Paulo. Su tiempo es su activo más valioso.",
      en: "Maximize your agenda's efficiency: Executive charter flights in Buenos Aires, Santiago, and São Paulo. Your time is your most valuable asset.",
    },
    excerpt: {
      es: "América Latina está experimentando un dinamismo considerablemente mayor que el promedio global en la aviación. Le ofrecemos la herramienta estratégica esencial para gestionar agendas complejas en Argentina y más allá, asegurando control y puntualidad.",
      en: "Latin America is experiencing considerably greater dynamism than the global average in aviation. We offer you the essential strategic tool for managing complex agendas in Argentina and beyond, ensuring control and punctuality.",
    },
    content: [
      { type: "p", text: { es: "América Latina, con una proyección de crecimiento del mercado de aviones comerciales alcanzando los USD 1,310 millones para 2029, se ha consolidado como una región prioritaria para los negocios y la inversión. La eficiencia es la clave en este auge. Los viajes aéreos comerciales tradicionales simplemente no satisfacen la necesidad de flexibilidad y rapidez de los ejecutivos y líderes corporativos. Nuestro servicio de chárter elimina los largos periodos de espera y el control limitado sobre el itinerario, elementos característicos de la experiencia comercial, ofreciendo una ventaja competitiva inmediata.", en: "Latin America, with a projected commercial aircraft market growth reaching USD 1.31 billion by 2029, has been consolidated as a priority region for business and investment. Efficiency is the key to this boom. Traditional commercial air travel simply does not meet the flexibility and speed requirements of executives and corporate leaders. Our charter service eliminates long waiting periods and limited control over the itinerary, characteristic elements of the commercial experience, offering an immediate competitive advantage." } },
      { type: "img", src: charterNegociosLatam },
      { type: "h2", text: { es: "Por qué el Jet Privado es una Herramienta, no un Lujo, en Latam", en: "Why the Private Jet is a Tool, Not a Luxury, in Latam" } },
      { type: "p", text: { es: "Para los multimillonarios y altos funcionarios, la aeronave se percibe como una herramienta estratégica indispensable para gestionar agendas complejas y proteger la privacidad. En el contexto del auge de las economías emergentes de la región, esta percepción es aún más aguda: la aviación privada es vista como una herramienta esencial para la eficiencia y el estatus. Con Vgolden jets, usted garantiza un proceso de embarque y seguridad considerablemente más rápido, lo cual transforma el tiempo perdido en tiempo productivo. Nos enfocamos en ofrecer una solución financiera y logística que minimiza los costos de oportunidad de los viajes comerciales.", en: "For billionaires and high-ranking officials, the aircraft is perceived as an indispensable strategic tool for managing complex agendas and protecting privacy. In the context of the region's emerging economies boom, this perception is even sharper: private aviation is seen as an essential tool for efficiency and status. With Vgolden jets, you guarantee a considerably faster boarding and security process, which transforms lost time into productive time. We focus on offering a financial and logistical solution that minimizes the opportunity costs of commercial travel." } },
    ],
  },

  {
    slug: "empty-legs-argentina-acceso-smart",
    date: "2025-10-12",
    cover: emptyLegsArgentina,
    title: {
      es: "Vuelos de Tramo Vacío (Empty Legs) en Argentina: El Acceso *Smart* a la Aviación Privada",
      en: "Empty Legs Flights in Argentina: The Smart Access to Private Aviation",
    },
    subtitle: {
      es: "Un servicio de alta gama a un costo más accesible. Descubra cómo los 'Empty Legs' son la puerta de entrada flexible para nuevos usuarios en el Cono Sur.",
      en: "A high-end service at a more accessible cost. Discover how 'Empty Legs' are the flexible gateway for new users in the Southern Cone.",
    },
    excerpt: {
      es: "Promocionar los vuelos de tramo vacío es una vía de entrada inteligente para clientes que buscan el lujo y la eficiencia de un jet privado a un costo significativamente reducido. Es la oportunidad perfecta para experimentar el servicio Vgolden jets en Argentina.",
      en: "Promoting empty legs flights is a smart gateway for customers seeking the luxury and efficiency of a private jet at a significantly reduced cost. It's the perfect opportunity to experience the Vgolden jets service in Argentina.",
    },
    content: [
      { type: "p", text: { es: "El concepto de 'Empty Legs' (tramos vacíos) ofrece un valor inigualable para atraer a un segmento de clientes que busca un servicio de alta gama a un costo más accesible, sirviendo como una vía de entrada para nuevos usuarios. Estos vuelos ocurren cuando un avión necesita reposicionarse para un próximo viaje. Para Vgolden jets, representa una oportunidad de optimización logística; para usted, es la flexibilidad de un chárter con un descuento sustancial. Un buen corredor aéreo puede obtener opciones más rentables, especialmente aprovechando los vuelos de 'tramo vacío'. Es una decisión financiera inteligente para quien prioriza la calidad sin el compromiso de una Tarjeta de Horas.", en: "The 'Empty Legs' concept offers unparalleled value to attract a segment of clients seeking a high-end service at a more accessible cost, serving as a gateway for new users. These flights occur when an aircraft needs to reposition for a subsequent journey. For Vgolden jets, it represents a logistical optimization opportunity; for you, it is the flexibility of a charter with a substantial discount. A good air broker can secure more profitable options, especially by leveraging 'empty legs' flights. It's a smart financial decision for those prioritizing quality without the commitment of an Hour Card." } },
      { type: "img", src: emptyLegsArgentina },
      { type: "h2", text: { es: "El Modelo Chárter: La Puerta de Entrada Flexible para Argentina", en: "The Charter Model: The Flexible Gateway for Argentina" } },
      { type: "p", text: { es: "El modelo Chárter (alquiler por viaje) es ideal para aquellos que vuelan menos de 50 horas al año. Es la opción más flexible, ya que el cliente alquila una aeronave para un viaje específico, sin necesidad de una compra o un compromiso a largo plazo. Al aprovechar los tramos vacíos, esta opción se considera la puerta de entrada más flexible al mundo de la aviación privada. Al centrar la comunicación en la eficiencia y la personalización, ofrecemos un valor intrínseco: el jet privado como la máxima expresión de control, lo que permite a los clientes dedicar más tiempo a las cosas que realmente importan.", en: "The Charter model (rental per trip) is ideal for those flying less than 50 hours a year. It is the most flexible option, as the client rents an aircraft for a specific trip, without the need for a purchase or long-term commitment. By taking advantage of empty legs, this option is considered the most flexible gateway to the world of private aviation. By focusing communication on efficiency and personalization, we offer intrinsic value: the private jet as the ultimate expression of control, allowing clients to dedicate more time to the things that truly matter." } },
    ],
  },
  {
    slug: "jet-card-previsibilidad-sudamerica",
    date: "2025-10-10",
    cover: jetCardPrevisibilidad,
    title: {
      es: "Inversión Logística: Por qué la Tarjeta de Horas es la clave para la previsibilidad en Sudamérica",
      en: "Logistical Investment: Why the Hour Card is the Key to Predictability in South America",
    },
    subtitle: {
      es: "Elimine la incertidumbre. La Tarjeta de Horas (Jet Card) ofrece tarifas fijas y disponibilidad garantizada, esencial para la gestión de su tiempo en un mercado dinámico.",
      en: "Eliminate uncertainty. The Hour Card (Jet Card) offers fixed rates and guaranteed availability, essential for managing your time in a dynamic market.",
    },
    excerpt: {
      es: "En un mercado con crecimientos acelerados como América Latina, la previsibilidad de costos y servicios es un activo de negocios esencial. El modelo Jet Card es el punto intermedio ideal, diseñado para la consistencia y la eliminación de costos ocultos.",
      en: "In a market with accelerated growth like Latin America, the predictability of costs and services is an essential business asset. The Jet Card model is the ideal midpoint, designed for consistency and the elimination of hidden costs.",
    },
    content: [
      { type: "p", text: { es: "Para ejecutivos y viajeros que vuelan menos de 50 horas al año pero requieren una mayor previsibilidad y consistencia, el modelo de Tarjeta de Horas (Jet Card) es la solución logística superior. Los clientes compran horas de vuelo prepagadas a una tarifa fija, lo cual elimina costos ocultos inesperados, como los cargos de posicionamiento. Esto es particularmente valioso en América Latina, donde la flexibilidad en el tipo de aeronave, sin un compromiso financiero a largo plazo, se alinea perfectamente con la gestión financiera de alto nivel. La Tarjeta de Horas se posiciona como una 'billetera de horas' que garantiza su tarifa y disponibilidad, un pilar de la eficiencia ejecutiva.", en: "For executives and travelers who fly less than 50 hours a year but require greater predictability and consistency, the Hour Card (Jet Card) model is the superior logistical solution. Clients purchase prepaid flight hours at a fixed rate, which eliminates unexpected hidden costs, such as positioning fees. This is particularly valuable in Latin America, where flexibility in aircraft type, without a long-term financial commitment, aligns perfectly with high-level financial management. The Hour Card is positioned as an 'hour wallet' that guarantees your rate and availability, a pillar of executive efficiency." } },
      { type: "img", src: jetCardPrevisibilidad },
      { type: "h2", text: { es: "Previsibilidad vs. Propiedad: La Decisión Racional", en: "Predictability vs. Ownership: The Rational Decision" } },
      { type: "p", text: { es: "La decisión de utilizar la aviación privada es una transacción meditada y racional. El Jet Card ofrece la máxima previsibilidad de precios y disponibilidad garantizada, sin la carga logística y el compromiso a largo plazo (3-5 años) de la propiedad fraccionada. Al presentar una solución que apela a la lógica y a la eficiencia, reencuadramos la inversión como una herramienta estratégica de productividad, permitiendo a los clientes gestionar sus agendas globales con una eficiencia inigualable. Esto le da control presupuestario y operativo.", en: "The decision to use private aviation is a thoughtful and rational transaction. The Jet Card offers maximum price predictability and guaranteed availability, without the logistical burden and long-term commitment (3-5 years) of fractional ownership. By presenting a solution that appeals to logic and efficiency, we reframe the investment as a strategic productivity tool, allowing clients to manage their global agendas with unparalleled efficiency. This gives you budgetary and operational control." } },
    ],
  },
  {
    slug: "seguridad-bioseguridad-vuelos-latam",
    date: "2025-10-05",
    cover: seguridadBioseguridad,
    title: {
      es: "Seguridad y Bioseguridad en sus Vuelos a Sudamérica: La Prioridad de Vgolden jets",
      en: "Safety and Biosecurity on Your Flights to South America: The Priority of Vgolden jets",
    },
    subtitle: {
      es: "Garantice un entorno controlado, higiénico y privado en sus viajes. La seguridad es una consideración fundamental para el público de alto patrimonio.",
      en: "Guarantee a controlled, hygienic, and private environment on your trips. Safety is a fundamental consideration for the high-net-worth public.",
    },
    excerpt: {
      es: "La privacidad y la seguridad son consideraciones fundamentales para el viajero ejecutivo y familiar. Un jet privado elimina la exposición a grandes multitudes y ofrece un ambiente higiénico que es un punto de venta decisivo, especialmente en la región.",
      en: "Privacy and security are fundamental considerations for the executive and family traveler. A private jet eliminates exposure to large crowds and offers a hygienic environment that is a decisive selling point, especially in the region.",
    },
    content: [
      { type: "p", text: { es: "La pandemia de COVID-19 aceleró el uso de jets privados, impulsado por la necesidad de seguridad y bioseguridad. La industria experimentó un crecimiento de casi un 20% a nivel mundial. Hoy, esta necesidad se ha consolidado. Los jets privados no solo se limpian y desinfectan minuciosamente después de cada vuelo, sino que también eliminan la exposición a grandes multitudes. Esto se ha convertido en un punto de venta importante, especialmente para aquellos clientes más conscientes de la salud y el bienestar de su familia. Volar con Vgolden jets significa elegir un entorno de cabina con menos puntos de contacto y procesos de embarque simplificados en terminales privadas (FBOs).", en: "The COVID-19 pandemic accelerated the use of private jets, driven by the need for security and biosecurity. The industry experienced nearly 20% growth globally. Today, this need has been consolidated. Private jets are not only thoroughly cleaned and disinfected after every flight, but they also eliminate exposure to large crowds. This has become an important selling point, especially for those more health-conscious clients and their family's well-being. Flying with Vgolden jets means choosing a cabin environment with fewer contact points and simplified boarding processes at private terminals (FBOs)." } },
      { type: "img", src: seguridadBioseguridad },
      { type: "h2", text: { es: "El Entorno Controlado: Un Valor Inigualable para su Familia", en: "The Controlled Environment: An Unrivaled Value for Your Family" } },
      { type: "p", text: { es: "La seguridad se extiende al control total del entorno. En un vuelo comercial, los pasajeros están expuestos a grandes multitudes y a un entorno menos controlable. Los jets privados, por el contrario, garantizan un ambiente con menos ocupantes y el control total sobre quién viaja a bordo. Este control se percibe como una necesidad práctica para los viajeros frecuentes, ya que protege la seguridad personal y familiar. Esto nos permite apelar a las emociones de nuestros clientes, destacando la seguridad y la comodidad de un entorno familiar y controlado en sus viajes por Sudamérica, sin las fricciones de los aeropuertos comerciales.", en: "Safety extends to total control of the environment. In a commercial flight, passengers are exposed to large crowds and a less controllable environment. Private jets, on the contrary, guarantee an environment with fewer occupants and total control over who travels onboard. This control is perceived as a practical necessity for frequent travelers, as it ensures personal and family safety. This allows us to appeal to our clients' emotions, highlighting the safety and comfort of a family-friendly and controlled environment on their South American travels, without the friction of commercial airports." } },
    ],
  },
  {
    slug: "acceso-aeropuertos-menores-latam",
    date: "2025-10-03",
    cover: accesoAeropuertosMenores,
    title: {
      es: "Más Allá de Buenos Aires: Acceso a Aeropuertos Menores Clave para el Negocio Regional",
      en: "Beyond Buenos Aires: Access to Key Smaller Airports for Regional Business",
    },
    subtitle: {
      es: "Su destino es su decisión. La flexibilidad de la aviación privada se traduce en acceso directo a miles de aeropuertos, una ventaja logística crucial en Sudamérica.",
      en: "Your destination is your decision. The flexibility of private aviation translates into direct access to thousands of airports, a crucial logistical advantage in South America.",
    },
    excerpt: {
      es: "La aviación privada ofrece una flexibilidad sin igual, permitiendo a los clientes elegir sus propios horarios, rutas y destinos. Esto es ideal para ejecutivos que necesitan llegar a múltiples lugares rápidamente, especialmente en regiones con infraestructura comercial limitada.",
      en: "Private aviation offers unparalleled flexibility, allowing clients to choose their own schedules, routes, and destinations. This is ideal for executives who need to reach multiple locations quickly, especially in regions with limited commercial infrastructure.",
    },
    content: [
      { type: "p", text: { es: "Una de las propuestas de valor más significativas del jet privado es la capacidad de acceder a miles de aeropuertos que no están disponibles para los vuelos comerciales. Esto es vital para un ejecutivo con una agenda global, ya que le permite llegar directamente a centros de producción o reuniones estratégicas sin las largas conexiones terrestres o los tiempos de espera asociados con los grandes *hubs* comerciales. El acceso a aeropuertos más pequeños y a Terminales de Aviación General (FBO) contribuye a una experiencia más fluida y menos estresante, clave para la optimización de negocios en el Cono Sur, maximizando el tiempo productivo.", en: "One of the most significant value propositions of the private jet is the ability to access thousands of airports that are not available to commercial flights. This is vital for an executive with a global agenda, as it allows them to arrive directly at production centers or strategic meetings without the long ground connections or waiting times associated with large commercial hubs. Access to smaller airports and General Aviation Terminals (FBOs) contributes to a smoother and less stressful experience, key to optimizing business in the Southern Cone, maximizing productive time." } },
      { type: "img", src: accesoAeropuertosMenores },
      { type: "h2", text: { es: "Flexibilidad y Control: Optimización de Rutas en el Cono Sur", en: "Flexibility and Control: Route Optimization in the Southern Cone" } },
      { type: "p", text: { es: "Para un viajero de negocios en América Latina, la flexibilidad que ofrece Vgolden jets es insuperable. Puede elegir sus propios horarios de salida, rutas y destinos, eliminando los puntos de dolor de productividad como los horarios rígidos y los aeropuertos limitados del viaje comercial. Esto se traduce en la posibilidad de gestionar agendas globales y optimizar el tiempo productivo, consolidando al jet privado no como un capricho, sino como una herramienta estratégica e indispensable para el crecimiento regional y la agilidad corporativa. Nuestra flota está optimizada para la geografía latinoamericana.", en: "For a business traveler in Latin America, the flexibility offered by Vgolden jets is insurmountable. You can choose your own departure times, routes, and destinations, eliminating the productivity pain points such as rigid schedules and limited airports of commercial travel. This translates into the possibility of managing global agendas and optimizing productive time, consolidating the private jet not as a whim, but as an indispensable strategic tool for regional growth and corporate agility. Our fleet is optimized for the Latin American geography." } },
    ],
  },
  /*  
  //----------------------------------------------------------------------ARTICULO 
  {
    slug: "viajes-familiares-cono-sur-exclusivos",
    date: "2025-09-03",
    cover: viajesFamiliaresConoSur,
    title: {
      es: "La Experiencia del 91%: Viajar en Jet Privado con Amigos y Familiares en el Cono Sur",
      en: "The 91% Experience: Traveling on a Private Jet with Friends and Family in the Southern Cone",
    },
    subtitle: {
      es: "El jet privado como plataforma de experiencias familiares seguras e inolvidables. Viaje con sus seres queridos, incluyendo sus mascotas VIP, a destinos exclusivos de Sudamérica.",
      en: "The private jet as a platform for safe and unforgettable family experiences. Travel with your loved ones, including your VIP pets, to exclusive South American destinations.",
    },
    excerpt: {
      es: "Un dato contundente para nuestra estrategia de marketing: un abrumador 91% de los usuarios de jets privados vuelan con amigos y familiares. El valor va más allá de la productividad; es crear experiencias familiares seguras, privadas e inolvidables.",
      en: "A compelling fact for our marketing strategy: an overwhelming 91% of private jet users fly with friends and family. The value goes beyond productivity; it is about creating safe, private, and unforgettable family experiences.",
    },
    content: [
      { type: "p", text: { es: "El perfil del cliente ha evolucionado: la aviación privada ya no es un servicio exclusivo para el viajero de negocios solitario, sino una extensión de su esfera personal. Un 38% de los encuestados utiliza la aviación privada por motivos personales, y un 31% para una combinación de uso personal y de negocios. La decisión de volar privado se extiende a la familia y, en ocasiones, incluso a las mascotas, que son mencionadas como compañeros de vuelo VIP. Esto posiciona al jet privado como una plataforma para experiencias personales y familiares de alto valor emocional, libre de las tensiones del tráfico aéreo comercial.", en "The client profile has evolved: private aviation is no longer an exclusive service for the solitary business traveler, but an extension of their personal sphere. 38% of respondents use private aviation for personal reasons, and 31% for a combination of personal and business use. The decision to fly private extends to the family and, at times, even to pets, which are mentioned as VIP flight companions. This positions the private jet as a platform for personal and family experiences of high emotional value, free from the tensions of commercial air traffic." } },
      { type: "img", src: viajesFamiliaresConoSur },
      { type: "h2", text: { es: "Seguridad y Confort Familiar en Cada Detalle", en "Safety and Family Comfort in Every Detail" } },
      { type: "p", text: { es: "Los mensajes de marketing deben apelar a estas emociones, destacando la seguridad y la comodidad de un entorno familiar y controlado. Eliminamos la exposición a multitudes y las tensiones logísticas, transformando el viaje en parte de las vacaciones. Para el cliente, el jet privado es un entorno privado y familiar con control sobre quién viaja a bordo, y un ambiente menos estresante. Vgolden jets ofrece la tranquilidad de que sus seres queridos están en el entorno más seguro y personalizado al viajar a la Patagonia, Punta del Este o cualquier destino exclusivo en Sudamérica.", en "Marketing messages must appeal to these emotions, highlighting the safety and comfort of a family-friendly and controlled environment. We eliminate exposure to crowds and logistical tensions, transforming the journey into part of the vacation. For the client, the private jet is a private and family-friendly environment with control over who travels onboard, and a less stressful atmosphere. Vgolden jets offers the peace of mind that your loved ones are in the safest and most personalized environment when traveling to Patagonia, Punta del Este, or any exclusive destination in South America." } },
    ],
  },
  {
    slug: "comparativa-acceso-ejecutivo-latam",
    date: "2025-09-03",
    cover: comparativaAccesoJet,
    title: {
      es: "Propiedad Fraccionada vs. Chárter: El Análisis de Costo-Beneficio para el Ejecutivo Latinoamericano",
      en: "Fractional Ownership vs. Charter: The Cost-Benefit Analysis for the Latin American Executive",
    },
    subtitle: {
      es: "Una evaluación racional de costos y beneficios. Descubra qué modelo de acceso se adapta mejor a su frecuencia de vuelo y objetivos logísticos en el Cono Sur.",
      en: "A rational evaluation of costs and benefits. Discover which access model best suits your flight frequency and logistical objectives in the Southern Cone.",
    },
    excerpt: {
      es: "La decisión de compra en la aviación privada es un proceso complejo que requiere una evaluación exhaustiva de los costos frente a los beneficios. Para los ejecutivos de alto nivel, la elección es una solución financiera y logística.",
      en: "The purchasing decision in private aviation is a complex process that requires an exhaustive evaluation of costs versus benefits. For high-level executives, the choice is a financial and logistical solution.",
    },
    content: [
      { type: "p", text: { es: "El mercado ofrece múltiples modelos de negocio que se adaptan a las distintas necesidades y frecuencias de vuelo. La propiedad fraccionada es el modelo más adecuado para usuarios de alta frecuencia, que vuelan más de 100 horas al año. Requiere una inversión inicial significativa (por ejemplo, USD 500,000 para un jet ligero) y un compromiso a largo plazo de 3 a 5 años. A cambio, ofrece disponibilidad garantizada y la liberación de la carga de mantenimiento y logística, ideal para corporaciones con rutas fijas y un alto volumen de viajes transcontinentales.", en: "The market offers multiple business models that adapt to different needs and flight frequencies. Fractional ownership is the most suitable model for high-frequency users, who fly more than 100 hours a year. It requires a significant initial investment (e.g., USD 500,000 for a light jet) and a long-term commitment of 3 to 5 years. In return, it offers guaranteed availability and relief from the burden of maintenance and logistics, ideal for corporations with fixed routes and a high volume of transcontinental travel." } },
      { type: "img", src: comparativaAccesoJet },
      { type: "h2", text: { es: "El Poder del Chárter y la Tarjeta de Horas", en: "The Power of Charter and the Hour Card" } },
      { type: "p", text: { es: "Para quienes vuelan menos de 50 horas al año, el chárter (alquiler por viaje) o la Tarjeta de Horas (Jet Card) son opciones más flexibles. El chárter ofrece libertad y pago por uso. La evidencia sugiere que, con un buen corredor, el chárter puede ser tan confiable y significativamente más rentable, especialmente para vuelos internacionales esporádicos. El especialista en marketing debe educar al cliente sobre las ventajas comparativas, posicionando a Vgolden jets como un asesor estratégico que ayuda al cliente a navegar por las complejidades del mercado para encontrar la solución de mayor valor, ajustándose a la realidad operativa del ejecutivo latinoamericano.", en "For those flying less than 50 hours a year, charter (rental per trip) or the Hour Card (Jet Card) are more flexible options. Charter offers freedom and pay-per-use. Evidence suggests that, with a good broker, charter can be just as reliable and significantly more profitable, especially for sporadic international flights. The marketing specialist must educate the client about the comparative advantages, positioning Vgolden jets as a strategic advisor who helps the client navigate the complexities of the market to find the highest-value solution, adjusting to the operational reality of the Latin American executive." } },
    ],
  },
  {
    slug: "ia-eficiencia-vuelos-vgoldenjets",
    date: "2025-09-03",
    cover: iaOptimizaVuelos,
    title: {
      es: "¿Cómo la IA Optimiza su Vuelo en Vgolden jets? (Mantenimiento Predictivo y Rutas)",
      en: "How Does AI Optimize Your Flight at Vgolden jets? (Predictive Maintenance and Routes)",
    },
    subtitle: {
      es: "La inteligencia artificial es un motor de transformación ya integrado, mejorando la eficiencia operativa y garantizando la confiabilidad de sus viajes en Sudamérica.",
      en: "Artificial intelligence is an already integrated transformation engine, improving operational efficiency and guaranteeing the reliability of your travels in South America.",
    },
    excerpt: {
      es: "La IA no es una promesa futura para la aviación privada, sino un motor de transformación. Sus aplicaciones mejoran tanto la eficiencia operativa interna (mantenimiento predictivo) como la experiencia del cliente (personalización).",
      en: "AI is not a future promise for private aviation, but a transformation engine. Its applications improve both internal operational efficiency (predictive maintenance) and customer experience (personalization).",
    },
    content: [
      { type: "p", text: { es: "La inteligencia artificial se utiliza para la optimización operativa y la mejora de la experiencia del cliente. En el ámbito de las operaciones internas, la IA facilita el mantenimiento predictivo. Esto permite abordar los problemas de los equipos de manera proactiva, reduciendo costos y, lo más importante para nuestros clientes, mejorando la confiabilidad. Al analizar continuamente los datos de rendimiento de la aeronave, la IA puede predecir fallos de componentes antes de que ocurran, asegurando que su jet esté siempre listo y evitando retrasos costosos e inesperados en aeropuertos clave de Latinoamérica. Esta innovación es la base de nuestra promesa de puntualidad.", en "Artificial intelligence is used for operational optimization and the enhancement of the customer experience. In the realm of internal operations, AI facilitates predictive maintenance. This allows for proactive addressing of equipment issues, reducing costs and, most importantly for our clients, improving reliability. By continuously analyzing aircraft performance data, AI can predict component failures before they occur, ensuring your jet is always ready and avoiding costly and unexpected delays at key Latin American airports. This innovation is the foundation of our promise of punctuality." } },
      { type: "img", src: iaOptimizaVuelos },
      { type: "h2", text: { es: "Personalización Impulsada por la Tecnología", en "Personalization Driven by Technology" } },
      { type: "p", text: { es: "En cuanto a la experiencia del cliente, la IA se utiliza para la atención personalizada a bordo y en tierra. Las soluciones de IA permiten a Vgolden jets prever las necesidades y preferencias de los clientes, facilitando un enfoque de marketing proactivo que presenta soluciones incluso antes de que el cliente las articule. Esta integración de la IA no solo mejora la satisfacción, sino que también crea una impresión de servicio excepcional desde la primera interacción. La eficiencia impulsada por la IA se ha convertido en una dimensión clave de la propuesta de valor, enfocada en la sofisticación y la atención al detalle que esperan nuestros clientes de alto patrimonio en Sudamérica.", en "Regarding the customer experience, AI is used for personalized attention both onboard and on the ground. AI solutions enable Vgolden jets to anticipate customer needs and preferences, facilitating a proactive marketing approach that presents solutions even before the client articulates them. This integration of AI not only improves satisfaction but also creates an impression of exceptional service from the very first interaction. Efficiency driven by AI has become a key dimension of the value proposition, focused on the sophistication and attention to detail expected by our high-net-worth clients in South America." } },
    ],
  },
  {
    slug: "inversion-vs-gasto-jet-privado-latam",
    date: "2025-09-03",
    cover: inversionVsGasto,
    title: {
      es: "Desmintiendo el Gasto: Reencuadre del Jet Privado como Inversión en Productividad",
      en: "Debunking the Expense: Reframing the Private Jet as an Investment in Productivity",
    },
    subtitle: {
      es: "Su tiempo es su activo más valioso. Justifique el costo del jet privado como una decisión de negocios estratégica que compensa el costo de oportunidad del viaje comercial.",
      en: "Your time is your most valuable asset. Justify the cost of the private jet as a strategic business decision that offsets the opportunity cost of commercial travel.",
    },
    excerpt: {
      es: "El jet privado ya no es percibido como un mero capricho, sino como una herramienta estratégica e indispensable. La clave es reencuadrar el mensaje de marca de estatus a eficiencia y valor de tiempo.",
      en: "The private jet is no longer perceived as a mere whim, but as an indispensable strategic tool. The key is to reframe the brand message from status to efficiency and value of time.",
    },
    content: [
      { type: "p", text: { es: "Aunque algunos individuos y empresas se resisten a la aviación privada, a pesar de tener los recursos, porque la consideran un gasto injustificado, la propuesta de valor de Vgolden jets redefine esta percepción. La evolución de la percepción del jet privado es un cambio estratégico fundamental. La inversión en un jet privado no solo ahorra tiempo, sino que puede ser considerada un ahorro, ya que el tiempo productivo ganado compensa el costo. Este enfoque en la eficiencia y la productividad permite a los individuos justificar el costo como una decisión de negocios estratégica, en lugar de un gasto frívolo, apelando a la lógica financiera del ejecutivo latinoamericano, para quien cada hora en el aire debe ser productiva.", en "Although some individuals and companies resist private aviation, despite the resources, because they consider it an unjustified expense, the value proposition of Vgolden jets redefines this perception. The evolution of the perception of the private jet is a fundamental strategic change. The investment in a private jet not only saves time but can be considered a saving, as the productive time gained offsets the cost. This focus on efficiency and productivity allows individuals to justify the cost as a strategic business decision, rather than a frivolous expense, appealing to the financial logic of the Latin American executive, for whom every hour in the air must be productive." } },
      { type: "img", src: inversionVsGasto },
      { type: "h2", text: { es: "Minimizar los Costos de Oportunidad con Vgolden jets", en "Minimizing Opportunity Costs with Vgolden jets" } },
      { type: "p", text: { es: "El alto valor que nuestro público otorga a su tiempo se traduce en la consideración de los costos de oportunidad de los viajes comerciales (largas colas, horarios inflexibles, retrasos). Un jet privado minimiza estos costos, transformándose en una inversión estratégica en productividad. El mensaje de marca debe ser reencuadrado: 'vuela privado porque tu tiempo es tu activo más valioso y tu eficiencia es una prioridad'. Eliminamos los puntos de dolor de productividad como las largas colas de seguridad y los procesos de registro, liberando el tiempo del cliente para dedicarlo a las cosas que realmente importan, ya sea una reunión vital o tiempo de calidad con la familia.", en "The high value our audience places on their time translates into the consideration of the opportunity costs of commercial travel (long queues, inflexible schedules, delays). A private jet minimizes these costs, transforming itself into a strategic investment in productivity. The brand message must be reframed: 'fly private because your time is your most valuable asset and your efficiency is a priority'. We eliminate productivity pain points such as long security lines and check-in processes, freeing up the client's time to dedicate to the things that truly matter, whether a vital meeting or quality family time." } },
    ],
  },
  {
    slug: "sostenibilidad-lujo-responsable-saf",
    date: "2025-09-03",
    cover: seguridadVuelosFamiliares,
    title: {
      es: "Sostenibilidad: El Nuevo Lujo Personalizado en la Aviación Privada (Enfoque SAF)",
      en: "Sustainability: The New Personalized Luxury in Private Aviation (SAF Focus)",
    },
    subtitle: {
      es: "La sostenibilidad ha pasado de ser un riesgo a un diferenciador competitivo. Conozca el compromiso de Vgolden jets con los Combustibles de Aviación Sostenibles (SAF) y el lujo responsable.",
      en: "Sustainability has gone from a risk to a competitive differentiator. Learn about Vgolden jets' commitment to Sustainable Aviation Fuels (SAF) and responsible luxury.",
    },
    excerpt: {
      es: "La industria está activamente comprometida con la reducción de su huella ambiental, con el objetivo de alcanzar 'cero emisiones netas de carbono para 2050'. La sostenibilidad es un pilar del posicionamiento de marca y una dimensión del lujo para 2025.",
      en: "The industry is actively committed to reducing its environmental footprint, with the goal of achieving 'net-zero carbon emissions by 2050'. Sustainability is a pillar of brand positioning and a dimension of luxury for 2025.",
    },
    content: [
      { type: "p", text: { es: "Aunque la aviación privada ha sido objeto de escrutinio por su huella de carbono, la industria ha adoptado activamente un movimiento hacia la sostenibilidad. En Vgolden jets, implementamos iniciativas verificables, siendo los Combustibles de Aviación Sostenibles (SAF) un pilar. El uso de biocombustibles y combustibles sintéticos puede reducir significativamente la huella de carbono, con el potencial de reducir las emisiones hasta en un 80% sobre el ciclo de vida. Este enfoque comunica la inversión en innovación y eficiencia como un beneficio para el cliente y para el planeta, destacando el liderazgo de nuestra marca en la región.", en "Although private aviation has been subject to scrutiny for its carbon footprint, the industry has actively adopted a movement towards sustainability. At Vgolden jets, we implement verifiable initiatives, with Sustainable Aviation Fuels (SAF) being a pillar. The use of biofuels and synthetic fuels can significantly reduce the carbon footprint, with the potential to reduce emissions by up to 80% over the life cycle. This approach communicates the investment in innovation and efficiency as a benefit for the client and for the planet, highlighting our brand's leadership in the region." } },
      { type: "img", src: seguridadVuelosFamiliares },
      { type: "h2", text: { es: "Innovación y Diferenciación Competitiva", en "Innovation and Competitive Differentiation" } },
      { type: "p", text: { es: "La sostenibilidad ha pasado de ser un simple programa de responsabilidad social a un diferenciador competitivo y una dimensión del lujo para 2025. Además del SAF, invertimos en innovación tecnológica y aerodinámica, como los *winglets*, que reducen la resistencia y mejoran la eficiencia del combustible. Para nuestros clientes en Sudamérica, ofrecemos programas de Compensación de Emisiones, que les permiten sentirse parte de la solución, ofreciendo una opción para un viaje más 'responsable'. La comunicación se centra en métricas verificables y en el liderazgo responsable que espera el público de alto patrimonio. La elección de Vgolden jets es una declaración de compromiso ambiental.", en "Sustainability has moved from being a simple social responsibility program to a competitive differentiator and a dimension of luxury for 2025. In addition to SAF, we invest in technological and aerodynamic innovation, such as *winglets*, which reduce drag and improve fuel efficiency. For our clients in South America, we offer Emissions Compensation programs, allowing them to feel part of the solution, offering an option for a more 'responsible' trip. Communication focuses on verifiable metrics and the responsible leadership expected by the high-net-worth public. Choosing Vgolden jets is a declaration of environmental commitment." } },
    ],
  },
  {
    slug: "tendencias-fabricantes-jets-latam",
    date: "2025-09-03",
    cover: comparativaAccesoJet,
    title: {
      es: "Fabricantes Clave y Tendencias: ¿Qué Jets Privados Dominan el Espacio Aéreo de Sudamérica?",
      en: "Key Manufacturers and Trends: Which Private Jets Dominan the South American Airspace?",
    },
    subtitle: {
      es: "Un vistazo a los líderes del mercado (Bombardier, Gulfstream, Cessna) y la creciente demanda de aviones de largo alcance para viajes intercontinentales desde América Latina.",
      en: "A look at the market leaders (Bombardier, Gulfstream, Cessna) and the growing demand for long-range aircraft for intercontinental travel from Latin America.",
    },
    excerpt: {
      es: "El mercado de jets privados es un ecosistema competitivo dominado por fabricantes de renombre como Textron Inc. (Cessna), Dassault Aviation, Bombardier Inc. y Gulfstream Aerospace Corporation. Vgolden jets selecciona lo mejor de esta tecnología para sus clientes.",
      en: "The private jet market is a competitive ecosystem dominated by renowned manufacturers such as Textron Inc. (Cessna), Dassault Aviation, Bombardier Inc., and Gulfstream Aerospace Corporation. Vgolden jets selects the best of this technology for its clients.",
    },
    content: [
      { type: "p", text: { es: "La demanda de aeronaves en América Latina está siendo impulsada por fabricantes que son sinónimo de innovación y rendimiento. Compañías como Textron Inc. (con Cessna), Dassault Aviation, Bombardier Inc., y Gulfstream Aerospace Corporation no solo fabrican, sino que también impulsan las tendencias del mercado. Mientras que en otros mercados los jets ligeros son populares, el dinamismo en Sudamérica a menudo requiere aeronaves con mayor capacidad de alcance y rendimiento, capaces de volar sin escalas a Norteamérica o Europa. Esto subraya la necesidad de una flota moderna y versátil.", en "Aircraft demand in Latin America is being driven by manufacturers synonymous with innovation and performance. Companies such as Textron Inc. (with Cessna), Dassault Aviation, Bombardier Inc., and Gulfstream Aerospace Corporation not only manufacture but also drive market trends. While light jets are popular in other markets, the dynamism in South America often requires aircraft with greater range and performance capabilities, capable of flying non-stop to North America or Europe. This underscores the need for a modern and versatile fleet." } },
      { type: "img", src: comparativaAccesoJet },
      { type: "h2", text: { es: "El Auge del Largo Alcance para Conexiones Globales", en "The Rise of Long Range for Global Connections" } },
      { type: "p", text: { es: "Una tendencia creciente en la región es la demanda de aviones de largo alcance, que facilita viajes intercontinentales de manera más accesible y eficiente. Modelos como el Global 6000 de Bombardier y el Falcon 2000 de Dassault son preferidos para viajes de largo recorrido, cruciales para los ejecutivos que gestionan agendas globales desde Argentina, Chile o Brasil. Vgolden jets utiliza esta diversificación de la flota y la especialización en diferentes perfiles de viaje como un elemento clave al segmentar nuestras ofertas, asegurando que nuestros clientes tengan la aeronave perfecta para cada misión, ya sea un vuelo de cabotaje o un viaje transoceánico.", en "A growing trend in the region is the demand for long-range aircraft, which facilitates intercontinental travel more accessibly and efficiently. Models like the Global 6000 by Bombardier and the Falcon 2000 by Dassault are preferred for long-range travel, crucial for executives managing global agendas from Argentina, Chile, or Brazil. Vgolden jets uses this fleet diversification and specialization in different travel profiles as a key element when segmenting our offers, ensuring our clients have the perfect aircraft for each mission, whether a domestic flight or a transatlantic journey." } },
    ],
  },
  {
    slug: "perfil-hnwi-argentina-psicografico",
    date: "2025-09-03",
    cover: iaOptimizaVuelos,
    title: {
      es: "El Perfil Psicográfico del HNWI en Argentina: Más Allá del Poder Adquisitivo",
      en: "The Psychographic Profile of the HNWI in Argentina: Beyond Purchasing Power",
    },
    subtitle: {
      es: "Analizamos las motivaciones de nuestros clientes: la valoración del tiempo, la búsqueda de control, la necesidad de privacidad y la conveniencia como pilares de la decisión de compra.",
      en: "We analyze our clients' motivations: the value of time, the search for control, the need for privacy, and convenience as pillars of the purchasing decision.",
    },
    excerpt: {
      es: "Las motivaciones para elegir la aviación privada son principalmente psicográficas, centrándose en la valoración del tiempo, la búsqueda de control, la necesidad de privacidad y la conveniencia, elementos clave para el público argentino de alto patrimonio.",
      en: "The motivations for choosing private aviation are primarily psychographic, focusing on the value of time, the search for control, the need for privacy, and convenience, key elements for the Argentinian high-net-worth public.",
    },
    content: [
      { type: "p", text: { es: "El público objetivo en América Latina se compone principalmente de individuos de alto poder adquisitivo (HNWI), multimillonarios y altos funcionarios. Sin embargo, la clave está en el perfil *psicográfico*. Estos individuos valoran el jet privado no solo como un símbolo de estatus, sino como una 'necesidad práctica para los viajeros frecuentes'. La decisión de compra es una transacción meditada y racional, que requiere una comunicación de marketing que apele a la lógica y a la eficiencia, además del prestigio. Nuestro enfoque es entender su mente antes que su bolsillo, identificando el jet privado como la herramienta que resuelve sus problemas de control y tiempo.", en "The target audience in Latin America is mainly composed of high-net-worth individuals (HNWIs), billionaires, and high-ranking officials. However, the key lies in the *psychographic* profile. These individuals value the private jet not only as a status symbol but as a 'practical necessity for frequent travelers'. The purchasing decision is a thoughtful and rational transaction, which requires marketing communication that appeals to logic and efficiency, in addition to prestige. Our focus is to understand their mind before their wallet, identifying the private jet as the tool that solves their problems of control and time." } },
      { type: "img", src: iaOptimizaVuelos },
      { type: "h2", text: { es: "Eficiencia y Control del Tiempo como Valor Supremo", en "Efficiency and Control of Time as Supreme Value" } },
      { type: "p", text: { es: "Las motivaciones se centran en la maximización del tiempo productivo y de ocio. Un jet privado ofrece una flexibilidad sin igual, permitiendo a los clientes elegir sus propios horarios de salida, rutas y destinos. Esto minimiza los puntos de dolor de productividad inherentes al viaje comercial (largas colas, horarios rígidos, y aeropuertos limitados). Vgolden jets se enfoca en el mensaje de que el jet privado es una herramienta que se transforma en una inversión estratégica en productividad, en lugar de un símbolo de lujo simple, apelando a la racionalidad del cliente inteligente y enfocado en resultados.", en "Motivations focus on maximizing productive and leisure time. A private jet offers unparalleled flexibility, allowing clients to choose their own departure times, routes, and destinations. This minimizes the productivity pain points inherent to commercial travel (long queues, rigid schedules, and limited airports). Vgolden jets focuses on the message that the private jet is a tool that transforms into a strategic investment in productivity, rather than a simple luxury symbol, appealing to the rationality of the smart, results-oriented client." } },
    ],
  },
  {
    slug: "jet-privado-herramienta-productividad",
    date: "2025-09-03",
    cover: inversionVsGasto,
    title: {
      es: "El Jet Privado como Herramienta de Productividad: La Inversión Estratégica en su Tiempo",
      en: "The Private Jet as a Productivity Tool: The Strategic Investment in Your Time",
    },
    subtitle: {
      es: "Deje de ver el jet privado como un lujo. Descubra cómo CEOs y líderes globales lo usan como la herramienta estratégica indispensable para maximizar la eficiencia y el control de su agenda.",
      en: "Stop seeing the private jet as a luxury. Discover how CEOs and global leaders use it as the indispensable strategic tool to maximize efficiency and control over their agenda.",
    },
    excerpt: {
      es: "Su activo más valioso es el tiempo. Analizamos cómo el jet privado no es un gasto, sino la inversión más inteligente para la productividad de ejecutivos de alto nivel en un contexto regional exigente. Control total, cero fricción.",
      en: "Your most valuable asset is time. We analyze how the private jet is not an expense but the smartest investment for the productivity of high-level executives in a demanding regional context. Total control, zero friction.",
    },
    content: [
      { type: "p", text: { es: "La principal propuesta de valor se ha reorientado del lujo a la eficiencia. En el mercado latinoamericano, caracterizado por el dinamismo y las distancias, los líderes corporativos necesitan una solución que les garantice llegar a múltiples reuniones en un solo día sin depender de los rígidos horarios de las aerolíneas comerciales. El jet privado ofrece un ahorro promedio de 4 a 6 horas por viaje, lo que se traduce directamente en un aumento de la productividad y una mejora en la calidad de vida, un retorno de inversión que es fácilmente justificable. Para el ejecutivo, esto significa más tiempo para decisiones estratégicas y menos tiempo perdido en logística.", en "The main value proposition has shifted from luxury to efficiency. In the Latin American market, characterized by dynamism and distance, corporate leaders need a solution that guarantees they can attend multiple meetings in a single day without depending on the rigid schedules of commercial airlines. The private jet offers an average saving of 4 to 6 hours per trip, which translates directly into increased productivity and an improvement in life quality, a return on investment that is easily justifiable. For the executive, this means more time for strategic decisions and less time lost on logistics." } },
      { type: "img", src: inversionVsGasto },
      { type: "h2", text: { es: "Control Total y Discreción Asegurada", en "Total Control and Assured Discretion" } },
      { type: "p", text: { es: "El control se manifiesta en la capacidad de definir cada variable del vuelo: la tripulación, los horarios, los aeropuertos y, crucialmente, la privacidad a bordo. Para la toma de decisiones confidenciales y la realización de reuniones privadas en pleno vuelo, el jet es una oficina móvil y segura. Esta discreción y control sobre el entorno es un valor fundamental para los ejecutivos en Argentina, permitiéndoles mantener su enfoque y proteger información sensible. Vgolden jets ofrece una solución completa de eficiencia que respeta la agenda y la necesidad de discreción de su cliente de alto nivel, consolidando su estatus como líder.", en "Control is manifested in the ability to define every variable of the flight: the crew, the schedules, the airports, and, crucially, the privacy on board. For confidential decision-making and private meetings in mid-flight, the jet is a safe, mobile office. This discretion and control over the environment is a fundamental value for executives in Argentina, allowing them to maintain their focus and protect sensitive information. Vgolden jets offers a complete efficiency solution that respects the high-level client's agenda and need for discretion, consolidating their status as a leader." } },
    ],
  },
  {
    slug: "seguridad-vuelos-privados-familiares",
    date: "2025-09-03",
    cover: seguridadBioseguridad,
    title: {
      es: "Viajar con la Familia: La Seguridad, Privacidad y Confort Inigualables de Vgolden jets",
      en: "Traveling with Family: The Unrivaled Safety, Privacy, and Comfort of Vgolden jets",
    },
    subtitle: {
      es: "Para el 91% de nuestros clientes: el jet privado es una plataforma familiar. Garantice un entorno seguro, higiénico y memorable para sus seres queridos, incluidas sus mascotas.",
      en: "For 91% of our clients: the private jet is a family platform. Guarantee a safe, hygienic, and memorable environment for your loved ones, including your pets.",
    },
    excerpt: {
      es: "El jet privado se consolida como la opción preferida para viajes familiares en Sudamérica, ofreciendo un entorno controlado, con estándares de higiene superiores y la tranquilidad de evitar multitudes en aeropuertos comerciales.",
      en: "The private jet is consolidated as the preferred option for family travel in South America, offering a controlled environment, with superior hygiene standards and the peace of mind of avoiding crowds at commercial airports.",
    },
    content: [
      { type: "p", text: { es: "El valor emocional del jet privado es tan importante como el logístico. Un abrumador 91% de los usuarios de jets privados vuelan con amigos y familiares. Esto posiciona al jet privado como una extensión de su hogar, un espacio donde la seguridad y el confort se maximizan. La capacidad de evitar las grandes multitudes en los aeropuertos comerciales y las terminales congestionadas es un gran atractivo, especialmente para familias que viajan con niños pequeños o personas mayores, buscando una experiencia libre de estrés y con un control total sobre su entorno.", en "The emotional value of the private jet is as important as the logistical one. An overwhelming 91% of private jet users fly with friends and family. This positions the private jet as an extension of their home, a space where safety and comfort are maximized. The ability to avoid large crowds in commercial airports and congested terminals is a major attraction, especially for families traveling with young children or the elderly, seeking a stress-free experience with total control over their environment." } },
      { type: "img", src: seguridadBioseguridad },
      { type: "h2", text: { es: "Su Entorno, Sus Reglas: Viajar con Mascotas VIP", en "Your Environment, Your Rules: Traveling with VIP Pets" } },
      { type: "p", text: { es: "La flexibilidad del jet privado se extiende a los miembros peludos de la familia. A diferencia de las restricciones de las aerolíneas comerciales, Vgolden jets permite que las mascotas viajen cómodamente en la cabina con sus dueños, eliminando el estrés de la bodega. Esta personalización en el servicio, combinada con la seguridad, convierte el viaje en una experiencia familiar completa. Nuestra comunicación resalta que el jet es más que un medio de transporte; es una plataforma que enriquece la experiencia de vida de nuestros clientes, garantizando que cada miembro de la familia, sin importar su especie, viaje con el máximo confort.", en "The flexibility of the private jet extends to the furry members of the family. Unlike the restrictions of commercial airlines, Vgolden jets allows pets to travel comfortably in the cabin with their owners, eliminating the stress of the cargo hold. This personalization in service, combined with security, turns the journey into a complete family experience. Our communication emphasizes that the jet is more than a means of transport; it is a platform that enriches our clients' life experience, ensuring that every family member, regardless of species, travels with maximum comfort." } },
    ],
  },
  {
    slug: "jet-privado-para-vacaciones-en-familia",
    date: "2025-09-11",
    cover: "defaultHero",
    title: {
      es: "Un jet privado para vacaciones en familia: Experiencias que perduran",
      en: "A private jet for family vacations: Experiences that last",
    },
    subtitle: {
      es: "Viajen juntos, de forma segura y cómoda.",
      en: "Travel together, safely and comfortably.",
    },
    excerpt: {
      es: "El valor de la aviación privada va más allá de los negocios: se trata de crear recuerdos. Viajar con la familia en un entorno privado significa que el viaje es tan disfrutable como el destino.",
      en: "The value of private aviation goes beyond business: it's about creating memories. Traveling with family in a private environment means the journey is as enjoyable as the destination.",
    },
    content: [
      { type: "p", text: { es: "El valor de la aviación privada va más allá de los negocios: se trata de crear recuerdos. Viajar con la familia en un entorno privado significa que el viaje es tan disfrutable como el destino. Desde la seguridad hasta la posibilidad de llevar a tus mascotas, nos aseguramos de que cada miembro de la familia se sienta como un VIP.", en: "The value of private aviation goes beyond business: it's about creating memories. Traveling with family in a private environment means the journey is as enjoyable as the destination. From safety to the possibility of bringing your pets, we make sure every family member feels like a VIP." } },
      { type: "img", src: "defaultHero", alt: { es: "Familia feliz en la cabina de un jet privado", en: "Happy family in the cabin of a private jet" } },
      { type: "h2", text: { es: "Un entorno seguro y personal", en: "A safe and personal environment" } },
      { type: "p", text: { es: "El 91% de los usuarios de jets privados vuelan con amigos y familiares. Esto demuestra que la aviación privada es una extensión de su esfera personal, una plataforma para crear experiencias familiares seguras, privadas e inolvidables.", en: "91% of private jet users fly with friends and family. This shows that private aviation is an extension of their personal sphere, a platform for creating safe, private, and unforgettable family experiences." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 
  {
    slug: "ventajas-de-volar-en-jet-privado",
    date: "2025-09-09",
    cover: "defaultHero",
    title: {
      es: "Las ventajas de volar en jet privado: Un análisis más allá del lujo",
      en: "The advantages of flying on a private jet: An analysis beyond luxury",
    },
    subtitle: {
      es: "La privacidad, la eficiencia y el control son los pilares de la experiencia.",
      en: "Privacy, efficiency, and control are the pillars of the experience.",
    },
    excerpt: {
      es: "Si bien el lujo es parte de la experiencia, el verdadero valor de un jet privado reside en la eficiencia, la privacidad y el control que ofrece. Desde un embarque rápido hasta la flexibilidad total de tu agenda, volar privado te permite maximizar tu tiempo, el activo más valioso que tienes.",
      en: "While luxury is part of the experience, the true value of a private jet lies in the efficiency, privacy, and control it offers. From quick boarding to total flexibility of your schedule, flying privately allows you to maximize your time, the most valuable asset you have.",
    },
    content: [
      { type: "p", text: { es: "Si bien el lujo es parte de la experiencia, el verdadero valor de un jet privado reside en la eficiencia, la privacidad y el control que ofrece. Desde un embarque rápido hasta la flexibilidad total de tu agenda, volar privado te permite maximizar tu tiempo, el activo más valioso que tienes.", en: "While luxury is part of the experience, the true value of a private jet lies in the efficiency, privacy, and control it offers. From quick boarding to total flexibility of your schedule, flying privately allows you to maximize your time, the most valuable asset you have." } },
      { type: "img", src: "defaultHero", alt: { es: "Un jet privado despegando sobre un fondo de cielo azul", en: "A private jet taking off against a blue sky background" } },
      { type: "h2", text: { es: "La percepción del valor", en: "The perception of value" } },
      { type: "p", text: { es: "La aviación privada se ha redefinido, pasando de ser un símbolo de estatus a una herramienta estratégica de productividad que permite a los clientes dedicar más tiempo a las cosas que realmente importan.", en: "Private aviation has been redefined, going from a status symbol to a strategic productivity tool that allows clients to dedicate more time to the things that really matter." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 
  {
    slug: "por-que-usar-un-jet-privado",
    date: "2025-09-08",
    cover: "defaultHero",
    title: {
      es: "¿Por qué usar un jet privado? La respuesta está en tu agenda",
      en: "Why use a private jet? The answer is in your schedule",
    },
    subtitle: {
      es: "El jet privado se ha convertido en una herramienta indispensable.",
      en: "The private jet has become an indispensable tool.",
    },
    excerpt: {
      es: "Para los líderes de negocios y viajeros frecuentes, un jet privado es una herramienta para gestionar agendas globales complejas. Se trata de minimizar los costos de oportunidad de los viajes comerciales, como las largas colas y los horarios inflexibles, y transformarlos en tiempo productivo.",
      en: "For business leaders and frequent travelers, a private jet is a tool to manage complex global schedules. It's about minimizing the opportunity costs of commercial travel, such as long queues and inflexible schedules, and transforming them into productive time.",
    },
    content: [
      { type: "p", text: { es: "Para los líderes de negocios y viajeros frecuentes, un jet privado es una herramienta para gestionar agendas globales complejas. Se trata de minimizar los costos de oportunidad de los viajes comerciales, como las largas colas y los horarios inflexibles, y transformarlos en tiempo productivo.", en: "For business leaders and frequent travelers, a private jet is a tool to manage complex global schedules. It's about minimizing the opportunity costs of commercial travel, such as long queues and inflexible schedules, and transforming them into productive time." } },
      { type: "img", src: "defaultHero", alt: { es: "Hombre de negocios mirando un reloj de pulsera", en: "Businessman looking at a wristwatch" } },
      { type: "h2", text: { es: "Una inversión en tu tiempo", en: "An investment in your time" } },
      { type: "p", text: { es: "La aviación privada se convierte en una herramienta que minimiza los costos de oportunidad, transformándose así en una inversión estratégica en productividad.", en: "Private aviation becomes a tool that minimizes opportunity costs, thus transforming into a strategic investment in productivity." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 
  {
    slug: "ahorrar-tiempo-con-aviacion-privada",
    date: "2025-09-07",
    cover: "defaultHero",
    title: {
      es: "Ahorrar tiempo con la aviación privada: Cómo se traduce la eficiencia",
      en: "Saving time with private aviation: How efficiency translates",
    },
    subtitle: {
      es: "El tiempo es el nuevo lujo.",
      en: "Time is the new luxury.",
    },
    excerpt: {
      es: "Con un jet privado, el proceso de embarque y seguridad es significativamente más rápido. Puedes llegar a la terminal y estar en el aire en cuestión de minutos, eliminando las frustraciones y los retrasos asociados con los vuelos comerciales.",
      en: "With a private jet, the boarding and security process is significantly faster. You can arrive at the terminal and be in the air in a matter of minutes, eliminating the frustrations and delays associated with commercial flights.",
    },
    content: [
      { type: "p", text: { es: "Con un jet privado, el proceso de embarque y seguridad es significativamente más rápido. Puedes llegar a la terminal y estar en el aire en cuestión de minutos, eliminando las frustraciones y los retrasos asociados con los vuelos comerciales.", en: "With a private jet, the boarding and security process is significantly faster. You can arrive at the terminal and be in the air in a matter of minutes, eliminating the frustrations and delays associated with commercial flights." } },
      { type: "img", src: "defaultHero", alt: { es: "Reloj de arena mostrando el tiempo valioso", en: "Hourglass showing valuable time" } },
      { type: "h2", text: { es: "Más allá del embarque", en: "Beyond boarding" } },
      { type: "p", text: { es: "El acceso a más de 5,000 aeropuertos en EE. UU. (frente a 500 para vuelos comerciales) te da la libertad de llegar más cerca de tu destino final. Esto no solo ahorra tiempo, sino que también minimiza el estrés.", en: "Access to more than 5,000 airports in the U.S. (compared to 500 for commercial flights) gives you the freedom to get closer to your final destination. This not only saves time, but also minimizes stress." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 
  {
    slug: "seguridad-y-privacidad-en-vuelos-privados",
    date: "2025-09-06",
    cover: "defaultHero",
    title: {
      es: "Seguridad y privacidad en vuelos privados: Tu bienestar es la prioridad",
      en: "Safety and privacy on private flights: Your well-being is the priority",
    },
    subtitle: {
      es: "Un ambiente controlado, seguro y personal.",
      en: "A controlled, safe, and personal environment.",
    },
    excerpt: {
      es: "En un mundo post-pandemia, la seguridad es un factor decisivo. Con un jet privado, tienes el control total sobre quién viaja contigo, asegurando un entorno seguro para ti y tu familia.",
      en: "In a post-pandemic world, safety is a decisive factor. With a private jet, you have total control over who travels with you, ensuring a safe environment for you and your family.",
    },
    content: [
      { type: "p", text: { es: "La privacidad y la seguridad son consideraciones fundamentales para este público. Nuestros jets se limpian y desinfectan meticulosamente después de cada vuelo, y la exposición a grandes multitudes se elimina por completo. Con un jet privado, tienes el control total sobre quién viaja contigo, asegurando un entorno seguro para ti y tu familia.", en: "Privacy and safety are fundamental considerations for this audience. Our jets are meticulously cleaned and disinfected after each flight, and exposure to large crowds is completely eliminated. With a private jet, you have total control over who travels with you, ensuring a safe environment for you and your family." } },
      { type: "img", src: "defaultHero", alt: { es: "Interior de jet privado limpio y desinfectado", en: "Clean and disinfected private jet interior" } },
      { type: "h2", text: { es: "Un entorno menos estresante", en: "A less stressful environment" } },
      { type: "p", text: { es: "Los jets privados ofrecen un ambiente más higiénico y con menos ocupantes, lo que se ha vuelto un punto de venta decisivo para los clientes conscientes de su salud. Además, el acceso a aeropuertos más pequeños contribuye a una experiencia más fluida y menos estresante.", en: "Private jets offer a more hygienic environment with fewer occupants, which has become a decisive selling point for health-conscious clients. In addition, access to smaller airports contributes to a smoother and less stressful experience." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 
  {
    slug: "como-funciona-un-jet-privado",
    date: "2025-09-05",
    cover: "defaultHero",
    title: {
      es: "¿Cómo funciona un jet privado? Más allá del despegue y el aterrizaje",
      en: "How does a private jet work? Beyond takeoff and landing",
    },
    subtitle: {
      es: "Te guiamos a través de una experiencia sin fisuras.",
      en: "We guide you through a seamless experience.",
    },
    excerpt: {
      es: "La esencia de nuestro servicio es la fluidez. Desde el momento en que confirmas tu vuelo, nuestro equipo de operaciones se encarga de toda la logística, permisos y preparativos legales. La experiencia se extiende a servicios como la recogida en tu domicilio y el acceso a terminales VIP.",
      en: "The essence of our service is fluidity. From the moment you confirm your flight, our operations team handles all the logistics, permits, and legal preparations. The experience extends to services like home pickup and access to VIP terminals.",
    },
    content: [
      { type: "p", text: { es: "La esencia de nuestro servicio es la fluidez. Desde el momento en que confirmas tu vuelo, nuestro equipo de operaciones se encarga de toda la logística, permisos y preparativos legales. La experiencia se extiende a servicios como la recogida en tu domicilio con un coche privado y la rápida transición a través de la terminal VIP.", en: "The essence of our service is fluidity. From the moment you confirm your flight, our operations team handles all the logistics, permits, and legal preparations. The experience extends to services like home pickup with a private car and the quick transition through the VIP terminal." } },
      { type: "img", src: "defaultHero", alt: { es: "Personal de tierra preparando un jet privado para el despegue", en: "Ground crew preparing a private jet for takeoff" } },
      { type: "h2", text: { es: "El marketing de la experiencia", en: "The marketing of experience" } },
      { type: "p", text: { es: "Un cliente de alto valor valora la eficiencia y el tiempo, por lo que espera una experiencia de servicio sin fricciones, de principio a fin. Nuestro marketing refleja esta filosofía, utilizando canales que respetan su tiempo.", en: "A high-value client values efficiency and time, so they expect a frictionless service experience from beginning to end. Our marketing reflects this philosophy, using channels that respect their time." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 
  {
    slug: "costos-de-la-aviacion-privada",
    date: "2025-09-04",
    cover: "defaultHero",
    title: {
      es: "Costos de la aviación privada: ¿Es realmente un gasto?",
      en: "Private aviation costs: Is it really an expense?",
    },
    subtitle: {
      es: "Redefinimos la percepción del jet privado como una inversión estratégica.",
      en: "We redefine the perception of a private jet as a strategic investment.",
    },
    excerpt: {
      es: "Para muchos, el costo del jet privado puede parecer un lujo inalcanzable. Sin embargo, lo invitamos a considerarlo como una inversión estratégica. El tiempo productivo ganado, la flexibilidad de horarios y la eficiencia en la gestión de agendas pueden compensar el costo, convirtiendo el vuelo privado en una decisión de negocios inteligente.",
      en: "For many, the cost of a private jet may seem like an unattainable luxury. However, we invite you to consider it a strategic investment. The productive time gained, the flexibility of schedules, and the efficiency in managing agendas can offset the cost, making the private flight a smart business decision.",
    },
    content: [
      { type: "p", text: { es: "Para muchos, el costo del jet privado puede parecer un lujo inalcanzable. Sin embargo, lo invitamos a considerarlo como una inversión estratégica. El tiempo productivo ganado, la flexibilidad de horarios y la eficiencia en la gestión de agendas pueden compensar el costo, convirtiendo el vuelo privado en una decisión de negocios inteligente.", en: "For many, the cost of a private jet may seem like an unattainable luxury. However, we invite you to consider it a strategic investment. The productive time gained, the flexibility of schedules, and the efficiency in managing agendas can offset the cost, making the private flight a smart business decision." } },
      { type: "img", src: "defaultHero", alt: { es: "Una balanza con tiempo y dinero, mostrando el equilibrio", en: "A scale with time and money, showing the balance" } },
      { type: "h2", text: { es: "La racionalidad del gasto", en: "The rationality of the expense" } },
      { type: "p", text: { es: "Se argumenta que la inversión en un jet privado no solo ahorra tiempo, sino que también puede ser una inversión, ya que el tiempo productivo ganado compensa el costo.", en: "It is argued that the investment in a private jet not only saves time but can also be an investment, since the productive time gained offsets the cost." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 
  {
    slug: "vuelos-privados-vs-vuelos-comerciales",
    date: "2025-09-03",
    cover: "defaultHero",
    title: {
      es: "Vuelos privados vs. vuelos comerciales: Una comparativa esencial",
      en: "Private flights vs. commercial flights: An essential comparison",
    },
    subtitle: {
      es: "La elección va más allá del precio.",
      en: "The choice goes beyond price.",
    },
    excerpt: {
      es: "La comparación entre un jet privado y un vuelo comercial no es solo sobre el precio. Es sobre el valor. Mientras que el vuelo comercial se caracteriza por las largas esperas y la falta de control, el jet privado ofrece un proceso de embarque rápido, total flexibilidad y acceso a más de 5,000 aeropuertos en EE. UU.",
      en: "The comparison between a private jet and a commercial flight is not just about price. It's about value. While commercial flight is characterized by long waits and a lack of control, the private jet offers a quick boarding process, total flexibility, and access to more than 5,000 airports in the U.S.",
    },
    content: [
      { type: "p", text: { es: "La comparación entre un jet privado y un vuelo comercial no es solo sobre el precio. Es sobre el valor. Mientras que el vuelo comercial se caracteriza por las largas esperas y la falta de control, el jet privado ofrece un proceso de embarque rápido, total flexibilidad y la posibilidad de elegir entre más de 5,000 aeropuertos en EE. UU. (frente a 500 para vuelos comerciales).", en: "The comparison between a private jet and a commercial flight is not just about price. It's about value. While commercial flight is characterized by long waits and a lack of control, the private jet offers a quick boarding process, total flexibility, and the possibility of choosing among more than 5,000 airports in the U.S. (compared to 500 for commercial flights)." } },
      { type: "img", src: "defaultHero", alt: { es: "Iconos de un avión comercial y un jet privado en una comparativa", en: "Icons of a commercial airplane and a private jet in a comparison" } },
      { type: "h2", text: { es: "Resolviendo los puntos de dolor", en: "Solving pain points" } },
      { type: "p", text: { es: "Las ventajas del jet privado son, en esencia, soluciones directas a los puntos de dolor inherentes al viaje aéreo comercial. El jet privado permite un proceso de embarque y seguridad considerablemente más rápido, eliminando las frustraciones de las largas filas.", en: "The advantages of the private jet are, in essence, direct solutions to the inherent pain points of commercial air travel. The private jet allows a considerably faster boarding and security process, eliminating the frustrations of long lines." } },
    ],
  },  
   //----------------------------------------------------------------------ARTICULO 
  {
    slug: "mantenimiento-predictivo-aviacion-ia",
    date: "2025-08-30",
    cover: "defaultHero",
    title: {
      es: "El futuro de la aviación: Mantenimiento predictivo con IA",
      en: "The future of aviation: Predictive maintenance with AI",
    },
    subtitle: {
      es: "La inteligencia artificial está transformando la aviación.",
      en: "Artificial intelligence is transforming aviation.",
    },
    excerpt: {
      es: "La inteligencia artificial (IA) no es una promesa futura para la aviación privada, sino un motor de transformación ya integrado en las operaciones. Descubre cómo mejora la seguridad, la eficiencia y la confiabilidad de nuestros vuelos.",
      en: "Artificial intelligence (AI) is not a future promise for private aviation, but a transformation engine already integrated into operations. Discover how it improves the safety, efficiency, and reliability of our flights.",
    },
    content: [
      { type: "p", text: { es: "La inteligencia artificial (IA) no es una promesa futura para la aviación privada, sino un motor de transformación ya integrado en las operaciones. Descubre cómo el mantenimiento predictivo mejora la seguridad, la eficiencia y la confiabilidad de nuestros vuelos.", en: "Artificial intelligence (AI) is not a future promise for private aviation, but a transformation engine already integrated into operations. Discover how predictive maintenance improves the safety, efficiency, and reliability of our flights." } },
      { type: "img", src: "defaultHero", alt: { es: "Chips de computadora dentro de la turbina de un jet", en: "Computer chips inside a jet turbine" } },
      { type: "h2", text: { es: "Eficiencia y experiencia del cliente", en: "Efficiency and customer experience" } },
      { type: "p", text: { es: "La IA facilita el mantenimiento predictivo, lo que permite a las aerolíneas abordar los problemas de los equipos de manera proactiva, mejorando la confiabilidad. También se utiliza para la atención personalizada, tanto a bordo como en tierra, anticipando las necesidades y preferencias de los clientes.", en: "AI facilitates predictive maintenance, allowing airlines to proactively address equipment issues, improving reliability. It is also used for personalized attention, both on board and on the ground, anticipating customer needs and preferences." } },
    ],
  },
  */
];


/* ===========================
   SELECTORES
   =========================== */



export function selectArticleBySlug(slug: string, lang: Language): ArticleView | undefined {
  const base = articlesJSON.find((a) => a.slug === slug);
  return base ? projectArticle(lang, base) : undefined;
}

