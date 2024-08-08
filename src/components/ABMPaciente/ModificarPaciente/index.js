import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
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

    useEffect(() => {
        getPaciente();
        fetchLocalidades();
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
                setId(paciente.id ? paciente.id : '');  // Asegúrate de que `id` es una cadena
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Asegúrate de que `id` es un número válido
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
            id: numericId, // Usa el ID numérico
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
                            <label>Fecha desde:</label>
                            <input
                                type="date"
                                value={fechaDesde}
                                onChange={(e) => setFechaDesde(e.target.value)}
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
                                <label>Calle Superior</label>
                                <input
                                    type="text"
                                    value={calleSuperior}
                                    onChange={(e) => setCalleSuperior(e.target.value)}
                                    placeholder="Calle"
                                />
                            </div>
                            <div className="field">
                                <label>Calle Inferior</label>
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
                        <label>Número de afiliado</label>
                        <input
                            type="text"
                            value={nroAfiliado}
                            onChange={(e) => setNroAfiliado(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className="ui center aligned segment">
                        <button className="ui blue button" type="submit">
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
