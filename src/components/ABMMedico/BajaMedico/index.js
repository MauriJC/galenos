import React from 'react' 
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import api from '../../../apis'
import { Link } from 'react-router-dom';

const BajaMedico = () => {
    const {nmatricula} = useParams()

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
                 <option value="San Miguel">San Miguel de Tucuman</option>
                 <option value="Aguilares">Aguilares</option>
                 <option value="AZ">asdasd</option>
                 <option value="AR">Rio Cuarto</option>
            </select>
            

        </div>
            
        )


    }




    useEffect(() => {
        console.log('renderizado')
        console.log(nmatricula);
        getMedico()
    },[])






    // API Comms
      const getMedico = async()=>{

        const headers =   {
            "Content-Type":"application/json"
        }

        const params = {
            matricula: nmatricula
        }

        console.log(nmatricula)
    
        const response = await api.get(`/altamedico`,{params},{headers})
       
        console.log(response.data)
        

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
         

        //Solucion provisoria
        
        //const medicoamodificar= response.data.medicos.filter(medico=> medico.numero_matricula == numero_matricula)
        //console.log(medicoamodificar)

        
        
        
        
    }


    const deleteMedico = async()=>{
        const params = {
            matricula: nmatricula   
        }

        const headers =   {
            "Content-Type":"application/json"
        }


        const response = await api.delete(`/altamedico`,{params},{headers})
        console.log(response)

    }



  return (
    <div className="ui container">
    <div className='ui form centered'>

      <h1 className='ui centered dividing header'>Baja de Medico</h1>

        
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
          <button className='ui blue button' onClick={deleteMedico} >Confirmar</button>
          <Link className='ui negative button' to = '/medicos/listadomedicos'>Cancelar</Link>

      </div>


      
      
        
    </div>


    </div>
  )
}

export default BajaMedico
