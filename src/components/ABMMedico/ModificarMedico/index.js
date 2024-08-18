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
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [localidades, setLocalidades] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [id, setId] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                // Cargar localidades
                const localidadesResponse = await api.get('/localidades');
                setLocalidades(localidadesResponse.data);

                // Cargar datos del médico
                const medicoResponse = await api.get(`/altamedico`, { params: { matricula: numero_matricula } });
                const { medico } = medicoResponse.data;

                setNombre(medico.nombre);
                setApellido(medico.apellido);
                setDni(medico.dni);
                setDireccion(medico.domicilio.direccion);
                setTelefono(medico.telefono);
                setMail(medico.email);
                setMatricula(medico.numero_matricula);
                setLegajo(medico.legajo);
                setCalleSuperior(medico.domicilio.entre_calle_sup);
                setCalleInferior(medico.domicilio.entre_calle_inf);
                setFechaNacimiento(medico.fecha_nacimiento);
                setId(medico.id);

                // Seleccionar localidad
                const localidadId = medico.domicilio.localidad;
                setLocalidad(localidadId);

                console.log("Datos del médico cargados:", medico);
            } catch (error) {
                console.error('Error loading data:', error);
                swal('Error', 'No se pudieron cargar los datos', 'error');
            }
        };

        loadData();
    }, [numero_matricula]);

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

        setFormErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
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
            domicilio: {
                direccion,
                entre_calle_sup: calleSuperior,
                entre_calle_inf: calleInferior,
                localidad: localidad
            },
            fecha_nacimiento: fechaNacimiento,
        };
    
        console.log("Medico object being sent:", medico); // Debugging
    
        try {
            const response = await api.patch(`/modificarmedico/${id}/update/`, medico, { headers });
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
                        <option key={loc.id} value={loc.id}>
                            {loc.nombre} {/* Muestra el nombre de la localidad */}
                        </option>
                    ))}
                </select>
                {formErrors.localidad && <div className="ui pointing red basic label">{formErrors.localidad}</div>}
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
                        <div className="two fields">
                            <div className="field">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Nombre"
                                />
                                {formErrors.nombre && <div className="ui pointing red basic label">{formErrors.nombre}</div>}
                            </div>
                            <div className="field">
                                <label>Apellido</label>
                                <input
                                    type="text"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    placeholder="Apellido"
                                />
                                {formErrors.apellido && <div className="ui pointing red basic label">{formErrors.apellido}</div>}
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
                            {formErrors.dni && <div className="ui pointing red basic label">{formErrors.dni}</div>}
                        </div>
                        <div className="eight wide field">
                            <label>Fecha de nacimiento</label>
                            <input
                                type="date"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                            {formErrors.fechaNacimiento && <div className="ui pointing red basic label">{formErrors.fechaNacimiento}</div>}
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>Teléfono</label>
                            <input
                                type="text"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                placeholder="Teléfono"
                            />
                            {formErrors.telefono && <div className="ui pointing red basic label">{formErrors.telefono}</div>}
                        </div>
                        <div className="field">
                            <label>Correo electrónico</label>
                            <input
                                type="text"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                placeholder="Correo electrónico"
                            />
                            {formErrors.mail && <div className="ui pointing red basic label">{formErrors.mail}</div>}
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>Número de matrícula</label>
                            <input
                                type="text"
                                value={matricula}
                                onChange={(e) => setMatricula(e.target.value)}
                                placeholder="Número de matrícula"
                            />
                        </div>
                        <div className="field">
                            <label>Legajo</label>
                            <input
                                type="text"
                                value={legajo}
                                onChange={(e) => setLegajo(e.target.value)}
                                placeholder="Legajo"
                            />
                        </div>
                    </div>
                    <h4 className="ui dividing header">Domicilio</h4>
                    {renderLocalidades()}
                    <div className="field">
                        <label>Dirección</label>
                        <input
                            type="text"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            placeholder="Dirección"
                        />
                        {formErrors.direccion && <div className="ui pointing red basic label">{formErrors.direccion}</div>}
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>Calle superior</label>
                            <input
                                type="text"
                                value={calleSuperior}
                                onChange={(e) => setCalleSuperior(e.target.value)}
                                placeholder="Calle superior"
                            />
                            {formErrors.calleSuperior && <div className="ui pointing red basic label">{formErrors.calleSuperior}</div>}
                        </div>
                        <div className="field">
                            <label>Calle inferior</label>
                            <input
                                type="text"
                                value={calleInferior}
                                onChange={(e) => setCalleInferior(e.target.value)}
                                placeholder="Calle inferior"
                            />
                            {formErrors.calleInferior && <div className="ui pointing red basic label">{formErrors.calleInferior}</div>}
                        </div>
                    </div>

                    <div className="ui center aligned container">
                        <button className="ui primary button" type="submit">Confirmar</button>
                        <Link to='/medicos/listadomedicos' className="ui button negative">Volver</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModificarMedico;
