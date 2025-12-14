import { ArticleMeta, ArticleView, LStr } from "@/types/article";
import imgRutaMendoza from "@/img/Articulos/rutaMendoza.webp";

// Importamos solo las imágenes de portada para la lista principal (metadata)
import cuantoCuesta from "@/img/Articulos/CuántoCuesta.webp";
import personas from "@/img/Articulos/8personas.webp";
import bussines from "@/img/Articulos/bussines.webp";
import ultimahora from "@/img/Articulos/ultimaHora.webp";
import avionEjecutivo from "@/img/Articulos/avionEjecutivo.webp";
import emptyLegsArgentina from "@/img/Articulos/emptyLegsArgentina.webp";
import determinanPrecio from "@/img/Articulos/determinanPrecio.webp";
import JetPtivadoGrupo from "@/img/Articulos/JetPtivadoGrupo.webp";
import itinerarioIdealMundial from "@/img/Articulos/itinerarioIdealMundial.webp";
import jetMessi from "@/img/Articulos/jetMessi.webp";
import PuntaDelEste from "@/img/Articulos/PuntaDelEste.webp";
import caballos from "@/img/Articulos/caballos.webp";
import Chapelco from "@/img/Articulos/Chapelco.webp";
import vacaMuerta from "@/img/Articulos/vacaMuerta.webp";
import AngraTrancoso from "@/img/Articulos/AngraTrancoso.webp";
import BarthsTurks from "@/img/Articulos/BarthsTurks.webp";
import bariloche from "@/img/Articulos/bariloche.webp";
import ventajasAccesosEficiencia from "@/img//Articulos/ventajas_accesos_eficiencia.webp";
import vuelosBuenosAires from "@/img//Articulos/Vuelos privados Buenos Aires.webp";

// Categorías Localizadas (Constantes para mantener referencia y consistencia)
const CAT_TURISMO: LStr = { es: "Turismo", en: "Tourism" };
const CAT_EVENTOS: LStr = { es: "Eventos", en: "Events" };
const CAT_PRECIOS: LStr = { es: "Precios", en: "Pricing" };
const CAT_OPORTUNIDADES: LStr = { es: "Oportunidades", en: "Opportunities" };
const CAT_NEGOCIOS: LStr = { es: "Negocios", en: "Business" };
const CAT_SERVICIOS: LStr = { es: "Servicios", en: "Services" };
const CAT_FLOTA: LStr = { es: "Flota", en: "Fleet" };

