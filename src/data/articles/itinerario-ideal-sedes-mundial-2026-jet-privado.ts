import { ArticleView } from "@/types/article";
import itinerarioIdealMundial from "@/img/Articulos/itinerarioIdealMundial.webp";

const article: ArticleView = {
    slug: "itinerario-ideal-sedes-mundial-2026-jet-privado",
    date: "2025-11-03",
    dateMs: Date.parse("2025-11-03"),
    cover: itinerarioIdealMundial,
    title: "Itinerario ideal para el Mundial 2026 en jet privado: conectando sedes sin perder un partido",
    subtitle: "Descubra cómo moverse entre México, Estados Unidos y Canadá con total comodidad y estilo.",
    excerpt: "El Mundial 2026 se jugará en 16 ciudades de tres países. Viajar en jet privado permite conectar varias sedes en poco tiempo y sin las demoras de la aviación comercial.",
    category: "Eventos",
    content: [
        {
            type: "p",
            text: "La Copa Mundial de la FIFA 2026 se jugará en 16 ciudades distribuidas entre Estados Unidos, México y Canadá. Esta configuración hace que la logística sea más compleja para los aficionados que quieren seguir varios partidos. Un jet privado simplifica todo el recorrido."
        },
        {
            type: "img",
            src: itinerarioIdealMundial
        },
        {
            type: "h2",
            text: "Ruta sugerida para fanáticos latinoamericanos"
        },
        {
            type: "p",
            text: "Una ruta típica puede comenzar en Buenos Aires con un vuelo hacia Ciudad de México para el primer partido. Luego, continuar hacia otra sede mexicana como Guadalajara o Monterrey, y después volar a ciudades de Estados Unidos como Dallas, Los Ángeles o Miami. Si el calendario lo requiere, se puede sumar una última escala en Canadá. Todo se programa según la agenda del pasajero."
        },
        {
            type: "h2",
            text: "Ventajas del jet privado frente al avión comercial"
        },
        {
            type: "p",
            text: "Al volar privado usted evita tiempos muertos en aeropuertos, conexiones innecesarias y esperas en migraciones. En un evento con fechas tan ajustadas, ahorrar incluso una o dos horas por tramo puede significar llegar o no a un partido."
        },
        {
            type: "p",
            text: "Además, al usar aeropuertos ejecutivos o terminales privadas, el embarque es rápido y la experiencia se mantiene en el estándar de lujo que buscan los viajeros de alto poder adquisitivo."
        },
        {
            type: "cta",
            text: "✈️ ¿Querés cotizar tu vuelo privado? Respondemos en menos de 5 minutos."
        }
    ]
};

export default article;
