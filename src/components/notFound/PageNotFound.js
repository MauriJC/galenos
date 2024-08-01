import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

const PageNotFound = () => {
  return (
    <div className='page-not-found-container'>
      <div>
        <h1>404 - Página no encontrada</h1>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <Link to='/'>Volver al inicio</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
