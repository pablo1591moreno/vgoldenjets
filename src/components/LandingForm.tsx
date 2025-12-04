import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import emailjs from "@emailjs/browser";
import logo from "@/img/logo vgolden jet-01.png";
import background from "@/img/527dfc_84ca4ea39e9147589e332ebe5810c677~mv2.gif";
import { useIsMobile } from "@/hooks/use-mobile";
import { Helmet } from "react-helmet-async";

const LandingPage = () => {
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();
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
  const form = useRef(null);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "passengers" && value !== "") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.current) {
      emailjs
        .sendForm("service_i8rzt5e", "template_hp4utjd", form.current, "Hlap8_HHq2vJfOs3N")
        .then(
          () => {
            toast({
              title: t("contact.toast.title"),
              description: t("contact.toast.description")
            });
          },
          () => {
            toast({
              title: t("contact.toast.errorTitle") || "Error",
              description: t("contact.toast.errorDescription") || "Something went wrong.",
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

  return (
    <div
      className="min-h-screen bg-black text-white bg-cover bg-center relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />

      <Helmet htmlAttributes={{ lang: language }}>
        <title>{language === "en" ? "Request a Quote | V Golden Jets" : "Solicitar Cotización | V Golden Jets"}</title>
        <meta
          name="description"
          content={
            language === "en"
              ? "Request a personalized quote for your private jet charter. Fast, secure, and tailored to your needs."
              : "Solicite una cotización personalizada para su vuelo privado. Rápido, seguro y adaptado a sus necesidades."
          }
        />
        <link rel="canonical" href="https://www.vgoldenjets.com/landingForm" />
      </Helmet>

      {/* Fixed navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 flex items-center justify-between px-6 py-3 shadow-md">
        <a
          href="https://www.vgoldenjets.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="Logo" className="w-36 object-cover" />
        </a>        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="text-white hover:text-gold hover:bg-black/30 px-2"
        >
          <Globe size={20} />
          <span className="ml-1 text-sm">{language === "en" ? "EN" : "ES"}</span>
        </Button>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/+1168668170"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 p-3 rounded-full shadow-lg z-50"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
      </a>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-36 pb-10 min-h-screen">
        {/* Title */}
        <h1 className="text-center text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-12">
          {t("hero.subtitle.from")}
        </h1>

        {/* Contact Form */}
        <div className="w-full max-w-6xl bg-black/80 p-6 md:p-10 rounded-xl shadow-xl">
          <form ref={form} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder={t("contact.form.fullName.placeholder")} className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded-xl" />
                <Input id="origin" name="origin" value={formData.origin} onChange={handleChange} required placeholder={t("contact.form.origin.placeholder")} className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded-xl" />
                <Input id="destination" name="destination" value={formData.destination} onChange={handleChange} required placeholder={t("contact.form.destination.placeholder")} className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded-xl" />
                <Input id="passengers" name="passengers" value={formData.passengers} onChange={handleChange} required inputMode="numeric" pattern="[0-9]*" placeholder={t("contact.form.passengers.placeholder")} className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded-xl" />
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder={t("contact.form.email.placeholder")} className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded-xl" />
              </div>
              <div className="space-y-4">
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder={t("contact.form.phone.placeholder")} className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded-xl" />
                <select id="tripType" name="tripType" value={formData.tripType} onChange={handleChange} required className="bg-secondary border-gray-700 focus:border-gold/70 text-white w-full p-3 rounded-xl">
                  <option value="oneway">{t("contact.form.tripType.oneWay")}</option>
                  <option value="roundtrip">{t("contact.form.tripType.roundTrip")}</option>
                </select>
                <Input id="departureDate" type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded-xl" />
                <Input id="returnDate" type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} disabled={formData.tripType === "oneway"} className="bg-secondary border-gray-700 focus:border-gold/70 text-white disabled:opacity-50 rounded-xl" />
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="w-full md:w-auto bg-gold hover:bg-gold-dark text-black rounded-full px-12 py-3 text-lg">
                {t("contact.form.submit")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
