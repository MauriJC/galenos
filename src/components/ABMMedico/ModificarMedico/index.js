import api from '../../../apis';
import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'
import swal from 'sweetalert';

const ModificarMedico = () => {

    //parametro con el que hare el get
    const {numero_matricula} = useParams()

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
    const [fechaHasta, setfechaHasta] = useState('')
    const [id, setid] = useState('')

    const [fechaNacimiento, setfechaNacimiento] = useState('')




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



    useEffect(() => {
        //console.log('renderizado')
        //console.log(numero_matricula);
        getMedico()
    },[])


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









    // API Comms
    const handleSubmit= async (e)=>{
        e.preventDefault();

        const headers =   {
            "Content-Type":"application/json"
        }



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
            fecha_nacimiento: fechaNacimiento,
            fecha_hasta : fechaHasta
        }
    
       

        await api.put(`/modificarmedico/${id}`,medico,{headers}).then(
            response=>{
                console.log(response)
                if(response.status == 200){
                    swal(`${response.status}`,`Modificacion del paciente exitosa`,"success").then(
                        ok=>{
                            if(ok) window.location='/medicos/listadomedicos'
                        }
                    )
                }

                if(response.status == 500){
                    swal(`${response.status}`,"Error 500 en la modificacion del paciente","error")
                }




            }
        ).catch(
            error=> swal("Ha ocurrido un error inesperado")
        )
       
    }




    const getMedico = async()=>{

        const headers =   {
            "Content-Type":"application/json"
        }

        const params = {
            matricula: numero_matricula
        }

        //console.log(numero_matricula)
    
        const response = await api.get(`/altamedico`,{params},{headers})
       
        //console.log(response.data)
        

        setnombre(response.data.medico['nombre'])
        setapellido(response.data.medico['apellido'])
        setdni(response.data.medico['dni'])
        setdireccion(response.data.medico['direccion'])
        settelefono(response.data.medico['telefono'])
        setmail(response.data.medico['email'])
        setmatricula(response.data.medico['numero_matricula'])
        setlegajo(response.data.medico['legajo'])
        setlocalidad(response.data.medico.localidad)
        setcalleSuperior(response.data.medico.entre_calle_sup)
        setcalleInferior(response.data.medico.entre_calle_inf)
        setfechaDesde(response.data.medico.fecha_desde)
        setfechaNacimiento(response.data.medico.fecha_nacimiento)
        setid(response.data.medico.id)      
        
        
        
    }



  return (
    <div className="ui container">
    <div className='ui form centered'>

      <h1 className='ui centered dividing header'>Modificar Medico</h1>

        
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
                <input type="date" value= {fechaNacimiento} onChange={e=>setfechaNacimiento(e.target.value)}/>
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

            <label htmlFor="">Fecha hasta:</label>
            <input type="date" name="" id="" value= {fechaHasta} onChange={e=>setfechaHasta(e.target.value)}/>
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
          <button className='ui blue button' onClick={handleSubmit}>Confirmar</button>
          <Link className='ui negative button' to = '/medicos/listadomedicos'>Cancelar</Link>

      </div>


      
      
        
    </div>


    </div>
  )
}

export default ModificarMedico
