import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppButton = () => {
    const [showBubble, setShowBubble] = useState(true);
    const { language } = useLanguage();

    const ctaText = language === "en"
        ? "Where do you want to travel today?"
        : "¿A dónde querés viajar hoy?";

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBubble(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 animate-fade-in">
            {/* CTA Bubble */}
            <div
                className={`relative bg-white text-black px-4 py-2 rounded-lg shadow-lg mb-2 max-w-[250px] animate-bounce-subtle transition-all duration-500 origin-bottom-right ${showBubble ? 'opacity-100 scale-100' : 'opacity-0 scale-0 hidden'}`}
            >
                <p className="text-sm font-medium">{ctaText}</p>
                <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
            </div>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/5491168668170"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-[#25D366] hover:bg-[#128C7E] text-white shadow-xl transition-all duration-500 hover:scale-105 flex items-center justify-center ${!showBubble ? "rounded-full px-6 py-3 gap-2" : "rounded-full p-4"
                    }`}
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle size={32} />

                {/* Text showing up when bubble is gone */}
                <span
                    className={`font-bold whitespace-nowrap overflow-hidden transition-all duration-500 ${!showBubble ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"
                        }`}
                >
                    WhatsApp
                </span>
            </a>
        </div>
    );
};

export default WhatsAppButton;
