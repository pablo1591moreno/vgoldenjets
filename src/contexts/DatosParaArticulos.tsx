// @/contexts/DatosParaArticulos.ts
// Importo imágenes y las uso directo en los artículos (sin mapa de imágenes, sin tags)

import magazineHero from "@/img/527dfc_84ca4ea39e9147589e332ebe5810c677~mv2.gif";
import cuantoCuesta from "@/img/Articulos/CuántoCuesta.webp";
import personas from "@/img/Articulos/8personas.webp";
import bussines from "@/img/Articulos/bussines.webp";
import ultimahora from "@/img/Articulos/ultimaHora.webp";
import avionEjecutivo from "@/img/Articulos/avionEjecutivo.webp";
import emptyLegsArgentina from "@/img/Articulos/emptyLegsArgentina.webp";
import determinanPrecio from "@/img/Articulos/determinanPrecio.webp";
import JetPtivadoGrupo from "@/img/Articulos/JetPtivadoGrupo.webp";
import itinerarioIdealMundial from "@/img/Articulos/itinerarioIdealMundial.webp"
import ventajasAccesosEficiencia from "@/img//Articulos/ventajas_accesos_eficiencia.webp"

// (si tenés defaultHero importado en otra parte, dejalo como está en tu proyecto)
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
  return [...articlesJSON] // clon para no mutar el original
    .reverse() // último agregado → primero
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
  /** Imagen preferida para redes (JPG/PNG 1200x630) */
  ogImage?: string;
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
  /** Imagen preferida para OG/Twitter */
  ogImage?: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: ContentBlock[];
}

/* ===========================
   PROYECCIÓN
   =========================== */

// si usás defaultHero en tu proyecto, asegurate de que esté importado
declare const defaultHero: string;

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
    ogImage: a.ogImage, // <— nuevo campo
    title: lx(a.title, lang),
    subtitle: lx(a.subtitle, lang),
    excerpt: lx(a.excerpt, lang),
    content: a.content.map((b) => projectBlock(lang, b)),
  };
}

/* ===========================
   DATA (usando imports directo)
   =========================== */

const withOG = (slug: string, override?: string) =>
  override ?? `/og/${slug}.jpg`; // Cambiá a .png si corresponde

