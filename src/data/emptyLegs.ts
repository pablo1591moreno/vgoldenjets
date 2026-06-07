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
        "id": "ljbgd79w7",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-06-14",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "whyddydcl",
        "origin": "Maldonado, UY",
        "destination": "San Fernando, AR",
        "date": "2026-06-16",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "faiubvvl1",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-06-21",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "7rum0ghsk",
        "origin": "San Fernando, AR",
        "destination": "Rosario, AR",
        "date": "2026-06-24",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "52akkanwh",
        "origin": "Van Nuys, CA, US",
        "destination": "Oakland, CA, US",
        "date": "2026-06-25",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "p6togfe6z",
        "origin": "Rosario, AR",
        "destination": "San Fernando, AR",
        "date": "2026-06-26",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "1414mlzi6",
        "origin": "Foz Do Iguacu, BR",
        "destination": "San Fernando, AR",
        "date": "2026-06-30",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "tzgljzu14",
        "origin": "San Fernando, AR",
        "destination": "Cusco, PE",
        "date": "2026-06-30",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    }
];
