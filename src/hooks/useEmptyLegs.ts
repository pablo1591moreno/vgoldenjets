import { useState, useEffect } from 'react';
import { emptyLegs, EmptyLeg } from '../data/emptyLegs';

export const useEmptyLegs = () => {
    const [flights, setFlights] = useState<EmptyLeg[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate async loading to keep the interface consistent (optional, but good for UX transition)
        // or just set it immediately.
        try {
            // Sort flights by date (ascending: earliest first)
            const sortedFlights = [...emptyLegs].sort((a, b) => a.date.localeCompare(b.date));
            setFlights(sortedFlights);
            setLoading(false);
        } catch (err: unknown) {
            console.error("Error loading empty legs:", err);
            setError("Failed to load flights.");
            setLoading(false);
        }
    }, []);

    return { flights, loading, error };
};
