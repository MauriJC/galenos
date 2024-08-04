import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const role = localStorage.getItem('rol') ? localStorage.getItem('rol').toUpperCase() : '';
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('Authorization'); 

  // Si el usuario no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return allowedRoles.includes(role) ? (
    Component
  ) : (
    <Navigate to='/unauthorized' state={{ from: location }} />
  );
};

export default ProtectedRoute;
