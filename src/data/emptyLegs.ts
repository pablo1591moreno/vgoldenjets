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
        "id": "yzfmoayjo",
        "origin": "Maldonado, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-11",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "lkdhr7duj",
        "origin": "San Fernando, AR",
        "destination": "Maldonado, UY",
        "date": "2026-08-11",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "jditkj9dv",
        "origin": "San Fernando, AR",
        "destination": "Miami, FL, US",
        "date": "2026-08-13",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "agl1qha4y",
        "origin": "San Fernando, AR",
        "destination": "San Carlos De Bariloche, AR",
        "date": "2026-08-17",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ttuzb736q",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-19",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "7sy9enmn2",
        "origin": "Washington, DC, US",
        "destination": "San Fernando, AR",
        "date": "2026-08-21",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
