import React from "react";
import logo from "@/img/logo vgolden jet-01.png";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-12">
                    <img
                        src={logo}
                        alt="V Golden Jets Logo"
                        className="w-48 object-contain"
                    />
                </div>

                <h1 className="text-3xl font-bold mb-8 text-center uppercase tracking-wide">
                    Política de Privacidad
                </h1>

                <div className="space-y-6 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">
                            1. Introducción
                        </h2>
                        <p>
                            En V Golden Jets, nos comprometemos a proteger su privacidad y a
                            garantizar la seguridad de sus datos personales. Esta política
                            explica cómo recopilamos, utilizamos y protegemos su información
                            cuando visita nuestro sitio web o utiliza nuestros servicios.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">
                            2. Recopilación de Información
                        </h2>
                        <p>
                            Podemos recopilar información personal que usted nos proporciona
                            voluntariamente, como su nombre, dirección de correo electrónico,
                            número de teléfono y detalles de viaje cuando solicita un
                            presupuesto o se pone en contacto con nosotros.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">
                            3. Uso de la Información
                        </h2>
                        <p>
                            Utilizamos la información recopilada para:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Procesar sus solicitudes y reservas de vuelos.</li>
                            <li>Comunicarnos con usted sobre sus servicios solicitados.</li>
                            <li>Mejorar nuestro sitio web y la experiencia del cliente.</li>
                            <li>Cumplir con obligaciones legales y regulatorias.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">
                            4. Protección de Datos
                        </h2>
                        <p>
                            Implementamos medidas de seguridad técnicas y organizativas para
                            proteger sus datos personales contra el acceso no autorizado, la
                            pérdida o la alteración.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">
                            5. Cookies
                        </h2>
                        <p>
                            Nuestro sitio web puede utilizar cookies para mejorar su
                            experiencia de navegación. Puede configurar su navegador para
                            rechazar las cookies, aunque esto podría limitar algunas
                            funcionalidades del sitio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">
                            6. Contacto
                        </h2>
                        <p>
                            Si tiene preguntas sobre esta política de privacidad, por favor
                            contáctenos a través de nuestros canales oficiales de atención al
                            cliente.
                        </p>
                    </section>

                    <div className="pt-8 text-center text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} V Golden Jets. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
