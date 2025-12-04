import { ArticleView } from "@/types/article";
import determinanPrecio from "@/img/Articulos/determinanPrecio.webp";

const article: ArticleView = {
    slug: "factores-precio-vuelo-privado-argentina",
    date: "2025-11-01",
    dateMs: Date.parse("2025-11-01"),
    cover: determinanPrecio,
    title: "Factores que determinan el precio de un vuelo privado en Argentina",
    subtitle: "Comprende cómo se calculan las tarifas y planifica tu presupuesto con inteligencia.",
    excerpt: "El costo de alquilar un jet depende de la aeronave, la distancia, el número de pasajeros y los servicios solicitados. Te explicamos las variables y te damos ejemplos de tarifas en rutas populares.",
    category: "Precios",
    content: [
        {
            type: "p",
            text: "Muchas personas se preguntan cuánto cuesta un vuelo privado. La respuesta no es única: el precio final está influenciado por varios factores, desde el modelo de avión hasta la duración del viaje y los servicios a bordo."
        },
        { type: "img", src: determinanPrecio },
        {
            type: "h2",
            text: "Variables que afectan el costo"
        },
        {
            type: "p",
            text: "• Tipo de aeronave: un jet ligero para cinco pasajeros tiene un valor diferente a un jet de largo alcance para 14 personas.\n• Distancia y rutas: volar de Buenos Aires a Mendoza no implica el mismo costo que un trayecto a Punta del Este o a Santiago.\n• Tiempo de espera: si la aeronave debe permanecer en destino, se aplica un cargo adicional.\n• Servicios complementarios: catering gourmet, transporte terrestre o necesidades especiales incrementan el precio."
        },
        {
            type: "h2",
            text: "Ejemplos de tarifas"
        },
        {
            type: "p",
            text: "Las rutas internas como Buenos Aires–Mendoza o Buenos Aires–Bariloche suelen ubicarse en la gama media, mientras que los vuelos a Punta del Este o São Paulo pueden tener tarifas ligeramente inferiores o superiores según la categoría del jet. Consulta con nuestros asesores para obtener valores actualizados y elegir la aeronave que mejor se adapte a tu viaje."
        },
        {
            type: "h2",
            text: "Cómo obtener una cotización justa"
        },
        {
            type: "p",
            text: "Proporciona a tu corredor aéreo datos precisos: número de pasajeros, fechas flexibles, servicios deseados y aeropuertos de salida y llegada. Cuanta más información ofrezcas, más precisa será la cotización. Recuerda que una tarifa transparente elimina sorpresas y te permite evaluar el costo como una inversión en tiempo y productividad."
        },
        {
            type: "cta",
            text: "✈️ ¿Querés cotizar tu vuelo privado? Respondemos en menos de 5 minutos."
        }
    ],
};

export default article;
