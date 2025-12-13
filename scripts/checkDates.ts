
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

const check = async () => {
    console.log("Checking Firestore Dates...");
    try {
        const colRef = collection(db, "emptyLegs");
        const snapshot = await getDocs(colRef);

        if (snapshot.empty) {
            console.log("Collection is EMPTY.");
        } else {
            console.log(`Found ${snapshot.size} documents.`);
            const today = new Date().toISOString().split('T')[0];
            console.log(`Today (Local ISO): ${today}`);

            let visibleCount = 0;

            snapshot.docs.forEach((doc, i) => {
                const data = doc.data();
                const isVisible = data.date >= today;
                if (isVisible) visibleCount++;

                // Print first 5 and any expired ones
                if (i < 5 || !isVisible) {
                    console.log(`[${doc.id}] Date: "${data.date}" | Visible? ${isVisible ? 'YES' : 'NO'}`);
                }
            });
            console.log(`Total Visible: ${visibleCount} / ${snapshot.size}`);
        }
    } catch (error) {
        console.error("Error reading DB:", error);
    }
};

check();
