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
        "id": "z2duklak6",
        "origin": "Rio De Janeiro, BR",
        "destination": "San Fernando, AR",
        "date": "2026-07-19",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "9n1eurp7y",
        "origin": "San Martin De Los Andes, AR",
        "destination": "San Fernando, AR",
        "date": "2026-07-20",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "2t7qhg8bh",
        "origin": "San Fernando, AR",
        "destination": "Sao Paulo, BR",
        "date": "2026-07-25",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "g0owzwna9",
        "origin": "Santa Cruz, BO",
        "destination": "San Fernando, AR",
        "date": "2026-07-26",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "a98krcfxl",
        "origin": "San Fernando, AR",
        "destination": "San Martin De Los Andes, AR",
        "date": "2026-07-26",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "9ap5c1l63",
        "origin": "San Fernando, AR",
        "destination": "Sao Paulo, BR",
        "date": "2026-07-26",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "prghftz1y",
        "origin": "San Fernando, AR",
        "destination": "San Martin De Los Andes, AR",
        "date": "2026-08-01",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
