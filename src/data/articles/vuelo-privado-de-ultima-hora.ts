import { ArticleView } from "@/types/article";
import ultimahora from "@/img/Articulos/ultimaHora.webp";

const article: ArticleView = {
    slug: "vuelo-privado-de-ultima-hora",
    date: "2025-09-11",
    dateMs: Date.parse("2025-09-11"),
    cover: ultimahora,
    title: "¿Necesitas un vuelo privado de última hora? Estamos listos para ti",
    subtitle: "Tu agenda cambia y nosotros nos adaptamos.",
    excerpt: "La vida no se detiene, y tampoco tu capacidad para moverte. Nuestro servicio de último minuto ofrece flexibilidad en Argentina y la región.",
    category: "Servicios",
    content: [
        { type: "p", text: "La vida no se detiene, y tampoco debería tu capacidad para moverte. Nuestro servicio de vuelos de último minuto está diseñado para darte la flexibilidad que los vuelos comerciales no pueden. Solo necesitas una llamada para que todo el equipo se active y tu jet esté listo para el despegue." },
        { type: "img", src: ultimahora },
        { type: "h2", text: "Libertad y conveniencia" },
        { type: "p", text: "A diferencia de las aerolíneas comerciales, un jet privado ofrece una flexibilidad sin igual, lo que te permite elegir tus propios horarios de salida, rutas y destinos." },
        { type: "h2", text: "Cómo funciona en Argentina" },
        { type: "p", text: "Operamos desde los principales aeropuertos de Buenos Aires (Aeroparque, Ezeiza y San Fernando) y podemos activar un vuelo en cuestión de horas. Nuestro equipo está disponible 24/7 para coordinar tu itinerario y gestionar los permisos necesarios para tu despegue inmediato." },
        {
            type: "cta",
            text: "✈️ ¿Querés cotizar tu vuelo privado? Respondemos en menos de 5 minutos."
        }
    ],
};

export default article;
