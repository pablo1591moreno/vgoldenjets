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
        "id": "146rhsnas",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-23",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ak2zbccwi",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-08-24",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "emhjtcskg",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-31",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "tbhatmxb6",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-08",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    }
];
