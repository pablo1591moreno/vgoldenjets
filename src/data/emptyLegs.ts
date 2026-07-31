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
        "id": "wwmoovane",
        "origin": "San Fernando, AR",
        "destination": "San Martin De Los Andes, AR",
        "date": "2026-08-01",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "62l02q5uc",
        "origin": "Westhampton Beach, NY, US",
        "destination": "Rotterdam, NL",
        "date": "2026-08-02",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "1yngu0q95",
        "origin": "San Carlos De Bariloche, AR",
        "destination": "San Fernando, AR",
        "date": "2026-08-05",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "d6ate7qss",
        "origin": "Santiago, CL",
        "destination": "San Fernando, AR",
        "date": "2026-08-08",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "bvk9dtln7",
        "origin": "San Fernando, AR",
        "destination": "Foz Do Iguacu, BR",
        "date": "2026-08-08",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "1saakmeo4",
        "origin": "Santa Cruz, BO",
        "destination": "San Fernando, AR",
        "date": "2026-08-10",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "gfgadky4c",
        "origin": "San Fernando, AR",
        "destination": "Sao Roque, BR",
        "date": "2026-08-10",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "wlnpp0rkh",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-19",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
