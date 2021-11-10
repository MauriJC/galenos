import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import api from '../../../apis'

const Diagnostico = () => {

    let {idDiagnostico, nroAfiliado}= useParams()
    console.log(idDiagnostico)
    console.log(nroAfiliado)

    const [info, setinfo] = useState({})
    const [mail, setmail] = useState('')

    useEffect(()=>{
        getDiagnostico()
    },[])



    const getDiagnostico=async()=>{
        const headers = 
        {
            "Content-Type":"multipart/form-data"
        }

        const params = {
            id_diagnostico:idDiagnostico,
            numero_afiliado: nroAfiliado
            
        }

        const response = await api('/diagnostico',{params},{headers})
        console.log(response)

        setinfo(response.data)


    }

  return (
    <div className='ui container'>
        <div className="ui segment">
            <div className="ui center aligned segment">
                <h1 className='header'>Diagnostico {idDiagnostico}</h1>
            </div>
            
            <div className="ui segment">
                <div className="ui vertical stripe quote segment">
                            <div className="ui equal width stackable internally celled grid">
                                <div className="center aligned row">
                                    <div className="column">
                                        <h3>Paciente:{info.radiografia.paciente.apellido}
                                        {info.radiografia.paciente.nombre} </h3>
                                        <h3>Fecha: {info.fecha}</h3>
                                    </div>

                                    <div className="column">
                                        <h3>Nro de afiliado: {nroAfiliado}</h3>
                                    </div>
                                </div>

                                

                            </div>

                </div>
                
            </div>
            
            
           


            <div className="ui segment">
                <img className="ui small left floated image" src='' alt='Radiografia'/>
                <h4>Diagnostico de la IA: {info.resultado}</h4>
                <h4>Recomendaciones:</h4>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga illum beatae 
                    consequuntur quos inventore minima atque doloribus necessitatibus quo. Inventore sequi sunt magnam? Quo 
                    veritatis culpa mollitia distinctio beatae nostrum.
                </p>

            </div>


            <div class="ui form">              
                <div className="inline fields">
                    <input type="text"
                    value={mail}
                    onChange={e=>setmail(e.target.value)}
                    />
                    <button className='ui button'>Enviar</button>
                </div>
            </div>

            <Link to='/diagnosticos/listadodiagnosticos' className='ui button'>Volver al listado</Link>




        </div>
        
        
        
    </div>
  )
}

export default Diagnostico
