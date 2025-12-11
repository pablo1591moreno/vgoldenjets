import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import emailjs from "@emailjs/browser";

interface QuoteFormProps {
    onSuccess?: () => void;
    className?: string;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSuccess, className }) => {
    const { t } = useLanguage();
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
                "service_i8rzt5e",
                "template_hp4utjd",
                form.current,
                "3I1ux3m4EoGaMZscD"
            );

            console.log("EmailJS OK:", res);
            toast({
                title: t("contact.toast.title"),
                description: t("contact.toast.description"),
            });

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

        } catch (error: any) {
            console.error("EmailJS error:", error);
            toast({
                title: t("contact.toast.errorTitle") || "Error",
                description:
                    (typeof error === "string" && error) ||
                    error?.text ||
                    error?.message ||
                    t("contact.toast.errorDescription") ||
                    "Algo salió mal al enviar el formulario.",
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
                        className="bg-gray-50 border-gray-200 focus:border-gold focus:ring-gold text-slate-900 rounded-xl"
                    />
                    <Input
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        required
                        placeholder={t("contact.form.origin.placeholder")}
                        className="bg-gray-50 border-gray-200 focus:border-gold focus:ring-gold text-slate-900 rounded-xl"
                    />
                    <Input
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                        placeholder={t("contact.form.destination.placeholder")}
                        className="bg-gray-50 border-gray-200 focus:border-gold focus:ring-gold text-slate-900 rounded-xl"
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
                        className="bg-gray-50 border-gray-200 focus:border-gold focus:ring-gold text-slate-900 rounded-xl"
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
                        className="bg-gray-50 border-gray-200 focus:border-gold focus:ring-gold text-slate-900 rounded-xl"
                    />
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={t("contact.form.phone.placeholder")}
                        className="bg-gray-50 border-gray-200 focus:border-gold focus:ring-gold text-slate-900 rounded-xl"
                    />
                    <select
                        id="tripType"
                        name="tripType"
                        value={formData.tripType}
                        onChange={handleChange}
                        required
                        className="flex h-10 w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900"
                    >
                        <option value="oneway">{t("contact.form.tripType.oneWay")}</option>
                        <option value="roundtrip">{t("contact.form.tripType.roundTrip")}</option>
                    </select>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            id="departureDate"
                            type="date"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 border-gray-200 focus:border-gold focus:ring-gold text-slate-900 rounded-xl"
                        />
                        <Input
                            id="returnDate"
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChange}
                            disabled={formData.tripType === "oneway"}
                            className="bg-gray-50 border-gray-200 focus:border-gold focus:ring-gold text-slate-900 disabled:opacity-50 rounded-xl"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center pt-4">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-gold hover:bg-gold-dark text-black rounded-full px-12 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                    {isSubmitting ? "Enviando..." : t("contact.form.submit")}
                </Button>
            </div>
        </form>
    );
};

export default QuoteForm;
