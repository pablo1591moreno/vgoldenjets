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
        "id": "1yep1p390",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-07-28",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "16icu1xos",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-07-29",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "1nxheux75",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-07-30",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "0g96czfic",
        "origin": "Santiago, CL",
        "destination": "San Fernando, AR",
        "date": "2026-08-08",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "6ga6d2lat",
        "origin": "San Fernando, AR",
        "destination": "Foz Do Iguacu, BR",
        "date": "2026-08-08",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "igrvusnv5",
        "origin": "Santa Cruz, BO",
        "destination": "San Fernando, AR",
        "date": "2026-08-10",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "qu67hswus",
        "origin": "San Fernando, AR",
        "destination": "Sao Roque, BR",
        "date": "2026-08-10",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    }
];
