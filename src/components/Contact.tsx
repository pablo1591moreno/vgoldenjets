import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import emailjs from "@emailjs/browser";

const ContactInfo = ({
  icon: Icon,
  title,
  content
}: {
  icon: React.ElementType;
  title: string;
  content: string | React.ReactNode;
}) => {
  return (
    <div className="flex space-x-4">
      <div className="bg-gold/20 p-3 h-fit ">
        <Icon className="h-6 w-6 text-gold" />
      </div>
      <div>
        <h3 className="text-black font-semibold mb-1">{title}</h3>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    destination: "",
    passengers: "",
    email: "",
    phone: "",
    tripType: "oneway" as "oneway" | "roundtrip",
    departureDate: "",
    returnDate: ""
  });

  // Inicializar EmailJS una sola vez (opcional pero recomendado)
  useEffect(() => {
    // Si ya usás la public key como 4to parámetro en sendForm, esto es opcional.
    emailjs.init("Hlap8_HHq2vJfOs3N");
  }, []);

  // Si el usuario cambia a "oneway", limpiamos returnDate
  useEffect(() => {
    if (formData.tripType === "oneway" && formData.returnDate !== "") {
      setFormData(prev => ({ ...prev, returnDate: "" }));
    }
  }, [formData.tripType, formData.returnDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "passengers") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData(prev => ({ ...prev, passengers: numericValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      // Podés seguir pasando la public key acá; como ya hicimos init, también funciona sin el 4to parámetro.
      const res = await emailjs.sendForm(
        "service_i8rzt5e",
        "template_hp4utjd",
        form.current,
        "3I1ux3m4EoGaMZscD"
      );


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
      // Si no fueran 100% controlados, también podrías hacer: form.current.reset();
    } catch (error: unknown) {
      console.error("FAILED...", error);
      const errorMessage = (error as { text?: string; message?: string })?.text ||
        (error as Error)?.message ||
        t("contact.toast.errorDescription") ||
        "Algo salió mal al enviar el formulario.";

      toast({
        title: t("contact.toast.errorTitle") || "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="bg-gray-100 py-16 sm:py-24">
      <div className="section-container">
        <h2 className="section-title font-serif text-black">{t("contact.title")}</h2>
        <p className="section-subtitle text-gray-800">{t("contact.subtitle")}</p>

        <div className="mt-10">
          <div className="bg-white p-6 lg:p-8 shadow-lg ">
            <h3 className="text-xl lg:text-2xl font-semibold text-black mb-6">{t("contact.form.title")}</h3>

            <form ref={form} onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                <div className="flex flex-col space-y-4">
                  <div>
                    <label htmlFor="name" className="text-gray-800 mb-1 block">{t("contact.form.fullName")}</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white border-gray-300 text-black h-12 text-base"
                      placeholder={t("contact.form.fullName.placeholder")}
                    />
                  </div>

                  <div>
                    <label htmlFor="origin" className="text-gray-800 mb-1 block">{t("contact.form.origin")}</label>
                    <Input
                      id="origin"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      required
                      className="bg-white border-gray-300 text-black h-12 text-base"
                      placeholder={t("contact.form.origin.placeholder")}
                    />
                  </div>

                  <div>
                    <label htmlFor="destination" className="text-gray-800 mb-1 block">{t("contact.form.destination")}</label>
                    <Input
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="bg-white border-gray-300 text-black h-12 text-base"
                      placeholder={t("contact.form.destination.placeholder")}
                    />
                  </div>

                  <div>
                    <label htmlFor="passengers" className="text-gray-800 mb-1 block">{t("contact.form.passengers")}</label>
                    <Input
                      id="passengers"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      required
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="bg-white border-gray-300 text-black h-12 text-base"
                      placeholder={t("contact.form.passengers.placeholder")}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-gray-800 mb-1 block">{t("contact.form.email")}</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white border-gray-300 text-black h-12 text-base"
                      placeholder={t("contact.form.email.placeholder")}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <div>
                    <label htmlFor="phone" className="text-gray-800 mb-1 block">{t("contact.form.phone")}</label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-white border-gray-300 text-black h-12 text-base"
                      placeholder={t("contact.form.phone.placeholder")}
                    />
                  </div>

                  <div>
                    <label htmlFor="tripType" className="text-gray-800 mb-1 block">{t("contact.form.tripType")}</label>
                    <select
                      id="tripType"
                      name="tripType"
                      value={formData.tripType}
                      onChange={handleChange}
                      required
                      className="bg-white border-gray-300 text-black w-full p-2 h-12 text-base"
                    >
                      <option value="oneway">{t("contact.form.tripType.oneWay")}</option>
                      <option value="roundtrip">{t("contact.form.tripType.roundTrip")}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="departureDate" className="text-gray-800 mb-1 block">{t("contact.form.departureDate")}</label>
                    <Input
                      id="departureDate"
                      type="date"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleChange}
                      required
                      className="bg-white border-gray-300 text-black h-12 text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="returnDate" className="text-gray-800 mb-1 block">{t("contact.form.returnDate")}</label>
                    <Input
                      id="returnDate"
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                      readOnly={formData.tripType === "oneway"} // evita disabled para que viaje en el form
                      className="bg-white border-gray-300 text-black disabled:opacity-50 "
                    />
                    {/* Si preferís forzar vacío siempre que sea oneway, ya lo hacemos en el useEffect */}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-gold hover:bg-gold-dark text-black rounded-full px-12 py-3 text-base"
                >
                  {t("contact.form.submit")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
