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
        "id": "e6ka77bya",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-23",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "2j8azz7u8",
        "origin": "Toronto, ON, CA",
        "destination": "Teterboro, NJ, US",
        "date": "2026-08-24",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "klopq0k3t",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-08-24",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "cloqc4fym",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-31",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "qej1i4aro",
        "origin": "San Fernando, AR",
        "destination": "Lima, PE",
        "date": "2026-09-03",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "4mcxiv0jn",
        "origin": "Rio De Janeiro, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-05",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "257ysj1bf",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-08",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "5ig1vpht1",
        "origin": "Nashville, TN, US",
        "destination": "San Fernando, AR",
        "date": "2026-09-10",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
