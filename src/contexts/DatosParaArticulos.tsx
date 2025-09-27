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
    cover: ultimahora ,
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

/*  
  //----------------------------------------------------------------------ARTICULO 8
  {
    slug: "tarjeta-de-horas-jet-privado",
    date: "2025-09-12",
    cover: "defaultHero",
    title: {
      es: "Tarjeta de horas de jet privado: Previsibilidad y flexibilidad",
      en: "Private jet hour card: Predictability and flexibility",
    },
    subtitle: {
      es: "Nuestra tarjeta de horas te ofrece tarifas fijas y acceso garantizado.",
      en: "Our hour card offers you fixed rates and guaranteed access.",
    },
    excerpt: {
      es: "Compra horas de vuelo prepagadas y olvídate de los costos ocultos y las fluctuaciones. Te garantizamos disponibilidad y un servicio consistente cada vez que vueles.",
      en: "Buy prepaid flight hours and forget about hidden costs and fluctuations. We guarantee availability and consistent service every time you fly.",
    },
    content: [
      { type: "p", text: { es: "Para el viajero frecuente que valora la previsibilidad, nuestra tarjeta de horas es la solución ideal. Compra horas de vuelo prepagadas y olvídate de los costos ocultos y las fluctuaciones. Te garantizamos disponibilidad y un servicio consistente cada vez que vueles.", en: "For the frequent traveler who values predictability, our hour card is the ideal solution. Buy prepaid flight hours and forget about hidden costs and fluctuations. We guarantee availability and consistent service every time you fly." } },
      { type: "img", src: "defaultHero", alt: { es: "Una tarjeta de horas Vgolden jets con un jet en el fondo", en: "A Vgolden jets hour card with a jet in the background" } },
      { type: "h2", text: { es: "La flexibilidad que necesitas", en: "The flexibility you need" } },
      { type: "p", text: { es: "Este modelo es perfecto para quienes vuelan menos de 50 horas al año pero desean mayor previsibilidad y consistencia.", en: "This model is perfect for those who fly less than 50 hours a year but want greater predictability and consistency." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 9
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
  //----------------------------------------------------------------------ARTICULO 10
  {
    slug: "vuelo-privado-con-mascotas",
    date: "2025-09-10",
    cover: "defaultHero",
    title: {
      es: "Vuela con tu mejor amigo: Viajes privados con mascotas",
      en: "Fly with your best friend: Private travel with pets",
    },
    subtitle: {
      es: "Viajar con mascotas es fácil con Vgolden jets.",
      en: "Traveling with pets is easy with Vgolden jets.",
    },
    excerpt: {
      es: "A diferencia de las bodegas de carga, los jets privados permiten a tus mascotas viajar contigo en la cabina, de forma segura y cómoda. Vuela sin estrés, sabiendo que tu mejor amigo está a tu lado.",
      en: "Unlike cargo holds, private jets allow your pets to travel with you in the cabin, safely and comfortably. Fly stress-free, knowing your best friend is by your side.",
    },
    content: [
      { type: "p", text: { es: "Sabemos que las mascotas son parte de la familia. A diferencia de las bodegas de carga, los jets privados permiten a tus mascotas viajar contigo en la cabina, de forma segura y cómoda. Vuela sin estrés, sabiendo que tu mejor amigo está a tu lado.", en: "We know that pets are part of the family. Unlike cargo holds, private jets allow your pets to travel with you in the cabin, safely and comfortably. Fly stress-free, knowing your best friend is by your side." } },
      { type: "img", src: "defaultHero", alt: { es: "Un perro sentado cómodamente en un asiento de jet privado", en: "A dog sitting comfortably in a private jet seat" } },
      { type: "h2", text: { es: "Un compañero de vuelo VIP", en: "A VIP flight companion" } },
      { type: "p", text: { es: "Las mascotas a menudo son mencionadas como compañeros de vuelo VIP, lo que destaca la importancia de su bienestar durante el viaje.", en: "Pets are often mentioned as VIP flight companions, which highlights the importance of their well-being during the trip." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 11
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
  //----------------------------------------------------------------------ARTICULO 12
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
  //----------------------------------------------------------------------ARTICULO 13
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
  //----------------------------------------------------------------------ARTICULO 14
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
  //----------------------------------------------------------------------ARTICULO 15
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
  //----------------------------------------------------------------------ARTICULO 16
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
  //----------------------------------------------------------------------ARTICULO 17
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
  //----------------------------------------------------------------------ARTICULO 18
  {
    slug: "aviacion-privada-sostenible",
    date: "2025-09-02",
    cover: "defaultHero",
    title: {
      es: "Aviación privada sostenible: Liderando el camino hacia un futuro verde",
      en: "Sustainable private aviation: Leading the way towards a green future",
    },
    subtitle: {
      es: "La sostenibilidad ya no es opcional en la aviación privada.",
      en: "Sustainability is no longer optional in private aviation.",
    },
    excerpt: {
      es: "La industria ha adoptado un compromiso con la sostenibilidad, con iniciativas como el uso de combustibles ecológicos y programas de compensación de carbono. Esto nos permite no solo ofrecer un servicio de lujo, sino también hacerlo de manera responsable.",
      en: "The industry has adopted a commitment to sustainability, with initiatives such as the use of eco-friendly fuels and carbon offset programs. This allows us not only to offer a luxury service, but also to do so responsibly.",
    },
    content: [
      { type: "p", text: { es: "La industria de la aviación privada ha adoptado un compromiso con la sostenibilidad. Estamos implementando el uso de Combustibles de Aviación Sostenibles (SAF) para reducir la huella de carbono y ofrecemos programas de compensación para nuestros clientes.", en: "The private aviation industry has adopted a commitment to sustainability. We are implementing the use of Sustainable Aviation Fuels (SAF) to reduce the carbon footprint and we offer offset programs for our clients." } },
      { type: "img", src: "defaultHero", alt: { es: "Imagen de un jet privado y un árbol con hojas verdes", en: "Image of a private jet and a tree with green leaves" } },
      { type: "h2", text: { es: "De riesgo a oportunidad de marca", en: "From risk to brand opportunity" } },
      { type: "p", text: { es: "La sostenibilidad ha pasado de ser un simple programa de responsabilidad social a un diferenciador competitivo y una dimensión del lujo para 2025. Nuestro marketing se centra en métricas verificables y en asociaciones creíbles que demuestran un liderazgo responsable.", en: "Sustainability has gone from being a simple social responsibility program to a competitive differentiator and a dimension of luxury for 2025. Our marketing focuses on verifiable metrics and credible partnerships that demonstrate responsible leadership." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 19
  {
    slug: "tipos-de-aviones-privados-para-negocios",
    date: "2025-09-01",
    cover: "defaultHero",
    title: {
      es: "Tipos de aviones privados para negocios: Tu flota, a tu medida",
      en: "Types of private planes for business: Your fleet, to your measure",
    },
    subtitle: {
      es: "Desde jets ligeros hasta de largo alcance, te ayudamos a elegir.",
      en: "From light jets to long-range ones, we help you choose.",
    },
    excerpt: {
      es: "Elegir el avión correcto es clave para un viaje exitoso. Si bien modelos como el Citation XLS de Cessna son populares para viajes de corto alcance, otros como el Global 6000 de Bombardier son ideales para viajes intercontinentales.",
      en: "Choosing the right plane is key to a successful trip. While models like the Cessna Citation XLS are popular for short-range trips, others like the Bombardier Global 6000 are ideal for intercontinental travel.",
    },
    content: [
      { type: "p", text: { es: "Elegir el avión correcto es clave para un viaje exitoso. Si bien modelos como el Citation XLS de Cessna son populares para viajes de corto alcance, otros como el Global 6000 de Bombardier son ideales para viajes intercontinentales. Te asesoramos para que elijas la aeronave que mejor se adapte a tu misión y a tu grupo de viaje.", en: "Choosing the right plane is key to a successful trip. While models like the Cessna Citation XLS are popular for short-range trips, others like the Bombardier Global 6000 are ideal for intercontinental travel. We advise you to choose the aircraft that best suits your mission and your travel group." } },
      { type: "img", src: "defaultHero", alt: { es: "Siluetas de diferentes tipos de jets privados", en: "Silhouettes of different types of private jets" } },
      { type: "h2", text: { es: "Un sector especializado", en: "A specialized sector" } },
      { type: "p", text: { es: "La diversificación de la flota y la especialización en diferentes perfiles de viaje son elementos clave que los especialistas en marketing deben considerar al segmentar sus ofertas.", en: "Fleet diversification and specialization in different travel profiles are key elements that marketing specialists should consider when segmenting their offers." } },
    ],
  },
  //----------------------------------------------------------------------ARTICULO 20
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

export function selectArticles(lang: Language): ArticleView[] {
  return articlesJSON.map((a) => projectArticle(lang, a));
}

export function selectArticleBySlug(slug: string, lang: Language): ArticleView | undefined {
  const base = articlesJSON.find((a) => a.slug === slug);
  return base ? projectArticle(lang, base) : undefined;
}
