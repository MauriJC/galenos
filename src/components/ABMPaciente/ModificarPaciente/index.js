import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../../apis';

const ModificarPaciente = () => {
    const { nafiliado } = useParams();
    let navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mail, setMail] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [nroAfiliado, setNroAfiliado] = useState('');
    const [id, setId] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [calleSuperior, setCalleSuperior] = useState('');
    const [calleInferior, setCalleInferior] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [localidades, setLocalidades] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getPaciente();
        fetchLocalidades();
    }, []);

    const fetchLocalidades = async () => {
        try {
            const response = await api.get('/localidades');
            setLocalidades(response.data);
        } catch (error) {
            console.error('Error fetching localidades:', error);
            swal('Error', 'No se pudieron cargar las localidades', 'error');
        }
    };

    const getPaciente = async () => {
        try {
            const response = await api.get('/altapaciente', { params: { paciente: nafiliado } });
            const { paciente } = response.data;

            if (paciente) {
                setNombre(paciente.nombre);
                setApellido(paciente.apellido);
                setDni(paciente.dni);
                setDireccion(paciente.direccion);
                setTelefono(paciente.telefono);
                setMail(paciente.email);
                setFechaNacimiento(paciente.fecha_nacimiento);
                setNroAfiliado(paciente.numero_afiliado);
                setId(paciente.id ? paciente.id : '');
                setLocalidad(paciente.localidad);
                setCalleSuperior(paciente.entre_calle_sup);
                setCalleInferior(paciente.entre_calle_inf);
                setFechaDesde(paciente.fecha_desde);
            } else {
                throw new Error("Paciente no encontrado");
            }
        } catch (error) {
            console.error('Error fetching paciente:', error);
            swal('Error', 'No se pudo obtener la información del paciente', 'error');
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

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const numericId = Number(id);
        if (isNaN(numericId) || numericId <= 0) {
            swal('Error', 'ID inválido', 'error');
            return;
        }

        const paciente = {
            nombre,
            apellido,
            dni,
            direccion,
            telefono,
            email: mail,
            fecha_nacimiento: fechaNacimiento,
            numero_afiliado: nroAfiliado,
            id: numericId,
            localidad,
            entre_calle_sup: calleSuperior,
            entre_calle_inf: calleInferior,
            fecha_desde: fechaDesde
        };

        try {
            const response = await api.put(`/modificarpaciente/${numericId}`, paciente, { headers: { 'Content-Type': 'application/json' } });
            if (response.status === 200) {
                swal('Éxito', 'Paciente modificado exitosamente', 'success').then(ok => {
                    if (ok) navigate('/pacientes/listadopacientes');
                });
            } else {
                swal('Error', 'Error en la modificación del paciente', 'error');
            }
        } catch (error) {
            console.error('Error en la modificación del paciente:', error);
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
                {errors.localidad && <div className="ui pointing red basic label">{errors.localidad}</div>}
            </div>
        );
    };

    return (
        <div className="ui container">
            <div className="ui center aligned segment">
                <h1>Modificar paciente</h1>
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
                                {errors.nombre && <div className="ui pointing red basic label">{errors.nombre}</div>}
                            </div>
                            <div className="field">
                            <label>Apellido</label>
                                <input
                                    type="text"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    placeholder="Apellido"
                                />
                                {errors.apellido && <div className="ui pointing red basic label">{errors.apellido}</div>}
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
                            {errors.dni && <div className="ui pointing red basic label">{errors.dni}</div>}
                        </div>
                        <div className="eight wide field">
                            <label>Fecha de nacimiento</label>
                            <input
                                type="date"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                            {errors.fechaNacimiento && <div className="ui pointing red basic label">{errors.fechaNacimiento}</div>}
                        </div>
                    </div>
                    <h4 className="ui dividing header">Domicilio</h4>
                    {renderLocalidades()}
                    <div className="two fields">
                        <div className="field">
                            <label>Fecha desde que vive en ese domicilio:</label>
                            <input
                                type="date"
                                value={fechaDesde}
                                onChange={(e) => setFechaDesde(e.target.value)}
                            />
                            {errors.fechaDesde && <div className="ui pointing red basic label">{errors.fechaDesde}</div>}
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
                        {errors.direccion && <div className="ui pointing red basic label">{errors.direccion}</div>}
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>Calle superior</label>
                            <input
                                type="text"
                                value={calleSuperior}
                                onChange={(e) => setCalleSuperior(e.target.value)}
                            />
                            {errors.calleSuperior && <div className="ui pointing red basic label">{errors.calleSuperior}</div>}
                        </div>
                        <div className="field">
                            <label>Calle inferior</label>
                            <input
                                type="text"
                                value={calleInferior}
                                onChange={(e) => setCalleInferior(e.target.value)}
                            />
                            {errors.calleInferior && <div className="ui pointing red basic label">{errors.calleInferior}</div>}
                        </div>
                    </div>
                    <div className="field">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder="Teléfono"
                        />
                        {errors.telefono && <div className="ui pointing red basic label">{errors.telefono}</div>}
                    </div>
                    <div className="field">
                        <label>E-mail</label>
                        <input
                            type="email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            placeholder="example@example.com"
                        />
                        {errors.mail && <div className="ui pointing red basic label">{errors.mail}</div>}
                    </div>
                    <div className="ui header centered">
                        <button className="ui button primary" type="submit">
                            Confirmar
                        </button>
                        <Link to="/pacientes/listadopacientes" className="ui negative button">
                            Cancelar
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ModificarPaciente;
