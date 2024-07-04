import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import swal from 'sweetalert';
import api from '../../../apis';
import { Link } from 'react-router-dom';

const ModificarSecretario = () => {
    let { nlegajo } = useParams();
    let navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mail, setMail] = useState('');
    const [legajo, setLegajo] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [calleSuperior, setCalleSuperior] = useState('');
    const [calleInferior, setCalleInferior] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [id, setId] = useState('');
    const [localidades, setLocalidades] = useState([]);

    useEffect(() => {
        getSecretario();
        fetchLocalidades();
    }, []);

    const fetchLocalidades = async () => {
        try {
            const response = await api.get('/localidades');
            setLocalidades(response.data);
        } catch (error) {
            console.error("Error fetching localidades:", error);
            swal("Error", "No se pudieron cargar las localidades", "error");
        }
    };

    const getSecretario = async () => {
        const headers = { "Content-Type": "application/json" };

        const params = { legajo: nlegajo };

        const response = await api.get(`/altasecretario`, { params }, { headers });
        const sec = response.data.secretario;

        setApellido(sec.apellido);
        setDni(sec.dni);
        setMail(sec.email);
        setFechaNacimiento(sec.fecha_nacimiento);
        setId(sec.id);
        setLegajo(sec.legajo);
        setNombre(sec.nombre);
        setTelefono(sec.telefono);
        setDireccion(sec.direccion);
        setLocalidad(sec.localidad);
        setCalleSuperior(sec.entre_calle_sup);
        setCalleInferior(sec.entre_calle_inf);
        setFechaDesde(sec.fecha_desde);
    };

    const putSecretario = async (e) => {
        e.preventDefault();

        const secretario = {
            nombre, apellido, dni, direccion, telefono, email: mail, legajo, localidad,
            entre_calle_sup: calleSuperior, entre_calle_inf: calleInferior, fecha_desde: fechaDesde,
            fecha_nacimiento: fechaNacimiento
        };

        const headers = { "Content-Type": "application/json" };

        await api.put(`/modificarsecretario/${id}`, secretario, { headers })
            .then(response => {
                if (response.status === 200) {
                    swal(`${response.status}`, "Modificación de secretario exitosa", "success").then(ok => {
                        if (ok) {
                            navigate('/secretarios/listadosecretarios');
                        }
                    });
                } else if (response.status === 500) {
                    swal(`${response.status}`, 'Error 500', 'error');
                }
            })
            .catch(error => {
                console.error(error);
                swal("Ha ocurrido un error", '', 'error');
            });
    };

    const renderLocalidades = () => (
        <div className="field">
            <label>Localidad</label>
            <select className="ui fluid dropdown" onChange={e => setLocalidad(e.target.value)} value={localidad}>
                <option value="">Seleccione Localidad</option>
                {localidades.map(loc => (
                    <option value={loc.nombre} key={loc.id}>{loc.nombre}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className='ui container'>
            <div className="ui center aligned segment">
                <h1>Modificar secretario</h1>
            </div>

            <div className="ui segment">
                <div className="ui center aligned form">
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>Nombre</label>
                                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                            </div>
                            <div className="field">
                                <label>Apellido</label>
                                <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>DNI</label>
                                <input type="text" value={dni} onChange={e => setDni(e.target.value)} placeholder='DNI' />
                            </div>
                            <div className="field">
                                <label>Fecha de nacimiento</label>
                                <input type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <h4 className="ui dividing header">Domicilio</h4>
                    <div className="field">
                        {renderLocalidades()}
                    </div>
                    <div className="field">
                        <label htmlFor="">Fecha desde:</label>
                        <input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="">Direccion</label>
                        <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} />
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label htmlFor="">Calle Superior</label>
                                <input type="text" value={calleSuperior} onChange={e => setCalleSuperior(e.target.value)} />
                            </div>
                            <div className="field">
                                <label htmlFor="">Calle Inferior</label>
                                <input type="text" value={calleInferior} onChange={e => setCalleInferior(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="">Telefono</label>
                        <input type='text' value={telefono} onChange={e => setTelefono(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="">E-mail</label>
                        <input type="email" value={mail} onChange={e => setMail(e.target.value)} />
                    </div>
                    <div className="field">
                        <label>Numero de Legajo</label>
                        <input type="text" value={legajo} onChange={e => setLegajo(e.target.value)} />
                    </div>
                    <div className="ui header centered">
                        <button className='ui blue button' onClick={putSecretario}>Confirmar</button>
                        <Link className='ui negative button' to='/secretarios/listadosecretarios'>Cancelar</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModificarSecretario;
