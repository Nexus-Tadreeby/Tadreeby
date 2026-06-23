import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContextObject.js';

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Strategy: Pull the token from localStorage immediately when the app loads
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // This hook watches our token state. If it changes, update localStorage!
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Mock login function
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
  };

  // Mock logout function
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};