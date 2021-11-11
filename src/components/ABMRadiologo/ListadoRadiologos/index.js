import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import api from '../../../apis'

const ListadoRadiologos = () => {

    const [listaRadiologos, setlistaRadiologos] = useState([{
        nombre:"Emanuel",
        apellido:"Canova",
        legajo:23
    }])

    

    useEffect(()=>{
      getRadiologos()

    },[])


    //API comms

    const getRadiologos =async()=>{
      const headers = 
      {
          "Content-Type":"application/json"
      }
  
      const response = await api.get('/radiologos',{headers})
      console.log(response.data)
      setlistaRadiologos(response.data)
      //response.data.filter(radiologo)
  
  
    }



    // renders
    
    const renderAdminFunctions= (radiologo)=>{
        return  (<div className="right floated content">
        <Link to={`/radiologos/modificarradiologo/${radiologo.numero_matricula}`} className="ui button primary">
            <i className="edit icon"></i>
        </Link>
        <Link
          to={`/radiologos/bajaradiologo/${radiologo.id}`}
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
            <Link to="/radiologos/altaradiologo" className="ui button primary">
              Alta radiologo 
            </Link>
          </div>
        );
      }


  return (
    
    <div className='ui container'>
      <div className="ui center aligned segment">
         <h1 className='header'>Listado de Radiologos</h1>
      </div>




      <div className="ui segment">
          <div className="ui celled list">
                {listaRadiologos.map(radiologo=>{
                  return  (<div className="item" key={radiologo.numero_matricula}>
                  {renderAdminFunctions(radiologo)}
                      <i className="large middle aligned icon doctor" />
                      <div className="content">
                      Nombre del radiologo: {radiologo.nombre}
                      <div className="description"> Apellido del radiologo: {radiologo.apellido}</div>
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

export default ListadoRadiologos
