import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import emailjs from "@emailjs/browser";
// @ts-ignore
import logo from "@/img/logo vgolden jet-01.png";
// @ts-ignore
import background from "@/img/527dfc_84ca4ea39e9147589e332ebe5810c677~mv2.gif";
// @ts-ignore
import argus from "@/img/argus.png";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const CampaignLanding = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        origin: "",
        destination: "",
        passengers: "",
        email: "",
        phone: "",
        tripType: "oneway",
        departureDate: "",
        returnDate: ""
    });
    const form = useRef<HTMLFormElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "passengers" && value !== "") {
            const numericValue = value.replace(/[^0-9]/g, "");
            setFormData((prev) => ({ ...prev, [name]: numericValue }));
            return;
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.current) {
            emailjs
                .sendForm(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                    form.current,
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                )
                .then(
                    () => {
                        // Success - Redirect to Thank You
                        navigate("/thank-you");
                    },
                    () => {
                        toast({
                            title: "Error",
                            description: "Hubo un error al enviar el formulario.",
                            variant: "destructive"
                        });
                    }
                );
        }
        setFormData({
            name: "",
            origin: "",
            destination: "",
            passengers: "",
            email: "",
            phone: "",
            tripType: "oneway",
            departureDate: "",
            returnDate: ""
        });
    };

    // Styles reused from QuoteForm for consistency
    const inputClasses = "bg-white/5 border border-white/10 focus:border-gold focus:ring-gold text-white placeholder:text-gray-400 rounded-xl h-12 px-4";

    return (
        <div
            className="min-h-screen bg-black text-white bg-cover bg-center relative font-sans flex flex-col"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute inset-0 bg-black/80 z-0" />

            <Helmet>
                <title>Cotización Vuelos Privados | V Golden Jets</title>
                <meta name="description" content="Vuelos Privados Ejecutivos desde Argentina al mundo. Cotice su vuelo ahora." />
                <meta name="robots" content="noindex" />
            </Helmet>

            <div className="relative z-10 flex flex-col items-center justify-start px-4 pt-8 pb-4 w-full max-w-7xl mx-auto flex-grow">

                {/* Logo Section */}
                <div className="mb-8 animate-fade-in-down">
                    <img src={logo} alt="V Golden Jets" className="w-32 md:w-48 object-contain" />
                </div>

                {/* Main Header */}
                <h1 className="text-center text-2xl md:text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-12 leading-tight max-w-4xl tracking-tight">
                    <span className="block">Vuelos Privados Ejecutivos</span>
                    <span className="block">desde Argentina al mundo</span>
                </h1>

                {/* Trust Badge & Argus Logo */}
                <div className="mb-12 flex flex-col items-center justify-center">
                    <img src={argus} alt="Argus Certified" className="h-20 md:h-24 object-contain opacity-90 hover:opacity-100 transition-opacity" />
                </div>

                {/* Contact Form - Refined Premium Style */}
                <div className="w-full max-w-5xl bg-black/40 p-6 md:p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-xl">
                    <form id="quote-form" ref={form} onSubmit={handleSubmit} className="w-full space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                            {/* Row 1: Route Info */}
                            <div className="md:col-span-4">
                                <Input id="origin" name="origin" value={formData.origin} onChange={handleChange} required placeholder="Aeropuerto de Origen" className={inputClasses} />
                            </div>
                            <div className="md:col-span-4">
                                <Input id="destination" name="destination" value={formData.destination} onChange={handleChange} required placeholder="Aeropuerto de Destino" className={inputClasses} />
                            </div>
                            <div className="md:col-span-2">
                                <select id="tripType" name="tripType" value={formData.tripType} onChange={handleChange} required className={`w-full ${inputClasses} appearance-none cursor-pointer`}>
                                    <option value="oneway" className="bg-black text-white">Solo Ida</option>
                                    <option value="roundtrip" className="bg-black text-white">Ida y Vuelta</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <Input id="passengers" name="passengers" value={formData.passengers} onChange={handleChange} required inputMode="numeric" pattern="[0-9]*" placeholder="Pasajeros" className={inputClasses} />
                            </div>

                            {/* Row 2: Dates */}
                            <div className="md:col-span-6">
                                <label className="block text-xs uppercase text-gold/80 mb-1 ml-2 font-bold tracking-wider">Fecha de Salida</label>
                                <Input id="departureDate" type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required className={`${inputClasses} [color-scheme:dark]`} />
                            </div>
                            <div className="md:col-span-6">
                                <label className="block text-xs uppercase text-gold/80 mb-1 ml-2 font-bold tracking-wider">Fecha de Regreso</label>
                                <Input id="returnDate" type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} disabled={formData.tripType === "oneway"} className={`${inputClasses} [color-scheme:dark] disabled:opacity-30`} />
                            </div>

                            {/* Row 3: Personal Info */}
                            <div className="md:col-span-4">
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Nombre y Apellido" className={inputClasses} />
                            </div>
                            <div className="md:col-span-4">
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Correo Electrónico" className={inputClasses} />
                            </div>
                            <div className="md:col-span-4">
                                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="WhatsApp / Teléfono" className={inputClasses} />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <Button type="submit" className="w-full h-14 text-xl rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-400 hover:to-gold-light text-black font-extrabold tracking-wider">
                                COTIZAR VUELO AHORA
                            </Button>
                            <p className="text-gray-400 text-xs text-center mt-3">
                                Respuesta inmediata. Privacidad garantizada.
                            </p>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    );
};

export default CampaignLanding;
