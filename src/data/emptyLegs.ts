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
        "id": "wv5qcjnjz",
        "origin": "Buenos Aires",
        "destination": "Concordia",
        "date": "2026-02-06",
        "aircraft": "Piper Seneca",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "tsomjf9y9",
        "origin": "Punta del Este",
        "destination": "Buenos Aires",
        "date": "2026-02-06",
        "aircraft": "Phenom 100",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "7f4pomsdf",
        "origin": "Punta del Este",
        "destination": "Buenos Aires",
        "date": "2026-02-07",
        "aircraft": "Phenom 100",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "yy56aeqhn",
        "origin": "Buenos Aires",
        "destination": "Milan",
        "date": "2026-02-09",
        "aircraft": "Gulfstream V",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "f24zsg8jj",
        "origin": "Esquel",
        "destination": "Buenos Aires",
        "date": "2026-02-10",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "798drycw7",
        "origin": "Miami",
        "destination": "Aspen",
        "date": "2026-02-11",
        "aircraft": "Gulfstream V",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "gk6eju1ch",
        "origin": "Salt Lake City, UT, US",
        "destination": "Aspen, CO, US",
        "date": "2026-02-12",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ho6fy722k",
        "origin": "Miami",
        "destination": "Cabo San Lucas",
        "date": "2026-02-12",
        "aircraft": "Gulfstream V",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "vupsbm7e6",
        "origin": "Salt Lake City",
        "destination": "Aspen",
        "date": "2026-02-12",
        "aircraft": "Gulfstream V",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "1uhljdiap",
        "origin": "El Bolson, AR",
        "destination": "San Fernando, AR",
        "date": "2026-02-13",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "8qtetym9b",
        "origin": "San Fernando, AR",
        "destination": "Maldonado, UY",
        "date": "2026-02-13",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "4cuh62em2",
        "origin": "El Bolson",
        "destination": "Buenos Aires",
        "date": "2026-02-13",
        "aircraft": "Learjet 45",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "wcdwu5afq",
        "origin": "Bariloche",
        "destination": "Buenos Aires",
        "date": "2026-02-13",
        "aircraft": "Hawker 800",
        "seats": 8,
        "price": "USD 8.000 + IVA (10,5%)",
        "available": true
    },
    {
        "id": "vqbbx2d2x",
        "origin": "Esquel, AR",
        "destination": "San Fernando, AR",
        "date": "2026-02-14",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "kxojd1htb",
        "origin": "Esquel",
        "destination": "Buenos Aires",
        "date": "2026-02-14",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "xlqjy2n9q",
        "origin": "San Fernando, AR",
        "destination": "Puerto Natales, CL",
        "date": "2026-02-15",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "wozjygapg",
        "origin": "Buenos Aires",
        "destination": "Punta del Este",
        "date": "2026-02-15",
        "aircraft": "Phenom 100",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "aq5zitcyu",
        "origin": "San Fernando, AR",
        "destination": "Montevideo, UY",
        "date": "2026-02-16",
        "aircraft": "Challenger 605",
        "seats": 10,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "o8vyory81",
        "origin": "Buenos Aires",
        "destination": "Bariloche",
        "date": "2026-02-16",
        "aircraft": "Hawker 800",
        "seats": 8,
        "price": "USD 8.000 + IVA (10,5%)",
        "available": true
    },
    {
        "id": "gj6er8q8i",
        "origin": "San Fernando, AR",
        "destination": "Maldonado, UY",
        "date": "2026-02-17",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "2mpk9vily",
        "origin": "Rio De Janeiro, BR",
        "destination": "San Fernando, AR",
        "date": "2026-02-17",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "xcy1rirur",
        "origin": "San Fernando, AR",
        "destination": "Maldonado, UY",
        "date": "2026-02-17",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "3h4c5xa38",
        "origin": "Buenos Aires",
        "destination": "Punta del Este",
        "date": "2026-02-17",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "7zgjp3rvv",
        "origin": "Rio de Janeiro",
        "destination": "Buenos Aires",
        "date": "2026-02-17",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "ul7ni4fe5",
        "origin": "San Fernando, AR",
        "destination": "Maldonado, UY",
        "date": "2026-02-18",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "fuw7joa4a",
        "origin": "Easter Is., CL",
        "destination": "Maldonado, UY",
        "date": "2026-02-18",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "gb3jfyuzt",
        "origin": "Buenos Aires",
        "destination": "Montevideo",
        "date": "2026-02-18",
        "aircraft": "Gulfstream G-400",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "5oeboawll",
        "origin": "Cartagena, CO",
        "destination": "Miami, FL, US",
        "date": "2026-02-20",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ssfswc0e3",
        "origin": "Cartagena",
        "destination": "Miami",
        "date": "2026-02-20",
        "aircraft": "Gulfstream V",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "weobb7zn4",
        "origin": "San Fernando, AR",
        "destination": "Maldonado, UY",
        "date": "2026-02-21",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "rw0e74j7z",
        "origin": "San Fernando, AR",
        "destination": "Rio De Janeiro, BR",
        "date": "2026-02-21",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "5l27awdsl",
        "origin": "San Fernando, AR",
        "destination": "Esquel, AR",
        "date": "2026-02-21",
        "aircraft": "Gulfstream G",
        "seats": 400,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "wyq7oliio",
        "origin": "San Fernando, AR",
        "destination": "Maldonado, UY",
        "date": "2026-02-21",
        "aircraft": "Phenom 100",
        "seats": 6,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "ccbc6rvu7",
        "origin": "Puerto Natales, CL",
        "destination": "San Fernando, AR",
        "date": "2026-02-21",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "d61fw7z2i",
        "origin": "Buenos Aires",
        "destination": "Punta del Este",
        "date": "2026-02-21",
        "aircraft": "Phenom 100",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "nr83r2r2e",
        "origin": "Buenos Aires",
        "destination": "Esquel",
        "date": "2026-02-21",
        "aircraft": "Gulfstream G-400",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "r5ext98sx",
        "origin": "San Fernando, AR",
        "destination": "Maldonado, UY",
        "date": "2026-02-25",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "hcqyzz90q",
        "origin": "San Fernando, AR",
        "destination": "Uyuni, BO",
        "date": "2026-03-03",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "jjmgjm764",
        "origin": "Calama, CL",
        "destination": "San Fernando, AR",
        "date": "2026-03-03",
        "aircraft": "Learjet 60",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "4c95dyycj",
        "origin": "San Fernando, AR",
        "destination": "Rosario, AR",
        "date": "2026-03-03",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "70cild3d9",
        "origin": "Rio De Janeiro, BR",
        "destination": "San Fernando, AR",
        "date": "2026-03-05",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "zr597yvlr",
        "origin": "San Fernando, AR",
        "destination": "Punta Arenas, CL",
        "date": "2026-03-05",
        "aircraft": "Gulfstream G",
        "seats": 8,
        "price": "Consultar",
        "available": true
    },
    {
        "id": "uh0mdkvbo",
        "origin": "Buenos Aires",
        "destination": "Cataratas del Iguaz�",
        "date": "2026-04-24",
        "aircraft": "Citation V",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "8a2p5vawc",
        "origin": "Mendoza",
        "destination": "Buenos Aires",
        "date": "2026-04-24",
        "aircraft": "Citation V",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "kdkt6j8z5",
        "origin": "Buenos Aires",
        "destination": "C�rdoba",
        "date": "2026-05-01",
        "aircraft": "Citation Sovereign",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "77uexxcvc",
        "origin": "Chapelco",
        "destination": "Buenos Aires",
        "date": "2026-05-01",
        "aircraft": "Citation Sovereign",
        "seats": 8,
        "price": "consultar",
        "available": true
    },
    {
        "id": "s2e1slike",
        "origin": "Buenos Aires",
        "destination": "Chapelco",
        "date": "2026-05-04",
        "aircraft": "Citation Sovereign",
        "seats": 8,
        "price": "consultar",
        "available": true
    }
];
