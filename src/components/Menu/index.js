import React, { useEffect, useState } from 'react';
import Dashboard from '../Dashboard/Dashboard'
const Menu = () => {
  const username = localStorage.getItem('username');
  const [rol, setRol] = useState('');

  useEffect(() => {
    const userRol = localStorage.getItem('rol');
    setRol(userRol);
  }, []);

  return (
    <div className='ui container'>
        <h1 className='header'>Bienvenido {username} </h1>
        <Dashboard/>
    </div>
  )
}

export default Menu
