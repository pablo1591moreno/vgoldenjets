import { ArticleView } from "@/types/article";
import cuantoCuesta from "@/img/Articulos/CuántoCuesta.webp";

const article: ArticleView = {
    slug: "precio-charter-jet-privado",
    date: "2025-09-16",
    dateMs: Date.parse("2025-09-16"),
    cover: cuantoCuesta,
    title: "¿Cuánto cuesta un jet privado? Precios transparentes para tu charter",
    subtitle: "El costo de un jet privado no es un gasto, sino una inversión en productividad.",
    excerpt: "A diferencia de las tarifas escondidas, te ofrecemos una cotización transparente para rutas en Argentina, eliminando sorpresas.",
    category: "Precios",
    content: [
        { type: "p", text: "El costo de un jet privado no es un gasto, sino una inversión en productividad. A diferencia de las tarifas escondidas, te ofrecemos una cotización transparente, eliminando sorpresas. Así, puedes planificar tu viaje sabiendo que el valor que obtienes supera el costo." },
        { type: "img", src: cuantoCuesta },
        { type: "h2", text: "Valoramos tu tiempo" },
        { type: "p", text: "Cada minuto que ahorras es valioso. Los retrasos, las esperas y las ineficiencias de los vuelos comerciales tienen un costo real. Con un charter privado, eliminas estos costos y maximizas tu tiempo productivo, lo que hace que la inversión sea justificable." },
        { type: "h2", text: "Rutas y costos estimados en Argentina" },
        { type: "p", text: "Los precios de un vuelo charter varían en función de la aeronave y la distancia. Rutas habituales como Buenos Aires–Bariloche, Buenos Aires–Punta del Este o Buenos Aires–Mendoza suelen estar en un rango medio por tramo. Para conocer un valor preciso, contáctanos y te ofreceremos una cotización transparente adaptada a tus necesidades." },
        { type: "h2", text: "Factores que influyen en el precio" },
        { type: "p", text: "El tipo de avión, el número de pasajeros, la duración del vuelo, las tasas de aterrizaje y los servicios especiales (catering, transporte terrestre) determinan el costo final de tu charter. Nuestros asesores te orientarán para elegir la mejor opción en función de tu itinerario y presupuesto." },
        {
            type: "cta",
            text: "✈️ ¿Querés cotizar tu vuelo privado? Respondemos en menos de 5 minutos."
        }
    ],
};

export default article;
