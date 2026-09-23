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
        "id": "78jznu458",
        "origin": "Rosario, AR",
        "destination": "San Fernando, AR",
        "date": "2026-10-02",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "3jdx33zsf",
        "origin": "San Fernando, AR",
        "destination": "Rosario, AR",
        "date": "2026-10-02",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "sj5ddztjb",
        "origin": "San Fernando, AR",
        "destination": "Rosario, AR",
        "date": "2026-10-06",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "nuzowohq8",
        "origin": "Rosario, AR",
        "destination": "San Fernando, AR",
        "date": "2026-10-07",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "37xqre079",
        "origin": "Cape Town, ZA",
        "destination": "San Fernando, AR",
        "date": "2026-10-13",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
