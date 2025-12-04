import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/img/logo vgolden jet-01.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Construye la URL equivalente al cambiar idioma
  const computeLangPath = (toEn: boolean) => {
    if (toEn) {
      return pathname.startsWith("/en") ? pathname : `/en${pathname === "/" ? "" : pathname}`;
    } else {
      const next = pathname.replace(/^\/en\b/, "");
      return next || "/";
    }
  };

  const toggleLanguage = () => {
    const toEn = language !== "en";
    setLanguage(toEn ? "en" : "es");
    const next = computeLangPath(toEn);
    navigate(next);
  };

  const base = language === "en" ? "/en" : "";

  // Normaliza links a Home del idioma + hash
  const toHomeHash = (hash: string) => `${base}/#${hash}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 shadow-md" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="https://www.vgoldenjets.com" target="_blank" rel="noopener noreferrer">
              <img src={logo} alt="Logo" className="w-36 object-cover" />
            </a>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href={toHomeHash("home")} className="text-white hover:text-gold transition-colors">
              {t("nav.home")}
            </a>
            <a href={toHomeHash("services")} className="text-white hover:text-gold transition-colors">
              {t("nav.services")}
            </a>
            <a href={toHomeHash("fleet")} className="text-white hover:text-gold transition-colors">
              {t("nav.fleet")}
            </a>
            <a href={toHomeHash("about")} className="text-white hover:text-gold transition-colors">
              {t("nav.about")}
            </a>
            <a href={toHomeHash("contact")} className="text-white hover:text-gold transition-colors">
              {t("nav.contact")}
            </a>

            {/* Jets Magazine por idioma */}
            <a href={`${base}/jetsmagazine`} className="text-white hover:text-gold transition-colors">
              {t("Jets Magazine")}
            </a>

            <a href="https://wa.me/+1168668170" className="flex items-center text-gold hover:text-gold-light">
              <Phone size={18} className="mr-2" />
              + 11 6866 8170
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-white hover:text-gold hover:bg-black/30"
              aria-label="Change language"
              title="Change language"
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
              aria-label="Change language"
              title="Change language"
            >
              <Globe size={20} />
              <span className="ml-1">{language === "en" ? "EN" : "ES"}</span>
            </Button>
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
      >
        <div className="px-4 py-2 bg-black/80 backdrop-blur-md border-t border-gray-800 space-y-3">
          <a href={toHomeHash("home")} onClick={closeMenu} className="block py-2 text-white hover:text-gold">
            {t("nav.home")}
          </a>
          <a href={toHomeHash("services")} onClick={closeMenu} className="block py-2 text-white hover:text-gold">
            {t("nav.services")}
          </a>
          <a href={toHomeHash("fleet")} onClick={closeMenu} className="block py-2 text-white hover:text-gold">
            {t("nav.fleet")}
          </a>
          <a href={toHomeHash("about")} onClick={closeMenu} className="block py-2 text-white hover:text-gold">
            {t("nav.about")}
          </a>
          <a href={toHomeHash("contact")} onClick={closeMenu} className="block py-2 text-white hover:text-gold">
            {t("nav.contact")}
          </a>
          <a href={`${base}/jetsmagazine`} onClick={closeMenu} className="block py-2 text-white hover:text-gold">
            {t("Jets Magazine")}
          </a>
          <a href="https://wa.me/+1168668170" className="flex items-center py-2 text-gold">
            <Phone size={18} className="mr-2" />
            + 11 6866 8170
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
