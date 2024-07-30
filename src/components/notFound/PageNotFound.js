// src/components/PageNotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='ui container'>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to='/'>Volver al inicio</Link>
    </div>
  );
};

export default PageNotFound;
