import React,{useState} from 'react'
import { useParams } from 'react-router'

const BajaSecretario = () => {

    let {legajo} = useParams()
    console.log(legajo)

    const [infoSecretario, setinfoSecretario] = useState({})




  return (
    <div className='ui container'>
        <div className="ui center aligned segment">
            <h1>Baja secretario</h1>
        </div>
        <div className="ui center aligned segment">
            <h4>
                Nombre: Eduardo
            </h4>
            <h4>
                Nombre: Eduardo
            </h4>
            
            
        </div>
        
    </div>
  )
}

export default BajaSecretario
