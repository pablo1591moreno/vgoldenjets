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
            { id: 4, name: "Lear 60", image: LearImg, capacity: "Up to 8 passengers", range: "2,405 nautical miles", speed: "Mach 0.81", features: ["Comfortable seating", "Stand-up cabin", "Executive workspace", "Full refreshment center", "Modern avionics", "Private lavatory"] },
            { id: 5, name: "Hawker 800", image: HawkerImg, capacity: "Up to 8 passengers", range: "2,540 nautical miles", speed: "Mach 0.80", features: ["Spacious cabin", "Private lavatory", "Club seating", "Worktables", "Efficient range", "Refreshment center"] },
            { id: 6, name: "Challenger 601", image: ChallengerImg, capacity: "Up to 12 passengers", range: "3,290 nautical miles", speed: "Mach 0.80", features: ["Spacious stand-up cabin", "Conference area", "Full galley", "Lavatory", "Intercontinental range", "Wi-Fi available"] },
            { id: 7, name: "Cessna Citation CJ1", image: CessnaImg, capacity: "Up to 5 passengers", range: "1,300 nautical miles", speed: "Mach 0.71", features: ["Compact and efficient", "Quiet cabin", "Executive layout", "Low operating costs", "Private lavatory", "Ideal for short trips"] },
        ],
        es: [
            { id: 1, name: "Gulfstream G650", image: GulfstreamImg, capacity: "Hasta 19 pasajeros", range: "7,000 millas náuticas", speed: "Mach 0.925", features: ["Cabina espaciosa", "Altura para estar de pie", "Cuatro áreas habitables", "Entretenimiento de última generación", "Comunicaciones por satélite", "Cocina completa"] },
            { id: 2, name: "Bombardier Global 7500", image: BombardierImg, capacity: "Hasta 19 pasajeros", range: "7,700 millas náuticas", speed: "Mach 0.925", features: ["Cuatro espacios habitables distintos", "Área de descanso permanente para la tripulación", "Suite principal con ducha", "Cocina de tamaño completo", "Sistema de entretenimiento 4K", "Wi-Fi de banda Ka"] },
            { id: 3, name: "Dassault Falcon 8X", image: DassaultImg, capacity: "Hasta 16 pasajeros", range: "6,450 millas náuticas", speed: "Mach 0.9", features: ["30 diseños de cabina", "Baja altitud de cabina", "Cabina silenciosa", "Conectividad de alta velocidad", "Entretenimiento Falcon HD", "Cocina espaciosa"] },
            { id: 4, name: "Lear 60", image: LearImg, capacity: "Hasta 8 pasajeros", range: "2,405 millas náuticas", speed: "Mach 0.81", features: ["Asientos cómodos", "Cabina con altura para estar de pie", "Espacio de trabajo ejecutivo", "Centro de refrigerios completo", "Aviónica moderna", "Baño privado"] },
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
        <section id="fleet" className="bg-secondary py-10 sm:py-16 ">
            <div className="section-container">
                <h2 className="section-title font-serif">{t("fleet.title")}</h2>
                <p className="section-subtitle">{t("fleet.subtitle")}</p>

                {/* Jet Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-12">
                    <div className="bg-black/40 p-5">
                        <h3 className="text-xl font-bold text-gold mb-3">{t("fleet.lightJets.title")}</h3>
                        <p className="text-white/80">{t("fleet.lightJets.description")}</p>
                    </div>
                    <div className="bg-black/40 p-5">
                        <h3 className="text-xl font-bold text-gold mb-3">{t("fleet.midSizeJets.title")}</h3>
                        <p className="text-white/80">{t("fleet.midSizeJets.description")}</p>
                    </div>
                    <div className="bg-black/40 p-5">
                        <h3 className="text-xl font-bold text-gold mb-3">{t("fleet.heavyJets.title")}</h3>
                        <p className="text-white/80">{t("fleet.heavyJets.description")}</p>
                    </div>
                </div>

                {/* Fleet Gallery */}

                <div className="mt-8 relative overflow-hidden">
                    <div className="relative bg-black overflow-hidden flex flex-col lg:flex-row"> {/* Mantiene flex-col para móvil */}
                        {/* Contenedor de Imagen y Botones (Izquierda en web) */}
                        <div className="relative w-full h-64 sm:h-auto lg:w-4/5">
                            <img
                                src={currentAircraft.image}
                                alt={currentAircraft.name}
                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                                style={{ objectPosition: 'center' }}
                            />
                            <div className="absolute inset-0 bg-black/30"></div>
                            {/* Navigation Buttons on Image */}
                            <button
                                onClick={prevSlide}
                                className="absolute top-1/2 left-2 sm:left-5 -translate-y-1/2 bg-black/50 hover:bg-gold/80 text-white p-2 rounded-full z-10 transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute top-1/2 right-2 sm:right-5 -translate-y-1/2 bg-black/50 hover:bg-gold/80 text-white p-2 rounded-full z-10 transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Detalles (Derecha en web) */}
                        <div className="w-full lg:w-3/5 p-5 lg:pl-8 flex flex-col justify-between"> {/* Flex column para nombre arriba */}
                            <h3 className="text-2xl font-bold text-white lg:mb-4">{currentAircraft.name}</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-gold text-sm mb-1">{t("fleet.capacity")}</p>
                                    <p className="text-white">{currentAircraft.capacity}</p>
                                </div>
                                <div>
                                    <p className="text-gold text-sm mb-1">{t("fleet.range")}</p>
                                    <p className="text-white">{currentAircraft.range}</p>
                                </div>
                                <div>
                                    <p className="text-gold text-sm mb-1">{t("fleet.speed")}</p>
                                    <p className="text-white">{currentAircraft.speed}</p>
                                </div>

                                <div>
                                    <p className="text-gold text-sm mb-1">{t("fleet.features")}</p>
                                    <ul className="mt-2 space-y-1.5">
                                        {currentAircraft.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <Check size={16} className="text-gold mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-white/80">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Pagination Dots (Abajo de los detalles en ambos casos) */}
                            <div className="flex justify-center mt-6 lg:mt-8">
                                {fleet[language].map((_, index) => (
                                    <span
                                        key={index}
                                        className={`block w-2 h-2 rounded-full mx-1 cursor-pointer ${index === currentIndex ? 'bg-gold' : 'bg-white/30'}`}
                                        onClick={() => setCurrentIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                {/* Available Jets List */}
                <div className="mt-12">
                    <h3 className="text-2xl font-bold text-center text-white mb-5">{t("fleet.availableJets")}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-center">
                        {filteredJetModels().split(",").map((jet, index) => (
                            <div key={index} className="bg-black/30 p-3 ">
                                <p className="text-white">{jet.trim()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;