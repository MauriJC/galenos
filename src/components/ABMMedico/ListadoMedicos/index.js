import axios from 'axios'
import React,{useState} from 'react'
import {Link} from 'react-router-dom'


const ListadoMedicos = () => {
    const [listaMedicos, setlistaMedicos] = useState([])
    const endpoint = ''

    const getListadoMedicos = async() =>{
        const response = await axios.get(endpoint)
        setlistaMedicos(response.data);


    }

    const renderAdminFunctions= (medico)=>{
        return  (<div className="right floated content">
        <Link to={`/medicos/edit/${medico.legajo}`} className="ui button primary">
          Edit
        </Link>
        <Link
          to={`/medicos/delete/${medico.legajo}`}
          className="ui button negative"
        >
          Delete
        </Link>
      </div>
      )
    }

  return (

    <div>
       {listaMedicos.map(medico=>{
           return  (<div className="item" key={medico.legajo}>
           {this.renderAdminFunctions(medico)}
           <i className="large middle aligned icon camera" />
           <div className="content">
             Nombre del medico 
             <div className="description"> Descripcion del medico</div>
           </div>
         </div>
       )
       })} 
     
    </div>
  )
}

export default ListadoMedicos