const articlesJSON: JsonArticle[] = [

  //----------------------------------------------------------------------ARTICULO  

  {
    slug: "precio-charter-jet-privado",
    date: "2025-09-16",
    cover: cuantoCuesta,
    title: {
      es: "¿Cuánto cuesta un jet privado? Precios transparentes para tu charter",
      en: "How much does a private jet cost? Transparent pricing for your charter",
    },
    subtitle: {
      es: "El costo de un jet privado no es un gasto, sino una inversión en productividad.",
      en: "The cost of a private jet is not an expense, but an investment in productivity.",
    },
    excerpt: {
      es: "A diferencia de las tarifas escondidas, te ofrecemos una cotización transparente para rutas en Argentina, eliminando sorpresas.",
      en: "Unlike hidden fees, we offer you a transparent quote, eliminating surprises. Thus, you can plan your trip knowing that the value you get exceeds the cost.",
    },
    content: [
      { type: "p", text: { es: "El costo de un jet privado no es un gasto, sino una inversión en productividad. A diferencia de las tarifas escondidas, te ofrecemos una cotización transparente, eliminando sorpresas. Así, puedes planificar tu viaje sabiendo que el valor que obtienes supera el costo.", en: "The cost of a private jet is not an expense, but an investment in productivity. Unlike hidden fees, we offer you a transparent quote, eliminating surprises. Thus, you can plan your trip knowing that the value you get exceeds the cost." } },
      { type: "img", src: cuantoCuesta },
      { type: "h2", text: { es: "Valoramos tu tiempo", en: "We value your time" } },
      { type: "p", text: { es: "Cada minuto que ahorras es valioso. Los retrasos, las esperas y las ineficiencias de los vuelos comerciales tienen un costo real. Con un charter privado, eliminas estos costos y maximizas tu tiempo productivo, lo que hace que la inversión sea justificable.", en: "Every minute you save is valuable. Delays, waits, and inefficiencies of commercial flights have a real cost. With a private charter, you eliminate these costs and maximize your productive time, which makes the investment justifiable." } },
      { type: "h2", text: { es: "Rutas y costos estimados en Argentina", en: "Routes and estimated costs in Argentina" } },
      { type: "p", text: { es: "Los precios de un vuelo charter varían en función de la aeronave y la distancia. Rutas habituales como Buenos Aires–Bariloche, Buenos Aires–Punta del Este o Buenos Aires–Mendoza suelen estar en un rango medio por tramo. Para conocer un valor preciso, contáctanos y te ofreceremos una cotización transparente adaptada a tus necesidades.", en: "Charter prices vary depending on the aircraft and distance. Common routes such as Buenos Aires–Bariloche, Buenos Aires–Punta del Este or Buenos Aires–Mendoza fall within an average range per leg. For an accurate quote, contact us and we will provide a transparent estimate tailored to your needs." } },
      { type: "h2", text: { es: "Factores que influyen en el precio", en: "Factors that influence the price" } },
      { type: "p", text: { es: "El tipo de avión, el número de pasajeros, la duración del vuelo, las tasas de aterrizaje y los servicios especiales (catering, transporte terrestre) determinan el costo final de tu charter. Nuestros asesores te orientarán para elegir la mejor opción en función de tu itinerario y presupuesto.", en: "The type of aircraft, number of passengers, flight duration, landing fees and special services (catering, ground transportation) determine the final cost of your charter. Our advisors will help you choose the best option based on your itinerary and budget." } },
    ],
  },

  //----------------------------------------------------------------------ARTICULO 

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
      es: "Ideal para viajes de negocios en equipo o escapadas familiares en Argentina, con todo el confort y la privacidad que necesitas.",
      en: "Whether it's a business trip with a team or a family getaway, the experience should be comfortable and stress-free. Our jets for 8 passengers offer an ideal environment for discreet meetings or to enjoy a trip with family.",
    },
    content: [
      { type: "p", text: { es: "Ya sea un viaje de negocios en equipo o una escapada familiar, la experiencia debe ser cómoda y sin estrés. Nuestros jets para 8 pasajeros ofrecen un ambiente ideal para reuniones discretas o para disfrutar de un viaje en familia. El espacio, la privacidad y la atención personalizada son nuestra prioridad.", en: "Whether it's a business trip with a team or a family getaway, the experience should be comfortable and stress-free. Our jets for 8 passengers offer an ideal environment for discreet meetings or to enjoy a trip with family. Space, privacy and personalized attention are our priority." } },
      { type: "img", src: personas },
      { type: "h2", text: { es: "Reuniones en las nubes", en: "Meetings in the clouds" } },
      { type: "p", text: { es: "Utiliza el tiempo de vuelo para reuniones importantes con tu equipo, o simplemente para relajarte con tu familia. La cabina es tuya y la adaptamos para que tengas la mejor experiencia posible.", en: "Use flight time for important meetings with your team, or just to relax with your family. The cabin is yours and we adapt it so you have the best possible experience." } },
      { type: "h2", text: { es: "Destinos ideales para grupos en Argentina", en: "Ideal group destinations in Argentina" } },
      { type: "p", text: { es: "Desde escapadas a bodegas en Mendoza hasta semanas de esquí en Bariloche o viajes de golf en la Patagonia, nuestros vuelos charter para 8 personas te llevan directamente al destino sin escalas. También ofrecemos rutas corporativas a Córdoba, Rosario o Florianópolis para equipos de trabajo que necesitan eficiencia y comodidad.", en: "From wine tours in Mendoza to ski weeks in Bariloche or golf trips in Patagonia, our charter flights for eight passengers take you directly to your destination without stopovers. We also offer corporate routes to Córdoba, Rosario or Florianópolis for teams that need efficiency and comfort." } },
    ],
  },

  //----------------------------------------------------------------------ARTICULO 

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
      es: "El tiempo es dinero. Un jet privado te permite manejar tu agenda de negocios de manera eficiente en Argentina y la región.",
      en: "Time is money, and commercial delays can be costly. A private jet allows you to manage your business schedule efficiently, visiting multiple locations in a single day if needed.",
    },
    content: [
      { type: "p", text: { es: "El tiempo es dinero, y los retrasos comerciales pueden ser costosos. Un jet privado te permite manejar tu agenda de negocios de manera eficiente, visitando múltiples ubicaciones en un solo día si es necesario. Tu jet se convierte en una extensión de tu oficina, con todas las comodidades que necesitas para seguir siendo productivo.", en: "Time is money, and commercial delays can be costly. A private jet allows you to manage your business schedule efficiently, visiting multiple locations in a single day if needed. Your jet becomes an extension of your office, with all the amenities you need to stay productive." } },
      { type: "img", src: bussines },
      { type: "h2", text: { es: "Productividad sin límites", en: "Limitless productivity" } },
      { type: "p", text: { es: "Un jet privado te da el control total sobre tu tiempo. Elige tus horarios de salida, rutas y destinos, lo que es ideal para ejecutivos que necesitan llegar a múltiples lugares rápidamente.", en: "A private jet gives you total control over your time. Choose your own departure times, routes, and destinations, which is ideal for executives who need to get to multiple places quickly." } },
      { type: "h2", text: { es: "Rutas de negocios populares", en: "Popular business routes" } },
      { type: "p", text: { es: "Si tus reuniones te llevan a Santiago, São Paulo, Montevideo o Córdoba, nuestros vuelos chárter desde Buenos Aires te permiten visitar varias ciudades en una misma jornada. Olvídate de las conexiones y aprovecha cada minuto para trabajar o descansar mientras vuelas.", en: "If your meetings take you to Santiago, São Paulo, Montevideo or Córdoba, our charter flights from Buenos Aires allow you to visit several cities in a single day. Forget about connections and make the most of every minute to work or relax while you fly." } },
    ],
  },

  //----------------------------------------------------------------------ARTICULO 

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
      es: "La vida no se detiene, y tampoco tu capacidad para moverte. Nuestro servicio de último minuto ofrece flexibilidad en Argentina y la región.",
      en: "Life doesn't stop, and neither should your ability to move. Our last-minute flight service is designed to give you the flexibility that commercial flights cannot.",
    },
    content: [
      { type: "p", text: { es: "La vida no se detiene, y tampoco debería tu capacidad para moverte. Nuestro servicio de vuelos de último minuto está diseñado para darte la flexibilidad que los vuelos comerciales no pueden. Solo necesitas una llamada para que todo el equipo se active y tu jet esté listo para el despegue.", en: "Life doesn't stop, and neither should your ability to move. Our last-minute flight service is designed to give you the flexibility that commercial flights cannot. You just need a call for the entire team to activate and your jet to be ready for takeoff." } },
      { type: "img", src: ultimahora },
      { type: "h2", text: { es: "Libertad y conveniencia", en: "Freedom and convenience" } },
      { type: "p", text: { es: "A diferencia de las aerolíneas comerciales, un jet privado ofrece una flexibilidad sin igual, lo que te permite elegir tus propios horarios de salida, rutas y destinos.", en: "Unlike commercial airlines, a private jet offers unparalleled flexibility, allowing you to choose your own departure times, routes, and destinations." } },
      { type: "h2", text: { es: "Cómo funciona en Argentina", en: "How it works in Argentina" } },
      { type: "p", text: { es: "Operamos desde los principales aeropuertos de Buenos Aires (Aeroparque, Ezeiza y San Fernando) y podemos activar un vuelo en cuestión de horas. Nuestro equipo está disponible 24/7 para coordinar tu itinerario y gestionar los permisos necesarios para tu despegue inmediato.", en: "We operate from Buenos Aires’ main airports (Aeroparque, Ezeiza and San Fernando) and can launch a flight within hours. Our team is available 24/7 to coordinate your itinerary and obtain the necessary permits for your immediate departure." } },
    ],
  },

  //----------------------------------------------------------------------ARTICULO 

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
      es: "América Latina está experimentando un dinamismo considerablemente mayor que el promedio global en la aviación. Le ofrecemos una herramienta estratégica para gestionar agendas complejas en Argentina y más allá, asegurando control y puntualidad.",
      en: "Latin America is experiencing considerably greater dynamism than the global average in aviation. We offer you the essential strategic tool for managing complex agendas in Argentina and beyond, ensuring control and punctuality.",
    },
    content: [
      { type: "p", text: { es: "América Latina, con una proyección de crecimiento del mercado de aviones comerciales alcanzando los USD 1,310 millones para 2029, se ha consolidado como una región prioritaria para los negocios y la inversión. La eficiencia es la clave en este auge. Los viajes aéreos comerciales tradicionales simplemente no satisfacen la necesidad de flexibilidad y rapidez de los ejecutivos y líderes corporativos. Nuestro servicio de chárter elimina los largos periodos de espera y el control limitado sobre el itinerario, elementos característicos de la experiencia comercial.", en: "Latin America, with a projected commercial aircraft market growth reaching USD 1.31 billion by 2029, has been consolidated as a priority region for business and investment. Efficiency is the key to this boom. Traditional commercial air travel simply does not meet the flexibility and speed requirements of executives and corporate leaders. Our charter service eliminates long waiting periods and limited control over the itinerary, characteristic elements of the commercial experience." } },
      { type: "img", src: avionEjecutivo },
      { type: "h2", text: { es: "Por qué el Jet Privado es una Herramienta, no un Lujo, en Latam", en: "Why the Private Jet is a Tool, Not a Luxury, in Latam" } },
      { type: "p", text: { es: "Para los multimillonarios y altos funcionarios, la aeronave se percibe como una herramienta estratégica indispensable para gestionar agendas complejas y proteger la privacidad. En el contexto del auge de las economías emergentes de la región, esta percepción es aún más aguda: la aviación privada es vista como una herramienta esencial para la eficiencia y el estatus. Con Vgolden jets, usted garantiza un proceso de embarque y seguridad considerablemente más rápido, lo cual transforma el tiempo perdido en tiempo productivo. Nos enfocamos en ofrecer una solución financiera y logística que minimiza los costos de oportunidad de los viajes comerciales.", en: "For billionaires and high-ranking officials, the aircraft is perceived as an indispensable strategic tool for managing complex agendas and protecting privacy. In the context of the region's emerging economies boom, this perception is even sharper: private aviation is seen as an essential tool for efficiency and status. With Vgolden jets, you guarantee a considerably faster boarding and security process, which transforms lost time into productive time. We focus on offering a financial and logistical solution that minimizes the opportunity costs of commercial travel." } },
      { type: "h2", text: { es: "Rutas clave en el Cono Sur", en: "Key routes in the Southern Cone" } },
      { type: "p", text: { es: "Conectamos los principales centros de negocios del Cono Sur. Buenos Aires, Santiago y São Paulo forman el triángulo de negocios más influyente de la región. Nuestros vuelos chárter permiten reuniones cara a cara en un mismo día, evitando demoras y maximizando cada minuto de su agenda.", en: "We connect the main business hubs of the Southern Cone. Buenos Aires, Santiago and São Paulo form the most influential business triangle in the region. Our charter flights allow face-to-face meetings in a single day, avoiding delays and maximizing every minute of your schedule." } },
    ],
  },

  //----------------------------------------------------------------------ARTICULO 

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
      es: "Los vuelos de tramo vacío son una forma inteligente de disfrutar de la aviación privada a un precio reducido en Argentina, ideal para quienes buscan lujo accesible y responsable.",
      en: "Promoting empty legs flights is a smart gateway for customers seeking the luxury and efficiency of a private jet at a significantly reduced cost. It's the perfect opportunity to experience the Vgolden jets service in Argentina.",
    },
    content: [
      { type: "p", text: { es: "El concepto de 'Empty Legs' (tramos vacíos) ofrece un valor inigualable para atraer a un segmento de clientes que busca un servicio de alta gama a un costo más accesible, sirviendo como una vía de entrada para nuevos usuarios. Estos vuelos ocurren cuando un avión necesita reposicionarse para un próximo viaje. Para Vgolden jets, representa una oportunidad de optimización logística; para usted, es la flexibilidad de un chárter con un descuento sustancial. Un buen corredor aéreo puede obtener opciones más rentables, especialmente aprovechando los vuelos de 'tramo vacío'. Es una decisión financiera inteligente para quien prioriza la calidad sin el compromiso de una Tarjeta de Horas.", en: "The 'Empty Legs' concept offers unparalleled value to attract a segment of clients seeking a high-end service at a more accessible cost, serving as a gateway for new users. These flights occur when an aircraft needs to reposition for a subsequent journey. For Vgolden jets, it represents a logistical optimization opportunity; for you, it is the flexibility of a charter with a substantial discount. A good air broker can secure more profitable options, especially by leveraging 'empty legs' flights. It's a smart financial decision for those prioritizing quality without the commitment of an Hour Card." } },
      { type: "img", src: emptyLegsArgentina },
      { type: "h2", text: { es: "Beneficios de los tramos vacíos", en: "Benefits of empty legs" } },
      { type: "p", text: { es: "Además de reducir los costos, volar en un tramo vacío te permite probar la experiencia completa de un jet privado con todos los servicios incluidos. Es ideal para clientes que viajan solos, en pareja o con un grupo reducido y que desean mayor privacidad y rapidez.", en: "Besides reducing costs, flying on an empty leg allows you to sample the full private jet experience with all the services included. It is ideal for clients traveling alone, as a couple or with a small group who want greater privacy and speed." } },
      { type: "h2", text: { es: "Cómo aprovecharlos en Argentina", en: "How to take advantage in Argentina" } },
      { type: "p", text: { es: "Publicamos regularmente los tramos vacíos disponibles desde Buenos Aires, Punta del Este y otros destinos del Cono Sur. Si tu agenda es flexible, consulta nuestro listado o suscríbete a las alertas para reservar un vuelo a un precio privilegiado. También puedes combinar un tramo vacío con un chárter normal para crear un itinerario a medida.", en: "We regularly publish empty legs available from Buenos Aires, Punta del Este and other Southern Cone destinations. If your schedule is flexible, check our list or subscribe to alerts to book a flight at a privileged price. You can also combine an empty leg with a normal charter to create a tailored itinerary." } },
      { type: "h2", text: { es: "El Modelo Chárter: La Puerta de Entrada Flexible para Argentina", en: "The Charter Model: The Flexible Gateway for Argentina" } },
      { type: "p", text: { es: "El modelo Chárter (alquiler por viaje) es ideal para aquellos que vuelan menos de 50 horas al año. Es la opción más flexible, ya que el cliente alquila una aeronave para un viaje específico, sin necesidad de una compra o un compromiso a largo plazo. Al aprovechar los tramos vacíos, esta opción se considera la puerta de entrada más flexible al mundo de la aviación privada. Al centrar la comunicación en la eficiencia y la personalización, ofrecemos un valor intrínseco: el jet privado como la máxima expresión de control, lo que permite a los clientes dedicar más tiempo a las cosas que realmente importan.", en: "The Charter model (rental per trip) is ideal for those flying less than 50 hours a year. It is the most flexible option, as the client rents an aircraft for a specific trip, without the need for a purchase or long-term commitment. By taking advantage of empty legs, this option is considered the most flexible gateway to the world of private aviation. By focusing communication on efficiency and personalization, we offer intrinsic value: the private jet as the ultimate expression of control, allowing clients to dedicate more time to the things that truly matter." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO  
  {
    slug: "factores-precio-vuelo-privado-argentina",
    date: "2025-11-01",
    cover: determinanPrecio,
    title: {
      es: "Factores que determinan el precio de un vuelo privado en Argentina",
      en: "Factors that determine the price of a private flight in Argentina",
    },
    subtitle: {
      es: "Comprende cómo se calculan las tarifas y planifica tu presupuesto con inteligencia.",
      en: "Understand how fares are calculated and plan your budget wisely.",
    },
    excerpt: {
      es: "El costo de alquilar un jet depende de la aeronave, la distancia, el número de pasajeros y los servicios solicitados. Te explicamos las variables y te damos ejemplos de tarifas en rutas populares.",
      en: "The cost of renting a jet depends on the aircraft, distance, number of passengers and requested services. We explain the variables and give you examples of fares on popular routes.",
    },
    content: [
      {
        type: "p", text: {
          es: `Muchas personas se preguntan cuánto cuesta un vuelo privado. La respuesta no es única: el precio final está influenciado por varios factores, desde el modelo de avión hasta la duración del viaje y los servicios a bordo.`,
          en: `Many people wonder how much a private flight costs. The answer is not unique: the final price is influenced by several factors, from the aircraft model to the duration of the trip and onboard services.`
        }
      },
      { type: "img", src: determinanPrecio },
      {
        type: "h2",
        text: { es: "Variables que afectan el costo", en: "Variables that affect the cost" }
      },
      {
        type: "p",
        text: {
          es: `• Tipo de aeronave: un jet ligero para cinco pasajeros tiene un valor diferente a un jet de largo alcance para 14 personas.
• Distancia y rutas: volar de Buenos Aires a Mendoza no implica el mismo costo que un trayecto a Punta del Este o a Santiago.
• Tiempo de espera: si la aeronave debe permanecer en destino, se aplica un cargo adicional.
• Servicios complementarios: catering gourmet, transporte terrestre o necesidades especiales incrementan el precio.`,
          en: `• Aircraft type: a light jet for five passengers has a different price from a long-range jet for fourteen passengers.
• Distance and routes: flying from Buenos Aires to Mendoza does not have the same cost as a trip to Punta del Este or Santiago.
• Waiting time: if the aircraft has to remain at the destination, an additional charge applies.
• Complementary services: gourmet catering, ground transportation or special needs increase the price.`
        }
      },
      {
        type: "h2",
        text: { es: "Ejemplos de tarifas", en: "Fare examples" }
      },
      {
        type: "p",
        text: {
          es: `Las rutas internas como Buenos Aires–Mendoza o Buenos Aires–Bariloche suelen ubicarse en la gama media, mientras que los vuelos a Punta del Este o São Paulo pueden tener tarifas ligeramente inferiores o superiores según la categoría del jet. Consulta con nuestros asesores para obtener valores actualizados y elegir la aeronave que mejor se adapte a tu viaje.`,
          en: `Domestic routes such as Buenos Aires–Mendoza or Buenos Aires–Bariloche usually fall within the mid-range, while flights to Punta del Este or São Paulo can have slightly lower or higher fares depending on the jet category. Consult our advisors for updated values and choose the aircraft that best suits your trip.`
        }
      },
      {
        type: "h2",
        text: { es: "Cómo obtener una cotización justa", en: "How to obtain a fair quote" }
      },
      {
        type: "p",
        text: {
          es: `Proporciona a tu corredor aéreo datos precisos: número de pasajeros, fechas flexibles, servicios deseados y aeropuertos de salida y llegada. Cuanta más información ofrezcas, más precisa será la cotización. Recuerda que una tarifa transparente elimina sorpresas y te permite evaluar el costo como una inversión en tiempo y productividad.`,
          en: `Provide your air broker with accurate data: number of passengers, flexible dates, desired services and departure and arrival airports. The more information you provide, the more accurate the quote will be. Remember that a transparent fare eliminates surprises and lets you evaluate the cost as an investment in time and productivity.`
        }
      }
    ],

  },

  //----------------------------------------------------------------------ARTICULO  

  {
    slug: "vuelos-privados-eventos-grupos",
    date: "2025-10-30",
    cover: JetPtivadoGrupo,
    title: {
      es: "Viajes en jet privado para eventos y grupos: haz que la ocasión sea inolvidable",
      en: "Private jet travel for events and groups: make your occasion unforgettable",
    },
    subtitle: {
      es: "Asiste a conciertos, partidos o bodas de manera exclusiva y con la comodidad de compartir el vuelo.",
      en: "Attend concerts, games or weddings in an exclusive way and with the convenience of sharing the flight.",
    },
    excerpt: {
      es: "¿Planeas un recital, un partido o una celebración familiar? Conoce cómo un charter privado puede transportar a tu grupo con estilo, dividiendo el costo y personalizando cada detalle.",
      en: "Planning a concert, a game or a family celebration? Learn how a private charter can transport your group in style, splitting the cost and customizing every detail.",
    },
    content: [
      {
        type: "p",
        text: {
          es: `Los vuelos privados no son solo para ejecutivos. Cada vez más grupos de amigos, familias y empresas los utilizan para asistir a eventos especiales. Puedes dividir el costo entre los pasajeros y disfrutar de un viaje rápido y personalizado.`,
          en: `Private flights are not just for executives. More and more groups of friends, families and companies are using them to attend special events. You can split the cost among passengers and enjoy a fast, personalized trip.`,
        },
      },
      { type: "img", src: JetPtivadoGrupo },
      {
        type: "h2",
        text: { es: "Eventos deportivos y culturales", en: "Sports and cultural events" },
      },
      {
        type: "p",
        text: {
          es: `Desde recitales internacionales hasta finales de fútbol en otras provincias, volar en jet privado te permite llegar a tiempo y regresar el mismo día. Además, contamos con vehículos y helicópteros para trasladarte directamente al estadio o al venue.`,
          en: `From international concerts to football finals in other provinces, flying on a private jet lets you arrive on time and return the same day. We also have vehicles and helicopters to take you directly to the stadium or venue.`,
        },
      },
      {
        type: "h2",
        text: { es: "Bodas y celebraciones", en: "Weddings and celebrations" },
      },
      {
        type: "p",
        text: {
          es: `Haz que la boda o la fiesta de aniversario sea aún más especial llevando a tus invitados en un jet privado. Nuestro equipo puede decorar la cabina, ofrecer catering especial y coordinar todos los detalles para que solo te ocupes de disfrutar.`,
          en: `Make the wedding or anniversary party even more special by taking your guests on a private jet. Our team can decorate the cabin, offer special catering and coordinate every detail so you just have to enjoy.`,
        },
      },
      {
        type: "h2",
        text: { es: "Planificación sencilla y ahorro de tiempo", en: "Simple planning and time savings" },
      },
      {
        type: "p",
        text: {
          es: `Te asignamos un asesor que se encarga de la logística: horarios, permisos, catering y transporte terrestre. De esta manera, el viaje se convierte en parte del evento y no en un estrés adicional.`,
          en: `We assign you an advisor who takes care of the logistics: schedules, permits, catering and ground transportation. This way, the trip becomes part of the event and not an additional stress.`,
        },
      },
    ],
  },

  //----------------------------------------------------------------------ARTICULO  

  {
  "slug": "itinerario-ideal-sedes-mundial-2026-jet-privado",
  "date": "2025-11-03",
  "cover": itinerarioIdealMundial,
  "title": {
    "es": "Itinerario ideal para el Mundial 2026 en jet privado: conectando sedes sin perder un partido",
    "en": "Ideal itinerary for the 2026 World Cup in a private jet: linking venues without missing a match"
  },
  "subtitle": {
    "es": "Descubra cómo moverse entre México, Estados Unidos y Canadá con total comodidad y estilo.",
    "en": "Discover how to travel between Mexico, the United States and Canada with total comfort and style."
  },
  "excerpt": {
    "es": "El Mundial 2026 se jugará en 16 ciudades de tres países. Viajar en jet privado permite conectar varias sedes en poco tiempo y sin las demoras de la aviación comercial.",
    "en": "The 2026 World Cup will be played in 16 cities across three countries. Flying private lets you connect several venues in little time and without commercial delays."
  },
  "content": [
    {
      "type": "p",
      "text": {
        "es": "La Copa Mundial de la FIFA 2026 se jugará en 16 ciudades distribuidas entre Estados Unidos, México y Canadá. Esta configuración hace que la logística sea más compleja para los aficionados que quieren seguir varios partidos. Un jet privado simplifica todo el recorrido.",
        "en": "The 2026 FIFA World Cup will be played in 16 cities across the United States, Mexico and Canada. This setup makes logistics more complex for fans who want to follow several matches. A private jet simplifies the whole journey."
      }
    },
    {
      "type": "img",
      "src": itinerarioIdealMundial
    },
    {
      "type": "h2",
      "text": {
        "es": "Ruta sugerida para fanáticos latinoamericanos",
        "en": "Suggested route for Latin American fans"
      }
    },
    {
      "type": "p",
      "text": {
        "es": "Una ruta típica puede comenzar en Buenos Aires con un vuelo hacia Ciudad de México para el primer partido. Luego, continuar hacia otra sede mexicana como Guadalajara o Monterrey, y después volar a ciudades de Estados Unidos como Dallas, Los Ángeles o Miami. Si el calendario lo requiere, se puede sumar una última escala en Canadá. Todo se programa según la agenda del pasajero.",
        "en": "A typical route may start in Buenos Aires with a flight to Mexico City for the first match. Then continue to another Mexican venue such as Guadalajara or Monterrey, and afterwards fly to U.S. cities like Dallas, Los Angeles or Miami. If needed, a last stop in Canada can be added. Everything is scheduled according to the passenger’s agenda."
      }
    },
    {
      "type": "h2",
      "text": {
        "es": "Ventajas del jet privado frente al avión comercial",
        "en": "Advantages of a private jet vs commercial flight"
      }
    },
    {
      "type": "p",
      "text": {
        "es": "Al volar privado usted evita tiempos muertos en aeropuertos, conexiones innecesarias y esperas en migraciones. En un evento con fechas tan ajustadas, ahorrar incluso una o dos horas por tramo puede significar llegar o no a un partido.",
        "en": "When flying private you avoid dead time at airports, unnecessary connections and immigration lines. In an event with such a tight schedule, saving even one or two hours per leg can mean making it to a match or not."
      }
    },
    {
      "type": "p",
      "text": {
        "es": "Además, al usar aeropuertos ejecutivos o terminales privadas, el embarque es rápido y la experiencia se mantiene en el estándar de lujo que buscan los viajeros de alto poder adquisitivo.",
        "en": "In addition, by using executive airports or private terminals, boarding is fast and the experience remains at the luxury standard high-net-worth travellers are looking for."
      }
    }
  ]
},

  //----------------------------------------------------------------------ARTICULO  

{
  "slug": "vuelos-privados-argentina",
  "date": "2025-11-15",
  "cover": ventajasAccesosEficiencia,
  "title": {
    "es": "Vuelos privados en Argentina: ventajas, accesos y eficiencia",
    "en": "Private flights in Argentina: advantages, access and efficiency"
  },
  "subtitle": {
    "es": "Descubra las razones por las que los vuelos privados en Argentina superan a la aviación comercial en accesibilidad, tiempo y servicio.",
    "en": "Discover why private flights in Argentina outperform commercial aviation in accessibility, time and service."
  },
  "excerpt": {
    "es": "Descubra las ventajas de los vuelos privados en Argentina: más aeropuertos, horarios flexibles y acceso exclusivo sin demoras ni complicaciones.",
    "en": "Discover the benefits of private flights in Argentina: more airports, flexible schedules and exclusive access without delays or complications."
  },
  "content": [
    {
      "type": "h2",
      "text": {
        "es": "Vuelos privados vs comerciales en Argentina: eficiencia, privacidad y tiempo",
        "en": "Private vs commercial flights in Argentina: efficiency, privacy and time"
      }
    },
    
    {
      "type": "p",
      "text": {
        "es": "Los vuelos privados en Argentina no solo se eligen por comodidad o lujo, sino por la eficiencia y la privacidad frente a los vuelos comerciales tradicionales. En el país existen más de 276 aeródromos públicos y más de 200 de uso privado, pero la aviación comercial opera regularmente solo en unos 25. En cambio, un jet privado —según su categoría— puede acceder a más de 400 pistas en todo el país, lo que permite aterrizar más cerca del destino final y ahorrar tiempo valioso evitando conexiones terrestres innecesarias.",
        "en": "Private flights in Argentina are not just about luxury—they are about efficiency and privacy compared to traditional commercial flights. The country has more than 276 public aerodromes and over 200 private ones, yet commercial aviation regularly operates in only around 25. In contrast, a private jet—depending on its category—can access over 400 runways nationwide, allowing passengers to land closer to their final destination and avoid unnecessary ground transfers."
      }
    },
    {
      "type": "h2",
      "text": {
        "es": "Aeródromos privados: acceda a más de 400 destinos en el país",
        "en": "Private airfields: access over 400 destinations across the country"
      }
    },
    {
      "type": "p",
      "text": {
        "es": "La aviación privada en Argentina abre un abanico de posibilidades al operar en cientos de aeródromos distribuidos estratégicamente. Desde pistas rurales hasta aeropuertos ejecutivos como San Fernando, Morón o aeródromos regionales, los vuelos privados permiten crear itinerarios más directos y eficientes. Esto representa una ventaja clave tanto para viajes de negocios como para el turismo de lujo.",
        "en": "Private aviation in Argentina opens up a range of possibilities by operating in hundreds of strategically located airfields. From rural runways to executive airports like San Fernando, Morón or regional aerodromes, private flights allow more direct and efficient itineraries. This is a key advantage for both business travel and luxury tourism."
      }
    },
    {
      "type": "h2",
      "text": {
        "es": "Agenda flexible: optimice sus viajes de negocio o turismo de lujo",
        "en": "Flexible schedule: optimize business or luxury travel"
      }
    },
    {
      "type": "p",
      "text": {
        "es": "Para ejecutivos y viajeros frecuentes, los vuelos privados en Argentina permiten realizar múltiples reuniones en distintas provincias en un mismo día, sin depender de horarios fijos. Para turistas de alto nivel, significa aterrizar directamente en un lodge de pesca en la Patagonia, una bodega en Mendoza o una estancia remota en la Pampa, evitando los aeropuertos comerciales y sus demoras.",
        "en": "For executives and frequent travelers, private flights in Argentina allow for multiple meetings in different provinces within the same day—without being tied to fixed schedules. For high-end tourists, it means landing directly at a fishing lodge in Patagonia, a winery in Mendoza or a remote estancia in the Pampas, avoiding commercial airports and delays."
      }
    },
      {
      "type": "img",
      "src": ventajasAccesosEficiencia
    },
    {
      "type": "h2",
      "text": {
        "es": "FBO en Argentina: servicios premium sin esperas ni filas",
        "en": "FBO in Argentina: premium services without queues or delays"
      }
    },
    {
      "type": "p",
      "text": {
        "es": "Los FBO (Fixed Base Operators) en Argentina están diseñados para ofrecer una experiencia ejecutiva total: salas VIP privadas, control migratorio y de seguridad acelerado, catering personalizado y traslado directo al avión. Todo en un entorno seguro, sin filas ni tiempos muertos. Este tipo de servicios marcan una diferencia fundamental para quienes priorizan la privacidad y el confort.",
        "en": "FBOs (Fixed Base Operators) in Argentina are designed to offer a complete executive experience: private VIP lounges, expedited immigration and security control, personalized catering and direct aircraft transfers. All in a secure environment, without queues or wasted time. These services make a fundamental difference for those who prioritize privacy and comfort."
      }
    },
    {
      "type": "h2",
      "text": {
        "es": "Conclusión: por qué elegir vuelos privados en Argentina hoy",
        "en": "Conclusion: why choose private flights in Argentina today"
      }
    },
    {
      "type": "p",
      "text": {
        "es": "Más que un lujo, los vuelos privados en Argentina representan una herramienta estratégica para optimizar tiempo, mejorar la experiencia de viaje y garantizar privacidad. Con acceso a más de 400 aeródromos, servicios FBO premium y flexibilidad total, la aviación privada es la solución ideal para quienes valoran cada minuto. Si busca eficiencia y confort, no hay mejor opción dentro del país.",
        "en": "More than a luxury, private flights in Argentina are a strategic tool to optimize time, enhance the travel experience and ensure privacy. With access to over 400 airfields, premium FBO services and total flexibility, private aviation is the ideal solution for those who value every minute. If you're looking for efficiency and comfort, there's no better option within the country."
      }
    }
  ]
}




];

/* ===========================
   SELECTORES
   =========================== */

export function selectArticleBySlug(slug: string, lang: Language): ArticleView | undefined {
  const base = articlesJSON.find((a) => a.slug === slug);
  return base ? projectArticle(lang, base) : undefined;
}
