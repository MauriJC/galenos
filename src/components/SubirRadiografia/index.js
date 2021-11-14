import api from '../../apis'
import React, {useState,useEffect} from 'react'
import swal from 'sweetalert';
import { useNavigate } from 'react-router';


//import { CajaFlex } from './styles'


const SubirRadiografia = () => {
  
  
  const [nroAfiliado,setNroAfiliado]= useState(''); 
  const [infoAfiliado, setInfoAfiliado] = useState(null);
  const [radiografia, setRadiografia] = useState(null);
  const [inputFileState, setInputFileState]= useState(true);
  
  const [nromatricularadiologo, setnromatricularadiologo] = useState('')
  const [listadoRadiologos, setlistadoRadiologos] = useState([])
  const [listaMedicos, setlistaMedicos] = useState([])
  const [matriculaMedico, setmatriculaMedico] = useState('')
  const [fechaRadiografia, setfechaRadiografia] = useState('')

  const [tipoRadiografia, settipoRadiografia] = useState('Radiografía de Torax')
  const [descripcion, setdescripcion] = useState('')

  const [loaderState, setloaderState] = useState('disabled')
  const [loaderCargar, setloaderCargar] = useState('disabled')

  let navigate  = useNavigate()




 
  useEffect(() => {
    getRadiologos();
    getListadoMedicos();
    
  },[])


  const getInfoAfiliado = async (e) => {
    e.preventDefault()
    const headers = 
        {
            "Content-Type":"application/json"
        }

    const params = {
      paciente: nroAfiliado
    }

    setloaderState('active')


    const response = await api.get(`/altapaciente`,{params},{headers});
    setInputFileState(false);
    setInfoAfiliado(response.data.paciente);
  

    
    
    
    if(response.data.status === 200){ 
      swal(`${response.data.status}`,"Afiliado encontrado!","success") 
      setloaderState('disabled')
    }
    if(response.data.status === 404) {
      swal(`${response.data.status}`,response.data.message,'error')
      setloaderState('disabled')
    }
    
    
    

  }



  const getRadiologos =async()=>{
    const headers = 
    {
        "Content-Type":"application/json"
    }

    const response = await api.get('/radiologos',{headers})
    console.log(response.data)
    setlistadoRadiologos(response.data)
    //response.data.filter(radiologo)


  }




  const getListadoMedicos = async() =>{
    const response = await api.get(`/altamedico`)
    setlistaMedicos(response.data.medicos);
    console.log(listaMedicos)


}

  const renderRadiologos =()=>{
    return (
    <div className="field">
            <label> Radiologo </label>
            <select className="ui fluid dropdown" onChange={e=>setnromatricularadiologo(e.target.value)} value={nromatricularadiologo}>
                <option value='' >Seleccione radiologo</option>
                {listadoRadiologos.map(radiologo=>{
                    return (<option value={radiologo.numero_matricula}>{radiologo.nombre}</option>)
                })}
                 
            </select>

        </div>
         )
        }
        
        

    const renderMedicos = () =>{
      return (
        <div className="field">
            <label> Medico </label>
            <select className="ui fluid dropdown" onChange={e=>setmatriculaMedico(e.target.value)} value={matriculaMedico}>
                <option value='' >Seleccione medico</option>
                {listaMedicos.map(medico=>{
                    return (<option value={medico.numero_matricula}>{medico.nombre}</option>)
                })}
                 
            </select>

        </div>

      )
    }
    


  /**
   * 
   * const handleImage = (e)=>{
    setRadiografia(e.target.files[0]);
    console.log('radiografia',radiografia)

  }
  
   */
  
  

  const uploadRx= async() =>{
    
     
    const formData= new FormData()
    formData.append('numero_afiliado',infoAfiliado['numero_afiliado'])
    formData.append('estudio',tipoRadiografia)
    formData.append('matricula_medico',parseInt(matriculaMedico)    )    
    formData.append('matricula_radiologo',parseInt(nromatricularadiologo))
    formData.append('radiografia',radiografia)
    formData.append('descripcion',descripcion)
    formData.append('fecha',fechaRadiografia)



    const headers = 
        {
            "Content-Type":"multipart/form-data"
        }

    setloaderCargar('active')

    await api.post(`/subiradiografia`,formData ,{headers}).then(
      response=>{
        console.log(response.data.status)
        if(response.data.status==='recursada'){
          setloaderCargar('disabled')
          swal({
            title: "Subida exitosa!",
            text:"La radiografia ha sido enviada correctamente",
            type:"success"
          }).then(function() {
            navigate('/menu')
          }

          )
        }
        

      }
    )
    .catch(error=>console.log(error))
    
  }
    

  


  return (
    
    <div>
      <form className='ui form'>
      <h1 className="ui centered dividing header">Subir Radiografia</h1>

        <div className='ui container'>
              <div className='inline fields'>
             
                  <div className= 'eight wide field'>
                        <label htmlFor="" >Nro de Afiliado</label>
                        <input type="text" 
                          value = {nroAfiliado}
                          placeholder = {'Ingrese Numero de afiliado'}
                          onChange= {(e)=> setNroAfiliado(e.target.value)}
                          />

                    </div>
                    
                <button className= 'ui button' onClick={getInfoAfiliado}>
                    Buscar
                </button>

                <div class={`ui ${loaderState} inline loader`}></div>

                

                
                  
                  
                 
              </div>
          
          </div>
      </form>

      <div className="ui container">
        {renderRadiologos()}
      </div>

      <div className="ui container">
        {renderMedicos()}
      </div>

      <div className="ui container">
        <div className="ui form">
          <div className="inline fields">
            <label htmlFor="">Fecha</label>
            <input type="date" value={fechaRadiografia} onChange={e=>setfechaRadiografia(e.target.value)} />
        

          </div>

          <div className="inline fields">
              <label>Tipo de estudio</label>
              <input type="text" value={tipoRadiografia} onChange={e=> settipoRadiografia(e.target.value)} />
          </div>

        </div>
      </div>
        

     


      


     
      





      <hr />
        
      <div className= 'ui container'>
        <div className="ui form">

          <label htmlFor="">Apellido y nombre: {infoAfiliado? `${infoAfiliado['apellido']}  ${infoAfiliado['nombre']}` : '' }
            </label>
          <br />
          <label htmlFor="">DNI: {infoAfiliado? infoAfiliado['dni'] : '' }</label> 

          <br />
          <label htmlFor="">Archivo: </label>
          <input type="file" name="image" id="" accept='image/' onChange= {e=>setRadiografia(e.target.files[0])}  disabled={inputFileState}/>
          
          
          <br />
          <div className="inline fields"> 
              <label htmlFor="">Observaciones: </label>
              <input type="text" value={descripcion} onChange={e=> setdescripcion(e.target.value)} />
          </div>
          



          <center>
            <button className='ui button eight wide' onClick={uploadRx}>Cargar</button>
            <div class={`ui ${loaderCargar} inline loader`}></div>

            
          </center>
        
        </div>

        
        
      </div>


      
  




    </div>

  

  )
}

export default SubirRadiografia
