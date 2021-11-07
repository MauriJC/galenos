import React,{useState} from 'react'
import api from '../../../apis'
import './styles.css'


const AltaMedico = () => {
 


  const [nombre, setnombre] = useState('');
  const [apellido, setapellido] = useState('');
  const [dni, setdni] = useState('');
  const [domicilio, setdomicilio] = useState('');
  const [telefono, settelefono] = useState('');
  const [mail, setmail] = useState('');
  const [matricula, setmatricula] = useState('');
  const [legajo, setlegajo] = useState('');


  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log('nonoonoo');
    // postInfoMedico()
  }

  const postInfoMedico = async () =>{
    const formData = new FormData()
    formData.append('nombre',nombre)
    formData.append('apellido',apellido)
    formData.append('dni',dni)
    formData.append('domicilio',domicilio)
    formData.append('telefono',telefono)
    formData.append('mail',mail)
    formData.append('matricula',matricula)
    formData.append('legajo',legajo)



    const response = await api.post(`/medicos`,formData)


  }



  return (
    <div className="ui container">
    <div className='ui form centered'>

      <h1 className='ui centered dividing header'>Alta Medico</h1>

        
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
              <label htmlFor="">Domicilio </label>
              <input type="text" 
               value={domicilio}
               onChange={(e)=>setdomicilio(e.target.value)}
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
          <button className='ui button' onClick={handleSubmit}>Confirmar</button>
          <button className='ui button' onClick={(e)=>e.preventDefault()}>Cancelar</button>

      </div>


      
      
        
    </div>


    </div>
  )
}

export default AltaMedico
