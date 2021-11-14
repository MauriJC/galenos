import React,{useState} from 'react'
import api from '../../../apis'
import './styles.css'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { useNavigate } from 'react-router'


//falta agregar fecha desde


const AltaMedico = () => {
 
    const paises = ['Argentina','Peru']
    const provinciasArg = [
        "Buenos Aires",
        "Capital Federal",
        "Catamarca",
        "Chaco",
        "Chubut",
        "Córdoba",
        "Corrientes",
        "Entre Ríos",
        "Formosa",
        "Jujuy",
        "La Pampa",
        "La Rioja",
        "Mendoza",
        "Misiones",
        "Neuquén",
        "Río Negro",
        "Salta",
        "San Juan",
        "San Luis",
        "Santa Cruz",
        "Santa Fe",
        "Santiago del Estero",
        "Tierra del Fuego",
        "Tucumán"
    ]

  
  const [nombre, setnombre] = useState('');
  const [apellido, setapellido] = useState('');
  const [dni, setdni] = useState('');
  const [direccion, setdireccion] = useState('');
  const [telefono, settelefono] = useState('');
  const [mail, setmail] = useState('');
  const [matricula, setmatricula] = useState('');
  const [legajo, setlegajo] = useState('');
  const [provincia, setprovincia] = useState('')
  const [pais, setpais] = useState('')
  const [localidad, setlocalidad] = useState('')
  const [calleSuperior, setcalleSuperior] = useState('')
  const [calleInferior, setcalleInferior] = useState('')
  const [fechaDesde, setfechaDesde] = useState('')
  const [fechaNacimiento, setfechaNacimiento] = useState('')    
  const [loaderState, setloaderState] = useState('disabled')

  let navigate = useNavigate()

  
  

 

//API comms
    const postInfoMedico = async (e) =>{
        e.preventDefault()
        
        const medico ={
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            direccion: direccion,
            telefono:telefono,
            email:mail,
            numero_matricula:matricula,
            legajo:legajo,
            localidad:localidad,
            entre_calle_sup:calleSuperior,
            entre_calle_inf:calleInferior,
            fecha_desde: fechaDesde,
            fecha_nacimiento: fechaNacimiento
        }

        const headers = 
            {
                "Content-Type":"application/json"
            }
        
        setloaderState('active')

        await api.post(`/altamedico`,medico,{headers})
        .then(response=>{
            if(response.data.status==200){    
                setloaderState('disabled')
                swal(response.data.status,response.data.message,"success")
                .then(ok=>{
                        if(ok){navigate('/medicos/listadomedicos')}})
                        
                   
            }
            
            if(response.data.status==500){
                swal(response.data.status,response.data.message,"error")
                setloaderState('disabled')
            }
        })
        .catch(error=> swal(error.data.status,error.data.message,'error'))
    }



  //renders
    const renderPaises=()=>{
        return(
                <div className="field">
                    <label>Pais</label>
                    <select className="ui fluid dropdown" onChange={e=>setpais(e.target.value)} value={pais}>
                        <option >Seleccione Pais</option>
                        {paises.map(pais=>{
                            return (
                                <option value={pais}>{pais}</option>
                            )
                        })}
                    </select>
                </div>
        )
        
    }

  const renderProvincias =()=>{
    return (
    <div className="field">
            <label> Provincia </label>
            <select className="ui fluid dropdown" onChange={e=>setprovincia(e.target.value)} value={provincia}>
                <option value='' >Seleccione Provincia</option>
                {provinciasArg.map(provincia=>{
                    return (<option value={provincia}>{provincia}</option>)
                })}
                 
            </select>

        </div>
         )
        }    
    


    const renderLocalidades =()=>{
        return (
            <div className="field">
            <label> Localidad </label>
            
            <select className="ui fluid dropdown" onChange={(e)=>setlocalidad(e.target.value)}
            value={localidad}
            >
                <option value="">Localidad</option>
                 <option value="San Miguel de Tucuman">San Miguel de Tucuman</option>
                 <option value="Aguilares">Aguilares</option>
            </select>
            

        </div>
            
        )


    }


  return (
    <div className='ui container'>
        <div className="ui center aligned segment">
            <h1>Alta de médico</h1>
        </div>
        <div className="ui segment">
            <div className="ui center aligned form">

                <div className="field">
                    <label>Nombre completo</label>
                    <div className="two fields">
                        <div className="field">
                            <input type="text" 
                            value={nombre}
                            onChange={(e)=>setnombre(e.target.value)}
                            placeholder='Nombre'
                            />

                        </div>

                        <div className="field">
                            <input type="text" 
                            value={apellido}
                            onChange={(e)=>setapellido(e.target.value)}
                            placeholder='Apellido'
                            />
                        </div>
                    
                      

                    </div>

                </div>

                <div className="fields"> 
                        <div className=" eight wide field">
                            <label>DNI</label>
                            <input type="text" 
                            value={dni}
                            onChange={(e)=>setdni(e.target.value)}
                            placeholder='DNI'
                            />
                        </div>
                        <div className="eight wide field">
                            <label >Fecha de nacimiento</label>
                            
                            <input type="date" value= {fechaNacimiento} onChange={e=>setfechaNacimiento(e.target.value)}/>
                        </div>
                    
                </div>

                <h4 className="ui dividing header">Domicilio</h4>
        
                    {renderPaises()}

                    
                    <div className="two fields">
                        {renderProvincias()}

                        {renderLocalidades()}
                    </div>

                    <div className="field">

                            <label htmlFor="">Fecha desde:</label>
                            <input type="date" name="" id="" value= {fechaDesde} onChange={e=>setfechaDesde(e.target.value)}/>
                    </div>


                    <div className="field">
                        <label>Dirección</label>
                        <input type="text" value={direccion} onChange={e=>setdireccion(e.target.value)} placeholder='Calle 123' />
                    </div>

                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label htmlFor="">Calle Superior </label>
                                <input type="text" 
                                value={calleSuperior}
                                onChange={(e)=>setcalleSuperior(e.target.value)}
                                placeholder='Calle'
                                />
                            </div>
                            <div className="field">
                            <label htmlFor="">Calle inferior </label>
                                <input type="text" 
                                value={calleInferior}
                                onChange={(e)=>setcalleInferior(e.target.value)}
                                placeholder='Calle'
                                />

                            </div>
                        </div>
                    </div>


                    <div className="field">
                        <label>Teléfono</label>
                        <input type="text" value={telefono} onChange={e=>settelefono(e.target.value)} placeholder='381-441122' />
                    </div>

                    <div className="field">
                        <label>Email</label>
                        <input type="text" value={mail} onChange={e=>setmail(e.target.value)} placeholder='JohnDoe@gmail.com' />
                    </div>

                    <div className="field">
                        <div className="two fields">

                            <div className="field">
                                <label>Número de matrícula</label>
                                <input type="text" 
                                value={matricula}
                                onChange={e=>setmatricula(e.target.value)}/>
                            </div>
                            <div className="field">
                                <label>Número de legajo </label>
                                <input type="text" 
                                value={legajo}
                                onChange={(e)=>setlegajo(e.target.value)}
                                placeholder='Legajo'
                                />
                            </div>
                            
                        </div>
                    </div>



                


            </div>

            <div className="ui center aligned segment">
                <button className='ui blue button' onClick={postInfoMedico}>Confirmar</button>
                <Link to='/medicos/listadomedicos'className='ui negative button' >Cancelar</Link>
                <div class={`ui ${loaderState} inline loader`}></div>

            </div>

            
        </div>
     
    </div>
  )
}

export default AltaMedico
