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
        "id": "jj30vm2r9",
        "origin": "San Fernando, AR",
        "destination": "Campo Grande, BR",
        "date": "2026-08-07",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "21flvcvdj",
        "origin": "Maldonado, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-07",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "v5j98zkwc",
        "origin": "Santiago, CL",
        "destination": "San Fernando, AR",
        "date": "2026-08-08",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "0gisihdmz",
        "origin": "Santa Cruz, BO",
        "destination": "San Fernando, AR",
        "date": "2026-08-10",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "cxdrd6wt1",
        "origin": "San Fernando, AR",
        "destination": "Sao Roque, BR",
        "date": "2026-08-10",
        "aircraft": "Learjet 60",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "g7vq3ysci",
        "origin": "Montevideo, UY",
        "destination": "San Fernando, AR",
        "date": "2026-08-19",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ii0o2lcg0",
        "origin": "Washington, DC, US",
        "destination": "San Fernando, AR",
        "date": "2026-08-19",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
