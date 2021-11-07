import api from '../../../apis';
import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router';

const ModificarMedico = () => {

    
    const {nlegajo} = useParams()

    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [dni, setdni] = useState('');
    const [domicilio, setdomicilio] = useState('');
    const [telefono, settelefono] = useState('');
    const [mail, setmail] = useState('');
    const [matricula, setmatricula] = useState('');
    const [legajo, setlegajo] = useState('');



    useEffect(() => {
        console.log('renderizado')
        console.log(nlegajo);
        getInfoMedico()
    },[])

    const handleSubmit= async (e)=>{
        e.preventDefault();
       
        const formData = new FormData()
        formData.append('nombre',nombre)
        formData.append('apellido',apellido)
        formData.append('dni',dni)
        formData.append('domicilio',domicilio)
        formData.append('telefono',telefono)
        formData.append('mail',mail)
        formData.append('matricula',matricula)
        formData.append('legajo',legajo)

        const response = await api.put(`/medicos/${nlegajo}`,{
            "id":nlegajo,
            "nombre":nombre,
            "apellido":apellido,


        })
        console.log('revisar si posteo')
    }

    const getInfoMedico = async()=>{
        const response = await api.get(`/medicos/${nlegajo}`)
        /**
         * Despues poner estos params dentro de la request cuando este la api
         * ,{
            params:{
                q: nlegajo
            }
        } */
        console.log('entra a get medico')
        setnombre(response.data['nombre'])
        setapellido(response.data['apellido'])
        setdni(response.data['dni'])
        setdomicilio(response.data['domicilio'])
        settelefono(response.data['telefono'])
        setmail(response.data['mail'])
        setmatricula(response.data['matricula'])
        setlegajo(response.data['legajo'])
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

export default ModificarMedico
