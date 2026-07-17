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
        "id": "3i3uczuo9",
        "origin": "Rio De Janeiro, BR",
        "destination": "San Fernando, AR",
        "date": "2026-07-19",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "lq6p7bmjs",
        "origin": "San Martin De Los Andes, AR",
        "destination": "San Fernando, AR",
        "date": "2026-07-20",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "zs77p22gj",
        "origin": "San Fernando, AR",
        "destination": "Sao Paulo, BR",
        "date": "2026-07-25",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ayrwaad40",
        "origin": "Santa Cruz, BO",
        "destination": "San Fernando, AR",
        "date": "2026-07-26",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "fxz5jsv4f",
        "origin": "San Fernando, AR",
        "destination": "San Martin De Los Andes, AR",
        "date": "2026-07-26",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "xtwaldz9v",
        "origin": "San Fernando, AR",
        "destination": "Sao Paulo, BR",
        "date": "2026-07-26",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "gfzrxbkp5",
        "origin": "San Fernando, AR",
        "destination": "San Martin De Los Andes, AR",
        "date": "2026-08-01",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
