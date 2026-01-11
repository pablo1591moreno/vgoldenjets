import React from "react";
import logo from "@/img/logo vgolden jet-01.png";

const TermsConditions = () => {
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
                    Términos y Condiciones
                </h1>

                <div className="space-y-6 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">
                            1. Aceptación de los Términos
                        </h2>
                        <p>
                            Al acceder y utilizar los servicios de V Golden Jets, usted acepta
                            cumplir con estos términos y condiciones. Si no está de acuerdo
                            con alguna parte de estos términos, no debe utilizar nuestros
                            servicios.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">
                            2. Servicios de Vuelo
                        </h2>
                        <p>
                            V Golden Jets actúa como intermediario en la contratación de
                            servicios de transporte aéreo privado. Nos esforzamos por
                            garantizar la disponibilidad y la calidad de los servicios, pero
                            estamos sujetos a las condiciones operativas de los operadores
                            aéreos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">
                            3. Reservas y Cancelaciones
                        </h2>
                        <p>
                            Todas las reservas están sujetas a confirmación. Las políticas de
                            cancelación varían según el vuelo específico y se detallarán en
                            el momento de la contratación. Es responsabilidad del cliente
                            revisar estas condiciones antes de confirmar.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">
                            4. Documentación
                        </h2>
                        <p>
                            Es responsabilidad exclusiva de los pasajeros contar con toda la
                            documentación de viaje necesaria (pasaportes, visas, permisos
                            sanitarios, etc.) válida y vigente para el ingreso y salida de
                            los países involucrados en el itinerario.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">
                            5. Limitación de Responsabilidad
                        </h2>
                        <p>
                            V Golden Jets no será responsable por retrasos, cancelaciones o
                            incidentes causados por fuerza mayor, condiciones meteorológicas,
                            huelgas o cualquier otra circunstancia fuera de nuestro control
                            razonable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">
                            6. Modificaciones
                        </h2>
                        <p>
                            Nos reservamos el derecho de modificar estos términos y
                            condiciones en cualquier momento. Los cambios entrarán en vigor
                            inmediatamente después de su publicación en nuestro sitio web.
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

export default TermsConditions;
