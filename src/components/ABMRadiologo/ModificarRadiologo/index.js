import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import swal from 'sweetalert';
import api from '../../../apis';
import { Link } from 'react-router-dom';

const ModificarRadiologo = () => {
    let { nmatricula } = useParams();
    let navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mail, setMail] = useState('');
    const [matricula, setMatricula] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [calleSuperior, setCalleSuperior] = useState('');
    const [calleInferior, setCalleInferior] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [legajo, setLegajo] = useState('');
    const [id, setId] = useState('');
    const [localidades, setLocalidades] = useState([]);

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        getRadiologo();
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

    const getRadiologo = async () => {
        try {
            const response = await api.get(`/radiologos`, { params: { numero_matricula: nmatricula } });
            const datos = response.data;
            
            setNombre(datos.nombre);
            setApellido(datos.apellido);
            setDni(datos.dni);
            setTelefono(datos.telefono);
            setMail(datos.email);
            setMatricula(datos.numero_matricula);
            setLegajo(datos.legajo);
            setFechaNacimiento(datos.fecha_nacimiento);
            setId(datos.id);

            if (datos.domicilio) {
                setDireccion(datos.domicilio.direccion);    
                setCalleSuperior(datos.domicilio.entre_calle_sup);
                setCalleInferior(datos.domicilio.entre_calle_inf);
                if (datos.domicilio.localidad) {
                    setLocalidad(datos.domicilio.localidad);  // Usa el ID de la localidad
                }
            }
        } catch (error) {
            console.error("Error fetching radiologo:", error);
            swal("Error", "No se pudo cargar la información del radiólogo", "error");
        }
    };

    const validateForm = () => {
        let errors = {};
        if (!nombre) errors.nombre = "El nombre es requerido";
        if (!apellido) errors.apellido = "El apellido es requerido";
        if (!dni) errors.dni = "El DNI es requerido";
        if (!direccion) errors.direccion = "La dirección es requerida";
        if (!telefono) errors.telefono = "El teléfono es requerido";
        if (!mail) errors.mail = "El mail es requerido";
        if (!matricula) errors.matricula = "El número de matrícula es requerido";
        if (!localidad) errors.localidad = "La localidad es requerida";
        if (!fechaNacimiento) errors.fechaNacimiento = "La fecha de nacimiento es requerida";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const putInfoRadiologo = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const radiologo = {
            nombre,
            apellido,
            dni,
            telefono,
            email: mail,
            numero_matricula: matricula,
            fecha_nacimiento: fechaNacimiento,
            legajo,
            domicilio: {
                direccion,
                localidad,
                entre_calle_sup: calleSuperior,
                entre_calle_inf: calleInferior
            }
        };

        const headers = {
            "Content-Type": "application/json"
        };

        await api.patch(`/modificaradiologo/${id}/update`, radiologo, { headers })
            .then(response => {
                if (response.status === 200) {
                    swal("Éxito", 'Radiólogo modificado con éxito', 'success').then(ok => {
                        if (ok) {
                            navigate('/radiologos/listadoradiologos');
                        }
                    });
                }

                if (response.status === 500) {
                    swal(`${response.status}`, 'Error 500', 'error');
                }
            })
            .catch(error => console.log(error));
    };


    const renderLocalidades = () => (
        <div className="field">
            <label>Localidad</label>
            <select className="ui fluid dropdown" onChange={e => setLocalidad(e.target.value)} value={localidad}>
                <option value="">Seleccione Localidad</option>
                {localidades.map(loc => (
                    <option value={loc.id} key={loc.id}>{loc.nombre}</option>  // Usa el ID para el valor
                ))}
            </select>
            {formErrors.localidad && <div className="ui pointing red basic label">{formErrors.localidad}</div>}
        </div>
    );


    return (
        <div className='ui container'>
            <div className="ui center aligned segment">
                <h1>Modificar radiólogo</h1>
            </div>

            <div className="ui segment">
                <form className="ui form" onSubmit={putInfoRadiologo}>
                    <div className="two fields">
                        <div className="field">
                            <label>Nombre</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                placeholder="Nombre"
                            />
                            {formErrors.nombre && <div className="ui pointing red basic label">{formErrors.nombre}</div>}
                        </div>
                        <div className="field">
                            <label>Apellido</label>
                            <input
                                type="text"
                                value={apellido}
                                onChange={e => setApellido(e.target.value)}
                                placeholder="Apellido"
                            />
                            {formErrors.apellido && <div className="ui pointing red basic label">{formErrors.apellido}</div>}
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>DNI</label>
                            <input
                                type="text"
                                value={dni}
                                onChange={e => setDni(e.target.value)}
                                placeholder="DNI"
                            />
                            {formErrors.dni && <div className="ui pointing red basic label">{formErrors.dni}</div>}
                        </div>
                        <div className="field">
                            <label>Fecha de nacimiento</label>
                            <input
                                type="date"
                                value={fechaNacimiento}
                                onChange={e => setFechaNacimiento(e.target.value)}
                            />
                            {formErrors.fechaNacimiento && <div className="ui pointing red basic label">{formErrors.fechaNacimiento}</div>}
                        </div>
                    </div>
                    <div className="field">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                            placeholder="Teléfono"
                        />
                        {formErrors.telefono && <div className="ui pointing red basic label">{formErrors.telefono}</div>}
                    </div>
                    <div className="field">
                        <label>E-mail</label>
                        <input
                            type="email"
                            value={mail}
                            onChange={e => setMail(e.target.value)}
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
                    <h4 className="ui dividing header">Domicilio</h4>
                    {renderLocalidades()}
                    <div className="field">
                        <label>Dirección</label>
                        <input
                            type="text"
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
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
                                onChange={e => setCalleSuperior(e.target.value)}
                                placeholder="Entre calle superior"
                            />
                            {formErrors.calleSuperior && <div className="ui pointing red basic label">{formErrors.calleSuperior}</div>}
                        </div>
                        <div className="field">
                            <label>Calle inferior</label>
                            <input
                                type="text"
                                value={calleInferior}
                                onChange={e => setCalleInferior(e.target.value)}
                                placeholder="Entre calle inferior"
                            />
                            {formErrors.calleInferior && <div className="ui pointing red basic label">{formErrors.calleInferior}</div>}
                        </div>
                    </div>

                    <div className="ui header centered">
                        <button type="submit" className="ui button primary">Confirmar</button>
                        <Link to="/radiologos/listadoradiologos" className="ui negative button">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModificarRadiologo;
