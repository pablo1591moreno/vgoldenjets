export interface EmptyLeg {
    id: string;
    origin: string;
    destination: string;
    date: string;
    aircraft: string;
    seats: number;
    price: string;
    available: boolean;
}

export const emptyLegs: EmptyLeg[] = [
    {
        "id": "l3jrz26jd",
        "origin": "San Fernando, AR",
        "destination": "Rosario, AR",
        "date": "2026-06-17",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "9wc3m2hnq",
        "origin": "San Fernando, AR",
        "destination": "Bahia Blanca, AR",
        "date": "2026-06-18",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "o32tj1xd2",
        "origin": "Bahia Blanca, AR",
        "destination": "San Fernando, AR",
        "date": "2026-06-18",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "v6ntnxl7r",
        "origin": "Rosario, AR",
        "destination": "San Fernando, AR",
        "date": "2026-06-19",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "caol3wyyo",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-06-21",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "aqio52acp",
        "origin": "San Fernando, AR",
        "destination": "Rosario, AR",
        "date": "2026-06-24",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ay6gng43q",
        "origin": "Rosario, AR",
        "destination": "San Fernando, AR",
        "date": "2026-06-26",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ie9r5v2p2",
        "origin": "Foz Do Iguacu, BR",
        "destination": "San Fernando, AR",
        "date": "2026-06-30",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "4h7ptbxlp",
        "origin": "San Fernando, AR",
        "destination": "Cusco, PE",
        "date": "2026-06-30",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    }
];
