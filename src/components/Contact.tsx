
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

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
      <div className="bg-gold/20 p-3 rounded-full h-fit">
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
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    destination: "",
    passengers: "",
    email: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validation for passengers (only numbers)
    if (name === "passengers" && value !== "") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }
    
    // For all other fields
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Form data:", formData);
    
    toast({
      title: "Message Sent",
      description: "Thank you for your inquiry. We'll get back to you shortly.",
    });
    
    // Reset form
    setFormData({
      name: "",
      origin: "",
      destination: "",
      passengers: "",
      email: "",
      phone: ""
    });
  };

  return (
    <section id="contact" className="bg-secondary py-16 sm:py-24">
      <div className="section-container">
        <h2 className="section-title font-serif">{t("contact.title")}</h2>
        <p className="section-subtitle">{t("contact.subtitle")}</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          {/* Contact Form - Moved to the top */}
          <div className="bg-black rounded-xl p-6 lg:p-8 shadow-lg">
            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-6">{t("contact.form.title")}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-white/80 mb-1 block">{t("contact.form.fullName")}</label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t("contact.form.fullName.placeholder")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-secondary border-gray-700 focus:border-gold/70 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="origin" className="text-white/80 mb-1 block">{t("contact.form.origin")}</label>
                <Input
                  id="origin"
                  name="origin"
                  placeholder={t("contact.form.origin.placeholder")}
                  value={formData.origin}
                  onChange={handleChange}
                  required
                  className="bg-secondary border-gray-700 focus:border-gold/70 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="destination" className="text-white/80 mb-1 block">{t("contact.form.destination")}</label>
                <Input
                  id="destination"
                  name="destination"
                  placeholder={t("contact.form.destination.placeholder")}
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="bg-secondary border-gray-700 focus:border-gold/70 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="passengers" className="text-white/80 mb-1 block">{t("contact.form.passengers")}</label>
                <Input
                  id="passengers"
                  name="passengers"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder={t("contact.form.passengers.placeholder")}
                  value={formData.passengers}
                  onChange={handleChange}
                  required
                  className="bg-secondary border-gray-700 focus:border-gold/70 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="text-white/80 mb-1 block">{t("contact.form.email")}</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("contact.form.email.placeholder")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-secondary border-gray-700 focus:border-gold/70 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="text-white/80 mb-1 block">{t("contact.form.phone")}</label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t("contact.form.phone.placeholder")}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-secondary border-gray-700 focus:border-gold/70 text-white"
                />
              </div>
              
              <Button type="submit" className="w-full bg-gold hover:bg-gold-dark text-black">
                {t("contact.form.submit")}
              </Button>
            </form>
          </div>
          
          {/* Contact Info - Moved to the bottom */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl lg:text-2xl font-semibold text-white mb-6">{t("contact.info.title")}</h3>
              <p className="text-white/70 mb-8">
                {t("contact.info.description")}
              </p>
              
              <div className="space-y-6">
                <ContactInfo 
                  icon={MapPin} 
                  title={t("contact.info.address.title")} 
                  content={t("contact.info.address.content")}
                />
                <ContactInfo 
                  icon={Phone} 
                  title={t("contact.info.phone.title")} 
                  content={<a href="tel:+12345678900" className="text-white/70 hover:text-gold">+1 234 567 8900</a>}
                />
                <ContactInfo 
                  icon={Mail} 
                  title={t("contact.info.email.title")} 
                  content={<a href="mailto:info@vgoldenjets.com" className="text-white/70 hover:text-gold">info@vgoldenjets.com</a>}
                />
                <ContactInfo 
                  icon={Clock} 
                  title={t("contact.info.hours.title")} 
                  content={t("contact.info.hours.content")}
                />
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0">
              <div className="p-5 bg-black/50 border border-gold/20 rounded-lg">
                <h4 className="text-gold font-semibold mb-2">{t("contact.hotline.title")}</h4>
                <p className="text-white text-xl font-bold">+1 800 JET 5555</p>
                <p className="text-white/60 text-sm mt-1">{t("contact.hotline.hours")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
