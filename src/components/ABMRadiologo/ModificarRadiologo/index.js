import React ,{useEffect, useState} from 'react'
import { useParams } from 'react-router';
import api from '../../../apis'


const ModificarRadiologo = () => {

    let {nmatricula} = useParams()

         
    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [dni, setdni] = useState('');
    const [direccion, setdireccion] = useState('');
    const [telefono, settelefono] = useState('');
    const [mail, setmail] = useState('');
    const [matricula, setmatricula] = useState('');
    const [provincia, setprovincia] = useState('')
    const [pais, setpais] = useState('')
    const [localidad, setlocalidad] = useState('')
    const [calleSuperior, setcalleSuperior] = useState('')
    const [calleInferior, setcalleInferior] = useState('')
    const [fechaDesde, setfechaDesde] = useState('')
    const [fechaNacimiento, setfechaNacimiento] = useState('')
    const [legajo, setlegajo] = useState('');
    const [id, setid] = useState('')



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



    useEffect(()=>{
        getRadiologo()
    },[])


    //API comms

    const getRadiologo =async()=>{
        const headers = 
        {
            "Content-Type":"application/json"
        }

        const params = {
            numero_matricula : nmatricula
        }
    
        const response = await api.get(`/radiologos`,{params},{headers})
        console.log(response.data)
        const datos = response.data
        setapellido(datos.apellido)
        setdni(datos.dni)
        setmail(datos.email)
        setfechaNacimiento(datos.fecha_nacimiento)
        setlegajo(datos.legajo)
        setnombre(datos.nombre)
        setmatricula(datos.numero_matricula)
        settelefono(datos.telefono)
        setid(datos.id)
        
      
    
    
      }




    const putInfoRadiologo = async (e) =>{
        e.preventDefault()
        
        const radiologo  ={
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            direccion: direccion,
            telefono:telefono,
            email:mail,
            numero_matricula:matricula,
            localidad:localidad,
            entre_calle_sup:calleSuperior,
            entre_calle_inf:calleInferior,
            fecha_desde: fechaDesde,
            fecha_nacimiento: fechaNacimiento,
            legajo: legajo
        }

        const headers = 
            {
                "Content-Type":"application/json"
            }
        

        await api.put(`/modificaradiologo/${id}`,radiologo ,{headers})
        .then(response=>console.log(response))
        .catch(error=> console.log(error))
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
                                <option value={pais} key={pais}>{pais}</option>
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
            <select className="ui fluid dropdown" onChange={e=>setprovincia(e.target.value)} value={provincia} >
                <option value='' >Seleccione Provincia</option>
                {provinciasArg.map(provincia=>{
                    return (<option value={provincia} key={provincia}>{provincia}</option>)
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
                <option value="AZ">asdasd</option>
                <option value="AR">Rio Cuarto</option>
            </select>
            

        </div>
            
        )


    }


 





  return (
    <div className='ui container'>
        <div className="ui form">
            <h1 className='ui centered dividing header'>Modificar Radiologo</h1>


                <div className="inline fields">
                    <div className="nine wide field">
                        <label htmlFor=""> Nombre</label>
                        <input type="text" 
                        value={nombre}
                        onChange={(e)=>setnombre(e.target.value)}
                        />

                    </div>

                </div>


            <div className="inline fields">
                <div className="nine wide field">
                    <label htmlFor=""> Apellido</label>
                    <input type="text" 
                    value={apellido}
                    onChange={(e)=>setapellido(e.target.value)}
                    />


                </div>

            </div>

            <div className="inline fields">
                <div className="nine wide field">
                    <label htmlFor=""> DNI </label>
                    <input type="text" 
                    value={dni}
                    onChange={(e)=>setdni(e.target.value)}
                    />


                </div>

            </div>


            <div className="inline fields">

                <label htmlFor="">Fecha de nacimiento:</label>
                <input type="date" name="" id="" value= {fechaNacimiento} onChange={e=>setfechaNacimiento(e.target.value)}/>
            </div>


        <h4 className="ui dividing header">Domicilio</h4>
        
        {renderPaises()}

        
        <div className="two fields">
            {renderProvincias()}

            {renderLocalidades()}
        </div>

        <div className="inline fields">

                <label htmlFor="">Fecha desde:</label>
                <input type="date" name="" id="" value= {fechaDesde} onChange={e=>setfechaDesde(e.target.value)}/>
        </div>






        



        <div className="inline fields">
            <div className="nine wide field">
              <label htmlFor="">Direccion </label>
              <input type="text" 
               value={direccion}
               onChange={(e)=>setdireccion(e.target.value)}
              />

            </div>

        </div>


        <div className="inline fields">
          <div className="nine wide field">
              <label htmlFor="">Calle Superior </label>
              <input type="text" 
               value={calleSuperior}
               onChange={(e)=>setcalleSuperior(e.target.value)}
              />

            </div>

        </div>

        <div className="inline fields">
            <div className="nine wide field">
                <label htmlFor="">Calle inferior </label>
                <input type="text" 
                value={calleInferior}
                onChange={(e)=>setcalleInferior(e.target.value)}
                />

            </div>

        </div>






        <div className="inline fields">
            <div className="nine wide field">
                <label htmlFor="">Telefono </label>
                <input type='text' 
                value={telefono}
                onChange={(e)=>settelefono(e.target.value)}
                />


            </div>

        </div>



        <div className="inline fields">
            <div className="nine wide field">
                <label htmlFor="">Mail </label>
                <input type="email" 
                value={mail}
                onChange={(e)=>setmail(e.target.value)}
                />


            </div>

        </div>

        <div className="inline fields ">
            <div className="nine wide field">
                <label htmlFor="">Nro de Matricula </label>
                <input type="text" 
                value={matricula}
                onChange={(e)=>setmatricula(e.target.value)}
                />

            </div>

        </div>


        <div className="inline fields">
            <div className="nine wide field">
                <label htmlFor="">Legajo </label>
                <input type="text" 
                value={legajo}
                onChange={(e)=>setlegajo(e.target.value)}
                />

            </div>

        </div>

        <div className="ui header centered">
            <button className='ui blue button' onClick={putInfoRadiologo}>Confirmar</button>
            <button className='ui negative button' onClick={(e)=>e.preventDefault()}>Cancelar</button>

        </div>










        </div>
        


        
      




    </div>
 
  )
}

export default ModificarRadiologo
