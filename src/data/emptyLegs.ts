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
        "id": "in8wi1czm",
        "origin": "San Carlos De Bariloche, AR",
        "destination": "San Fernando, AR",
        "date": "2026-08-05",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "2ncua9kfv",
        "origin": "Santiago, CL",
        "destination": "San Fernando, AR",
        "date": "2026-08-08",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "avtf3nm1p",
        "origin": "San Fernando, AR",
        "destination": "Foz Do Iguacu, BR",
        "date": "2026-08-08",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ojh46tpwv",
        "origin": "Santa Cruz, BO",
        "destination": "San Fernando, AR",
        "date": "2026-08-10",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "bbna7iv53",
        "origin": "San Fernando, AR",
        "destination": "Sao Roque, BR",
        "date": "2026-08-10",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "z0u7er122",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-19",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
