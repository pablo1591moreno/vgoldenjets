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
        "id": "d0lrughd7",
        "origin": "London (luton), GB",
        "destination": "Alton/St Louis, IL, US",
        "date": "2026-06-05",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "qe0ng2964",
        "origin": "San Fernando, AR",
        "destination": "Asuncion, PY",
        "date": "2026-06-09",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "67i096tt2",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-06-14",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "8y1m9ujp0",
        "origin": "Maldonado, UY",
        "destination": "San Fernando, AR",
        "date": "2026-06-16",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "u18w1l9oz",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-06-21",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "qs3m4a4oi",
        "origin": "San Fernando, AR",
        "destination": "Rosario, AR",
        "date": "2026-06-24",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ch1q85cbq",
        "origin": "Van Nuys, CA, US",
        "destination": "Oakland, CA, US",
        "date": "2026-06-25",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "9vgjwt8b5",
        "origin": "Rosario, AR",
        "destination": "San Fernando, AR",
        "date": "2026-06-26",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
