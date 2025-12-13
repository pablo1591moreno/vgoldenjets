
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

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

const deleteExpired = async () => {
    console.log("Starting cleanup of expired empty legs...");
    try {
        const colRef = collection(db, "emptyLegs");
        const snapshot = await getDocs(colRef);

        if (snapshot.empty) {
            console.log("Collection is empty. Nothing to delete.");
            process.exit(0);
        }

        const today = new Date().toISOString().split('T')[0];
        console.log(`Date reference for deletion (Today): ${today}`);

        let deletedCount = 0;
        let preservedCount = 0;

        // Use Promise.all to handle async deletions in parallel for speed, 
        // or sequential loop if we want to be gentle. Given the size likely small, sequential is fine/safer logging.
        const promises = snapshot.docs.map(async (document) => {
            const data = document.data();
            // Assuming data.date is YYYY-MM-DD
            if (data.date < today) {
                console.log(`Deleting [${document.id}] - Date: ${data.date} (Expired)`);
                await deleteDoc(doc(db, "emptyLegs", document.id));
                deletedCount++;
            } else {
                // console.log(`Keeping [${document.id}] - Date: ${data.date}`);
                preservedCount++;
            }
        });

        await Promise.all(promises);

        console.log("------------------------------------------------");
        console.log(`Cleanup Complete.`);
        console.log(`Deleted: ${deletedCount}`);
        console.log(`Preserved: ${preservedCount}`);

    } catch (error) {
        console.error("Error cleaning up DB:", error);
    }
    process.exit(0);
};

deleteExpired();
