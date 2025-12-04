import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import GulfstreamImg from "@/img/Gulfstream.webp";
import ChallengerImg from "@/img/Challenger601.webp";
import HawkerImg from "@/img/Hawker 800.webp";
import LearImg from "@/img/Lear60.webp";
import BombardierImg from "@/img/BombardierGlobal.webp";
import CessnaImg from "@/img/CessnaCitationCJ1.webp";
import DassaultImg from "@/img/DassaultFalcon.webp";


interface Aircraft {
    id: number;
    name: string;
    image: string;
    capacity: string;
    range: string;
    speed: string;
    features: string[];
}

const Gallery = () => {
    const { t, language } = useLanguage();

    const fleet: Record<string, Aircraft[]> = {
        en: [
            { id: 1, name: "Gulfstream G650", image: GulfstreamImg, capacity: "Up to 19 passengers", range: "7,000 nautical miles", speed: "Mach 0.925", features: ["Spacious cabin", "Stand-up headroom", "Four living areas", "State-of-the-art entertainment", "Satellite communications", "Full kitchen"] },
            { id: 2, name: "Bombardier Global 7500", image: BombardierImg, capacity: "Up to 19 passengers", range: "7,700 nautical miles", speed: "Mach 0.925", features: ["Four distinct living spaces", "Permanent crew rest area", "Master suite with shower", "Full-size kitchen", "4K entertainment system", "Ka-band Wi-Fi"] },
            { id: 3, name: "Dassault Falcon 8X", image: DassaultImg, capacity: "Up to 16 passengers", range: "6,450 nautical miles", speed: "Mach 0.9", features: ["30 cabin layouts", "Low cabin altitude", "Whisper-quiet cabin", "High-speed connectivity", "Falcon HD entertainment", "Spacious galley"] },
            { id: 4, name: "Lear Jet 60", image: LearImg, capacity: "Up to 8 passengers", range: "2,405 nautical miles", speed: "Mach 0.81", features: ["Comfortable seating", "Stand-up cabin", "Executive workspace", "Full refreshment center", "Modern avionics", "Private lavatory"] },
            { id: 5, name: "Hawker 800", image: HawkerImg, capacity: "Up to 8 passengers", range: "2,540 nautical miles", speed: "Mach 0.80", features: ["Spacious cabin", "Private lavatory", "Club seating", "Worktables", "Efficient range", "Refreshment center"] },
            { id: 6, name: "Challenger 601", image: ChallengerImg, capacity: "Up to 12 passengers", range: "3,290 nautical miles", speed: "Mach 0.80", features: ["Spacious stand-up cabin", "Conference area", "Full galley", "Lavatory", "Intercontinental range", "Wi-Fi available"] },
            { id: 7, name: "Cessna Citation CJ1", image: CessnaImg, capacity: "Up to 5 passengers", range: "1,300 nautical miles", speed: "Mach 0.71", features: ["Compact and efficient", "Quiet cabin", "Executive layout", "Low operating costs", "Private lavatory", "Ideal for short trips"] },
        ],
        es: [
            { id: 1, name: "Gulfstream G650", image: GulfstreamImg, capacity: "Hasta 19 pasajeros", range: "7,000 millas náuticas", speed: "Mach 0.925", features: ["Cabina espaciosa", "Altura para estar de pie", "Cuatro áreas habitables", "Entretenimiento de última generación", "Comunicaciones por satélite", "Cocina completa"] },
            { id: 2, name: "Bombardier Global 7500", image: BombardierImg, capacity: "Hasta 19 pasajeros", range: "7,700 millas náuticas", speed: "Mach 0.925", features: ["Cuatro espacios habitables distintos", "Área de descanso permanente para la tripulación", "Suite principal con ducha", "Cocina de tamaño completo", "Sistema de entretenimiento 4K", "Wi-Fi de banda Ka"] },
            { id: 3, name: "Dassault Falcon 8X", image: DassaultImg, capacity: "Hasta 16 pasajeros", range: "6,450 millas náuticas", speed: "Mach 0.9", features: ["30 diseños de cabina", "Baja altitud de cabina", "Cabina silenciosa", "Conectividad de alta velocidad", "Entretenimiento Falcon HD", "Cocina espaciosa"] },
            { id: 4, name: "Lear Jet 60", image: LearImg, capacity: "Hasta 8 pasajeros", range: "2,405 millas náuticas", speed: "Mach 0.81", features: ["Asientos cómodos", "Cabina con altura para estar de pie", "Espacio de trabajo ejecutivo", "Centro de refrigerios completo", "Aviónica moderna", "Baño privado"] },
            { id: 5, name: "Hawker 800", image: HawkerImg, capacity: "Hasta 8 pasajeros", range: "2,540 millas náuticas", speed: "Mach 0.80", features: ["Cabina espaciosa", "Baño privado", "Asientos tipo club", "Mesas de trabajo", "Alcance eficiente", "Centro de refrigerios"] },
            { id: 6, name: "Challenger 601", image: ChallengerImg, capacity: "Hasta 12 pasajeros", range: "3,290 millas náuticas", speed: "Mach 0.80", features: ["Cabina espaciosa con altura", "Área de conferencias", "Cocina completa", "Baño privado", "Alcance intercontinental", "Wi-Fi disponible"] },
            { id: 7, name: "Cessna Citation CJ1", image: CessnaImg, capacity: "Hasta 5 pasajeros", range: "1,300 millas náuticas", speed: "Mach 0.71", features: ["Compacto y eficiente", "Cabina silenciosa", "Diseño ejecutivo", "Bajos costos operativos", "Baño privado", "Ideal para viajes cortos"] },
        ],
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % fleet[language].length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + fleet[language].length) % fleet[language].length);
    };

    const currentAircraft = fleet[language][currentIndex];

    const filteredJetModels = () => {
        const models = t("fleet.jetModels").split(",");
        return models.filter(model => !model.trim().includes("Lear 60")).join(", ");
    };

    return (
        <section id="fleet" className="bg-white py-10 sm:py-16 ">
            <div className="section-container">
                <h2 className="section-title font-serif text-slate-900">{t("fleet.title")}</h2>
                <p className="section-subtitle text-slate-600">{t("fleet.subtitle")}</p>

                {/* Fleet Gallery */}
                <div className="mt-8 relative">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">
                        {/* Image Section */}
                        <div className="relative w-full h-[400px] sm:h-[500px] lg:w-3/5 xl:w-2/3 flex items-center justify-center overflow-hidden bg-gray-100">
                            <img
                                src={currentAircraft.image}
                                alt={currentAircraft.name}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                style={{ objectPosition: 'center' }}
                                loading="lazy"
                                decoding="async"
                            />

                            {/* Navigation Buttons */}
                            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                                <button
                                    onClick={prevSlide}
                                    className="pointer-events-auto bg-white/80 hover:bg-white text-slate-900 p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 backdrop-blur-sm border border-gray-100"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="pointer-events-auto bg-white/80 hover:bg-white text-slate-900 p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 backdrop-blur-sm border border-gray-100"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="w-full lg:w-2/5 xl:w-1/3 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-white">
                            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6">{currentAircraft.name}</h3>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gold text-xs font-bold uppercase tracking-wider mb-1">{t("fleet.capacity")}</p>
                                        <p className="text-slate-700 font-medium">{currentAircraft.capacity}</p>
                                    </div>
                                    <div>
                                        <p className="text-gold text-xs font-bold uppercase tracking-wider mb-1">{t("fleet.speed")}</p>
                                        <p className="text-slate-700 font-medium">{currentAircraft.speed}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-gold text-xs font-bold uppercase tracking-wider mb-1">{t("fleet.range")}</p>
                                    <p className="text-slate-700 font-medium">{currentAircraft.range}</p>
                                </div>

                                <div>
                                    <p className="text-gold text-xs font-bold uppercase tracking-wider mb-2">{t("fleet.features")}</p>
                                    <ul className="space-y-2">
                                        {currentAircraft.features.slice(0, 4).map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <Check size={16} className="text-gold mr-2 mt-1 flex-shrink-0" />
                                                <span className="text-slate-600 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Pagination Dots */}
                            <div className="flex justify-center mt-8 space-x-2">
                                {fleet[language].map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gold w-6' : 'bg-gray-300 hover:bg-gold/50'
                                            }`}
                                        onClick={() => setCurrentIndex(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Jets List */}
                <div className="mt-16">
                    <h3 className="text-2xl font-serif font-bold text-center text-slate-900 mb-8">{t("fleet.availableJets")}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredJetModels().split(",").map((jet, index) => (
                            <div key={index} className="bg-gray-50 hover:bg-white p-4 rounded-xl border border-gray-100 hover:border-gold/30 shadow-sm hover:shadow-md transition-all duration-300 text-center group">
                                <p className="text-slate-700 font-medium group-hover:text-gold transition-colors">{jet.trim()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;