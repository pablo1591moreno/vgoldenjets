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
        "id": "0l46d18ed",
        "origin": "San Carlos De Bariloche, AR",
        "destination": "San Fernando, AR",
        "date": "2026-08-13",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "7s1liwf6t",
        "origin": "San Fernando, AR",
        "destination": "San Carlos De Bariloche, AR",
        "date": "2026-08-17",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "gfjkqd28j",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-24",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
