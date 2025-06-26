// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSessionUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/me', {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true });
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user && user.role === 'admin';

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin, loading }}>
      {children}
    </UserContext.Provider>
  );
};
