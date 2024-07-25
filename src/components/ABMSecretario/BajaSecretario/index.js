import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import api from '../../../apis';
import swal from 'sweetalert';

const BajaSecretario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mail, setMail] = useState('');
    const [legajo, setLegajo] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [id, setId] = useState('');
    const [loaderState, setLoaderState] = useState('disabled');

    let { nlegajo } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        getSecretario();
    }, []);

    const getSecretario = async () => {
        const headers = {
            "Content-Type": "application/json"
        };

        const params = {
            legajo: nlegajo
        };

        try {
            const response = await api.get(`/altasecretario`, { params }, { headers });
            let sec = response.data.secretario;

            setNombre(sec.nombre);
            setApellido(sec.apellido);
            setDni(sec.dni);
            setMail(sec.email);
            setFechaNacimiento(sec.fecha_nacimiento);
            setId(sec.id);
            setLegajo(sec.legajo);
            setTelefono(sec.telefono);
        } catch (error) {
            console.error('Error fetching secretario:', error);
            swal('Error', 'No se pudo obtener la información del secretario', 'error');
        }
    };

    const deleteSecretario = async () => {
        const headers = {
            "Content-Type": "application/json"
        };

        const params = {
            legajo: nlegajo
        };

        try {
            const response = await api.delete(`/altasecretario`, { params }, { headers });
            if (response.data.status === 200) {
                swal(`${response.data.status}`, response.data.message, 'success').then(ok => {
                    if (ok) navigate('/secretarios/listadosecretarios');
                });
            } else {
                swal(`${response.data.status}`, response.data.message, 'error');
            }
        } catch (error) {
            console.error('Error deleting secretario:', error);
            swal('Error', 'Ha ocurrido un error en la baja del secretario', 'error');
        }
    };

    return (
        <div className='ui container'>
            <div className="ui center aligned segment">
                <h1>Baja de secretario</h1>
            </div>
            <div className="ui segment">
                <div className="ui center aligned form">
                    <div className="field">
                        <label>Nombre completo</label>
                        <div className="two fields">
                            <div className="field">
                                <span>{nombre}</span>
                            </div>
                            <div className="field">
                                <span>{apellido}</span>
                            </div>
                        </div>
                    </div>
                    <div className="fields">
                        <div className="eight wide field">
                            <label>DNI</label>
                            <span>{dni}</span>
                        </div>
                        <div className="eight wide field">
                            <label>Fecha de nacimiento</label>
                            <span>{fechaNacimiento}</span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>Número de legajo</label>
                                <span>{legajo}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui center aligned segment">
                    <button className='ui red button' onClick={deleteSecretario}>Eliminar</button>
                    <Link to='/secretarios/listadosecretarios' className='ui blue button'>Cancelar</Link>
                    <div className={`ui ${loaderState} inline loader`}></div>
                </div>
            </div>
        </div>
    );
};

export default BajaSecretario;
