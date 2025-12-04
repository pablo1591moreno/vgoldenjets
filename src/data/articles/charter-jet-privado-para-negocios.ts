import { ArticleView } from "@/types/article";
import bussines from "@/img/Articulos/bussines.webp";

const article: ArticleView = {
    slug: "charter-jet-privado-para-negocios",
    date: "2025-09-12",
    dateMs: Date.parse("2025-09-12"),
    cover: bussines,
    title: "Charter de jet privado para negocios: Tu oficina en las nubes",
    subtitle: "Vuela a múltiples destinos con flexibilidad y en un entorno de trabajo productivo.",
    excerpt: "El tiempo es dinero. Un jet privado te permite manejar tu agenda de negocios de manera eficiente en Argentina y la región.",
    category: "Negocios",
    content: [
        { type: "p", text: "El tiempo es dinero, y los retrasos comerciales pueden ser costosos. Un jet privado te permite manejar tu agenda de negocios de manera eficiente, visitando múltiples ubicaciones en un solo día si es necesario. Tu jet se convierte en una extensión de tu oficina, con todas las comodidades que necesitas para seguir siendo productivo." },
        { type: "img", src: bussines },
        { type: "h2", text: "Productividad sin límites" },
        { type: "p", text: "Un jet privado te da el control total sobre tu tiempo. Elige tus horarios de salida, rutas y destinos, lo que es ideal para ejecutivos que necesitan llegar a múltiples lugares rápidamente." },
        { type: "h2", text: "Rutas de negocios populares" },
        { type: "p", text: "Si tus reuniones te llevan a Santiago, São Paulo, Montevideo o Córdoba, nuestros vuelos chárter desde Buenos Aires te permiten visitar varias ciudades en una misma jornada. Olvídate de las conexiones y aprovecha cada minuto para trabajar o descansar mientras vuelas." },
        {
            type: "cta",
            text: "✈️ ¿Querés cotizar tu vuelo privado? Respondemos en menos de 5 minutos."
        }
    ],
};

export default article;
