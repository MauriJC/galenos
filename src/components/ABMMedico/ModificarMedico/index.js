import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../../apis';

const ModificarMedico = () => {
    const { numero_matricula } = useParams();
    let navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mail, setMail] = useState('');
    const [matricula, setMatricula] = useState('');
    const [legajo, setLegajo] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [calleSuperior, setCalleSuperior] = useState('');
    const [calleInferior, setCalleInferior] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [id, setId] = useState('');
    const [loaderState, setLoaderState] = useState('disabled');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [localidades, setLocalidades] = useState([]);

    useEffect(() => {
        getMedico();
        fetchLocalidades(); // Llamada para obtener localidades
    }, []);

    const fetchLocalidades = async () => {
        try {
            const response = await api.get('/localidades'); // Endpoint para obtener localidades
            setLocalidades(response.data); // Guardar localidades en el estado local
        } catch (error) {
            console.error('Error fetching localidades:', error);
            swal('Error', 'No se pudieron cargar las localidades', 'error');
        }
    };

    const getMedico = async () => {
        try {
            const response = await api.get(`/altamedico`, { params: { matricula: numero_matricula } });
            const { medico } = response.data;

            setNombre(medico.nombre);
            setApellido(medico.apellido);
            setDni(medico.dni);
            setDireccion(medico.direccion);
            setTelefono(medico.telefono);
            setMail(medico.email);
            setMatricula(medico.numero_matricula);
            setLegajo(medico.legajo);
            setLocalidad(medico.localidad);
            setCalleSuperior(medico.entre_calle_sup);
            setCalleInferior(medico.entre_calle_inf);
            setFechaDesde(medico.fecha_desde);
            setFechaNacimiento(medico.fecha_nacimiento);
            setId(medico.id);
        } catch (error) {
            console.error('Error fetching medico:', error);
            swal('Error', 'No se pudo obtener la información del médico', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        const medico = {
            nombre,
            apellido,
            dni,
            direccion,
            telefono,
            email: mail,
            numero_matricula: matricula,
            legajo,
            localidad,
            entre_calle_sup: calleSuperior,
            entre_calle_inf: calleInferior,
            fecha_desde: fechaDesde,
            fecha_nacimiento: fechaNacimiento,
            fecha_hasta: fechaHasta
        };

        try {
            const response = await api.put(`/modificarmedico/${id}`, medico, { headers });
            if (response.status === 200) {
                swal('Éxito', 'Modificación del médico exitosa', 'success').then(ok => {
                    if (ok) navigate('/medicos/listadomedicos');
                });
            } else {
                swal('Error', 'Error en la modificación del médico', 'error');
            }
        } catch (error) {
            console.error('Error en la modificación del médico:', error);
            swal('Error', 'Ha ocurrido un error inesperado', 'error');
        }
    };

    const handleLocalidadChange = (e) => {
        setLocalidad(e.target.value);
    };

    const renderLocalidades = () => {
        return (
            <div className="field">
                <label>Localidad</label>
                <select
                    className="ui fluid dropdown"
                    onChange={handleLocalidadChange}
                    value={localidad}
                >
                    <option value="">Seleccione Localidad</option>
                    {localidades.map(loc => (
                        <option key={loc.id} value={loc.nombre}>
                            {loc.nombre}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    return (
        <div className="ui container">
            <div className="ui center aligned segment">
                <h1>Modificar médico</h1>
            </div>
            <div className="ui segment">
                <form className="ui center aligned form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Nombre completo</label>
                        <div className="two fields">
                            <div className="field">
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Nombre"
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    placeholder="Apellido"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="fields">
                        <div className="eight wide field">
                            <label>DNI</label>
                            <input
                                type="text"
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                                placeholder="DNI"
                            />
                        </div>
                        <div className="eight wide field">
                            <label>Fecha de nacimiento</label>
                            <input
                                type="date"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                        </div>
                    </div>
                    <h4 className="ui dividing header">Domicilio</h4>
                    {renderLocalidades()}
                    <div className="two fields">
                        <div className="field">
                            <label htmlFor="">Fecha desde:</label>
                            <input
                                type="date"
                                value={fechaDesde}
                                onChange={(e) => setFechaDesde(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="">Fecha hasta:</label>
                            <input
                                type="date"
                                value={fechaHasta}
                                onChange={(e) => setFechaHasta(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label>Dirección</label>
                        <input
                            type="text"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            placeholder="Calle 123"
                        />
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label htmlFor="">Calle Superior </label>
                                <input
                                    type="text"
                                    value={calleSuperior}
                                    onChange={(e) => setCalleSuperior(e.target.value)}
                                    placeholder="Calle"
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="">Calle inferior </label>
                                <input
                                    type="text"
                                    value={calleInferior}
                                    onChange={(e) => setCalleInferior(e.target.value)}
                                    placeholder="Calle"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder="381-441122"
                        />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="text"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            placeholder="JohnDoe@gmail.com"
                        />
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>Número de matrícula</label>
                                <input
                                    type="text"
                                    value={matricula}
                                    onChange={(e) => setMatricula(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label>Número de legajo </label>
                                <input
                                    type="text"
                                    value={legajo}
                                    onChange={(e) => setLegajo(e.target.value)}
                                    placeholder="Legajo"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ui center aligned segment">
                        <button className="ui blue button" type="submit">
                            Confirmar
                        </button>
                        <Link to="/medicos/listadomedicos" className="ui negative button">
                            Cancelar
                        </Link>
                        <div className={`ui ${loaderState} inline loader`}></div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModificarMedico;
