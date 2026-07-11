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
        "id": "o6wd3snka",
        "origin": "Asuncion, PY",
        "destination": "San Fernando, AR",
        "date": "2026-07-12",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "gyk9fc8kt",
        "origin": "Cuiaba, BR",
        "destination": "Rio De Janeiro, BR",
        "date": "2026-07-12",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "n7kggnhxa",
        "origin": "San Fernando, AR",
        "destination": "Santa Cruz, BO",
        "date": "2026-07-12",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "yfq0yxyw0",
        "origin": "San Fernando, AR",
        "destination": "Cuiaba, BR",
        "date": "2026-07-12",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "3eddj4y9g",
        "origin": "San Martin De Los Andes, AR",
        "destination": "San Fernando, AR",
        "date": "2026-07-17",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "hwpbhve8h",
        "origin": "Porto Alegre, BR",
        "destination": "The Valley, AI",
        "date": "2026-07-17",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "bphq5c22a",
        "origin": "Rio De Janeiro, BR",
        "destination": "San Fernando, AR",
        "date": "2026-07-18",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "9ywcw9hgn",
        "origin": "San Fernando, AR",
        "destination": "San Martin De Los Andes, AR",
        "date": "2026-07-25",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "67p6tzugz",
        "origin": "Santa Cruz, BO",
        "destination": "San Fernando, AR",
        "date": "2026-07-26",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "v3qehmu34",
        "origin": "San Fernando, AR",
        "destination": "San Martin De Los Andes, AR",
        "date": "2026-08-01",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
