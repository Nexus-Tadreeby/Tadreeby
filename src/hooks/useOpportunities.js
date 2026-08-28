// src/hooks/useOpportunities.js
import { useState, useEffect } from 'react';
import { opportunitiesAPI } from '../services/api';

export const useOpportunities = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await opportunitiesAPI.getAvailableOpportunities();
                const list = Array.isArray(response?.data) ? response.data : [];
                setOpportunities(list);
            } catch (err) {
                setError(err.message || 'Failed to load opportunities');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { opportunities, loading, error };
};