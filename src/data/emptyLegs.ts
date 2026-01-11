
import img3 from '@/img/img 3.webp';
import imgLear60 from '@/img/Lear60.webp';
import imgGulfstream from '@/img/Gulfstream.webp';
import imgChallenger from '@/img/Challenger601.webp';
import imgCitation from '@/img/CessnaCitationCJ1.webp';

export interface EmptyLeg {
    id: string;
    from: string; // Origin
    to: string;   // Destination
    date: string; // YYYY-MM-DD
    availability: string; // Friendly string e.g. "Lunes 14 de Octubre"
    aircraft: string;
    seats: number;
    image: string;
}

export const emptyLegs: EmptyLeg[] = [
    {
        id: "1",
        aircraft: "Learjet 40XR",
        seats: 7,
        date: "2026-01-05",
        from: "San Fernando, AR (SADF)",
        to: "Porto Alegre, BR (SBPA)",
        availability: "Lunes 05 de Enero",
        image: imgLear60
    },
    {
        id: "2",
        aircraft: "Learjet 40XR",
        seats: 7,
        date: "2026-01-05",
        from: "Maldonado, UY (SULS)",
        to: "San Fernando, AR (SADF)",
        availability: "Lunes 05 de Enero",
        image: imgLear60
    },
    {
        id: "3",
        aircraft: "Phenom 100",
        seats: 6,
        date: "2026-01-05",
        from: "San Fernando, AR (SADF)",
        to: "Maldonado, UY (SULS)",
        availability: "Lunes 05 de Enero",
        image: imgCitation
    },
    {
        id: "4",
        aircraft: "Gulfstream G-400",
        seats: 14,
        date: "2026-01-05",
        from: "Punta Arenas, CL (SCCI)",
        to: "San Fernando, AR (SADF)",
        availability: "Lunes 05 de Enero",
        image: imgGulfstream
    },
    {
        id: "5",
        aircraft: "Learjet 40XR",
        seats: 7,
        date: "2026-01-05",
        from: "Maldonado, UY (SULS)",
        to: "San Fernando, AR (SADF)",
        availability: "Lunes 05 de Enero",
        image: imgLear60
    },
    {
        id: "6",
        aircraft: "Gulfstream G-400",
        seats: 14,
        date: "2026-01-05",
        from: "San Fernando, AR (SADF)",
        to: "Punta Arenas, CL (SCCI)",
        availability: "Lunes 05 de Enero",
        image: imgGulfstream
    },
    {
        id: "7",
        aircraft: "Learjet 60",
        seats: 8,
        date: "2026-01-06",
        from: "San Fernando, AR (SADF)",
        to: "San Carlos De Bariloche, AR",
        availability: "Martes 06 de Enero",
        image: imgLear60
    },
    {
        id: "8",
        aircraft: "Learjet 60",
        seats: 8,
        date: "2026-01-06",
        from: "San Fernando, AR (SADF)",
        to: "Rio De Janeiro, BR (SBGL)",
        availability: "Martes 06 de Enero",
        image: imgLear60
    },
    {
        id: "9",
        aircraft: "Learjet 40XR",
        seats: 7,
        date: "2026-01-07",
        from: "Maldonado, UY (SULS)",
        to: "San Fernando, AR (SADF)",
        availability: "Miércoles 07 de Enero",
        image: imgLear60
    },
    {
        id: "10",
        aircraft: "Learjet 40XR",
        seats: 7,
        date: "2026-01-08",
        from: "El Bolson, AR (SAVB)",
        to: "San Fernando, AR (SADF)",
        availability: "Jueves 08 de Enero",
        image: imgLear60
    },
    {
        id: "11",
        aircraft: "Learjet 40XR",
        seats: 7,
        date: "2026-01-11",
        from: "Mar Del Plata, AR (SAZM)",
        to: "San Fernando, AR (SADF)",
        availability: "Domingo 11 de Enero",
        image: imgLear60
    },
    {
        id: "12",
        aircraft: "Challenger 605",
        seats: 10,
        date: "2026-01-11",
        from: "San Fernando, AR (SADF)",
        to: "San Carlos De Bariloche, AR",
        availability: "Domingo 11 de Enero",
        image: imgChallenger
    },
    {
        id: "13",
        aircraft: "Phenom 100",
        seats: 6,
        date: "2026-01-12",
        from: "San Fernando, AR (SADF)",
        to: "Maldonado, UY (SULS)",
        availability: "Lunes 12 de Enero",
        image: imgCitation
    },
    {
        id: "14",
        aircraft: "Phenom 100",
        seats: 6,
        date: "2026-01-13",
        from: "Maldonado, UY (SULS)",
        to: "San Fernando, AR (SADF)",
        availability: "Martes 13 de Enero",
        image: imgCitation
    },
    {
        id: "15",
        aircraft: "Learjet 60",
        seats: 8,
        date: "2026-01-14",
        from: "Rio De Janeiro, BR (SBGL)",
        to: "San Fernando, AR (SADF)",
        availability: "Miércoles 14 de Enero",
        image: imgLear60
    },
    {
        id: "16",
        aircraft: "Phenom 100",
        seats: 6,
        date: "2026-01-15",
        from: "San Fernando, AR (SADF)",
        to: "Maldonado, UY (SULS)",
        availability: "Jueves 15 de Enero",
        image: imgCitation
    },
    {
        id: "17",
        aircraft: "Learjet 40XR",
        seats: 7,
        date: "2026-01-15",
        from: "San Fernando, AR (SADF)",
        to: "Maldonado, UY (SULS)",
        availability: "Jueves 15 de Enero",
        image: imgLear60
    },
    {
        id: "18",
        aircraft: "Phenom 100",
        seats: 6,
        date: "2026-01-15",
        from: "Maldonado, UY (SULS)",
        to: "San Fernando, AR (SADF)",
        availability: "Jueves 15 de Enero",
        image: imgCitation
    },
    {
        id: "19",
        aircraft: "Learjet 40XR",
        seats: 7,
        date: "2026-01-22",
        from: "Cordoba, AR (SACO)",
        to: "San Fernando, AR (SADF)",
        availability: "Jueves 22 de Enero",
        image: imgLear60
    },
    {
        id: "20",
        aircraft: "Learjet 40XR",
        seats: 7,
        date: "2026-01-22",
        from: "San Fernando, AR (SADF)",
        to: "Maldonado, UY (SULS)",
        availability: "Jueves 22 de Enero",
        image: imgLear60
    },
    {
        id: "21",
        aircraft: "Gulfstream G-V",
        seats: 14,
        date: "2026-01-25",
        from: "Sao Paulo, BR (SBGR)",
        to: "San Fernando, AR (SADF)",
        availability: "Domingo 25 de Enero",
        image: imgGulfstream
    },
    {
        id: "22",
        aircraft: "Phenom 100",
        seats: 6,
        date: "2026-01-28",
        from: "San Fernando, AR (SADF)",
        to: "Maldonado, UY (SULS)",
        availability: "Miércoles 28 de Enero",
        image: imgCitation
    }
];
