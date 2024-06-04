import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownClick = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  return (
    <nav className='ui secondary pointing menu'>
      <div className='ui container'>
        <Link to='/' className='header item logo-container'>
          <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt='GALENOS' className='logo' />
          <span className='logo-text'>GALENOS</span>
        </Link>
        <div className='right menu'>
          <div 
            className={`ui simple dropdown item ${activeDropdown === 'medicos' ? 'active' : ''}`}
            onClick={() => handleDropdownClick('medicos')}
          >
            Medicos
            <i className='dropdown icon'></i>
            <div className='menu'>
              <Link className='item' to='/medicos/listadomedicos'>Listado Medicos</Link>
            </div>
          </div>
          <div 
            className={`ui simple dropdown item ${activeDropdown === 'pacientes' ? 'active' : ''}`}
            onClick={() => handleDropdownClick('pacientes')}
          >
            Pacientes
            <i className='dropdown icon'></i>
            <div className='menu'>
              <Link className='item' to='/pacientes/listadopacientes'>Listado Pacientes</Link>
            </div>
          </div>
          <div 
            className={`ui simple dropdown item ${activeDropdown === 'diagnosticos' ? 'active' : ''}`}
            onClick={() => handleDropdownClick('diagnosticos')}
          >
            Diagnosticos
            <i className='dropdown icon'></i>
            <div className='menu'>
              <Link className='item' to='/diagnosticos/listadodiagnosticos'>Listado Diagnosticos</Link>
              <Link className='item' to='/subirradiografia'>Subir Radiografia</Link>
            </div>
          </div>
          <div 
            className={`ui simple dropdown item ${activeDropdown === 'radiologos' ? 'active' : ''}`}
            onClick={() => handleDropdownClick('radiologos')}
          >
            Radiologos
            <i className='dropdown icon'></i>
            <div className='menu'>
              <Link className='item' to='/radiologos/listadoradiologos'>Listado Radiologos</Link>
            </div>
          </div>
          <div 
            className={`ui simple dropdown item ${activeDropdown === 'secretarios' ? 'active' : ''}`}
            onClick={() => handleDropdownClick('secretarios')}
          >
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
