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
        "id": "0tkknx86i",
        "origin": "San Fernando, AR",
        "destination": "Asuncion, PY",
        "date": "2026-06-09",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "i13kummfd",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-06-14",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "a9wt2ipgo",
        "origin": "Maldonado, UY",
        "destination": "San Fernando, AR",
        "date": "2026-06-16",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "gwhckngps",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-06-21",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "f8xs9sbzh",
        "origin": "San Fernando, AR",
        "destination": "Rosario, AR",
        "date": "2026-06-24",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "mqrud6ycq",
        "origin": "Van Nuys, CA, US",
        "destination": "Oakland, CA, US",
        "date": "2026-06-25",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ei218ks1i",
        "origin": "Rosario, AR",
        "destination": "San Fernando, AR",
        "date": "2026-06-26",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "g1svbwegm",
        "origin": "Foz Do Iguacu, BR",
        "destination": "San Fernando, AR",
        "date": "2026-06-30",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "0m68fafb5",
        "origin": "San Fernando, AR",
        "destination": "Cusco, PE",
        "date": "2026-06-30",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    }
];
