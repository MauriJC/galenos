import React,{useState,useEffect} from 'react'
import api from '../../../apis'
import { Link } from 'react-router-dom'

const ListadoPacientes = () => {
    const [listaPacientes, setlistaPacientes] = useState([{nombre:"Jose",apellido:'Hernandez',numero_afiliado:1}])


    useEffect(( )=>{
        getListaPacientes()
    },[])




    //API comms
    const getListaPacientes = async()=>{

      const headers = {
        "Content-Type":"application/json"
    }



      const response = await api.get(`/altapaciente`)
      setlistaPacientes(response.data.message)
      console.log(response.data.message)

    }




    //renders
    const renderAdminFunctions= (paciente)=>{
        return  (<div className="right floated content">
        <Link to={`/pacientes/modificarpaciente/${paciente.numero_afiliado}`} className="ui button primary">
            <i className="edit icon"></i>
        </Link>
        <Link
          to={`/pacientes/bajapaciente/${paciente.numero_afiliado}`}
          className="ui button negative"
        >
          <i className="trash icon"></i>
        </Link>
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
    <div className='ui container'>
      <div className="ui center aligned segment">
        <h1 className='header'>Listado de Pacientes</h1>
      </div>
      
        <div className="ui segment">
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

          <div style={{ textAlign: 'right' }}>
            <Link to="/menu" className="ui button positive">
              Volver al menu 
            </Link>
          </div>
    </div>
  )
}

export default ListadoPacientes
