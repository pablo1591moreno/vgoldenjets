import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
// import { EmptyLeg } from '../data/emptyLegs';

export interface EmptyLeg {
    id: string;
    from: string;
    to: string;
    date: string;
    availability: string;
    aircraft: string;
    seats: number;
    image?: string;
    imageName?: string;
}

// Image Imports (Mapping)
import img3 from '@/img/img 3.webp';
import imgLear60 from '@/img/Lear60.webp';
import imgGulfstream from '@/img/Gulfstream.webp';
// import imgGlobal from '@/img/BombardierGlobal.webp'; // Not used in current seed
import imgChallenger from '@/img/Challenger601.webp';
// import imgFalcon from '@/img/DassaultFalcon.webp'; // Not used in current seed
// import imgHawker from '@/img/Hawker 800.webp'; // Not used in current seed

const imageMap: Record<string, string> = {
    'Lear60.webp': imgLear60,
    'Gulfstream.webp': imgGulfstream,
    'Challenger601.webp': imgChallenger,
    'img 3.webp': img3,
    // Fallback or others
};

export const useEmptyLegs = () => {
    const [flights, setFlights] = useState<EmptyLeg[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                // Fetch all documents
                // In a real app we might want to query only future dates here, 
                // but for now we follow the existing logic of filtering in the component
                // or we can optimize to filter by date here.

                const q = collection(db, 'emptyLegs');
                const querySnapshot = await getDocs(q);

                const fetchedFlights: EmptyLeg[] = querySnapshot.docs.map(doc => {
                    const data = doc.data();

                    // Map image name to actual imported file
                    const imageSrc = data.imageName && imageMap[data.imageName]
                        ? imageMap[data.imageName]
                        : imgLear60; // Default fallback

                    return {
                        id: doc.id,
                        from: data.from,
                        to: data.to,
                        date: data.date,
                        availability: data.availability,
                        aircraft: data.aircraft,
                        seats: data.seats,
                        image: imageSrc,
                        // Preserve other fields if needed
                    } as EmptyLeg;
                });

                // Sort flights by date (ascending: earliest first)
                fetchedFlights.sort((a, b) => a.date.localeCompare(b.date));

                setFlights(fetchedFlights);

            } catch (err: unknown) {
                console.error("Error fetching empty legs:", err);
                const errorMessage = err instanceof Error ? err.message : "Failed to load flights.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, []);

    return { flights, loading, error };
};
