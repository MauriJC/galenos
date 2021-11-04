import axios from 'axios'
import React, {useState} from 'react'
//import { CajaFlex } from './styles'


const SubirRadiografia = () => {
  const endpoint = ''
  
  const [nroAfiliado,setNroAfiliado]= useState(''); 
  const [infoAfiliado, setInfoAfiliado] = useState([]);
  const [radiografia, setRadiografia] = useState([]);

  const buscarInfoAfiliado = async (nroAfiliado) => {
    const response = await axios.get(endpoint, {

      params: {
        part: ''

      }
    });
    setInfoAfiliado(response);

  }

const onSubmit = (e) =>{
  e.preventDefault();
  //console.log(nroAfiliado)
}

const handleImage = (e)=>{
  setRadiografia(e.target.files[0]);

}
  

const upload = () =>{
  

}



  return (
    <div>
      <form action="" onSubmit= {onSubmit} className='ui form'>
      <h1 className="ui centered dividing header">Subir Radiografia</h1>



        <div className='ui container'>
              <div className='inline fields'>
             
                  <div className= 'eight wide field'>
                        <label htmlFor="" >Nro de Afiliado</label>
                        <input type="text" 
                          value = {nroAfiliado}
                          placeholder = {'Ingrese Numero de afiliado'}
                          onChange= {(e)=>setNroAfiliado(e.target.value)}
                          />

                    </div>
                    
                <button className= 'ui button' onClick={buscarInfoAfiliado}> Buscar</button>
                 
              </div>
          
          </div>
      </form>

      <hr />
        
      <div className= 'ui container'>
        <label htmlFor="">Apellido y nombre:</label>
        <br />
        <label htmlFor="">DNI:</label> 

        <br />
        <label htmlFor="">Archivo: </label>
        <input type="file" name="image" id="" onChange= {handleImage}/>
        
        <br />
        <center>
          <button className='ui button eight wide' onClick={(e)=>console.log(2)}>Cargar</button>
        </center>
        
      </div>





    </div>
  )
}

export default SubirRadiografia
