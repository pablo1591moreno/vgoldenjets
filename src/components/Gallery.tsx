import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { fleet, Aircraft } from "@/data/fleet";

const Gallery = () => {
    const { t, language } = useLanguage();

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
        <section id="fleet" className="bg-black py-10 sm:py-16 ">
            <div className="section-container">
                <h2 className="section-title font-serif text-white">{t("fleet.title")}</h2>
                <p className="section-subtitle" style={{ color: "rgb(234 213 155 / 0.9)" }}>{t("fleet.subtitle")}</p>

                {/* Fleet Gallery */}
                <div className="mt-8 relative">
                    <div className="bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-white/10">
                        {/* Image Section */}
                        <div className="relative w-full h-[400px] sm:h-[500px] lg:w-3/5 xl:w-2/3 flex items-center justify-center overflow-hidden bg-black">
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
                                    className="pointer-events-auto bg-black/50 hover:bg-black text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 backdrop-blur-sm border border-white/10"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="pointer-events-auto bg-black/50 hover:bg-black text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 backdrop-blur-sm border border-white/10"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="w-full lg:w-2/5 xl:w-1/3 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-zinc-900">
                            <h3 className="text-3xl font-serif font-bold text-white mb-6">{currentAircraft.name}</h3>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gold text-xs font-bold uppercase tracking-wider mb-1">{t("fleet.capacity")}</p>
                                        <p className="text-slate-300 font-medium">{currentAircraft.capacity}</p>
                                    </div>
                                    <div>
                                        <p className="text-gold text-xs font-bold uppercase tracking-wider mb-1">{t("fleet.speed")}</p>
                                        <p className="text-slate-300 font-medium">{currentAircraft.speed}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-gold text-xs font-bold uppercase tracking-wider mb-1">{t("fleet.range")}</p>
                                    <p className="text-slate-300 font-medium">{currentAircraft.range}</p>
                                </div>

                                <div>
                                    <p className="text-gold text-xs font-bold uppercase tracking-wider mb-2">{t("fleet.features")}</p>
                                    <ul className="space-y-2">
                                        {currentAircraft.features.slice(0, 4).map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <Check size={16} className="text-gold mr-2 mt-1 flex-shrink-0" />
                                                <span className="text-white text-sm">{feature}</span>
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
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gold w-6' : 'bg-gray-600 hover:bg-gold/50'
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
                    <h3 className="text-2xl font-serif font-bold text-center text-white mb-8">{t("fleet.availableJets")}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredJetModels().split(",").map((jet, index) => (
                            <div key={index} className="bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 hover:border-gold/30 shadow-sm hover:shadow-md transition-all duration-300 text-center group">
                                <p className="text-white font-medium group-hover:text-gold transition-colors">{jet.trim()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;