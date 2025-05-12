
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/img/logo vgolden jet-01.png";


const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {/* Company Info */}
          <div>
            <img 
                className="w-40 object-left mb-2"
                src={logo}
              />
            <p className="text-white/60 mb-4">
              {t("footer.companyInfo")}
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.instagram.com/vgoldenjets?igsh=aHMxcmltaGwzNm8=" className="text-white hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-white/70 hover:text-gold transition-colors">{t("footer.services")}</a></li>
              <li><a href="#fleet" className="text-white/70 hover:text-gold transition-colors">{t("footer.fleet")}</a></li>
              <li><a href="#destinations" className="text-white/70 hover:text-gold transition-colors">{t("footer.destinations")}</a></li>
              <li><a href="#about" className="text-white/70 hover:text-gold transition-colors">{t("footer.about")}</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">{t("footer.privacy")}</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">{t("footer.terms")}</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">{t("footer.ourServices")}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">{t("footer.privateJet")}</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">{t("footer.groupCharters")}</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">{t("footer.vipConcierge")}</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">{t("footer.luxuryGround")}</a></li>
              <li><a href="#" className="text-white/70 hover:text-gold transition-colors">{t("footer.corporate")}</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">{t("footer.contactUs")}</h3>
            <address className="not-italic text-white/70">
              <p>USA Fort Lauderdale Executive Airport ( fxe )<br/>ARG San fernando international Airport ( SADF )</p>
              <p className="mt-2">
                <a href="https://wa.me/+17863005652" className="hover:text-gold transition-colors">+1 786 300 5652</a>
              </p>
                <p className="mt-2">
                <a href="https://wa.me/+1168668170" className="hover:text-gold transition-colors">+11 6866 8170</a>
              </p>
              <p>
                <a href="mailto:info@vgoldenjets.com" className="hover:text-gold transition-colors">info@vgoldenjets.com</a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} V Golden Jets. {t("footer.rights")}
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center text-gold hover:text-gold-light transition-colors"
          >
            {t("footer.backToTop")} <ArrowUp size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
