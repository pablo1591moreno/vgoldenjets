import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import emailjs from '@emailjs/browser';

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
      <div className="bg-gold/20 p-3 h-fit rounded">
        <Icon className="h-6 w-6 text-gold" />
      </div>
      <div>
        <h3 className="text-white font-semibold mb-1">{title}</h3>
        <p className="text-white/70">{content}</p>
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
    tripType: "oneway",
    departureDate: "",
    returnDate: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "passengers" && value !== "") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.current) {
      emailjs.sendForm("service_i8rzt5e", "template_hp4utjd", form.current, "Hlap8_HHq2vJfOs3N")
        .then((result) => {
            console.log(result.text);
            toast({
              title: t("contact.toast.title"),
              description: t("contact.toast.description"),
            });
        }, (error) => {
            console.log(error.text);
            toast({
              title: t("contact.toast.errorTitle") || "Error", // Assumed t("contact.toast.errorTitle")
              description: t("contact.toast.errorDescription") || "Something went wrong.",
              variant: "destructive",
            });
        });
    }

    console.log("Form data:", formData);

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
    <section id="contact" className="bg-secondary py-16 sm:py-24">
      <div className="section-container">
        <h2 className="section-title font-serif">{t("contact.title")}</h2>
        <p className="section-subtitle">{t("contact.subtitle")}</p>

        <div className="mt-10">
          <div className="bg-black p-6 lg:p-8 shadow-lg rounded-lg">
            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-6">{t("contact.form.title")}</h3>

            <form ref={form} onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                {/* Left Column (5 inputs) */}
                <div className="flex flex-col space-y-4">
                  <div>
                    <label htmlFor="name" className="text-white/80 mb-1 block">{t("contact.form.fullName")}</label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded" placeholder={t("contact.form.fullName.placeholder")} />
                  </div>
                  <div>
                    <label htmlFor="origin" className="text-white/80 mb-1 block">{t("contact.form.origin")}</label>
                    <Input id="origin" name="origin" value={formData.origin} onChange={handleChange} required className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded" placeholder={t("contact.form.origin.placeholder")} />
                  </div>
                  <div>
                    <label htmlFor="destination" className="text-white/80 mb-1 block">{t("contact.form.destination")}</label>
                    <Input id="destination" name="destination" value={formData.destination} onChange={handleChange} required className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded" placeholder={t("contact.form.destination.placeholder")} />
                  </div>
                  <div>
                    <label htmlFor="passengers" className="text-white/80 mb-1 block">{t("contact.form.passengers")}</label>
                    <Input id="passengers" name="passengers" value={formData.passengers} onChange={handleChange} required inputMode="numeric" pattern="[0-9]*" className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded" placeholder={t("contact.form.passengers.placeholder")} />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-white/80 mb-1 block">{t("contact.form.email")}</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded" placeholder={t("contact.form.email.placeholder")} />
                  </div>
                </div>

                {/* Right Column (4 inputs) */}
                <div className="flex flex-col space-y-4">
                  <div>
                    <label htmlFor="phone" className="text-white/80 mb-1 block">{t("contact.form.phone")}</label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded" placeholder={t("contact.form.phone.placeholder")} />
                  </div>
                  <div>
                    <label htmlFor="tripType" className="text-white/80 mb-1 block">{t("contact.form.tripType")}</label>
                    <select id="tripType" name="tripType" value={formData.tripType} onChange={handleChange} required className="bg-secondary border-gray-700 focus:border-gold/70 text-white w-full p-2 rounded h-[calc(2.25rem+2px)]">
                      <option value="oneway">{t("contact.form.tripType.oneWay")}</option>
                      <option value="roundtrip">{t("contact.form.tripType.roundTrip")}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="departureDate" className="text-white/80 mb-1 block">{t("contact.form.departureDate")}</label>
                    <Input id="departureDate" type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required className="bg-secondary border-gray-700 focus:border-gold/70 text-white rounded" />
                  </div>
                  <div>
                    <label htmlFor="returnDate" className="text-white/80 mb-1 block">{t("contact.form.returnDate")}</label>
                    <Input id="returnDate" type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} disabled={formData.tripType === "oneway"} className="bg-secondary border-gray-700 focus:border-gold/70 text-white disabled:opacity-50 rounded" />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button type="submit" className="w-full md:w-auto bg-gold hover:bg-gold-dark text-black rounded-full px-12 py-3 text-base">
                  {t("contact.form.submit")}
                </Button>
              </div>
            </form>

            {/* Contact Information - Below the form and button */}
            <div className="mt-12 pt-10 border-t border-gray-700/50">
              <h3 className="text-xl lg:text-2xl font-semibold text-white mb-8">{t("contact.info.title")}</h3>
              <p className="text-white/70 mb-10">{t("contact.info.description")}</p>
              
              {/* Grid container for ContactInfo columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                
                {/* Left Column for ContactInfo (3 items) */}
                <div className="flex flex-col space-y-8">
                  <ContactInfo icon={MapPin} title={t("contact.info.address.title")} content={t("contact.info.address.content")} />
                  <ContactInfo icon={Phone} title={t("contact.info.phone.title")} content={<a href="https://wa.me/+17863005652" className="text-white/70 hover:text-gold transition-colors duration-300">+1 786 300 5652</a>} />
                  <ContactInfo icon={Phone} title={t("contact.info.phone.title2")} content={<a href="https://wa.me/+1168668170" className="text-white/70 hover:text-gold transition-colors duration-300">+11 6866 8170</a>} />
                </div>

                {/* Right Column for ContactInfo (2 items) */}
                <div className="flex flex-col space-y-8">
                  <ContactInfo icon={Mail} title={t("contact.info.email.title")} content={<a href="mailto:info@vgoldenjets.com" className="text-white/70 hover:text-gold transition-colors duration-300">info@vgoldenjets.com</a>} />
                  <ContactInfo icon={Clock} title={t("contact.info.hours.title")} content={t("contact.info.hours.content")} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;