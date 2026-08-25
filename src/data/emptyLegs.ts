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
        "id": "a0qqs970h",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-31",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "w5hv2dox4",
        "origin": "San Fernando, AR",
        "destination": "Lima, PE",
        "date": "2026-09-03",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ocphx5j2o",
        "origin": "Rio De Janeiro, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-05",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "jnexee61r",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-08",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "iu1483jgq",
        "origin": "Nashville, TN, US",
        "destination": "San Fernando, AR",
        "date": "2026-09-10",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
