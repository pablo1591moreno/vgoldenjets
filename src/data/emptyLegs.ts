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
        "id": "sl9yf6y30",
        "origin": "Miami, FL, US",
        "destination": "San Fernando, AR",
        "date": "2026-05-26",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "z6ke94fm4",
        "origin": "San Fernando, AR",
        "destination": "Mendoza, AR",
        "date": "2026-05-27",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ha36zf1eo",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-05-28",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "p2tjx2ef2",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-05-30",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "26fgzyv99",
        "origin": "Campinas, BR",
        "destination": "San Fernando, AR",
        "date": "2026-06-01",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "b5okc8jp1",
        "origin": "Santiago Del Estero, AR",
        "destination": "San Fernando, AR",
        "date": "2026-06-03",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "gsww9gpve",
        "origin": "Alton/St Louis, IL, US",
        "destination": "Barcelona, ES",
        "date": "2026-06-07",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "knguhcfyj",
        "origin": "San Fernando, AR",
        "destination": "Asuncion, PY",
        "date": "2026-06-10",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "6jmrsf872",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-06-14",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "lwh2ysy4j",
        "origin": "Maldonado, UY",
        "destination": "San Fernando, AR",
        "date": "2026-06-16",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    }
];
