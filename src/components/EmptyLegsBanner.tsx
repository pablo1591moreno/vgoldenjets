import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEmptyLegs } from "@/hooks/useEmptyLegs";
import { Plane, ChevronRight } from "lucide-react";

const EmptyLegsBanner = () => {
    const { flights: emptyLegs, loading } = useEmptyLegs();
    const { language } = useLanguage();
    const isEN = language === "en";

    const TITLE = isEN ? "EMPTY LEGS AVAILABLE:" : "EMPTY LEGS DISPONIBLES:";

    // Helper to format date
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);

        return new Intl.DateTimeFormat(isEN ? "en-US" : "es-AR", {
            month: "short",
            day: "numeric",
        }).format(dateObj);
    };

    // Filter out expired flights
    const today = new Date().toISOString().split('T')[0];
    const activeEmptyLegs = emptyLegs.filter(flight => flight.date >= today);

    // Flattening the flights slightly differently if needed, or just mapping
    // We want a seamless loop so maybe duplicate the list a few times if it's short
    const flights = [...activeEmptyLegs, ...activeEmptyLegs, ...activeEmptyLegs];

    if (loading) return null; // Don't show banner while loading
    if (activeEmptyLegs.length === 0) return null;

    return (
        <div className="relative w-full z-30 bg-black/90 backdrop-blur-md border-y border-white/10 overflow-hidden h-10 sm:h-12 flex items-center text-white text-xs sm:text-sm shadow-xl">
            <div className="absolute left-0 top-0 bottom-0 z-50 bg-black px-3 sm:px-4 flex items-center shadow-[5px_0_15px_bg-black]">
                <span className="font-bold text-gold tracking-widest text-[10px] sm:text-xs uppercase whitespace-nowrap flex items-center gap-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse" />
                    {isEN ? "EMPTY LEGS" : "EMPTY LEGS"} <span className="hidden sm:inline">{isEN ? "AVAILABLE:" : "DISPONIBLES:"}</span>
                </span>
            </div>

            <div className="flex overflow-hidden w-full"> {/* Container for the two scrolling lists */}
                {/* First list */}
                <div className="flex animate-ticker">
                    {flights.map((flight, index) => (
                        <Link
                            key={`a-${flight.id}-${index}`}
                            to={`${isEN ? "/en" : ""}/emptylegs`}
                            className="flex items-center gap-2 mx-8 text-white/80 hover:text-gold transition-colors whitespace-nowrap"
                        >
                            <Plane size={14} className="text-gold" />
                            <span className="font-medium">{flight.origin}</span>
                            <ChevronRight size={12} className="text-white/40" />
                            <span className="font-medium">{flight.destination}</span>
                            <span className="text-white/60 ml-1">({formatDate(flight.date)})</span>
                        </Link>
                    ))}
                </div>

                {/* Second list (duplicate) */}
                <div className="flex animate-ticker">
                    {flights.map((flight, index) => (
                        <Link
                            key={`b-${flight.id}-${index}`}
                            to={`${isEN ? "/en" : ""}/emptylegs`}
                            className="flex items-center gap-2 mx-8 text-white/80 hover:text-gold transition-colors whitespace-nowrap"
                        >
                            <Plane size={14} className="text-gold" />
                            <span className="font-medium">{flight.origin}</span>
                            <ChevronRight size={12} className="text-white/40" />
                            <span className="font-medium">{flight.destination}</span>
                            <span className="text-white/60 ml-1">({formatDate(flight.date)})</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmptyLegsBanner;
