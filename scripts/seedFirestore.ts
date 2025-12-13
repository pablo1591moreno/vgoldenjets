
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCK418F3BGKR6A-mXTrYgStDAWNWGXzltA",
    authDomain: "vgoldenjets-base-de-datos.firebaseapp.com",
    projectId: "vgoldenjets-base-de-datos",
    storageBucket: "vgoldenjets-base-de-datos.firebasestorage.app",
    messagingSenderId: "120318894298",
    appId: "1:120318894298:web:f135fb0eac3c4f60aa85e3",
    measurementId: "G-V4V5W6PLL8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Simplified interface without image import
interface EmptyLeg {
    id: string;
    from: string;
    to: string;
    date: string;
    availability: string;
    aircraft: string;
    seats: number;
    // We store image name as string instead of imported object
    imageName: string;
}

// Data from src/data/emptyLegs.ts adapted
const emptyLegs: EmptyLeg[] = [
    {
        "id": "el-001",
        "from": "Córdoba, AR (SACO)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-14",
        "availability": "Dom 14 Dic 2025 23:00 ARTE – Dom 14 Dic 2025 23:58 ARTE (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-002",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-15",
        "availability": "Lun 15 Dic 2025 13:18 UYT – Lun 15 Dic 2025 13:51 ART (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-003",
        "from": "Balboa, PA (MPPA)",
        "to": "Oporto (oporto), PT (LPPR)",
        "date": "2025-12-16",
        "availability": "martes 16 de diciembre de 2025, 10:00 a. m. EST – miércoles 17 de diciembre de 2025, 12:00 a. m. WET (hora local)",
        "aircraft": "Gulfstream G-V",
        "seats": 15,
        imageName: "Gulfstream.webp"
    },
    {
        "id": "el-004",
        "from": "San Fernando, AR (SADF)",
        "to": "Maldonado, UY (SULS)",
        "date": "2025-12-17",
        "availability": "miércoles 17 de diciembre de 2025, 16:12 ARTE – miércoles 17 de diciembre de 2025, 16:45 UYT (hora local)",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-005",
        "from": "San Carlos De Bariloche, AR (SAZS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-20",
        "availability": "Sáb dic 20 2025 11:57 AM ART – Sáb dic 20 2025 1:58 PM ART (local)",
        "aircraft": "Challenger 605",
        "seats": 10,
        imageName: "Challenger601.webp"
    },
    {
        "id": "el-006",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-21",
        "availability": "Dom. 21 dic. 2025 10:32 AM UYT – Dom. 21 dic. 2025 11:20 AM ART (local)",
        "aircraft": "Challenger 605",
        "seats": 10,
        imageName: "Challenger601.webp"
    },
    {
        "id": "el-007",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-21",
        "availability": "Dom 21 Dic 2025 12:48 PM UYT – Dom 21 Dic 2025 1:21 PM ART (local)",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-008",
        "from": "San Fernando, AR (SADF)",
        "to": "El Calafate, AR (SAWC)",
        "date": "2025-12-23",
        "availability": "martes 23 de diciembre de 2025, 11:13 a. m. ARTE – martes 23 de diciembre de 2025, 2:15 p. m. ARTE (local)",
        "aircraft": "Gulfstream G-400",
        "seats": 14,
        imageName: "Gulfstream.webp"
    },
    {
        "id": "el-009",
        "from": "Mar Del Plata, AR (SAZM)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-23",
        "availability": "martes 23 de diciembre de 2025, 18:10 h ARTE – martes 23 de diciembre de 2025, 19:02 h ARTE (local)",
        "aircraft": "Gulfstream G-400",
        "seats": 14,
        imageName: "Gulfstream.webp"
    },
    {
        "id": "el-010",
        "from": "San Carlos De Bariloche, AR (SAZS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-25",
        "availability": "Jue 25 Dic 2025 12:00 PM ART – Jue 25 Dic 2025 2:01 PM ART (local)",
        "aircraft": "Challenger 605",
        "seats": 10,
        imageName: "Challenger601.webp"
    },
    {
        "id": "el-011",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-25",
        "availability": "Jue 25 Dic 2025 13:36 UYT – Jue 25 Dic 2025 14:12 ARTE (local)",
        "aircraft": "Phenom 100",
        "seats": 6,
        imageName: "img 3.webp"
    },
    {
        "id": "el-012",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-25",
        "availability": "Jue 25 Dic 2025 17:36 UYT – Jue 25 Dic 2025 18:12 ARTE (local)",
        "aircraft": "Phenom 100",
        "seats": 6,
        imageName: "img 3.webp"
    },
    {
        "id": "el-013",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-26",
        "availability": "Vie 26 Dic 2025 10:36 AM UYT – Vie 26 Dic 2025 11:12 AM ART (local)",
        "aircraft": "Phenom 100",
        "seats": 6,
        imageName: "img 3.webp"
    },
    {
        "id": "el-014",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-26",
        "availability": "Vie 26 Dic 2025 12:18 PM UYT – Vie 26 Dic 2025 12:51 PM ART (local)",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-015",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-26",
        "availability": "Vie 26 Dic 2025 13:18 UYT – Vie 26 Dic 2025 13:51 ARTE (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-016",
        "from": "San Fernando, AR (SADF)",
        "to": "Santa Fe, AR (SAAV)",
        "date": "2025-12-26",
        "availability": "Vie 26 Dic 2025 19:00 ARTE – Vie 26 Dic 2025 19:50 ARTE (local)",
        "aircraft": "Gulfstream G-400",
        "seats": 14,
        imageName: "Gulfstream.webp"
    },
    {
        "id": "el-017",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-26",
        "availability": "Vie 26 Dic 2025 19:33 UYT – Vie 26 Dic 2025 20:06 ARTE (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-018",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-27",
        "availability": "Sáb 27 Dic 2025 10:30 AM UYT – Sáb 27 Dic 2025 11:03 AM ART (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-019",
        "from": "San Carlos De Bariloche, AR (SAZS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-27",
        "availability": "Sáb 27 Dic 2025 12:17 PM ART – Sáb 27 Dic 2025 2:18 PM ART (local)",
        "aircraft": "Challenger 605",
        "seats": 10,
        imageName: "Challenger601.webp"
    },
    {
        "id": "el-020",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-27",
        "availability": "Sáb 27 Dic 2025 12:18 PM UYT – Sáb 27 Dic 2025 12:51 PM ART (local)",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-021",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-27",
        "availability": "Sáb 27 Dic 2025 12:21 PM UYT – Sáb 27 Dic 2025 12:57 PM ART (local)",
        "aircraft": "Phenom 100",
        "seats": 6,
        imageName: "img 3.webp"
    },
    {
        "id": "el-022",
        "from": "San Fernando, AR (SADF)",
        "to": "Río de Janeiro, BR (SBGL)",
        "date": "2025-12-27",
        "availability": "Sáb 27 Dic 2025 1:40 PM ART – Sáb 27 Dic 2025 4:15 PM BRT (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-023",
        "from": "San Carlos De Bariloche, AR (SAZS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-27",
        "availability": "Sáb 27 Dic 2025 2:34 PM ART – Sáb 27 Dic 2025 4:23 PM ART (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-024",
        "from": "San Fernando, AR (SADF)",
        "to": "Maldonado, UY (SULS)",
        "date": "2025-12-27",
        "availability": "Sáb 27 Dic 2025 7:28 AM ART – Sáb 27 Dic 2025 8:15 AM UYT (hora local)",
        "aircraft": "Challenger 605",
        "seats": 10,
        imageName: "Challenger601.webp"
    },
    {
        "id": "el-025",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-28",
        "availability": "Dom. 28 Dic 2025 11:17 AM UYT – Dom. 28 Dic 2025 11:50 AM ART (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-026",
        "from": "San Fernando, AR (SADF)",
        "to": "Porto Alegre, BR (SBPA)",
        "date": "2025-12-28",
        "availability": "Dom. 28 de diciembre de 2025, 12:00 p. m. ARTE – Dom. 28 de diciembre de 2025, 1:15 p. m. BRT (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-027",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-28",
        "availability": "Dom. 28 Dic 2025 13:36 UYT – Dom. 28 Dic 2025 14:12 ART (local)",
        "aircraft": "Phenom 100",
        "seats": 6,
        imageName: "img 3.webp"
    },
    {
        "id": "el-028",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-28",
        "availability": "Dom. 28 Dic 2025 15:44 UYT – Dom. 28 Dic 2025 16:17 ART (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-029",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-28",
        "availability": "Dom. 28 Dic 2025 18:16 UYT – Dom. 28 Dic 2025 18:52 ART (local)",
        "aircraft": "Phenom 100",
        "seats": 6,
        imageName: "img 3.webp"
    },
    {
        "id": "el-030",
        "from": "San Fernando, AR (SADF)",
        "to": "Córdoba, AR (SACO)",
        "date": "2025-12-29",
        "availability": "Lun 29 Dic 2025 12:17 PM ART – Lun 29 Dic 2025 1:15 PM ART (local)",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-031",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-29",
        "availability": "Lun 29 Dic 2025 12:18 PM UYT – Lun 29 Dic 2025 12:51 PM ART (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-032",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-29",
        "availability": "Lun 29 Dic 2025 16:05 UYT – Lun 29 Dic 2025 16:38 ARTE (local)",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-033",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-30",
        "availability": "martes 30 de diciembre de 2025, 1:18 a. m. UYT – martes 30 de diciembre de 2025, 1:51 a. m. ARTE (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-034",
        "from": "Río De Janeiro, BR (SBGL)",
        "to": "San Fernando, AR (SADF)",
        "date": "2025-12-31",
        "availability": "Mié 31 Dic 2025 4:12 PM BRT – Mié 31 Dic 2025 6:47 PM ART (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-035",
        "from": "San Carlos De Bariloche, AR (SAZS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2026-01-01",
        "availability": "Jue 01 Ene 2026 10:57 AM ART – Jue 01 Ene 2026 12:58 PM ART (local)",
        "aircraft": "Challenger 605",
        "seats": 10,
        imageName: "Challenger601.webp"
    },
    {
        "id": "el-036",
        "from": "San Fernando, AR (SADF)",
        "to": "El Calafate, AR (SAWC)",
        "date": "2026-01-01",
        "availability": "Jue 01 Ene 2026 2:33 PM ART – Jue 01 Ene 2026 5:15 PM ART (local)",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-037",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2026-01-02",
        "availability": "viernes 2 de enero de 2026 a las 11:38 a. m. UYT – viernes 2 de enero de 2026 a las 12:11 p. m. ART (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-038",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2026-01-02",
        "availability": "Vie 02 Ene 2026 2:46 PM UYT – Vie 02 Ene 2026 3:19 PM ART (local)",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-039",
        "from": "Tampa, FL, EE. UU. (KTPA)",
        "to": "Calama, CL (SCCF)",
        "date": "2026-01-02",
        "availability": "viernes 2 de enero de 2026 a la 1:00 p. m. EST – viernes 2 de enero de 2026 a las 10:12 p. m. CLST (local)",
        "aircraft": "Gulfstream G-V",
        "seats": 15,
        imageName: "Gulfstream.webp"
    },
    {
        "id": "el-040",
        "from": "San Fernando, AR (SADF)",
        "to": "Rosario, AR (SAAR)",
        "date": "2026-01-02",
        "availability": "Vie 02 Ene 2026 8:47 AM ART – Vie 02 Ene 2026 9:15 AM ART (local)",
        "aircraft": "Learjet 60",
        "seats": 8,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-041",
        "from": "Higüey, DO (MDPC)",
        "to": "San Fernando, AR (SADF)",
        "date": "2026-01-02",
        "availability": "Vie 02 Ene 2026 10:00 PM AST – Sáb 03 Ene 2026 6:28 AM ART (local)",
        "aircraft": "Gulfstream G-400",
        "seats": 14,
        imageName: "Gulfstream.webp"
    },
    {
        "id": "el-042",
        "from": "Santa Fe, AR (SAAV)",
        "to": "San Fernando, AR (SADF)",
        "date": "2026-01-04",
        "availability": "Dom. 4 de enero de 2026, 6:45 a. m. ARTE – Dom. 4 de enero de 2026, 7:39 a. m. ARTE (local)",
        "aircraft": "Gulfstream G-V",
        "seats": 14,
        imageName: "Gulfstream.webp"
    },
    {
        "id": "el-043",
        "from": "San Fernando, AR (SADF)",
        "to": "Porto Alegre, BR (SBPA)",
        "date": "2026-01-05",
        "availability": "Lun 05 Ene 2026 9:00 AM ART – Lun 05 Ene 2026 10:15 AM BRT (local)",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-044",
        "from": "Maldonado, UY (SULS)",
        "to": "San Fernando, AR (SADF)",
        "date": "2026-01-05",
        "availability": "lunes 5 de enero de 2026 a las 12:44 p. m. UYT – lunes 5 de enero de 2026 a las 1:17 p. m. ART (local)",
        "aircraft": "Learjet 40XR",
        "seats": 7,
        imageName: "Lear60.webp"
    },
    {
        "id": "el-045",
        "from": "Belo Horizonte, BR (SBCF)",
        "to": "San Fernando, AR (SADF)",
        "date": "2026-01-05",
        "availability": "lunes 5 de enero de 2026, 1:30 a. m. BRT – lunes 5 de enero de 2026, 4:42 a. m. ART (local)",
        "aircraft": "Gulfstream G-V",
        "seats": 15,
        imageName: "Gulfstream.webp"
    }
];

// Function to upload data
const uploadData = async () => {
    console.log("Starting upload of empty legs...");
    const collectionRef = collection(db, "emptyLegs");

    for (const leg of emptyLegs) {
        try {
            await setDoc(doc(collectionRef, leg.id), leg);
            console.log(`Document written with ID: ${leg.id}`);
        } catch (e) {
            console.error(`Error adding document ${leg.id}: `, e);
        }
    }
    console.log("Upload complete.");
    process.exit(0);
};

uploadData();
