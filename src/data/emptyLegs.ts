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
        "id": "hozomurjq",
        "origin": "San Fernando, AR",
        "destination": "Mendoza, AR",
        "date": "2026-09-27",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "j0qb43fu5",
        "origin": "Rosario, AR",
        "destination": "San Fernando, AR",
        "date": "2026-10-02",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "uablsh2j1",
        "origin": "San Fernando, AR",
        "destination": "Rosario, AR",
        "date": "2026-10-02",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "z4y1jfaj8",
        "origin": "San Fernando, AR",
        "destination": "Rosario, AR",
        "date": "2026-10-06",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "08d3v29k6",
        "origin": "Maldonado, UY",
        "destination": "San Fernando, AR",
        "date": "2026-10-06",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "p995cb16f",
        "origin": "Rosario, AR",
        "destination": "San Fernando, AR",
        "date": "2026-10-07",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "uczcblb2w",
        "origin": "San Fernando, AR",
        "destination": "Maldonado, UY",
        "date": "2026-10-09",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "gurijfsc3",
        "origin": "Cape Town, ZA",
        "destination": "San Fernando, AR",
        "date": "2026-10-14",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
