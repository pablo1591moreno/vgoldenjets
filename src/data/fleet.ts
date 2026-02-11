
import GulfstreamImg from "@/img/Gulfstream.webp";
import ChallengerImg from "@/img/Challenger601.webp";
import HawkerImg from "@/img/Hawker 800.webp";
import LearImg from "@/img/Lear60.webp";
import BombardierImg from "@/img/BombardierGlobal.webp";
import CessnaImg from "@/img/CessnaCitationCJ1.webp";
import DassaultImg from "@/img/DassaultFalcon.webp";

export interface Aircraft {
    id: number;
    name: string;
    image: string;
    capacity: string;
    range: string;
    speed: string;
    features: string[];
}

export const fleet: Record<string, Aircraft[]> = {
    en: [
        { id: 1, name: "Gulfstream G650", image: GulfstreamImg, capacity: "Up to 19 passengers", range: "7,000 nautical miles", speed: "Mach 0.925", features: ["Spacious cabin", "Stand-up headroom", "Four living areas", "State-of-the-art entertainment", "Satellite communications", "Full kitchen"] },
        { id: 2, name: "Bombardier Global 7500", image: BombardierImg, capacity: "Up to 19 passengers", range: "7,700 nautical miles", speed: "Mach 0.925", features: ["Four distinct living spaces", "Permanent crew rest area", "Master suite with shower", "Full-size kitchen", "4K entertainment system", "Ka-band Wi-Fi"] },
        { id: 3, name: "Dassault Falcon 8X", image: DassaultImg, capacity: "Up to 16 passengers", range: "6,450 nautical miles", speed: "Mach 0.9", features: ["30 cabin layouts", "Low cabin altitude", "Whisper-quiet cabin", "High-speed connectivity", "Falcon HD entertainment", "Spacious galley"] },
        { id: 4, name: "Lear Jet 60", image: LearImg, capacity: "Up to 8 passengers", range: "2,405 nautical miles", speed: "Mach 0.81", features: ["Comfortable seating", "Stand-up cabin", "Executive workspace", "Full refreshment center", "Modern avionics", "Private lavatory"] },
        { id: 5, name: "Hawker 800", image: HawkerImg, capacity: "Up to 8 passengers", range: "2,540 nautical miles", speed: "Mach 0.80", features: ["Spacious cabin", "Private lavatory", "Club seating", "Worktables", "Efficient range", "Refreshment center"] },
        { id: 6, name: "Challenger 601", image: ChallengerImg, capacity: "Up to 12 passengers", range: "3,290 nautical miles", speed: "Mach 0.80", features: ["Spacious stand-up cabin", "Conference area", "Full galley", "Lavatory", "Intercontinental range", "Wi-Fi available"] },
        { id: 7, name: "Cessna Citation CJ1", image: CessnaImg, capacity: "Up to 5 passengers", range: "1,300 nautical miles", speed: "Mach 0.71", features: ["Compact and efficient", "Quiet cabin", "Executive layout", "Low operating costs", "Private lavatory", "Ideal for short trips"] },
    ],
    es: [
        { id: 1, name: "Gulfstream G650", image: GulfstreamImg, capacity: "Hasta 19 pasajeros", range: "7,000 millas náuticas", speed: "Mach 0.925", features: ["Cabina espaciosa", "Altura para estar de pie", "Cuatro áreas habitables", "Entretenimiento de última generación", "Comunicaciones por satélite", "Cocina completa"] },
        { id: 2, name: "Bombardier Global 7500", image: BombardierImg, capacity: "Hasta 19 pasajeros", range: "7,700 millas náuticas", speed: "Mach 0.925", features: ["Cuatro espacios habitables distintos", "Área de descanso permanente para la tripulación", "Suite principal con ducha", "Cocina de tamaño completo", "Sistema de entretenimiento 4K", "Wi-Fi de banda Ka"] },
        { id: 3, name: "Dassault Falcon 8X", image: DassaultImg, capacity: "Hasta 16 pasajeros", range: "6,450 millas náuticas", speed: "Mach 0.9", features: ["30 diseños de cabina", "Baja altitud de cabina", "Cabina silenciosa", "Conectividad de alta velocidad", "Entretenimiento Falcon HD", "Cocina espaciosa"] },
        { id: 4, name: "Lear Jet 60", image: LearImg, capacity: "Hasta 8 pasajeros", range: "2,405 millas náuticas", speed: "Mach 0.81", features: ["Asientos cómodos", "Cabina con altura para estar de pie", "Espacio de trabajo ejecutivo", "Centro de refrigerios completo", "Aviónica moderna", "Baño privado"] },
        { id: 5, name: "Hawker 800", image: HawkerImg, capacity: "Hasta 8 pasajeros", range: "2,540 millas náuticas", speed: "Mach 0.80", features: ["Cabina espaciosa", "Baño privado", "Asientos tipo club", "Mesas de trabajo", "Alcance eficiente", "Centro de refrigerios"] },
        { id: 6, name: "Challenger 601", image: ChallengerImg, capacity: "Hasta 12 pasajeros", range: "3,290 millas náuticas", speed: "Mach 0.80", features: ["Cabina espaciosa con altura", "Área de conferencias", "Cocina completa", "Baño privado", "Alcance intercontinental", "Wi-Fi disponible"] },
        { id: 7, name: "Cessna Citation CJ1", image: CessnaImg, capacity: "Hasta 5 pasajeros", range: "1,300 millas náuticas", speed: "Mach 0.71", features: ["Compacto y eficiente", "Cabina silenciosa", "Diseño ejecutivo", "Bajos costos operativos", "Baño privado", "Ideal para viajes cortos"] },
    ],
};
