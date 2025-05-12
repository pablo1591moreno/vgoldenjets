
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/img/logo vgolden jet-01.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 shadow-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <img 
                src={logo}
                className="w-40  object-cover mr-2"
              />
            </a>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-gold transition-colors">{t("nav.home")}</a>
            <a href="#services" className="text-white hover:text-gold transition-colors">{t("nav.services")}</a>
            <a href="#fleet" className="text-white hover:text-gold transition-colors">{t("nav.fleet")}</a>
            <a href="#about" className="text-white hover:text-gold transition-colors">{t("nav.about")}</a>
            <a href="#contact" className="text-white hover:text-gold transition-colors">{t("nav.contact")}</a>
            <a href="https://wa.me/+17863005652" className="flex items-center text-gold hover:text-gold-light">
              <Phone size={18} className="mr-2" />
              + 1 7863005652
            </a>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage}
              className="text-white hover:text-gold hover:bg-black/30"
            >
              <Globe size={20} />
              <span className="ml-2">{language === "en" ? "EN" : "ES"}</span>
            </Button>
          </div>

          {/* Mobile menu button and language selector */}
          <div className="md:hidden flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage}
              className="text-white hover:text-gold hover:bg-black/30"
            >
              <Globe size={20} />
              <span className="ml-1">{language === "en" ? "EN" : "ES"}</span>
            </Button>
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-4 py-2 bg-black/95 border-t border-gray-800 space-y-3">
          <a href="#home" onClick={closeMenu} className="block py-2 text-white hover:text-gold">{t("nav.home")}</a>
          <a href="#services" onClick={closeMenu} className="block py-2 text-white hover:text-gold">{t("nav.services")}</a>
          <a href="#fleet" onClick={closeMenu} className="block py-2 text-white hover:text-gold">{t("nav.fleet")}</a>
          <a href="#about" onClick={closeMenu} className="block py-2 text-white hover:text-gold">{t("nav.about")}</a>
          <a href="#contact" onClick={closeMenu} className="block py-2 text-white hover:text-gold">{t("nav.contact")}</a>
          <a href="https://wa.me/+17863005652" className="flex items-center py-2 text-gold">
            <Phone size={18} className="mr-2" />
            + 1 7863005652
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
