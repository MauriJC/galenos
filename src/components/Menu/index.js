import React from 'react'
import { Link } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
const Menu = () => {
  return (
    <div className='ui container'>
        <h1 className='header'>Bienvenido</h1>
        <Dashboard/>
    </div>
  )
}

export default Menu
