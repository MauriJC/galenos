import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../../apis'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'


const ModificarPaciente = () => {


  let {nafiliado} = useParams()
  

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
  const [localidad, setlocalidad] = useState('');
  const [provincia, setprovincia] = useState('')
  const [pais, setpais] = useState('');
  const [calleSuperior, setcalleSuperior] = useState('');
  const [calleInferior, setcalleInferior] = useState('');
  const [fechaDesde, setfechaDesde] = useState('');
  const [telefono, settelefono] = useState('');
  const [mail, setmail] = useState('');
  const [fechaNacimiento, setfechaNacimiento] = useState('')
  const [nroAfiliado, setnroAfiliado] = useState('')
  const [id, setid] = useState('')

 



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
               <option value="AZ">asdasd</option>
               <option value="AR">Rio Cuarto</option>
          </select>
          

      </div>
          
      )


  }

  useEffect(()=>{
    getPaciente()
  },[])


  // API comms

  const getPaciente = async()=>{

    const headers = {
        "Content-Type":"application/json"
    }

    console.log('el nafiliado es',nafiliado)
    

    const params = {
        numero_afiliado : parseInt(nafiliado) 
    }

    const response = await api.get('/altapaciente',{params},{headers})
    console.log(response.data)

        setnombre(response.data.message[0]['nombre'])
        setapellido(response.data.message[0]['apellido'])
        setdni(response.data.message[0]['dni'])
        setdireccion(response.data.message[0]['direccion'])
        settelefono(response.data.message[0]['telefono'])
        setmail(response.data.message[0]['email'])
        setlocalidad(response.data.message[0].localidad)
        setcalleSuperior(response.data.message[0].entre_calle_sup)
        setcalleInferior(response.data.message[0].entre_calle_inf)
        setfechaDesde(response.data.message[0].fecha_desde)
        setfechaNacimiento(response.data.message[0].fecha_nacimiento)
        setnroAfiliado(response.data.message[0].numero_afiliado)
        

  }


  const uploadPaciente= async(e)=>{
      e.preventDefault()
  
      const paciente ={
          nombre: nombre,
          apellido: apellido,
          dni: dni,
          domicilio: direccion,
          telefono:telefono,
          email:mail,
          localidad:localidad,
          entre_calle_sup:calleSuperior,
          entre_calle_inf:calleInferior,
          fecha_desde: fechaDesde,
          fecha_nacimiento: fechaNacimiento,
          numero_afiliado: nroAfiliado,
          
      }

      const headers = 
          {
              "Content-Type":"application/json"
          }
      

      await api.put(`/modificarpaciente/${id}`,paciente,{headers})
      .then(response=>{
          
          if(response.data.status==='200') {   
          swal(response.data.status,response.data.message,"success")
          }
          if(response.data.status==='500'){
              swal(response.data.status,response.data.message,"error")
          }
      })
      .catch(error=> 
        console.log('error')
        )

  }







  return (
      <div className='ui container'>
          <div className= 'ui form '>
          <h1 className='ui centered dividing header'>Modificar Paciente</h1>


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
              <div className="nine wide field">
                  <label htmlFor="">Fecha de nacimiento:</label>
                  <input type="date" name="" id="" value= {fechaNacimiento} onChange={e=>setfechaNacimiento(e.target.value)}/>
              </div>
              
          </div>


          <h4 className="ui dividing header">Domicilio</h4>
      
          {renderPaises()}

          
          <div className="two fields">
              {renderProvincias()}

              {renderLocalidades()}
          </div>

          <div className="inline fields">
                  <label>Fecha desde:</label>
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


          <div className="ui header centered">
              <button className='ui blue button'  onClick={uploadPaciente}>Confirmar</button>
              <Link className='ui negative button' to='/pacientes/listadopacientes' >Cancelar</Link>

          </div>









          </div>
          
      </div>
  
  )
}

export default ModificarPaciente
