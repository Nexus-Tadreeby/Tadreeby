// src/hooks/useOpportunityDetails.js
import { useState, useEffect } from 'react';
import { opportunitiesAPI } from '../services/api';

export const useOpportunityDetails = (id, isInternshipRoute = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Opportunity not found.');
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = isInternshipRoute
          ? await opportunitiesAPI.getInternshipDetails(id)
          : await opportunitiesAPI.getOpportunityDetails(id);
        console.log('📦 Raw API response:', response);

        // response = { success: true, data: { id, company, ... } }
        const detail = response?.data ?? response;
        console.log('✅ Extracted detail:', detail);

        if (!detail) {
          throw new Error('Details are not available.');
        }
        setData(detail);
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setError(err.message || 'Unable to load details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, isInternshipRoute]);

  return { data, loading, error };
};