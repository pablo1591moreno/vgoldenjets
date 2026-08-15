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
        "id": "u4eet09nz",
        "origin": "San Fernando, AR",
        "destination": "San Carlos De Bariloche, AR",
        "date": "2026-08-16",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "id234s0nd",
        "origin": "Miami, FL, US",
        "destination": "San Fernando, AR",
        "date": "2026-08-20",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "t7rw4p3su",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-23",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "40nnb9kt4",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-08",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    }
];
