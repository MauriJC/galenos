import axios from 'axios'
import React, {useState} from 'react'
//import { CajaFlex } from './styles'


const SubirRadiografia = () => {
  const endpoint = ''
  console.log('me renderice de nuevo')
  const [nroAfiliado,setNroAfiliado]= useState(''); 
  const [infoAfiliado, setInfoAfiliado] = useState(null);
  const [radiografia, setRadiografia] = useState(null);
  const [inputFileState, setInputFileState]= useState(true);

 


  const getInfoAfiliado = async () => {
    const response = await axios.get(endpoint, {
      params: {
        q: nroAfiliado
      }

    });
    setInputFileState(false);
    setInfoAfiliado(response.data);

  }



const handleImage = (e)=>{
  setRadiografia(e.target.files[0]);
  console.log(radiografia)

}
  
/*
const prueba = ()=>{
  
    setInputFileState(!inputFileState)
    setInfoAfiliado({name: 'Vicente Luis', dni:1232313})

    
    console.log('reemplazar por getInfoAfiliado')
  }

*/

const uploadInfoAfiliado= async() =>{
  const formData = new FormData();
  formData.append('name',infoAfiliado['name']);
  formData.append('dni',infoAfiliado['dni']);
  formData.append('file', radiografia);
  console.log(formData.get('file'))

  await axios.post(endpoint,formData)
  .then(response=> 
    console.log(response.data)
    ).catch(error=>
      console.log(error)
    );
  

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
                    
                <button className= 'ui button' onClick={(e)=> 
                { e.preventDefault(); 
                  setInfoAfiliado({name:'luis', dni: '1231233'})
                  setInputFileState(!inputFileState)
                  }}>
                    Buscar
                </button>
                  
                  
                 
              </div>
          
          </div>
      </form>

      <hr />
        
      <div className= 'ui container'>
        <label htmlFor="">Apellido y nombre: {infoAfiliado? infoAfiliado['name'] : '' }
          </label>
        <br />
        <label htmlFor="">DNI: {infoAfiliado? infoAfiliado['dni'] : '' }</label> 

        <br />
        <label htmlFor="">Archivo: </label>
        <input type="file" name="image" id="" onInput= {handleImage}  disabled={inputFileState}/>
        
        <br />
        <center>
          <button className='ui button eight wide' onClick={uploadInfoAfiliado}>Cargar</button>
        </center>
        
      </div>





    </div>
  )
}

export default SubirRadiografia
