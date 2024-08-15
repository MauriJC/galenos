import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import swal from 'sweetalert';
import api from '../../../apis';

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
    const [formErrors, setFormErrors] = useState({});

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
        try {
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
        } catch (error) {
            console.error("Error fetching secretario:", error);
            swal("Error", "No se pudo cargar el secretario", "error");
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

    const putSecretario = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }


        const secretario = {
            nombre, apellido, dni, direccion, telefono, email: mail, legajo, localidad,
            entre_calle_sup: calleSuperior, entre_calle_inf: calleInferior, fecha_desde: fechaDesde,
            fecha_nacimiento: fechaNacimiento
        };

        try {
            const headers = { "Content-Type": "application/json" };
            const response = await api.put(`/modificarsecretario/${id}`, secretario, { headers });

            if (response.status === 200) {
                swal("Éxito", "Modificación de secretario exitosa", "success").then(ok => {
                    if (ok) {
                        navigate('/secretarios/listadosecretarios');
                    }
                });
            } else if (response.status === 500) {
                swal(`${response.status}`, 'Error 500', 'error');
            }
        } catch (error) {
            console.error("Error updating secretario:", error);
            swal("Ha ocurrido un error", '', 'error');
        }
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
            {formErrors.localidad && <div className="ui pointing red basic label">{formErrors.localidad}</div>}
        </div>
    );

    return (
        <div className='ui container'>
            <div className="ui center aligned segment">
                <h1>Modificar secretario</h1>
            </div>

            <div className="ui segment">
                <form className="ui center aligned form" onSubmit={putSecretario}>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>Nombre</label>
                                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
                                {formErrors.nombre && <div className="ui pointing red basic label">{formErrors.nombre}</div>}
                            </div>
                            <div className="field">
                                <label>Apellido</label>
                                <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} placeholder="Apellido"/>
                                {formErrors.apellido && <div className="ui pointing red basic label">{formErrors.apellido}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>DNI</label>
                                <input type="text" value={dni} onChange={e => setDni(e.target.value)} placeholder='DNI' />
                                {formErrors.dni && <div className="ui pointing red basic label">{formErrors.dni}</div>}
                            </div>
                            <div className="field">
                                <label>Fecha de nacimiento</label>
                                <input type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />
                                {formErrors.fechaNacimiento && <div className="ui pointing red basic label">{formErrors.fechaNacimiento}</div>}
                            </div>
                        </div>
                    </div>
                    <h4 className="ui dividing header">Domicilio</h4>
                    <div className="field">
                        {renderLocalidades()}
                    </div>
                    <div className="field">
                        <label htmlFor="">Fecha desde que vive en ese domicilio:</label>
                        <input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
                        {formErrors.fechaDesde && <div className="ui pointing red basic label">{formErrors.fechaDesde}</div>}
                    </div>
                    <div className="field">
                        <label htmlFor="">Dirección</label>
                        <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} />
                        {formErrors.direccion && <div className="ui pointing red basic label">{formErrors.direccion}</div>}
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label htmlFor="">Calle Superior</label>
                                <input type="text" value={calleSuperior} onChange={e => setCalleSuperior(e.target.value)} />
                                {formErrors.calleSuperior && <div className="ui pointing red basic label">{formErrors.calleSuperior}</div>}

                            </div>
                            <div className="field">
                                <label htmlFor="">Calle Inferior</label>
                                <input type="text" value={calleInferior} onChange={e => setCalleInferior(e.target.value)} />
                                {formErrors.calleInferior && <div className="ui pointing red basic label">{formErrors.calleInferior}</div>}

                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="">Teléfono</label>
                        <input type='text' value={telefono} onChange={e => setTelefono(e.target.value)} />
                        {formErrors.telefono && <div className="ui pointing red basic label">{formErrors.telefono}</div>}
                    </div>
                    <div className="field">
                        <label htmlFor="">E-mail</label>
                        <input type="email" value={mail} onChange={e => setMail(e.target.value)} />
                        {formErrors.mail && <div className="ui pointing red basic label">{formErrors.mail}</div>}

                    </div>
                    <div className="field">
                        <label>Numero de Legajo</label>
                        <input type="text" value={legajo} onChange={e => setLegajo(e.target.value)} readOnly disabled/>

                    </div>
                    <div className="ui header centered">
                        <button type="submit" className='ui blue button'>Confirmar</button>
                        <Link className='ui negative button' to='/secretarios/listadosecretarios'>Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModificarSecretario;
