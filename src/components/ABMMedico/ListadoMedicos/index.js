import api from '../../../apis'
import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'



const ListadoMedicos = () => {
    const [listaMedicos, setlistaMedicos] = useState([])
    
  

    useEffect(()=>{
      getListadoMedicos()
      console.log('obteniendo medicos')
      console.log(listaMedicos)
    },[])


  


    const getListadoMedicos = async() =>{
        const response = await api.get(`/altamedico`)
        setlistaMedicos(response.data.medicos);
        console.log(listaMedicos)


    }




    const renderAdminFunctions= (medico)=>{
        return  (<div className="right floated content">
        <Link to={`/medicos/modificarMedico/${medico.numero_matricula}`} className="ui button primary">
            <i className="edit icon"></i>
        </Link>
        <Link
          to={`/medicos/bajamedico/${medico.numero_matricula}`}
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
            <Link to="/medicos/altamedico" className="ui button primary">
              Alta medico 
            </Link>
          </div>
        );
      }
    


  

  return (

    <div className='ui container'>
       <div className="ui center aligned segment">
        <h1 className='ui centered dividing header'>Listado de Médicos</h1>
      </div>
      <div className="ui segment">
            <div className="ui celled list">
                  {listaMedicos.map(medico=>{
                    return  (<div className="item" key={medico.legajo}>
                    {renderAdminFunctions(medico)}
                    <i className="large middle aligned icon doctor" />
                    <div className="content">
                      Nombre del médico: {medico.nombre}
                      <div className="description"> Apellido del médico: {medico.apellido}</div>
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

export default ListadoMedicos
