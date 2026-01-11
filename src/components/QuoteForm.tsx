import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

interface QuoteFormProps {
    onSuccess?: () => void;
    className?: string;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSuccess, className }) => {
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "passengers" && value !== "") {
            const numericValue = value.replace(/[^0-9]/g, "");
            setFormData((prev) => ({ ...prev, [name]: numericValue }));
            return;
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!form.current) return;

            // Validaciones básicas
            if (formData.tripType === "roundtrip") {
                if (!formData.returnDate) {
                    throw new Error("Por favor, seleccioná fecha de regreso.");
                }
                if (formData.departureDate && formData.returnDate && formData.returnDate < formData.departureDate) {
                    throw new Error("La fecha de regreso no puede ser anterior a la de salida.");
                }
            }

            // Enviar usando sendForm (DOM del <form>)
            const res = await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            // Redirect to Thank You
            navigate("/thank-you");

            // Reset
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
            if (onSuccess) onSuccess();

        } catch (error: unknown) {
            console.error("FAILED...", error);
            const errorMessage = (typeof error === "string" && error) ||
                (error as { text?: string })?.text ||
                (error as Error)?.message ||
                t("contact.toast.errorDescription") ||
                "Algo salió mal al enviar el formulario.";

            toast({
                title: t("contact.toast.errorTitle") || "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form id="quote-form" ref={form} onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t("contact.form.fullName.placeholder")}
                        className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white placeholder:text-gray-400 rounded-xl"
                    />
                    <Input
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        required
                        placeholder={t("contact.form.origin.placeholder")}
                        className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white placeholder:text-gray-400 rounded-xl"
                    />
                    <Input
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                        placeholder={t("contact.form.destination.placeholder")}
                        className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white placeholder:text-gray-400 rounded-xl"
                    />
                    <Input
                        id="passengers"
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleChange}
                        required
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder={t("contact.form.passengers.placeholder")}
                        className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white placeholder:text-gray-400 rounded-xl"
                    />
                </div>
                <div className="space-y-4">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t("contact.form.email.placeholder")}
                        className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white placeholder:text-gray-400 rounded-xl"
                    />
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={t("contact.form.phone.placeholder")}
                        className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white placeholder:text-gray-400 rounded-xl"
                    />
                    <select
                        id="tripType"
                        name="tripType"
                        value={formData.tripType}
                        onChange={handleChange}
                        required
                        className="flex h-10 w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                    >
                        <option value="oneway" className="bg-black text-white">{t("contact.form.tripType.oneWay")}</option>
                        <option value="roundtrip" className="bg-black text-white">{t("contact.form.tripType.roundTrip")}</option>
                    </select>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            id="departureDate"
                            type="date"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleChange}
                            required
                            className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white placeholder:text-gray-400 rounded-xl [color-scheme:dark]"
                        />
                        <Input
                            id="returnDate"
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChange}
                            disabled={formData.tripType === "oneway"}
                            className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white placeholder:text-gray-400 disabled:opacity-30 rounded-xl [color-scheme:dark]"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center pt-4">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary rounded-full w-full md:w-auto px-8"
                >
                    {isSubmitting ? "Enviando..." : t("contact.form.submit")}
                </Button>
            </div>
        </form>
    );
};

export default QuoteForm;
