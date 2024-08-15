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
    const [formErrors, setFormErrors] = useState({});

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
            localidad,
            entre_calle_sup: calleSuperior,
            entre_calle_inf: calleInferior,
            fecha_desde: fechaDesde,
            fecha_nacimiento: fechaNacimiento,
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
                    <h4 className="ui dividing header">Domicilio</h4>
                    {renderLocalidades()}
                    <div className="two fields">
                        <div className="field">
                            <label htmlFor="">Fecha desde que vive en ese domicilio:</label>
                            <input
                                type="date"
                                value={fechaDesde}
                                onChange={(e) => setFechaDesde(e.target.value)}
                            />
                            {formErrors.fechaDesde && <div className="ui pointing red basic label">{formErrors.fechaDesde}</div>}
                        </div>
                    </div>
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
                            <label htmlFor="">Calle superior</label>
                            <input
                                type="text"
                                value={calleSuperior}
                                onChange={(e) => setCalleSuperior(e.target.value)}
                                placeholder="Entre calle superior"
                            />
                            {formErrors.calleSuperior && <div className="ui pointing red basic label">{formErrors.calleSuperior}</div>}
                        </div>
                        <div className="field">
                            <label htmlFor="">Calle inferior</label>
                            <input
                                type="text"
                                value={calleInferior}
                                onChange={(e) => setCalleInferior(e.target.value)}
                                placeholder="Entre calle inferior"
                            />
                            {formErrors.calleInferior && <div className="ui pointing red basic label">{formErrors.calleInferior}</div>}
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
                        {formErrors.telefono && <div className="ui pointing red basic label">{formErrors.telefono}</div>}
                    </div>
                    <div className="field">
                        <label>E-mail</label>
                        <input
                            type="text"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            placeholder="Mail"
                        />
                        {formErrors.mail && <div className="ui pointing red basic label">{formErrors.mail}</div>}
                    </div>
                    <div className="field">
                        <label>Número de Matrícula</label>
                        <input
                            type="text"
                            value={matricula}
                            onChange={e => setMatricula(e.target.value)}
                            placeholder="Matrícula"
                            readOnly disabled
                        />
                        {formErrors.matricula && <div className="ui pointing red basic label">{formErrors.matricula}</div>}
                    </div>
                   
                    <div className="field">
                        <label>Legajo</label>
                        <input
                            type="text"
                            value={legajo}
                            onChange={e => setLegajo(e.target.value)}
                            placeholder="Legajo"
                            readOnly disabled
                        />
                    </div>
                    <div className="ui header centered">
                        <button type="submit" className="ui primary button">
                            Confirmar
                        </button>
                        <Link to="/medicos/listadomedicos" className="ui negative button">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModificarMedico;
