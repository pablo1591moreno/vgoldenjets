import { ArticleView } from "@/types/article";
import personas from "@/img/Articulos/8personas.webp";

const article: ArticleView = {
    slug: "alquilar-jet-privado-para-8-personas",
    date: "2025-09-15",
    dateMs: Date.parse("2025-09-15"),
    cover: personas,
    title: "Alquila un jet privado para 8 personas: Espacio, comodidad y privacidad",
    subtitle: "El espacio, la privacidad y la atención personalizada son nuestra prioridad.",
    excerpt: "Ideal para viajes de negocios en equipo o escapadas familiares en Argentina, con todo el confort y la privacidad que necesitas.",
    category: "Flota",
    content: [
        { type: "p", text: "Ya sea un viaje de negocios en equipo o una escapada familiar, la experiencia debe ser cómoda y sin estrés. Nuestros jets para 8 pasajeros ofrecen un ambiente ideal para reuniones discretas o para disfrutar de un viaje en familia. El espacio, la privacidad y la atención personalizada son nuestra prioridad." },
        { type: "img", src: personas },
        { type: "h2", text: "Reuniones en las nubes" },
        { type: "p", text: "Utiliza el tiempo de vuelo para reuniones importantes con tu equipo, o simplemente para relajarte con tu familia. La cabina es tuya y la adaptamos para que tengas la mejor experiencia posible." },
        { type: "h2", text: "Destinos ideales para grupos en Argentina" },
        { type: "p", text: "Desde escapadas a bodegas en Mendoza hasta semanas de esquí en Bariloche o viajes de golf en la Patagonia, nuestros vuelos charter para 8 personas te llevan directamente al destino sin escalas. También ofrecemos rutas corporativas a Córdoba, Rosario o Florianópolis para equipos de trabajo que necesitan eficiencia y comodidad." },
        {
            type: "cta",
            text: "✈️ ¿Querés cotizar tu vuelo privado? Respondemos en menos de 5 minutos."
        }
    ],
};

export default article;
