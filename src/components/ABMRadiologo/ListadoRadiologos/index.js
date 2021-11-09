import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const ListadoRadiologos = () => {

    const [listaRadiologos, setlistaRadiologos] = useState([{
        nombre:"Emanuel",
        apellido:"Canova",
        legajo:23
    }])

    

    useEffect(()=>{


    },[])


    const deleteradiologo = ()=>{
        console.log('delete radiologo')
    }


    
    const renderAdminFunctions= (radiologo)=>{
        return  (<div className="right floated content">
        <Link to={`/radiologos/modificarradiologo/${radiologo.legajo}`} className="ui button primary">
            <i className="edit icon"></i>
        </Link>
        <Link
          to={`/radiologos/borrarradiologo/${radiologo.legajo}`}
          className="ui button negative"
        >
          <i className="trash icon"></i>
        </Link>
        <button className="ui button negative"
        onClick={deleteradiologo}
        >
            <i className="trash icon"></i>
        </button>
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
    
    <div>
       <h1 className='ui centered dividing header'>Listado de Radiologos</h1>
        <div className="ui celled list">
              {listaRadiologos.map(radiologo=>{
                return  (<div className="item" key={''}>
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
  )
}

export default ListadoRadiologos
