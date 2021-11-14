import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router'
import api from '../../../apis'
import swal from 'sweetalert'

const ModificarSecretario = () => {
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
  
    const [legajo, setlegajo] = useState('');
    const [provincia, setprovincia] = useState('')
    const [pais, setpais] = useState('')
    const [localidad, setlocalidad] = useState('')
    const [calleSuperior, setcalleSuperior] = useState('')
    const [calleInferior, setcalleInferior] = useState('')
    const [fechaDesde, setfechaDesde] = useState('')
    const [fechaNacimiento, setfechaNacimiento] = useState('')    
    const [id, setid] = useState('')


    let {nlegajo} = useParams()
    let navigate = useNavigate()





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



    useEffect(()=>{
        getSecretario()
    },[])

    //API comms

    const getSecretario = async()=>{
        const headers=
        {
            "Content-Type":"application/json"
        }

        const params = {
            legajo: nlegajo
        }

        const response = await api.get(`/altasecretario`,{params},{headers})
        //console.log(response.data)
        
        const sec = response.data.secretario
        //console.log('valor de sec',sec)

        setapellido(sec.apellido)
        setdni(sec.dni)
        setmail(sec.email)
        setfechaNacimiento(sec.fecha_nacimiento)
        setid(sec.id)
        setlegajo(sec.legajo)
        setnombre(sec.nombre)
        settelefono(sec.telefono)



    }




    const putSecretario = async()=>{
        const secretario ={
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            direccion: direccion,
            telefono:telefono,
            email:mail,
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


            await api.put(`/modificarsecretario/${id}`,secretario,{headers})
            .then(response=>{
                console.log(response)
                if(response.status==200)    
                    swal(`${response.status}`,"Modificacion de secretario exitosa","success").then((ok)=>{
                        if(ok){navigate('/secretarios/listadosecretarios')}
                    } )
                    //window.location='/menu'

                
                if(response.status==500){
                    swal(`${response.status}`,'Error 500',"error")
                }
            })
            .catch(error=> {
                console.log(error)
                swal("Ha ocurrido un error",'','error')})


    }




  return (
    <div className='ui container'>
        <div className="ui center aligned segment">
            <h1>Modificar secretario</h1>
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
                                <label>Numero de legajo </label>
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
                <button className='ui blue button' onClick={putSecretario}>Confirmar</button>
                <Link className='ui negative button' to='/secretarios/listadosecretarios'>Cancelar</Link>

            </div>

            
        </div>
     
    </div>
  )

}

export default ModificarSecretario
