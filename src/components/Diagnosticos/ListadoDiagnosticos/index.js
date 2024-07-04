import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../../apis'

const ListadoDiagnosticos = () => {
    const [nroAfiliado, setnroAfiliado] = useState('');
    const [matricula, setmatricula] = useState('')
    const [listaMedicos, setlistaMedicos] = useState([]) //{ nombre: "Jose", numero_matricula: 1 }, { nombre: "Eduardo Elric", numero_matricula: 2 }
    const [diagnosticos, setdiagnosticos] = useState([])
    const [infoPaciente, setinfoPaciente] = useState({})
    const [nombreMedico, setnombreMedico] = useState('')

    useEffect(() => {
        getMedicos()
    }, [])

    useEffect(() => {
        const medicoSeleccionado = listaMedicos.find(medico => medico.numero_matricula === parseInt(matricula));
        if (medicoSeleccionado) {
            setnombreMedico(medicoSeleccionado.nombre)
        } else {
            setnombreMedico('')
        }
    }, [matricula, listaMedicos])

    const getMedicos = async () => {
        console.log('obteniendo medicos');
        const response = await api.get(`/altamedico`);
        setlistaMedicos(response.data.medicos);
    }

    const getDiagnosticos = async () => {
        const headers = {
            "Content-Type": "application/json"
        }

        const params = {
            matricula_medico: matricula,
            numero_afiliado: nroAfiliado
        }

        const response = await api.get('/radiografias', { params }, { headers })
        console.log(response.data)

        setdiagnosticos(response.data)
    }

    const renderListaMedicos = () => {
        return (
            <div className="field">
                <label> Medico </label>
                <select className="ui selection dropdown" onChange={e => setmatricula(e.target.value)} value={matricula}>
                    <option value='' >Seleccione médico</option>
                    {listaMedicos.map(medico => {
                        return (<option key={medico.numero_matricula} value={medico.numero_matricula}>{medico.nombre}</option>)
                    })}
                </select>
            </div>
        )
    }

    const renderDiagnosticos = () => {
        return diagnosticos.map(diagnostico => {
            return (
                <div className="item" key={diagnostico.id}>
                    <div className="right floated content">
                        <Link className='ui button' to={`ver/${diagnostico.id}/${nroAfiliado}`}>
                            <i className="eye icon"></i>
                        </Link>
                    </div>
                    <div className="content">
                        <div className="header">Diagnostico n {diagnostico.id}</div>
                        Fecha: {diagnostico.fecha}
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
                            <input type="text" value={nroAfiliado} onChange={e => setnroAfiliado(e.target.value)} />
                        </div>
                        {renderListaMedicos()}
                    </div>
                    <div className="ui center aligned inverted segment">
                        <button className='ui primary button' onClick={getDiagnosticos}>Listar</button>
                    </div>
                </div>
            </div>
            <div className="ui segment">
                <h1 className='header'> Listado de diagnosticos del paciente {infoPaciente.apellido} {infoPaciente.nombre}
                    con el medico {nombreMedico}</h1>
                <div className="ui middle aligned celled list">
                    {renderDiagnosticos()}
                </div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <Link to="/" className="ui button positive">
                    Volver al menu
                </Link>
            </div>
        </div>
    )
}

export default ListadoDiagnosticos
