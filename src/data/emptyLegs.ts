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
        "id": "afn56fnii",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-31",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "dkt5rx10w",
        "origin": "Nashville, TN, US",
        "destination": "San Fernando, AR",
        "date": "2026-09-02",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "4mfzaxu0v",
        "origin": "San Fernando, AR",
        "destination": "Lima, PE",
        "date": "2026-09-03",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ex63ffqe6",
        "origin": "Montevideo, UY",
        "destination": "Campinas, BR",
        "date": "2026-09-05",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "pj68kxag5",
        "origin": "Rio De Janeiro, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-05",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "87pkfe679",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-08",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "6t3aluj29",
        "origin": "Campinas, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-14",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
