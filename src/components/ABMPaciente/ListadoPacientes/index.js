import React,{useState,useEffect} from 'react'
import api from '../../../apis'
import { Link } from 'react-router-dom'

const ListadoPacientes = () => {
    const [listaPacientes, setlistaPacientes] = useState([{nombre:"Jose",apellido:'Hernandez'}])


    useEffect(( )=>{
        getListaPacientes()
    },[])




    //API comms
    const getListaPacientes = async()=>{

    }



    const deletePaciente=()=>{

    }


    //renders
    const renderAdminFunctions= (paciente)=>{
        return  (<div className="right floated content">
        <Link to={`/medicos/modificarMedico/${paciente.numero_afiliado}`} className="ui button primary">
            <i className="edit icon"></i>
        </Link>
        <Link
          to={`/pacientes/borrarpaciente/${paciente.numero_afiliado}`}
          className="ui button negative"
        >
          <i className="trash icon"></i>
        </Link>
        <button className="ui button negative"
        onClick={deletePaciente}
        >
            <i className="trash icon"></i>
        </button>
      </div>
      )
    }


    const renderCrear=()=> {
       
        return (
          <div style={{ textAlign: 'right' }}>
            <Link to="/pacientes/altapaciente" className="ui button primary">
              Alta paciente 
            </Link>
          </div>
        );
      }




  return (
    <div>
      
      <h1 className='ui centered dividing header'>Listado de Pacientes</h1>
        <div className="ui celled list">
              {listaPacientes.map(paciente=>{
                return  (<div className="item" key={paciente.legajo}>
                {renderAdminFunctions(paciente)}
                <i className="large middle aligned icon doctor" />
                <div className="content">
                  Nombre del paciente: {paciente.nombre}
                  <div className="description"> Apellido del paciente: {paciente.apellido}</div>
                </div>
              </div>
            )
            })} 


        </div>

        {renderCrear()}
       
    </div>
  )
}

export default ListadoPacientes
