// src/context/ProfileContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { profileAPI } from '../services/api';
import { normalizeProfileResponse } from '../utils/normalize'; // adjust path

// ─── Cache utilities ──────────────────────────────────────────────
const CACHE_KEY = 'profile_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const getCachedProfile = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
};

const setCachedProfile = (data) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
};

export const clearCachedProfile = () => {
  localStorage.removeItem(CACHE_KEY);
};

// ─── Context ──────────────────────────────────────────────────────
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFetchingRef = useRef(false);
  const backgroundRef = useRef(false);

  // ─── Fetch function ─────────────────────────────────────────────
  const fetchProfile = useCallback(async (forceRefresh = false) => {
    // Prevent concurrent requests
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    // 1. Try cache if not forced
    if (!forceRefresh) {
      const cached = getCachedProfile();
      if (cached) {
        setProfile(cached);
        setIsLoading(false);
        // Start background refresh (stale‑while‑revalidate)
        if (!backgroundRef.current) {
          backgroundRef.current = true;
          // Use a small delay to let the UI render first
          setTimeout(() => {
            fetchProfile(true).finally(() => {
              backgroundRef.current = false;
            });
          }, 300);
        }
        isFetchingRef.current = false;
        return;
      }
    }

    // 2. Fetch from API
    setIsLoading(true);
    setError(null);
    try {
      const response = await profileAPI.getProfile();
      const normalized = normalizeProfileResponse(response, {});
      setProfile(normalized);
      setCachedProfile(normalized);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError(err.message || 'Failed to load profile');
      // If we have a cached version, keep it (don't clear)
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  // ─── Initial fetch ──────────────────────────────────────────────
  useEffect(() => {
    fetchProfile();
    // Cleanup: clear any pending background refetch if component unmounts
    return () => {
      backgroundRef.current = false;
    };
  }, [fetchProfile]);

  // ─── Mutations ──────────────────────────────────────────────────
  // After every successful mutation, we update local state and cache
  // with the fresh data from the API.

  const updateProfile = async (changes) => {
    try {
      const response = await profileAPI.updateProfile(changes);
      const updated = normalizeProfileResponse(response, profile);
      setProfile(updated);
      setCachedProfile(updated);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const uploadAvatar = async (file) => {
    // Convert to base64 (if needed) – adjust if your API accepts FormData
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
    const response = await profileAPI.updateProfile({ profileImage: base64 });
    const updated = normalizeProfileResponse(response, profile);
    setProfile(updated);
    setCachedProfile(updated);
    return updated;
  };

  const deleteAvatar = async () => {
    const response = await profileAPI.updateProfile({ profileImage: null });
    const updated = normalizeProfileResponse(response, profile);
    setProfile(updated);
    setCachedProfile(updated);
    return updated;
  };

  const uploadCV = async (file, onProgress) => {
    const response = await profileAPI.uploadCV(file, onProgress);
    const updated = normalizeProfileResponse(response, profile);
    setProfile(updated);
    setCachedProfile(updated);
    return updated;
  };

  const removeCV = async () => {
    const response = await profileAPI.removeCV();
    const updated = normalizeProfileResponse(response, profile);
    setProfile(updated);
    setCachedProfile(updated);
    return updated;
  };

  const addSkill = async (skill) => {
    const response = await profileAPI.addSkill(skill);
    const updated = normalizeProfileResponse(response, profile);
    setProfile(updated);
    setCachedProfile(updated);
    return updated;
  };

  const removeSkill = async (skill) => {
    const response = await profileAPI.removeSkill(skill);
    const updated = normalizeProfileResponse(response, profile);
    setProfile(updated);
    setCachedProfile(updated);
    return updated;
  };

  const reuploadVerificationDocument = async (file) => {
    const response = await profileAPI.reuploadVerificationDocument(file);
    const updated = normalizeProfileResponse(response, profile);
    setProfile(updated);
    setCachedProfile(updated);
    return updated;
  };

  const removeVerificationDocument = async () => {
    // If your API supports deletion of verification doc, add it.
    // Otherwise, you might need to handle accordingly.
    // For now, we assume a re‑upload replaces it.
    throw new Error('Not implemented');
  };

  // ─── Context value ──────────────────────────────────────────────
  const value = {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
    updateProfile,
    uploadAvatar,
    deleteAvatar,
    uploadCV,
    removeCV,
    addSkill,
    removeSkill,
    reuploadVerificationDocument,
    removeVerificationDocument,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};