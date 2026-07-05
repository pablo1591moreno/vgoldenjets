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
        "id": "kt5nujj7w",
        "origin": "San Fernando, AR",
        "destination": "Rio De Janeiro, BR",
        "date": "2026-07-12",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "mn7n1zb69",
        "origin": "San Fernando, AR",
        "destination": "Santa Cruz, BO",
        "date": "2026-07-12",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "tutkvlcil",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-07-12",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ax442joiq",
        "origin": "San Martin De Los Andes, AR",
        "destination": "San Fernando, AR",
        "date": "2026-07-17",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "0pym2k5uy",
        "origin": "Rio De Janeiro, BR",
        "destination": "San Fernando, AR",
        "date": "2026-07-18",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "38sc6otla",
        "origin": "Santa Cruz, BO",
        "destination": "San Fernando, AR",
        "date": "2026-07-26",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "5kv5upboe",
        "origin": "San Fernando, AR",
        "destination": "San Martin De Los Andes, AR",
        "date": "2026-08-01",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
