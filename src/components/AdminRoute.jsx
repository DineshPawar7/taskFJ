import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};


export default AdminRoute;