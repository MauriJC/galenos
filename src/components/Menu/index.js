import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
const Menu = () => {
  const username = localStorage.getItem('username');

  return (
    <div className='ui container'>
        <h1 className='header'>Bienvenido {username} </h1>
        <Dashboard/>
    </div>
  )
}

export default Menu
