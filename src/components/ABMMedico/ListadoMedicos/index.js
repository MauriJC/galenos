import api from '../../../apis'
import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'


const ListadoMedicos = () => {
    const [listaMedicos, setlistaMedicos] = useState([])
    
  

    useEffect(()=>{
      getListadoMedicos()
      console.log('obteniendo medicos')
    },[])


  


    const getListadoMedicos = async() =>{
        const response = await api.get(`/medicos`)
        setlistaMedicos(response.data);
        console.log(listaMedicos)


    }

    const renderAdminFunctions= (medico)=>{
        return  (<div className="right floated content">
        <Link to={`/medicos/modificarMedico/${medico.legajo}`} className="ui button primary">
            <i className="edit icon"></i>
        </Link>
        <Link
          to={`/medicos/borrarmedico/${medico.legajo}`}
          className="ui button negative"
        >
          <i className="trash icon"></i>
        </Link>
      </div>
      )
    }

  return (

    <div>
       <h1 className='ui centered dividing header'>Listado de Médicos</h1>
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
       

       
     
    </div>
  )
}

export default ListadoMedicos
