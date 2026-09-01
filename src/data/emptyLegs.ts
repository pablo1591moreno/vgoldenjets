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
        "id": "378xlgzzy",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-09-01",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "2l60hp5y0",
        "origin": "Philipsburg, SX",
        "destination": "Lima, PE",
        "date": "2026-09-02",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ig35f67yk",
        "origin": "Maldonado, UY",
        "destination": "San Fernando, AR",
        "date": "2026-09-03",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "5v73uvp2g",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-09-04",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "jygv1b9b0",
        "origin": "San Fernando, AR",
        "destination": "Maldonado, UY",
        "date": "2026-09-06",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "7jlvj3rav",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-08",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "fd5fitipd",
        "origin": "Campinas, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-14",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "jeiespd6q",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-09-22",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "r4q6c68gd",
        "origin": "San Carlos De Bariloche, AR",
        "destination": "San Fernando, AR",
        "date": "2026-09-22",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
