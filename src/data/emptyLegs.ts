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
        "id": "82xfjcvhe",
        "origin": "Buenos Aires, AR",
        "destination": "Maldonado, UY",
        "date": "2026-10-09",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "vxr193q9c",
        "origin": "San Fernando, AR",
        "destination": "Maldonado, UY",
        "date": "2026-10-09",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "lb1lo6dqs",
        "origin": "Cape Town, ZA",
        "destination": "San Fernando, AR",
        "date": "2026-10-14",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "a3gzqjrfo",
        "origin": "San Fernando, AR",
        "destination": "Ibiza, ES",
        "date": "2026-10-18",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "hn963samr",
        "origin": "San Carlos De Bariloche, AR",
        "destination": "San Fernando, AR",
        "date": "2026-10-20",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "bf1oitc5l",
        "origin": "Maldonado, UY",
        "destination": "San Fernando, AR",
        "date": "2026-11-03",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "opuz1bvjg",
        "origin": "San Fernando, AR",
        "destination": "Mar Del Plata, AR",
        "date": "2026-11-03",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    }
];
