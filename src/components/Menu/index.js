import React, { useEffect, useState } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import './Menu.css';

const Menu = () => {
  const username = localStorage.getItem('username');
  const [rol, setRol] = useState('');

  useEffect(() => {
    const userRol = localStorage.getItem('rol');
    setRol(userRol);
  }, []);

  return (
    <div className='menu-container'>
      <div className='ui container'>
        <div className='ui center aligned segment'>
          <h1 className='ui header'>Bienvenido, {username}</h1>
        </div>
        <Dashboard />
      </div>
    </div>
  );
}

export default Menu;
