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
        "id": "0811a58tq",
        "origin": "San Fernando, AR",
        "destination": "Maldonado, UY",
        "date": "2026-09-10",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "hb5fa01sd",
        "origin": "Campinas, BR",
        "destination": "San Fernando, AR",
        "date": "2026-09-14",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "vb3lfwzqi",
        "origin": "San Fernando, AR",
        "destination": "Asuncion, PY",
        "date": "2026-09-15",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "jc83xd2fi",
        "origin": "La Paz, BO",
        "destination": "San Fernando, AR",
        "date": "2026-09-16",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "8fs4j24fg",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-09-22",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "b85ryv1nt",
        "origin": "San Carlos De Bariloche, AR",
        "destination": "San Fernando, AR",
        "date": "2026-09-22",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    }
];
