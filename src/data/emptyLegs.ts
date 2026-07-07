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
        "id": "c0dd437zu",
        "origin": "San Fernando, AR",
        "destination": "Rio De Janeiro, BR",
        "date": "2026-07-12",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "f210fy73d",
        "origin": "San Fernando, AR",
        "destination": "Santa Cruz, BO",
        "date": "2026-07-12",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "bdht211av",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-07-12",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "an770sadl",
        "origin": "San Martin De Los Andes, AR",
        "destination": "San Fernando, AR",
        "date": "2026-07-17",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "9370ji8wt",
        "origin": "Rio De Janeiro, BR",
        "destination": "San Fernando, AR",
        "date": "2026-07-18",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "5h4bkl6f9",
        "origin": "San Fernando, AR",
        "destination": "San Martin De Los Andes, AR",
        "date": "2026-07-25",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "mlbqtffif",
        "origin": "Santa Cruz, BO",
        "destination": "San Fernando, AR",
        "date": "2026-07-26",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ix1q3vjob",
        "origin": "San Fernando, AR",
        "destination": "San Martin De Los Andes, AR",
        "date": "2026-08-01",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
