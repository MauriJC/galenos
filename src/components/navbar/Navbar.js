import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='ui secondary pointing menu'>
      <div className='ui container'>
        <Link to='/' className='header item logo-container'>
          <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt='GALENOS' className='logo' />
          <span className='logo-text'>GALENOS</span>
        </Link>
        <div className='right menu'>
          <div className='ui simple dropdown item'>
            Medicos
            <i className='dropdown icon'></i>
            <div className='menu'>
              <Link className='item' to='/medicos/listadomedicos'>Listado Medicos</Link>
            </div>
          </div>
          <div className='ui simple dropdown item'>
            Pacientes
            <i className='dropdown icon'></i>
            <div className='menu'>
              <Link className='item' to='/pacientes/listadopacientes'>Listado Pacientes</Link>
            </div>
          </div>
          <div className='ui simple dropdown item'>
            Diagnosticos
            <i className='dropdown icon'></i>
            <div className='menu'>
              <Link className='item' to='/diagnosticos/listadodiagnosticos'>Listado Diagnosticos</Link>
              <Link className='item' to='/subirradiografia'>Subir Radiografia</Link>
            </div>
          </div>
          <div className='ui simple dropdown item'>
            Radiologos
            <i className='dropdown icon'></i>
            <div className='menu'>
              <Link className='item' to='/radiologos/listadoradiologos'>Listado Radiologos</Link>
            </div>
          </div>
          <div className='ui simple dropdown item'>
            Secretarios
            <i className='dropdown icon'></i>
            <div className='menu'>
              <Link className='item' to='/secretarios/listadosecretarios'>Listado Secretarios</Link>
            </div>
          </div>
          <Link className='ui item logout-button' to='/logout'>Cerrar sesión</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
