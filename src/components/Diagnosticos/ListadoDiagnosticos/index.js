import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../apis';
import swal from 'sweetalert';
import 'semantic-ui-css/semantic.min.css';

const ListadoDiagnosticos = () => {
    const [nroAfiliado, setnroAfiliado] = useState('');
    const [matricula, setmatricula] = useState('');
    const [listaMedicos, setlistaMedicos] = useState([]);
    const [diagnosticos, setdiagnosticos] = useState([]);
    const [infoPaciente, setinfoPaciente] = useState({});
    const [nombreMedico, setnombreMedico] = useState('');
    const [errors, setErrors] = useState({});
    const [noDiagnosticosMessage, setNoDiagnosticosMessage] = useState('');

    useEffect(() => {
        getMedicos();
    }, []);

    useEffect(() => {
        const medicoSeleccionado = listaMedicos.find(medico => medico.numero_matricula === parseInt(matricula));
        if (medicoSeleccionado) {
            setnombreMedico(medicoSeleccionado.nombre);
        } else {
            setnombreMedico('');
        }
    }, [matricula, listaMedicos]);

    const getMedicos = async () => {
        try {
            const response = await api.get(`/altamedico`);
            setlistaMedicos(response.data.medicos);
        } catch (error) {
            console.error("Error fetching medicos:", error);
            swal("Error", "No se pudieron cargar los médicos", "error");
        }
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!nroAfiliado || !/^\d+$/.test(nroAfiliado)) {
            formErrors.nroAfiliado = "Número de afiliado es requerido y debe ser un número";
            isValid = false;
        }

        if (!matricula) {
            formErrors.matricula = "Médico es requerido";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const getDiagnosticos = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const headers = {
            "Content-Type": "application/json"
        };

        const params = {
            matricula_medico: matricula,
            numero_afiliado: nroAfiliado
        };

        try {
            const response = await api.get('/radiografias', { params }, { headers });
            setdiagnosticos(response.data);
            if (response.data.length === 0) {
                setNoDiagnosticosMessage("El paciente no tiene diagnósticos.");
            } else {
                setNoDiagnosticosMessage("");
            }
        } catch (error) {
            console.error("Error fetching diagnosticos:", error);
            swal("Error", "No se pudieron cargar los diagnósticos", "error");
        }
    };

    const renderListaMedicos = () => {
        return (
            <div className="field">
                <label>Medico</label>
                <select className="ui selection dropdown" onChange={e => setmatricula(e.target.value)} value={matricula}>
                    <option value=''>Seleccione médico</option>
                    {listaMedicos.map(medico => (
                        <option key={medico.numero_matricula} value={medico.numero_matricula}>{medico.nombre} {medico.apellido} - {medico.numero_matricula}</option>
                    ))}
                </select>
                {errors.matricula && <div className="ui pointing red basic label">{errors.matricula}</div>}
            </div>
        );
    };

    const renderDiagnosticos = () => {
        return diagnosticos.map(diagnostico => (
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
        ));
    };

    return (
        <div className='ui container'>
            <div className="ui segment">
                <h2 className="ui header">Listado de Diagnósticos</h2>
                <div className="ui form">
                    <div className="two fields">
                        <div className="field">
                            <label>Número de afiliado</label>
                            <input type="text" value={nroAfiliado} onChange={e => setnroAfiliado(e.target.value)} />
                            {errors.nroAfiliado && <div className="ui pointing red basic label">{errors.nroAfiliado}</div>}
                        </div>
                        {renderListaMedicos()}
                    </div>
                    <div className="ui center aligned segment">
                        <button className='ui primary button' onClick={getDiagnosticos}>Listar</button>
                    </div>
                </div>
            </div>
            <div className="ui segment">
                <h3 className='ui header'>Listado de diagnósticos del paciente {infoPaciente.apellido} {infoPaciente.nombre} con el médico {nombreMedico}</h3>
                <div className="ui middle aligned divided list">
                    {diagnosticos.length > 0 ? renderDiagnosticos() : <p>{noDiagnosticosMessage}</p>}
                </div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <Link to="/" className="ui button positive">
                    Volver al menú
                </Link>
            </div>
        </div>
    );
};

export default ListadoDiagnosticos;
