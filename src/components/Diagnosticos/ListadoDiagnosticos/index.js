import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import api from '../../../apis'


const ListadoDiagnosticos = () => {
    const [nroAfiliado, setnroAfiliado] = useState('');
    const [matricula, setmatricula] = useState('')
    const [listaMedicos, setlistaMedicos] = useState([{nombre:"Jose",numero_matricula:1},{nombre:"Eduardo Elric",numero_matricula:2}])
    const [diagnosticos, setdiagnosticos] = useState([{id:1},{id:2}])
    const [infoPaciente, setinfoPaciente] = useState({})
    const [nombreMedico, setnombreMedico] = useState('')

    console.log(nombreMedico)

    

    useEffect(()=>{
        

        const medicoSeleccionado = listaMedicos.filter(medico=> medico.numero_matricula == matricula)
        
        
        setnombreMedico(medicoSeleccionado[0].nombre)

        //getMedicos()
    })

    //API comms
    const getMedicos = async()=>{
        const response = await api.get(`/altamedico`)
        setlistaMedicos(response.data.medicos);

    }


    const getInfoPaciente=async(e)=>{
        e.preventDefault()
         const headers = {
            "Content-Type":"application/json"
        }

        const params = {
        paciente: nroAfiliado
        }


        const response = await api.get(`/pacientes`,{params},{headers});
        setinfoPaciente(response.data.paciente);
    }



    //renders
    const renderListaMedicos=()=>{
        return(
        <div className="field">
            <label> Medico </label>
            <select className="ui selection dropdown" onChange={e=>setmatricula(e.target.value)} value={matricula}>
                <option value='' >Seleccione radiologo</option>
                {listaMedicos.map(medico=>{
                    return (<option value={medico.numero_matricula}>{medico.nombre}</option>)
                })}
                 
            </select>

        </div>
        )


    }

    const renderDiagnosticos =()=>{
        return diagnosticos.map(diagnostico=>{
            return(
            <div className="item">
                <div className="right floated content">
                    <Link className='ui button' to={`/ver/${diagnostico.id}`}>
                        <i className="eye icon"></i>
                    </Link>
                </div>
                <img src="" alt="" />
                <div className="content">
                    <div className="header">Diagnostico n {diagnostico.id}</div> 
                    Fecha:

                </div>
            </div>
            )
            

        })
    
        

    }



  return (
    <div className='ui container'>
        <div className="ui segment">
            <div className="ui form">
                <div className="two fields">
                    <div className="field">
                        <label> Numero de afiliado</label>
                        <input type="text" value={nroAfiliado} onChange={e=>setnroAfiliado(e.target.value)}/>
                    </div>
                    {renderListaMedicos()}
                </div>
                <div className="ui center aligned inverted segment">
                    <button className='ui primary button' onClick={()=>console.log('auch')}>Listar</button>
                </div>
                    
                

            </div>

        </div>
        <div className="ui segment">
        <h1 className='header'> Listado de diagnosticos del paciente {infoPaciente.apellido}{infoPaciente.nombre} 
        con el medico {nombreMedico}</h1>
        
            <div className="ui middle aligned celled list">
                {renderDiagnosticos()}
            </div>
        </div>







    </div>
  )
}

export default ListadoDiagnosticos
