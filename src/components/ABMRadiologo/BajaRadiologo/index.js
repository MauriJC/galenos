import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../../../apis';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const BajaRadiologo = () => {
    let { nmatricula } = useParams();
    let navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [matricula, setMatricula] = useState('');
    const [legajo, setLegajo] = useState('');

    useEffect(() => {
        getRadiologo();
    }, []);

    const getRadiologo = async () => {
        const headers = {
            "Content-Type": "application/json"
        };

        const params = {
            numero_matricula: nmatricula
        };

        try {
            const response = await api.get(`/radiologos`, { params }, { headers });
            const datos = response.data;

            setApellido(datos.apellido);
            setDni(datos.dni);
            setFechaNacimiento(datos.fecha_nacimiento);
            setLegajo(datos.legajo);
            setNombre(datos.nombre);
            setMatricula(datos.numero_matricula);
        } catch (error) {
            console.error("Error fetching radiologo:", error);
            swal("Error", "No se pudo obtener la información del radiólogo", "error");
        }
    };

    const deleteRadiologo = async () => {
        const params = {
            matricula: nmatricula
        };

        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const response = await api.delete(`/radiologos`, { params }, { headers });
            if (response.status === 200) {
                swal(`${response.status}`, response.data.message, "success").then(ok => {
                    if (ok) navigate('/radiologos/listadoradiologos');
                });
            } else {
                swal(`${response.status}`, response.data.message, "error");
            }
        } catch (error) {
            console.error("Error deleting radiologo:", error);
            swal("Error", "Ha ocurrido un error en la baja del radiólogo", "error");
        }
    };

    return (
        <div className='ui container'>
            <div className="ui center aligned segment">
                <h1>Baja de radiólogo</h1>
            </div>
            <div className="ui segment">
                <div className="ui center aligned form">
                    <div className="two fields">
                        <div className="field">
                            <label>Nombre completo</label>
                            <span>{nombre} {apellido}</span>
                        </div>
                        <div className="field">
                            <label>DNI</label>
                            <span>{dni}</span>
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>Número de matrícula</label>
                            <span>{matricula}</span>
                        </div>
                        <div className="field">
                            <label>Número de legajo</label>
                            <span>{legajo}</span>
                        </div>
                    </div>
                </div>
                <div className="ui center aligned segment">
                    <button className='ui red button' onClick={deleteRadiologo}>Eliminar</button>
                    <Link to='/radiologos/listadoradiologos' className='ui blue button'>Cancelar</Link>
                </div>
            </div>
        </div>
    );
};

export default BajaRadiologo;
