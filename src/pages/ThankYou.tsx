import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// @ts-ignore
import logo from "@/img/logo vgolden jet-01.png";
// @ts-ignore
import background from "@/img/527dfc_84ca4ea39e9147589e332ebe5810c677~mv2.gif";
import { Helmet } from "react-helmet-async";
import { MessageCircle } from "lucide-react";

const ThankYou = () => {

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div
            className="min-h-screen bg-black text-white bg-cover bg-center relative font-sans flex flex-col items-center justify-center p-4"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute inset-0 bg-black/85 z-0" />

            <Helmet>
                <title>Mensaje Recibido | V Golden Jets</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl animate-fade-in-up">

                {/* Logo */}
                <div className="mb-8">
                    <img src={logo} alt="V Golden Jets" className="w-48 md:w-64 object-contain" />
                </div>

                {/* Main Message */}
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
                    Mensaje recibido
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-lg mx-auto">
                    Un asesor de V Golden Jets te contactará a la brevedad.
                </p>

                {/* Urgent Action - WhatsApp */}
                <div className="w-full flex flex-col items-center gap-4">
                    <a
                        href="https://wa.me/5491173745726"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                    >
                        <Button className="w-full sm:w-auto h-14 text-lg bg-green-600 hover:bg-green-700 text-white rounded-full px-8 shadow-lg shadow-green-900/20 transition-all hover:scale-105 flex items-center justify-center gap-2">
                            <MessageCircle className="w-6 h-6" />
                            ¿Es urgente? Escríbenos por WhatsApp ahora
                        </Button>
                    </a>

                    {/* Back to Home */}
                    <Link to="/" className="mt-4">
                        <Button variant="link" className="text-gold/80 hover:text-gold text-sm underline-offset-4">
                            Volver al sitio principal
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Footer Copyright */}
            <div className="absolute bottom-4 z-10 text-gray-600 text-xs">
                &copy; {new Date().getFullYear()} V Golden Jets
            </div>
        </div>
    );
};

export default ThankYou;
