import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import api from '../../../apis';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';

const BajaMedico = () => {
    const { nmatricula } = useParams();
    let navigate = useNavigate();

    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [dni, setdni] = useState('');
    const [direccion, setdireccion] = useState('');
    const [telefono, settelefono] = useState('');
    const [mail, setmail] = useState('');
    const [matricula, setmatricula] = useState('');
    const [legajo, setlegajo] = useState('');
    const [localidad, setlocalidad] = useState('');
    const [calleSuperior, setcalleSuperior] = useState('');
    const [calleInferior, setcalleInferior] = useState('');
    const [fechaDesde, setfechaDesde] = useState('');
    const [fechaHasta, setfechaHasta] = useState('');
    const [id, setid] = useState('');
    const [loaderState, setloaderState] = useState('disabled');
    const [fechaNacimiento, setfechaNacimiento] = useState('');

    useEffect(() => {
        getMedico();
    }, []);

    const getMedico = async () => {
        const headers = {
            "Content-Type": "application/json"
        };

        const params = {
            matricula: nmatricula
        };

        try {
            const response = await api.get(`/altamedico`, { params }, { headers });
            const { medico } = response.data;

            setnombre(medico.nombre);
            setapellido(medico.apellido);
            setdni(medico.dni);
            setdireccion(medico.direccion);
            settelefono(medico.telefono);
            setmail(medico.email);
            setmatricula(medico.numero_matricula);
            setlegajo(medico.legajo);
            setlocalidad(medico.localidad);
            setcalleSuperior(medico.entre_calle_sup);
            setcalleInferior(medico.entre_calle_inf);
            setfechaDesde(medico.fecha_desde);
            setfechaNacimiento(medico.fecha_nacimiento);
            setid(medico.id);
        } catch (error) {
            console.error("Error fetching medico:", error);
            swal("Error", "No se pudo obtener la información del médico", "error");
        }
    };

    const deleteMedico = async () => {
        const params = {
            matricula: nmatricula
        };

        const headers = {
            "Content-Type": "application/json"
        };

        try {
            const response = await api.delete(`/altamedico`, { params }, { headers });
            if (response.data.status === 200) {
                swal(`${response.data.status}`, response.data.message, "success").then(ok => {
                    if (ok) navigate('/medicos/listadomedicos');
                });
            } else {
                swal(`${response.data.status}`, response.data.message, "error");
            }
        } catch (error) {
            console.error("Error deleting medico:", error);
            swal("Error", "Ha ocurrido un error en la baja del médico", "error");
        }
    };

    return (
        <div className='ui container'>
            <div className="ui center aligned segment">
                <h1>Baja de médico</h1>
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
                                <label>Número de matrícula</label>
                                <span>{matricula}</span>
                            </div>
                            <div className="field">
                                <label>Número de legajo </label>
                                <span>{legajo}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui center aligned segment">
                    <button className='ui red button' onClick={deleteMedico}>Eliminar</button>
                    <Link to='/medicos/listadomedicos' className='ui blue button'>Cancelar</Link>
                    <div className={`ui ${loaderState} inline loader`}></div>
                </div>
            </div>
        </div>
    );
};

export default BajaMedico;
