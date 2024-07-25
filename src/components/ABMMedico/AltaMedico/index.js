import React, { useState, useEffect } from 'react';
import api from '../../../apis';
import './styles.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';

const AltaMedico = () => {
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
    const [fechaNacimiento, setfechaNacimiento] = useState('');
    const [loaderState, setloaderState] = useState('disabled');
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
            formErrors.fechaDesde = "La fecha desde que trabaja en Galeno es requerida";
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

        const medico = {
            nombre, apellido, dni, direccion, telefono, email: mail, numero_matricula: matricula,
            legajo, localidad, entre_calle_sup: calleSuperior, entre_calle_inf: calleInferior,
            fecha_desde: fechaDesde, fecha_nacimiento: fechaNacimiento
        };

        const headers = {
            "Content-Type": "application/json"
        };

        setloaderState('active');

        try {
            const response = await api.post('/altamedico', medico, { headers });
            setloaderState('disabled');
            if (response.data.status === 200) {
                swal("Éxito", response.data.message, "success").then((ok) => {
                    if (ok) {
                        navigate('/medicos/listadomedicos');
                    }
                });
            } else {
                swal("Error", response.data.message, "error");
            }
        } catch (error) {
            console.error(error);
            swal("Ocurrió un error inesperado", '', 'error');
            setloaderState('disabled');
        }
    };

    const renderLocalidades = () => (
        <div className="field">
            <label>Localidad</label>
            <select className="ui fluid dropdown" onChange={(e) => setlocalidad(e.target.value)} value={localidad}>
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
                        <label>Nombre completo</label>
                        <div className="two fields">
                            <div className="field">
                                <input type="text" value={nombre} onChange={(e) => setnombre(e.target.value)} placeholder='Nombre' />
                                {errors.nombre && <div className="ui pointing red basic label">{errors.nombre}</div>}
                            </div>
                            <div className="field">
                                <input type="text" value={apellido} onChange={(e) => setapellido(e.target.value)} placeholder='Apellido' />
                                {errors.apellido && <div className="ui pointing red basic label">{errors.apellido}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="fields">
                        <div className="eight wide field">
                            <label>DNI</label>
                            <input type="text" value={dni} onChange={(e) => setdni(e.target.value)} placeholder='DNI' />
                            {errors.dni && <div className="ui pointing red basic label">{errors.dni}</div>}
                        </div>
                        <div className="eight wide field">
                            <label>Fecha de nacimiento</label>
                            <input type="date" value={fechaNacimiento} onChange={e => setfechaNacimiento(e.target.value)} />
                            {errors.fechaNacimiento && <div className="ui pointing red basic label">{errors.fechaNacimiento}</div>}
                        </div>
                    </div>
                    <h4 className="ui dividing header">Domicilio</h4>
                    {renderLocalidades()}
                    <div className="field">
                        <label htmlFor="">Fecha desde:</label>
                        <input type="date" value={fechaDesde} onChange={e => setfechaDesde(e.target.value)} />
                        {errors.fechaDesde && <div className="ui pointing red basic label">{errors.fechaDesde}</div>}
                    </div>
                    <div className="field">
                        <label>Dirección</label>
                        <input type="text" value={direccion} onChange={e => setdireccion(e.target.value)} placeholder='Calle 123' />
                        {errors.direccion && <div className="ui pointing red basic label">{errors.direccion}</div>}
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label htmlFor="">Calle Superior</label>
                                <input type="text" value={calleSuperior} onChange={(e) => setcalleSuperior(e.target.value)} placeholder='Calle' />
                                {errors.calleSuperior && <div className="ui pointing red basic label">{errors.calleSuperior}</div>}
                            </div>
                            <div className="field">
                                <label htmlFor="">Calle Inferior</label>
                                <input type="text" value={calleInferior} onChange={(e) => setcalleInferior(e.target.value)} placeholder='Calle' />
                                {errors.calleInferior && <div className="ui pointing red basic label">{errors.calleInferior}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label>Teléfono</label>
                        <input type="text" value={telefono} onChange={e => settelefono(e.target.value)} placeholder='381-441122' />
                        {errors.telefono && <div className="ui pointing red basic label">{errors.telefono}</div>}
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" value={mail} onChange={e => setmail(e.target.value)} placeholder='JohnDoe@gmail.com' />
                        {errors.mail && <div className="ui pointing red basic label">{errors.mail}</div>}
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>Número de matrícula</label>
                                <input type="text" value={matricula} onChange={e => setmatricula(e.target.value)} />
                                {errors.matricula && <div className="ui pointing red basic label">{errors.matricula}</div>}
                            </div>
                            <div className="field">
                                <label>Número de legajo</label>
                                <input type="text" value={legajo} onChange={(e) => setlegajo(e.target.value)} placeholder='Legajo' />
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
