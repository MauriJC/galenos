import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div className='ui container'>
        <h1 className='header'>Bienvenido</h1>
        <div className="ui segment">
            <h4>ABM Medico</h4>
            <Link className='ui button' to='/medicos/listadomedicos'> Listado Medicos</Link>

        </div>

        <div className="ui segment">
            <h4>ABM Paciente</h4>
            <Link className='ui button' to='/pacientes/listadopacientes'> Listado Pacientes</Link>
            
        </div>

        <div className="ui segment">
            <h4>Diagnosticos</h4>
            <Link className='ui button' to='/diagnosticos/listadodiagnosticos'> Listado Diagnosticos</Link>
            <Link className='ui button' to='/subirradiografia'> Subir Radiografia</Link>
            
        </div>

        <div className="ui segment">
            <h4> Radiologos</h4>
            <Link className="ui button" to='/radiologos/listadoradiologos'>Listado Radiologos</Link>
        </div>

        <div className="ui segment">
            <h4> Secretarios</h4>
            <Link to='/secretarios/listadosecretarios' className='ui button'>Listado Secretarios</Link>
        </div>
        
        
        

    </div>
  )
}

export default Menu
