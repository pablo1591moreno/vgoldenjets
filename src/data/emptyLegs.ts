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
        "id": "lx6uc8xtg",
        "origin": "San Fernando, AR",
        "destination": "San Carlos De Bariloche, AR",
        "date": "2026-08-17",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "1a8tkwsb7",
        "origin": "Miami, FL, US",
        "destination": "San Fernando, AR",
        "date": "2026-08-20",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "rm8hrqoiy",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-23",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "mrpfo8hwh",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-08",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    }
];
