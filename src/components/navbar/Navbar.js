import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { logout } from '../../apis';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('rol');
    setRole(userRole ? userRole.toUpperCase() : '');
  }, []);

  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = async () => {
    const logoutSuccess = await logout();
    if (logoutSuccess) {
      navigate('/login');
    } else {
      console.error('Error al cerrar sesión.');
    }
  };

  const renderMenuItems = () => {
    if (role === 'ADMIN') {
      return (
        <>
          <Link className='item' to='/mapa'>Mapa</Link>
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
        </>
      );
    } else if (role === 'SECRETARIO') {
      return (
        <>
          <Link className='item' to='/mapa'>Mapa</Link>
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
        </>
      );
    } else if (role === 'MEDICO') {
      return (
        <>
          <Link className='item' to='/mapa'>Mapa</Link>
          <div
            className={`ui simple dropdown item ${activeDropdown === 'medicos' ? 'active' : ''}`}
            onClick={() => handleDropdownClick('medicos')}
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
        </>
      );
    } else if (role === 'RADIOLOGO') {
      return (
        <>
          <div
            className={`ui simple dropdown item ${activeDropdown === 'radiologos' ? 'active' : ''}`}
            onClick={() => handleDropdownClick('radiologos')}
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
        </>
      );
    }
  };

  return (
    <nav className='ui secondary pointing menu'>
      <div className='ui container'>
        <Link to='/' className='header item logo-container'>
          <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt='GALENOS' className='logo' />
          <span className='logo-text'>GALENOS</span>
        </Link>
        <button className='hamburger-menu' onClick={toggleMenuVisibility}>
          <i className={`bars icon ${menuVisible ? 'open' : ''}`}></i>
        </button>
        <div className={`right menu ${menuVisible ? 'visible' : ''}`}>
          {renderMenuItems()}
          <div className='ui item logout-button' onClick={handleLogout}>
            Cerrar sesión
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
