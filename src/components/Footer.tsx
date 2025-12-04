import React from "react";
import { Instagram, Linkedin, MapPin, Phone, Mail, Clock, ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/img/logo vgolden jet-01.png";

// Agrego la prop 'centerVertically' para los casos que necesites centrar
const ContactInfo = ({ icon: Icon, title, content, centerVertically = false }) => (
  <div
    className={`flex max-w-md space-x-4 ${centerVertically ? "items-center" : ""}`}
  >
    <div className="bg-gold/20 p-3 h-fit rounded">
      <Icon className="h-6 w-6 text-gold" />
    </div>
    <div>
      <h3 className="text-white font-semibold mb-1 text-left">{title}</h3>
      {content && <p className="text-white/70 text-left">{content}</p>}
    </div>
  </div>
);

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* CONTACT SECTION FIRST */}
        <div className="border-b border-gray-800 pb-12 mb-12 flex flex-col items-center">
          <h3 className="text-xl lg:text-2xl font-semibold text-white mb-8 text-center">{t("footer.contactUs")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            <div className="flex flex-col space-y-8 items-start">
              <ContactInfo
                icon={Phone}
                title={t("contact.info.phone.title")}
                content={
                  <a
                    href="https://wa.me/+1168668170"
                    className="text-white/70 hover:text-gold transition-colors duration-300"
                  >
                    +1 786 300 5652
                  </a>
                }
              />
              <ContactInfo
                icon={Phone}
                title={t("contact.info.phone.title2")}
                content={
                  <a
                    href="https://wa.me/+1168668170"
                    className="text-white/70 hover:text-gold transition-colors duration-300"
                  >
                    +11 6866 8170
                  </a>
                }
              />
              <ContactInfo
                icon={MapPin}
                title={t("contact.info.office.title")}
                content={t("contact.info.office.content")}
              />
            </div>
            <div className="flex flex-col space-y-8 items-start">
              <ContactInfo icon={MapPin} title={t("contact.info.address.content")} content={null} centerVertically />
              <ContactInfo
                icon={Mail}
                title="Email"
                content={
                  <a
                    href="mailto:info@vgoldenjets.com"
                    className="text-white/70 hover:text-gold transition-colors duration-300"
                  >
                    info@vgoldenjets.com
                  </a>
                }
              />
              <ContactInfo
                icon={Clock}
                title={t("contact.info.hours.title")}
                content={t("contact.info.hours.content")}
              />
            </div>
          </div>
        </div>

        {/* LOGO AND SOCIALS */}
        <div className="mt-12 flex flex-col items-center">
          <img className="w-40 object-center mb-4" src={logo} alt="V Golden Jets logo" />
          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.instagram.com/vgoldenjets?igsh=aHMxcmltaGwzNm8="
              className="text-white hover:text-gold transition-colors"
              aria-label="Visit our Instagram page"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://www.linkedin.com/company/vgoldenjetsarg"
              className="text-white hover:text-gold transition-colors"
              aria-label="Visit our LinkedIn page"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} V Golden Jets. {t("footer.rights")}
          </p>
          <button onClick={scrollToTop} className="mt-4 md:mt-0 flex items-center text-gold hover:text-gold-light transition-colors">
            {t("footer.backToTop")} <ArrowUp size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
