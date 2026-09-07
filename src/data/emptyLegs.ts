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
        "id": "xdhpsja6e",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-08",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "gqz2lgf08",
        "origin": "Campinas, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-14",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "kp77hk3tp",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-09-22",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "9g0gjbo0l",
        "origin": "San Carlos De Bariloche, AR",
        "destination": "San Fernando, AR",
        "date": "2026-09-22",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