// Lista ligera de metadatos (sin el contenido pesado)
export const articlesMeta: ArticleMeta[] = [
    {
        slug: "patagonia-secreta-estancias-de-lujo-lejos-de-la-multitud",
        date: "2025-12-14",
        dateMs: 1765674639717,
        cover: bariloche,
        title: {
            es: "Patagonia Secreta: Estancias de Lujo Lejos de la Multitud",
            en: "Secret Patagonia: Luxury Estancias Far From the Crowds" 
        },
        subtitle: {
            es: "La única forma de experimentar la verdadera Patagonia es aterrizando donde las aerolíneas no llegan.",
            en: "The only way to experience the true Patagonia is by landing where commercial airlines do not reach."
        },
        excerpt: {
            es: "Evite las demoras y el tráfico del aeropuerto de Bariloche. Descubra estancias exclusivas en San Martín de los Andes y Esquel, accesibles únicamente mediante jet privado o alquiler de aviones. Su itinerario de lujo comienza en el hangar.",
            en: "Avoid the delays and traffic of Bariloche airport. Discover exclusive estancias in San Martin de los Andes and Esquel, accessible only by private jet or aircraft charter. Your luxury itinerary starts in the hangar."
        },
        category: CAT_TURISMO
    },
    {
        slug: "el-caribe-exclusivo-st-barths-y-turks-caicos",
        date: "2025-12-13",
        dateMs: 1765668728323,
        cover: BarthsTurks,
        title: {
            es: "El Caribe Exclusivo: St. Barths y Turks & Caicos",
            en: "The Exclusive Caribbean: St. Barths and Turks & Caicos"
        },
        subtitle: {
            es: "Jets de largo alcance y la redefinición del lujo en el Atlántico",
            en: "Long-Range Jets and the Redefinition of Luxury in the Atlantic"
        },
        excerpt: {
            es: "Descubra cómo el servicio de jet privado Argentina permite a los viajeros de élite acceder a los destinos caribeños más exclusivos (St. Barths, Turks & Caicos) sin escalas, optimizando el tiempo y maximizando la privacidad. Vuelos privados que evitan la congestión de Miami.",
            en: "Discover how private jet service from Argentina allows elite travelers to access the most exclusive Caribbean destinations (St. Barths, Turks & Caicos) non-stop, optimizing time and maximizing privacy. Private flights that bypass Miami congestion."
        },
        category: CAT_TURISMO
    },
    {
        slug: "angra-y-trancoso-brasil-directo-sin-pasar-por-san-pablo",
        date: "2025-12-13",
        dateMs: 1765668093769,
        cover: AngraTrancoso,
        title: {
            es: "Angra y Trancoso: Brasil Directo, Sin Pasar por San Pablo",
            en: "Angra and Trancoso: Direct Brazil Flights, Bypassing São Paulo"
        },
        subtitle: {
            es: "Optimice su tiempo y maximice el lujo. La verdadera exclusividad comienza al aterrizar.",
            en: "Optimize Your Time and Maximize Luxury. True Exclusivity Starts Upon Landing."
        },
        excerpt: {
            es: "Para el viajero de alto nivel, la eficiencia es lujo. Descubra cómo nuestros servicios de jet privado Argentina permiten vuelos directos a los aeropuertos cercanos a Angra y Trancoso, eliminando las escalas y las largas transferencias terrestres. La solución definitiva para vuelos privados de lujo.",
            en: "For the high-level traveler, efficiency is luxury. Discover how our private jet services from Argentina allow direct flights to airports near Angra and Trancoso, eliminating layovers and long ground transfers. The definitive solution for luxury private flights."
        },
        category: CAT_TURISMO
    },
    {
        slug: "inversiones-en-vaca-muerta-y-litio-eficiencia-corporativa",
        date: "2025-12-13",
        dateMs: 1765666242939,
        cover: vacaMuerta,
        title: {
            es: "Inversiones en Vaca Muerta y Litio: Eficiencia Corporativa",
            en: "Vaca Muerta and Lithium Investments: Corporate Efficiency Maximized"
        },
        subtitle: {
            es: "La Agenda Ejecutiva Optimizada: Neuquén y Jujuy en un Solo Día",
            en: "The Optimized Executive Agenda: Neuquén and Jujuy in a Single Day"
        },
        excerpt: {
            es: "El tiempo de un ejecutivo de alto nivel es invaluable. Explore cómo los vuelos privados facilitan la inspección crítica de los yacimientos de Vaca Muerta y el Triángulo del Litio en una jornada, maximizando la productividad de su Jet privado en Argentina.",
            en: "A high-level executive's time is invaluable. Explore how private flights facilitate critical inspection of Vaca Muerta and the Lithium Triangle operations within a single day, maximizing productivity using private jet services in Argentina."
        },
        category: CAT_NEGOCIOS
    },
    {
        slug: "esqui-de-alta-gama-de-la-oficina-a-la-pista-en-las-lenas-o-chapelco",
        date: "2025-12-13",
        dateMs: 1765666058338,
        cover: Chapelco,
        title: {
            es: "Esquí de Alta Gama: De la Oficina a la Pista en Las Leñas o Chapelco",
            en: "High-End Skiing: From the Office to the Slopes in Las Leñas or Chapelco"
        },
        subtitle: {
            es: "El Jet Privado como clave para maximizar la temporada invernal en el Hemisferio Sur.",
            en: "The Private Jet as the Key to Maximizing the Winter Season in the Southern Hemisphere."
        },
        excerpt: {
            es: "Mientras esquiadores comerciales se enfrentan a largos traslados terrestres desde aeropuertos como Mendoza o Bariloche, el alquiler de aviones privados permite aterrizar directamente en Malargüe o San Martín de los Andes, transformando el viaje invernal en una experiencia de lujo y eficiencia. Descubra la solución definitiva para su esquí de alta gama en Argentina.",
            en: "While commercial skiers face long ground transfers from airports like Mendoza or Bariloche, private aircraft rental allows direct landing in Malargüe or San Martín de los Andes, transforming the winter trip into an experience of luxury and efficiency. Discover the ultimate solution for your high-end skiing in Argentina."
        },
        category: CAT_TURISMO
    },
    {
        slug: "el-negocio-de-los-caballos-pura-sangre",
        date: "2025-12-13",
        dateMs: 1765665459821,
        cover: caballos,
        title: {
            es: "EL NEGOCIO EXCLUSIVO DE LOS CABALLOS PURA SANGRE EN ARGENTINA",
            en: "THE EXCLUSIVE THOROUGHBRED HORSE BUSINESS IN ARGENTINA"
        },
        subtitle: {
            es: "Una Inversión de Lujo y Pasión para el Inversor Global de Alto Patrimonio.",
            en: "A Luxury Investment Blending Passion and Profit for High-Net-Worth Individuals."
        },
        excerpt: {
            es: "Descubra cómo el inversor de alto patrimonio puede entrar en el prestigioso mercado de los pura sangre en Argentina. Combine su pasión ecuestre con la rentabilidad, volando en Jet privado Argentina para asistir a los remates más exclusivos.",
            en: "Discover how high-net-worth investors can enter the prestigious thoroughbred market in Argentina. Blend your equestrian passion with profitability, flying via private jet to attend the most exclusive auctions."
        },
        category: CAT_NEGOCIOS
    },
    {
        slug: "punta-del-este",
        date: "2025-12-13",
        dateMs: 1765665024418,
        cover: PuntaDelEste,
        title: {
            es: "Punta del Este: El Refugio de Lujo del Jet Set Sudamericano",
            en: "Punta del Este: The Luxury Retreat of the South American Jet Set"
        },
        subtitle: {
            es: "Exclusividad, sofisticación y la ruta perfecta para su vuelo privado desde Argentina.",
            en: "Exclusivity, sophistication, and the perfect route for your private flight from Argentina."
        },
        excerpt: {
            es: "Descubra por qué Punta del Este es el destino preferido por la élite. Información esencial sobre vuelos privados, alquiler de aviones y la vida de lujo que espera en La Barra y José Ignacio.",
            en: "Discover why Punta del Este is the preferred destination for the elite. Essential information about private flights, aircraft rental, and the luxury lifestyle awaiting in La Barra and José Ignacio."
        },
        category: CAT_TURISMO
    },
    {
        slug: "jet-de-leo-messi",
        date: "2025-12-13",
        dateMs: 1765660475426,
        cover: jetMessi,
        title: {
            es: "La Aeronave de la Leyenda: Análisis del Jet Privado de Leo Messi",
            en: "The Legend's Aircraft: An Analysis of Leo Messi's Private Jet"
        },
        subtitle: {
            es: "Más allá del campo de juego: El Gulfstream V, símbolo de exclusividad y eficiencia para el astro argentino.",
            en: "Beyond the Pitch: The Gulfstream V, a symbol of exclusivity and efficiency for the Argentine star."
        },
        excerpt: {
            es: "Conozca el jet privado que utiliza Leo Messi, un Gulfstream V valuado en millones. Analizamos por qué ejecutivos y viajeros de lujo en Argentina eligen este modelo para sus vuelos privados de largo alcance. Una guía sobre el alquiler de aviones de alto rendimiento.",
            en: "Discover the private jet used by Leo Messi, a Gulfstream V valued in the millions. We analyze why executives and luxury travelers in Argentina choose this model for their long-range private flights. A guide to high-performance aircraft chartering."
        },
        category: CAT_FLOTA
    },
    {
        slug: "ruta-del-vino-mendoza-jet-privado-gastronomia",
        date: "2025-12-08",
        dateMs: 1765221871672,
        cover: imgRutaMendoza,
        title: {
            es: "La Ruta del Vino de Lujo: Mendoza en Jet Privado y Experiencias Gastronómicas Exclusivas",
            en: "The Luxury Wine Route: Mendoza by Private Jet and Exclusive Gastronomic Experiences"
        },
        subtitle: {
            es: "Cómo el Alquiler de Aviones Privados redefine la inmersión enológica y el acceso a bodegas premium en el Valle de Uco.",
            en: "How Private Jet Charter redefines wine immersion and access to premium wineries in Uco Valley."
        },
        excerpt: {
            es: "Descubra la experiencia de viajar a Mendoza en **jet privado Argentina** para acceder a bodegas boutique en el Valle de Uco, optimizando el tiempo con **vuelos privados** y cenas de chef.",
            en: "Discover the experience of traveling to Mendoza by private jet to access boutique wineries in Uco Valley, optimizing time with private flights and chef dinners."
        },
        category: CAT_TURISMO
    },
    {
        slug: "vuelos-privados-desde-buenos-aires",
        date: "2025-11-09",
        dateMs: Date.parse("2025-11-09"),
        cover: vuelosBuenosAires,
        title: {
            es: "Vuelos privados desde Buenos Aires: destinos más solicitados",
            en: "Private flights from Buenos Aires: most requested destinations"
        },
        subtitle: {
            es: "Conozca los destinos más populares para vuelos privados desde Buenos Aires y por qué son ideales para viajar en jet.",
            en: "Discover the most popular destinations for private flights from Buenos Aires and why they are ideal for jet travel."
        },
        excerpt: {
            es: "Desde Buenos Aires, los vuelos privados a destinos como Bariloche, Mendoza o Punta del Este combinan eficiencia, confort y acceso directo. Descubra sus atractivos.",
            en: "From Buenos Aires, private flights to destinations like Bariloche, Mendoza, or Punta del Este combine efficiency, comfort, and direct access. Discover their attractions."
        },
        category: CAT_TURISMO
    },
    {
        slug: "vuelos-privados-argentina",
        date: "2025-11-05",
        dateMs: Date.parse("2025-11-05"),
        cover: ventajasAccesosEficiencia,
        title: {
            es: "Vuelos privados en Argentina: ventajas, accesos y eficiencia",
            en: "Private flights in Argentina: advantages, access, and efficiency"
        },
        subtitle: {
            es: "Descubra las razones por las que los vuelos privados en Argentina superan a la aviación comercial en accesibilidad, tiempo y servicio.",
            en: "Discover why private flights in Argentina outperform commercial aviation in accessibility, time, and service."
        },
        excerpt: {
            es: "Descubra las ventajas de los vuelos privados en Argentina: más aeropuertos, horarios flexibles y acceso exclusivo sin demoras ni complicaciones.",
            en: "Discover the advantages of private flights in Argentina: more airports, flexible schedules, and exclusive access without delays or complications."
        },
        category: CAT_SERVICIOS
    },
    {
        slug: "itinerario-ideal-sedes-mundial-2026-jet-privado",
        date: "2025-11-03",
        dateMs: Date.parse("2025-11-03"),
        cover: itinerarioIdealMundial,
        title: {
            es: "Itinerario ideal para el Mundial 2026 en jet privado: conectando sedes sin perder un partido",
            en: "Ideal itinerary for the 2026 World Cup by private jet: connecting venues without missing a match"
        },
        subtitle: {
            es: "Descubra cómo moverse entre México, Estados Unidos y Canadá con total comodidad y estilo.",
            en: "Discover how to move between Mexico, the United States, and Canada with total comfort and style."
        },
        excerpt: {
            es: "El Mundial 2026 se jugará en 16 ciudades de tres países. Viajar en jet privado permite conectar varias sedes en poco tiempo y sin las demoras de la aviación comercial.",
            en: "The 2026 World Cup will be played in 16 cities across three countries. Traveling by private jet allows you to connect multiple venues in a short time and without the delays of commercial aviation."
        },
        category: CAT_EVENTOS
    },
    {
        slug: "vuelos-privados-eventos-grupos",
        date: "2025-10-30",
        dateMs: Date.parse("2025-10-30"),
        cover: JetPtivadoGrupo,
        title: {
            es: "Viajes en jet privado para eventos y grupos: haz que la ocasión sea inolvidable",
            en: "Private jet travel for events and groups: make the occasion unforgettable"
        },
        subtitle: {
            es: "Asiste a conciertos, partidos o bodas de manera exclusiva y con la comodidad de compartir el vuelo.",
            en: "Attend concerts, matches, or weddings exclusively and with the comfort of sharing the flight."
        },
        excerpt: {
            es: "¿Planeas un recital, un partido o una celebración familiar? Conoce cómo un charter privado puede transportar a tu grupo con estilo, dividiendo el costo y personalizando cada detalle.",
            en: "Planning a concert, a match, or a family celebration? Learn how a private charter can transport your group in style, splitting the cost and customizing every detail."
        },
        category: CAT_EVENTOS
    },
    {
        slug: "factores-precio-vuelo-privado-argentina",
        date: "2025-11-01",
        dateMs: Date.parse("2025-11-01"),
        cover: determinanPrecio,
        title: {
            es: "Factores que determinan el precio de un vuelo privado en Argentina",
            en: "Factors determining the price of a private flight in Argentina"
        },
        subtitle: {
            es: "Comprende cómo se calculan las tarifas y planifica tu presupuesto con inteligencia.",
            en: "Understand how rates are calculated and plan your budget intelligently."
        },
        excerpt: {
            es: "El costo de alquilar un jet depende de la aeronave, la distancia, el número de pasajeros y los servicios solicitados. Te explicamos las variables y te damos ejemplos de tarifas en rutas populares.",
            en: "The cost of renting a jet depends on the aircraft, distance, number of passengers, and requested services. We explain the variables and give you examples of rates on popular routes."
        },
        category: CAT_PRECIOS
    },
    {
        slug: "empty-legs-argentina-acceso-smart",
        date: "2025-10-12",
        dateMs: Date.parse("2025-10-12"),
        cover: emptyLegsArgentina,
        title: {
            es: "Vuelos de Tramo Vacío (Empty Legs) en Argentina: El Acceso *Smart* a la Aviación Privada",
            en: "Empty Leg Flights in Argentina: The *Smart* Access to Private Aviation"
        },
        subtitle: {
            es: "Un servicio de alta gama a un costo más accesible. Descubra cómo los 'Empty Legs' son la puerta de entrada flexible para nuevos usuarios en el Cono Sur.",
            en: "High-end service at a more accessible cost. Discover how 'Empty Legs' are the flexible gateway for new users in the Southern Cone."
        },
        excerpt: {
            es: "Los vuelos de tramo vacío son una forma inteligente de disfrutar de la aviación privada a un precio reducido en Argentina, ideal para quienes buscan lujo accesible y responsable.",
            en: "Empty leg flights are a smart way to enjoy private aviation at a reduced price in Argentina, ideal for those seeking accessible and responsible luxury."
        },
        category: CAT_OPORTUNIDADES
    },
    {
        slug: "charter-negocios-latam-rutas",
        date: "2025-10-22",
        dateMs: Date.parse("2025-10-22"),
        cover: avionEjecutivo,
        title: {
            es: "La Ruta de Negocios Inteligente: Vuelos Chárter en América Latina sin demoras comerciales",
            en: "The Smart Business Route: Charter Flights in Latin America without commercial delays"
        },
        subtitle: {
            es: "Maximice la eficiencia de su agenda: Vuelos chárter ejecutivos en Buenos Aires, Santiago y São Paulo. Su tiempo es su activo más valioso.",
            en: "Maximize your agenda efficiency: Executive charter flights in Buenos Aires, Santiago, and São Paulo. Your time is your most valuable asset."
        },
        excerpt: {
            es: "América Latina está experimentando un dinamismo considerablemente mayor que el promedio global en la aviación. Le ofrecemos una herramienta estratégica para gestionar agendas complejas en Argentina y más allá, asegurando control y puntualidad.",
            en: "Latin America is experiencing considerably higher dynamism than the global average in aviation. We offer you a strategic tool to manage complex agendas in Argentina and beyond, ensuring control and punctuality."
        },
        category: CAT_NEGOCIOS
    },
    {
        slug: "vuelo-privado-de-ultima-hora",
        date: "2025-09-11",
        dateMs: Date.parse("2025-09-11"),
        cover: ultimahora,
        title: {
            es: "¿Necesitas un vuelo privado de última hora? Estamos listos para ti",
            en: "Need a last-minute private flight? We are ready for you"
        },
        subtitle: {
            es: "Tu agenda cambia y nosotros nos adaptamos.",
            en: "Your schedule changes and we adapt."
        },
        excerpt: {
            es: "La vida no se detiene, y tampoco tu capacidad para moverte. Nuestro servicio de último minuto ofrece flexibilidad en Argentina y la región.",
            en: "Life doesn't stop, and neither does your ability to move. Our last-minute service offers flexibility in Argentina and the region."
        },
        category: CAT_SERVICIOS
    },
    {
        slug: "charter-jet-privado-para-negocios",
        date: "2025-09-12",
        dateMs: Date.parse("2025-09-12"),
        cover: bussines,
        title: {
            es: "Charter de jet privado para negocios: Tu oficina en las nubes",
            en: "Private jet charter for business: Your office in the clouds"
        },
        subtitle: {
            es: "Vuela a múltiples destinos con flexibilidad y en un entorno de trabajo productivo.",
            en: "Fly to multiple destinations with flexibility and in a productive work environment."
        },
        excerpt: {
            es: "El tiempo es dinero. Un jet privado te permite manejar tu agenda de negocios de manera eficiente en Argentina y la región.",
            en: "Time is money. A private jet allows you to manage your business agenda efficiently in Argentina and the region."
        },
        category: CAT_NEGOCIOS
    },
    {
        slug: "alquilar-jet-privado-para-8-personas",
        date: "2025-09-15",
        dateMs: Date.parse("2025-09-15"),
        cover: personas,
        title: {
            es: "Alquila un jet privado para 8 personas: Espacio, comodidad y privacidad",
            en: "Rent a private jet for 8 people: Space, comfort, and privacy"
        },
        subtitle: {
            es: "El espacio, la privacidad y la atención personalizada son nuestra prioridad.",
            en: "Space, privacy, and personalized attention are our priority."
        },
        excerpt: {
            es: "Ideal para viajes de negocios en equipo o escapadas familiares en Argentina, con todo el confort y la privacidad que necesitas.",
            en: "Ideal for team business trips or family getaways in Argentina, with all the comfort and privacy you need."
        },
        category: CAT_FLOTA
    },
    {
        slug: "precio-charter-jet-privado",
        date: "2025-09-16",
        dateMs: Date.parse("2025-09-16"),
        cover: cuantoCuesta,
        title: {
            es: "¿Cuánto cuesta un jet privado? Precios transparentes para tu charter",
            en: "How much does a private jet cost? Transparent prices for your charter"
        },
        subtitle: {
            es: "El costo de un jet privado no es un gasto, sino una inversión en productividad.",
            en: "The cost of a private jet is not an expense, but an investment in productivity."
        },
        excerpt: {
            es: "A diferencia de las tarifas escondidas, te ofrecemos una cotización transparente para rutas en Argentina, eliminando sorpresas.",
            en: "Unlike hidden fees, we offer you a transparent quote for routes in Argentina, eliminating surprises."
        },
        category: CAT_PRECIOS
    }
];

// Función para obtener el contenido completo de un artículo (Lazy Loading)
// Map of all article modules
const modules = import.meta.glob('./*.ts');

// Función para obtener el contenido completo de un artículo (Lazy Loading)
export async function getArticleContent(slug: string): Promise<ArticleView | null> {
    const path = `./${slug}.ts`;
    const importer = modules[path];

    if (!importer) {
        console.error(`Article module not found for slug: ${slug}`);
        return null;
    }

    try {
        const module = await importer() as { default: ArticleView };
        return module.default;
    } catch (error) {
        console.error(`Error loading article: ${slug}`, error);
        return null;
    }
}
