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
        "id": "c7nwye7yf",
        "origin": "London (luton), GB",
        "destination": "Alton/St Louis, IL, US",
        "date": "2026-06-05",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "9g60d9ga8",
        "origin": "San Fernando, AR",
        "destination": "Asuncion, PY",
        "date": "2026-06-09",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "yr1t9u0kk",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-06-14",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "dea5qze7d",
        "origin": "Maldonado, UY",
        "destination": "San Fernando, AR",
        "date": "2026-06-16",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "wo57gcgpm",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-06-21",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "3i03iow68",
        "origin": "San Fernando, AR",
        "destination": "Rosario, AR",
        "date": "2026-06-24",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "luyf006rd",
        "origin": "Van Nuys, CA, US",
        "destination": "Oakland, CA, US",
        "date": "2026-06-25",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "er6tmzvx6",
        "origin": "Rosario, AR",
        "destination": "San Fernando, AR",
        "date": "2026-06-26",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
