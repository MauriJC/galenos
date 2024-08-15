import React, { useState, useEffect } from 'react';
import api from '../../../apis';
import './styles.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';

const AltaMedico = () => {
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
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [loaderState, setLoaderState] = useState('disabled');
    const [localidades, setLocalidades] = useState([]);
    const [errors, setErrors] = useState({});

    let navigate = useNavigate();

    useEffect(() => {
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

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!nombre) {
            formErrors.nombre = "Nombre es requerido";
            isValid = false;
        }

        if (!apellido) {
            formErrors.apellido = "Apellido es requerido";
            isValid = false;
        }

        if (!dni || !/^\d+$/.test(dni)) {
            formErrors.dni = "DNI es requerido y debe ser un número";
            isValid = false;
        }

        if (!mail || !/\S+@\S+\.\S+/.test(mail)) {
            formErrors.mail = "Email es requerido y debe ser válido";
            isValid = false;
        }

        if (!telefono || !/^\d+$/.test(telefono)) {
            formErrors.telefono = "Teléfono es requerido y debe ser un número";
            isValid = false;
        }

        if (!matricula || !/^\d+$/.test(matricula)) {
            formErrors.matricula = "Matrícula es requerida y debe ser un número";
            isValid = false;
        }

        if (!localidad) {
            formErrors.localidad = "Localidad es requerida";
            isValid = false;
        }

        if (!calleSuperior) {
            formErrors.calleSuperior = "La calle superior es requerida";
            isValid = false;
        }

        if (!direccion) {
            formErrors.direccion = "La dirección es requerida";
            isValid = false;
        }

        if (!calleInferior) {
            formErrors.calleInferior = "La calle inferior es requerida";
            isValid = false;
        }

        if (!fechaNacimiento) {
            formErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
            isValid = false;
        }

        if (!fechaDesde) {
            formErrors.fechaDesde = "La fecha desde que vive en ese domicilio es requerida";
            isValid = false;
        }

        if (!legajo || !/^\d+$/.test(legajo)) {
            formErrors.legajo = "Legajo es requerido y debe ser un número";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const postInfoMedico = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const username = mail.split('@')[0]; // Calcular el nombre de usuario (puedes ajustar esto según tus necesidades)
        const password = `${apellido}${dni}`; // Calcular la contraseña

        const medico = {
            nombre, apellido, dni, direccion, telefono, email: mail, numero_matricula: matricula,
            legajo, localidad, entre_calle_sup: calleSuperior, entre_calle_inf: calleInferior,
            fecha_desde: fechaDesde, fecha_nacimiento: fechaNacimiento
        };

        const headers = {
            "Content-Type": "application/json"
        };

        setLoaderState('active');

        try {
            // Primero, crear el médico
            const responseMedico = await api.post('/altamedico', medico, { headers });
            if (responseMedico.status === 200) {
                // Luego, crear el usuario
                const user = {
                    username,
                    password,
                    email: mail,
                    role: 'MEDICO' // Asignar el rol correspondiente
                };

                const responseUser = await api.post('/register', user, { headers });
                if (responseUser.status === 201) {
                    swal("Éxito", responseUser.data.message, "success").then((ok) => {
                        if (ok) {
                            navigate('/medicos/listadomedicos');
                        }
                    });
                } else {
                    swal("Error", responseUser.data.error, "error");
                }
            } else {
                swal("Error", responseMedico.data.message, "error");
            }
        } catch (error) {
            console.error(error);
            swal("Ocurrió un error inesperado", '', 'error');
        } finally {
            setLoaderState('disabled');
        }
    };

    const renderLocalidades = () => (
        <div className="field">
            <label>Localidad</label>
            <select className="ui fluid dropdown" onChange={(e) => setLocalidad(e.target.value)} value={localidad}>
                <option value="">Seleccione Localidad</option>
                {localidades.map(loc => (
                    <option value={loc.nombre} key={loc.id}>{loc.nombre}</option>
                ))}
            </select>
            {errors.localidad && <div className="ui pointing red basic label">{errors.localidad}</div>}
        </div>
    );

    return (
        <div className='ui container'>
            <div className="ui center aligned segment">
                <h1>Alta de médico</h1>
            </div>
            <div className="ui segment">
                <div className="ui center aligned form">
                <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label> Nombre</label>
                                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Nombre' />
                                {errors.nombre && <div className="ui pointing red basic label">{errors.nombre}</div>}

                            </div>

                            <div className="field">
                                <label> Apellido</label>
                                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder='Apellido' />
                                {errors.apellido && <div className="ui pointing red basic label">{errors.apellido}</div>}

                            </div>
                        </div>
                    </div>
                    <div className="fields">
                        <div className="eight wide field">
                            <label>DNI</label>
                            <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} placeholder='DNI' />
                            {errors.dni && <div className="ui pointing red basic label">{errors.dni}</div>}
                        </div>
                        <div className="eight wide field">
                            <label>Fecha de nacimiento</label>
                            <input type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />
                            {errors.fechaNacimiento && <div className="ui pointing red basic label">{errors.fechaNacimiento}</div>}
                        </div>
                    </div>
                    <h4 className="ui dividing header">Domicilio</h4>
                    {renderLocalidades()}
                    <div className="field">
                        <label htmlFor="">Fecha desde que vive en ese domicilio:</label>
                        <input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
                        {errors.fechaDesde && <div className="ui pointing red basic label">{errors.fechaDesde}</div>}
                    </div>
                    <div className="field">
                        <label>Dirección</label>
                        <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} placeholder='Calle 123' />
                        {errors.direccion && <div className="ui pointing red basic label">{errors.direccion}</div>}
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label htmlFor="">Calle Superior</label>
                                <input type="text" value={calleSuperior} onChange={(e) => setCalleSuperior(e.target.value)} placeholder='Calle' />
                                {errors.calleSuperior && <div className="ui pointing red basic label">{errors.calleSuperior}</div>}
                            </div>
                            <div className="field">
                                <label htmlFor="">Calle Inferior</label>
                                <input type="text" value={calleInferior} onChange={(e) => setCalleInferior(e.target.value)} placeholder='Calle' />
                                {errors.calleInferior && <div className="ui pointing red basic label">{errors.calleInferior}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Teléfono</label>
                        <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder='381-441122' />
                        {errors.telefono && <div className="ui pointing red basic label">{errors.telefono}</div>}
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" value={mail} onChange={e => setMail(e.target.value)} placeholder='JohnDoe@gmail.com' />
                        {errors.mail && <div className="ui pointing red basic label">{errors.mail}</div>}
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>Número de matrícula</label>
                                <input type="text" value={matricula} onChange={e => setMatricula(e.target.value)} />
                                {errors.matricula && <div className="ui pointing red basic label">{errors.matricula}</div>}
                            </div>
                            <div className="field">
                                <label>Número de legajo</label>
                                <input type="text" value={legajo} onChange={(e) => setLegajo(e.target.value)} placeholder='Legajo' />
                                {errors.legajo && <div className="ui pointing red basic label">{errors.legajo}</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui center aligned segment">
                    <button className='ui blue button' onClick={postInfoMedico}>Confirmar</button>
                    <Link to='/medicos/listadomedicos' className='ui negative button'>Cancelar</Link>
                    <div className={`ui ${loaderState} inline loader`}></div>
                </div>
            </div>
        </div>
    );
}

export default AltaMedico;
