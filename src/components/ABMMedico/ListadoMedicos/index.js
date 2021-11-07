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
        <Link to={`/medicos/edit/${medico.legajo}`} className="ui button primary">
          Modificar
        </Link>
        <Link
          to={`/medicos/delete/${medico.legajo}`}
          className="ui button negative"
        >
          Borrar
        </Link>
      </div>
      )
    }

  return (

    <div>
       <h1 className='ui centered dividing header'>Listado de Medicos</h1>
        <div className="ui celled list">
              {listaMedicos.map(medico=>{
                return  (<div className="item" key={medico.legajo}>
                {renderAdminFunctions(medico)}
                <i className="large middle aligned icon doctor" />
                <div className="content">
                  Nombre del medico: {medico.nombre}
                  <div className="description"> Apellido del medico: {medico.apellido}</div>
                </div>
              </div>
            )
            })} 


        </div>
       

       
     
    </div>
  )
}

export default ListadoMedicos
