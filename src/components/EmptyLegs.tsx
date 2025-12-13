import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Search, X, Plane, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { useEmptyLegs } from "@/hooks/useEmptyLegs";

// Reusing the same hero image for now, or use a specific one if available
import magazineHero from "@/img/527dfc_84ca4ea39e9147589e332ebe5810c677~mv2.gif";

type Props = { forcedLang?: "en" | "es" };

const SITE = "https://www.vgoldenjets.com";

const EmptyLegs: React.FC<Props> = ({ forcedLang }) => {
    const { flights: emptyLegs, loading, error } = useEmptyLegs(); // Use Hook
    const ctx = useLanguage();
    const language = forcedLang ?? ctx.language;
    const isEN = language === "en";

    // Translations
    const TITLE = "Empty Legs";
    const SUBTITLE = isEN
        ? "Exclusive opportunities for one-way private flights at a fraction of the cost."
        : "Oportunidades exclusivas para vuelos privados de tramo vacío a una fracción del costo.";

    // Helper to translate the raw Spanish availability string to English
    const translateAvailability = (text: string) => {
        if (!isEN) return text;

        let translated = text;

        // Days
        translated = translated.replace(/Lunes/gi, "Monday").replace(/Lun\.?/gi, "Mon");
        translated = translated.replace(/Martes/gi, "Tuesday").replace(/Mar\.?/gi, "Tue");
        translated = translated.replace(/Miércoles|Miercoles/gi, "Wednesday").replace(/Mié\.?|Mie\.?/gi, "Wed");
        translated = translated.replace(/Jueves/gi, "Thursday").replace(/Jue\.?/gi, "Thu");
        translated = translated.replace(/Viernes/gi, "Friday").replace(/Vie\.?/gi, "Fri");
        translated = translated.replace(/Sábado|Sabado/gi, "Saturday").replace(/Sáb\.?|Sab\.?/gi, "Sat");
        translated = translated.replace(/Domingo/gi, "Sunday").replace(/Dom\.?/gi, "Sun");

        // Months
        translated = translated.replace(/Enero/gi, "January").replace(/Ene\.?/gi, "Jan");
        translated = translated.replace(/Febrero/gi, "February").replace(/Feb\.?/gi, "Feb");
        translated = translated.replace(/Marzo/gi, "March").replace(/Mar\.?/gi, "Mar");
        translated = translated.replace(/Abril/gi, "April").replace(/Abr\.?/gi, "Apr");
        translated = translated.replace(/Mayo/gi, "May");
        translated = translated.replace(/Junio/gi, "June").replace(/Jun\.?/gi, "Jun");
        translated = translated.replace(/Julio/gi, "July").replace(/Jul\.?/gi, "Jul");
        translated = translated.replace(/Agosto/gi, "August").replace(/Ago\.?/gi, "Aug");
        translated = translated.replace(/Septiembre/gi, "September").replace(/Sep\.?/gi, "Sep");
        translated = translated.replace(/Octubre/gi, "October").replace(/Oct\.?/gi, "Oct");
        translated = translated.replace(/Noviembre/gi, "November").replace(/Nov\.?/gi, "Nov");
        translated = translated.replace(/Diciembre/gi, "December").replace(/Dic\.?/gi, "Dec");

        // Other terms
        translated = translated.replace(/\bde\b/gi, "of");
        translated = translated.replace(/\ba las\b/gi, "at");
        translated = translated.replace(/\ba la\b/gi, "at");
        translated = translated.replace(/\(local\)/gi, "(local)");
        translated = translated.replace(/Disponible:/gi, "Available:");

        return translated;
    };

    const SEARCH_PLACEHOLDER = isEN ? "Search destinations..." : "Buscar destinos...";
    const NO_RESULTS = isEN ? "No empty legs found matching your criteria." : "No se encontraron tramos vacíos con esos criterios.";
    const BOOK_NOW = isEN ? "Inquire Now" : "Consultar Ahora";
    const FROM = isEN ? "From" : "Desde";
    const TO = isEN ? "To" : "Hacia";
    // const PRICE = isEN ? "Price" : "Precio"; 
    // const ORIGINAL_PRICE = isEN ? "Est. Normal Price" : "Precio Est. Normal";
    const SEATS = isEN ? "Seats" : "Asientos";

    const [searchQuery, setSearchQuery] = useState("");

    // Filter Logic
    const filteredFlights = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];

        return emptyLegs.filter((flight) => {
            // Check if expired
            if (flight.date < today) return false;

            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                flight.from.toLowerCase().includes(searchLower) ||
                flight.to.toLowerCase().includes(searchLower) ||
                flight.aircraft.toLowerCase().includes(searchLower);
            return matchesSearch;
        });
    }, [searchQuery, emptyLegs]);

    // SEO
    const ES_URL = `${SITE}/emptylegs`;
    const EN_URL = `${SITE}/en/emptylegs`;
    const CANONICAL = isEN ? EN_URL : ES_URL;

    // SEO & Meta
    const metaTitle = isEN
        ? "Empty Legs | Private Jet Deals & One-Way Flights | V Golden Jets"
        : "Empty Legs | Vuelos Privados Baratos y Ofertas | V Golden Jets";

    const metaDescription = isEN
        ? "Find exclusive Empty Leg private jet flights at up to 75% off. Book luxury one-way positioning flights in Argentina, USA, and worldwide with V Golden Jets."
        : "Encuentra vuelos privados Empty Leg con hasta 75% de descuento. Reserva vuelos de posicionamiento de lujo en Argentina, EE.UU. y todo el mundo con V Golden Jets.";

    // Structured Data (JSON-LD)
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        "name": isEN ? "Empty Leg Flights" : "Vuelos Empty Leg",
        "itemListElement": emptyLegs.map((flight, index) => ({
            "@type": "Offer",
            "position": index + 1,
            "itemOffered": {
                "@type": "Flight",
                "departureAirport": { "@type": "Airport", "name": flight.from },
                "arrivalAirport": { "@type": "Airport", "name": flight.to },
                "departureTime": flight.date,
                "provider": { "@type": "Airline", "name": "V Golden Jets" },
                "name": `Empty Leg: ${flight.from} to ${flight.to}`
            }
        }))
    };

    return (
        <main className="bg-white min-h-screen flex flex-col">
            <Helmet htmlAttributes={{ lang: language }}>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <link rel="canonical" href={CANONICAL} />
                <link rel="alternate" hrefLang="es" href={ES_URL} />
                <link rel="alternate" hrefLang="en" href={EN_URL} />
                <link rel="alternate" hrefLang="x-default" href={ES_URL} />
                <meta name="robots" content="index,follow" />
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Helmet>

            <Navbar />

            {/* HERO */}
            <section className="relative py-24 sm:py-32 bg-black">
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(${magazineHero})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black" />
                </div>

                <div className="section-container relative z-10 text-center">
                    <h1 className="text-4xl sm:text-6xl font-serif text-white mb-6 tracking-tight">
                        {TITLE}
                    </h1>
                    <p className="section-subtitle max-w-2xl mx-auto" style={{ color: "rgb(234 213 155 / 0.9)" }}>
                        {SUBTITLE}
                    </p>
                </div>
            </section>

            {/* SEARCH */}
            <section className="py-8 border-b border-gray-100 sticky top-0 z-30 bg-white/80 backdrop-blur-md">
                <div className="section-container flex justify-center">
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder={SEARCH_PLACEHOLDER}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 text-slate-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all sm:text-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <div className="flex-grow py-12 sm:py-16 bg-gray-50">
                <div className="section-container">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-gold w-10 h-10" />
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 text-red-500">
                            <p>Error loading flights: {error}</p>
                            <p className="text-sm mt-2 text-gray-500">Check console for details.</p>
                        </div>
                    ) : filteredFlights.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-500 text-lg">{NO_RESULTS}</p>
                            <button
                                onClick={() => setSearchQuery("")}
                                className="mt-4 text-gold hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {filteredFlights.map((flight) => (
                                <div key={flight.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col sm:flex-row group h-full">
                                    {/* Image Section (Optional based on design preference, using placeholder for now) */}
                                    <div className="sm:w-2/5 relative overflow-hidden h-48 sm:h-auto bg-slate-900">
                                        {/* Try to use aircraft image if provided, else some default */}
                                        {/* For now, just a placeholder styling or aircraft name */}
                                        <div className="absolute inset-0 flex items-center justify-center text-white/10">
                                            <Plane size={64} strokeWidth={1} />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:bg-gradient-to-r" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <p className="text-sm font-bold uppercase tracking-wider text-gold">{flight.aircraft}</p>
                                            <p className="text-xs opacity-80">{flight.seats} {SEATS}</p>
                                        </div>
                                    </div>

                                    {/* Info Section */}
                                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-start gap-2 mb-4 text-slate-500 text-sm font-medium">
                                                <Calendar size={16} className="text-gold shrink-0 mt-0.5" />
                                                <span>{translateAvailability(flight.availability)}</span>
                                            </div>

                                            <div className="flex flex-col gap-4 mb-6">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-slate-300 mt-2" />
                                                    <div>
                                                        <p className="text-xs text-slate-400 uppercase tracking-wider">{FROM}</p>
                                                        <h3 className="text-lg font-serif font-bold text-slate-900 leading-tight">{flight.from}</h3>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-gold mt-2" />
                                                    <div>
                                                        <p className="text-xs text-slate-400 uppercase tracking-wider">{TO}</p>
                                                        <h3 className="text-lg font-serif font-bold text-slate-900 leading-tight">{flight.to}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-6 border-t border-gray-100 flex items-center w-full">
                                            <a
                                                href={`https://wa.me/5491130635467?text=${encodeURIComponent(
                                                    isEN
                                                        ? `Hello, I'm interested in the Empty Leg from ${flight.from} to ${flight.to} on ${flight.date} (${flight.aircraft})`
                                                        : `Hola, me interesa el Empty Leg de ${flight.from} a ${flight.to} el ${flight.date} (${flight.aircraft})`
                                                )}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gold hover:text-slate-900 transition-colors flex items-center gap-2 group-hover:pl-6 duration-300"
                                            >
                                                {BOOK_NOW} <ArrowRight size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* FAQ / STATIC SEO CONTENT */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="section-container max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 mb-4">
                            {isEN ? "Frequently Asked Questions" : "Preguntas Frecuentes"}
                        </h2>
                        <div className="w-16 h-0.5 bg-gold mx-auto" />
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">
                                {isEN ? "What is an Empty Leg?" : "¿Qué es un Empty Leg?"}
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {isEN
                                    ? "An 'Empty Leg' refers to a private jet flying empty to reposition itself for another scheduled flight. Because the aircraft is already flying, we can offer these flights at significant discounts—often up to 75% off standard charter prices."
                                    : "Un 'Empty Leg' es un jet privado que vuela vacío para posicionarse para otro vuelo programado. Como el avión ya debe volar, ofrecemos estos trayectos con descuentos significativos, a menudo hasta un 75% menos que el precio chárter estándar."}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">
                                {isEN ? "Why choose a private empty leg?" : "¿Por qué elegir un empty leg privado?"}
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {isEN
                                    ? "It provides the full luxury private jet experience—privacy, comfort, and speed—at a fraction of the cost. Perfect for flexible travelers looking for a premium experience typically between major hubs like Buenos Aires, Punta del Este, Miami, and more."
                                    : "Ofrece toda la experiencia de lujo de un jet privado —privacidad, confort y rapidez— a una fracción del costo. Ideal para viajeros flexibles que buscan una experiencia premium, típicamente entre destinos clave como Buenos Aires, Punta del Este, Miami y más."}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">
                                {isEN ? "How do I book instantly?" : "¿Cómo reservo al instante?"}
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {isEN
                                    ? "Our list is updated in real-time. If you see a route that matches your travel plans, simply click 'Inquire Now' to chat with our team via WhatsApp. We'll confirm availability and finalize your booking immediately."
                                    : "Nuestra lista se actualiza en tiempo real. Si ves una ruta que coincide con tus planes, simplemente haz clic en 'Consultar Ahora' para chatear con nuestro equipo por WhatsApp. Confirmaremos disponibilidad y finalizaremos tu reserva de inmediato."}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">
                                {isEN ? "Can I customize the schedule?" : "¿Puedo personalizar el horario?"}
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {isEN
                                    ? "Empty legs have a predetermined schedule based on the aircraft's next mission, but minor adjustments to the departure time are sometimes possible. Contact us to discuss your specific needs."
                                    : "Los empty legs tienen un horario predeterminado basado en la siguiente misión del avión, pero a veces son posibles ajustes menores en la hora de salida. Contáctanos para discutir tus necesidades específicas."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default EmptyLegs;
