import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import api from '../../../apis'


const ListadoSecretarios = () => {

    const [listaSecretarios, setlistaSecretarios] = useState([{legajo:1,nombre:'Jose' ,apellido:'Maldonado'}])

    useEffect(()=>{
        getSecretarios()
    },[])
    

        //API comms

        const getSecretarios=async()=>{
          const headers = 
          {
              "Content-Type":"application/json"
          }
  
          const response = await api.get('/altasecretario',{headers})
          console.log(response)
          setlistaSecretarios(response.data.secretarios)
  
      }

    //renders

    const renderAdminFunctions= (secretario)=>{
        return  (<div className="right floated content">
        <Link to={`/secretarios/modificarsecretario/${secretario.legajo}`} className="ui button primary">
            <i className="edit icon"></i>
        </Link>
        <Link
          to={`/secretarios/bajasecretario/${secretario.legajo}`}
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
            <Link to="/secretarios/altasecretario" className="ui button primary">
              Alta secretario 
            </Link>
          </div>
        );
      }








  return (
    <div className='ui container'>
      <div className="ui center aligned segment">
        <h1 className='header'>Listado de secretarios</h1>
      </div> 

      <div className="ui segment">
          <div className="ui celled list">
            {listaSecretarios.map(secretario=>{
                    return  (<div className="item" key={secretario.legajo}>
                    {renderAdminFunctions(secretario)}
                    <i className="large middle aligned icon doctor" />
                    <div className="content">
                    Nombre del secretario: {secretario.nombre}
                    <div className="description"> Apellido del secretario: {secretario.apellido}</div>
                    </div>
                </div>
                )
                })} 

               

          </div>
          {renderCrear()}


      </div>


            <div style={{ textAlign: 'right' }}>
              <Link to="/" className="ui button positive">
                Volver al menu 
              </Link>
            </div>





    </div>
  )
}

export default ListadoSecretarios
