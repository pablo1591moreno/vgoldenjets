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
        "id": "y17iq8fak",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-31",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "g7ymn6vsu",
        "origin": "Philipsburg, SX",
        "destination": "San Fernando, AR",
        "date": "2026-09-02",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "hxox0x8by",
        "origin": "San Fernando, AR",
        "destination": "Lima, PE",
        "date": "2026-09-03",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "6f0l3xijn",
        "origin": "Montevideo, UY",
        "destination": "Campinas, BR",
        "date": "2026-09-05",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "frpro8308",
        "origin": "Rio De Janeiro, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-05",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "zj7yssstp",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-08",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "jj95ddii5",
        "origin": "Campinas, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-14",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
