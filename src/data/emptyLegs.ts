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
        "id": "g7dx2wsm8",
        "origin": "Westhampton Beach, NY, US",
        "destination": "Rotterdam, NL",
        "date": "2026-08-01",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "84foy41e4",
        "origin": "San Fernando, AR",
        "destination": "San Martin De Los Andes, AR",
        "date": "2026-08-01",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "lddedw3u5",
        "origin": "Teterboro, NJ, US",
        "destination": "Farnborough, GB",
        "date": "2026-08-03",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "9kkf8vtlt",
        "origin": "Sao Paulo, BR",
        "destination": "San Fernando, AR",
        "date": "2026-08-04",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "p71lbsyuh",
        "origin": "San Carlos De Bariloche, AR",
        "destination": "San Fernando, AR",
        "date": "2026-08-05",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "hewz39wdw",
        "origin": "Santiago, CL",
        "destination": "San Fernando, AR",
        "date": "2026-08-08",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ebk4547yr",
        "origin": "San Fernando, AR",
        "destination": "Foz Do Iguacu, BR",
        "date": "2026-08-08",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "vipnn1ubh",
        "origin": "Santa Cruz, BO",
        "destination": "San Fernando, AR",
        "date": "2026-08-10",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "wcnwat5su",
        "origin": "San Fernando, AR",
        "destination": "Sao Roque, BR",
        "date": "2026-08-10",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "aws803eju",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-19",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
