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
        "id": "fj23fmxbv",
        "origin": "Montevideo, UY",
        "destination": "Maldonado, UY",
        "date": "2026-06-21",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "qrzyke5ay",
        "origin": "San Fernando, AR",
        "destination": "Rosario, AR",
        "date": "2026-06-24",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "xp1jl78uw",
        "origin": "Rosario, AR",
        "destination": "San Fernando, AR",
        "date": "2026-06-26",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "fjdqwwk27",
        "origin": "Foz Do Iguacu, BR",
        "destination": "San Fernando, AR",
        "date": "2026-06-30",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "icibhjn40",
        "origin": "San Fernando, AR",
        "destination": "Cusco, PE",
        "date": "2026-06-30",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "6bjmk5rjc",
        "origin": "San Fernando, AR",
        "destination": "Rio De Janeiro, BR",
        "date": "2026-07-12",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "zv04rdilk",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-07-12",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "90p74znq6",
        "origin": "Rio De Janeiro, BR",
        "destination": "San Fernando, AR",
        "date": "2026-07-18",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
