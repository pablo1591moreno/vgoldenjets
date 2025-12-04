import { ArticleView } from "@/types/article";
import JetPtivadoGrupo from "@/img/Articulos/JetPtivadoGrupo.webp";

const article: ArticleView = {
    slug: "vuelos-privados-eventos-grupos",
    date: "2025-10-30",
    dateMs: Date.parse("2025-10-30"),
    cover: JetPtivadoGrupo,
    title: "Viajes en jet privado para eventos y grupos: haz que la ocasión sea inolvidable",
    subtitle: "Asiste a conciertos, partidos o bodas de manera exclusiva y con la comodidad de compartir el vuelo.",
    excerpt: "¿Planeas un recital, un partido o una celebración familiar? Conoce cómo un charter privado puede transportar a tu grupo con estilo, dividiendo el costo y personalizando cada detalle.",
    category: "Eventos",
    content: [
        {
            type: "p",
            text: "Los vuelos privados no son solo para ejecutivos. Cada vez más grupos de amigos, familias y empresas los utilizan para asistir a eventos especiales. Puedes dividir el costo entre los pasajeros y disfrutar de un viaje rápido y personalizado."
        },
        { type: "img", src: JetPtivadoGrupo },
        {
            type: "h2",
            text: "Eventos deportivos y culturales"
        },
        {
            type: "p",
            text: "Desde recitales internacionales hasta finales de fútbol en otras provincias, volar en jet privado te permite llegar a tiempo y regresar el mismo día. Además, contamos con vehículos y helicópteros para trasladarte directamente al estadio o al venue."
        },
        {
            type: "h2",
            text: "Bodas y celebraciones"
        },
        {
            type: "p",
            text: "Haz que la boda o la fiesta de aniversario sea aún más especial llevando a tus invitados en un jet privado. Nuestro equipo puede decorar la cabina, ofrecer catering especial y coordinar todos los detalles para que solo te ocupes de disfrutar."
        },
        {
            type: "h2",
            text: "Planificación sencilla y ahorro de tiempo"
        },
        {
            type: "p",
            text: "Te asignamos un asesor que se encarga de la logística: horarios, permisos, catering y transporte terrestre. De esta manera, el viaje se convierte en parte del evento y no en un estrés adicional."
        },
        {
            type: "cta",
            text: "✈️ ¿Querés cotizar tu vuelo privado? Respondemos en menos de 5 minutos."
        }
    ],
};

export default article;
