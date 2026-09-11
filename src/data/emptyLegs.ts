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
        "id": "hx3srlih8",
        "origin": "Villa Dolores, AR",
        "destination": "San Fernando, AR",
        "date": "2026-09-13",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "9kgh0nkyg",
        "origin": "San Fernando, AR",
        "destination": "Asuncion, PY",
        "date": "2026-09-15",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ygbg63gpe",
        "origin": "La Paz, BO",
        "destination": "San Fernando, AR",
        "date": "2026-09-16",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "hpbicjjdx",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-09-22",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "so0hdj28q",
        "origin": "San Carlos De Bariloche, AR",
        "destination": "San Fernando, AR",
        "date": "2026-09-22",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
