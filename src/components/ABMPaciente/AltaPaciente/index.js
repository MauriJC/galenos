import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../apis';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';

const AltaPaciente = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [direccion, setDireccion] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [codigoPostal, setCodigoPostal] = useState(''); 
    const [calleSuperior, setCalleSuperior] = useState('');
    const [calleInferior, setCalleInferior] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mail, setMail] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [localidades, setLocalidades] = useState([]);

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

    const handleLocalidadChange = (e) => {
        const selectedLocalidad = e.target.value;
        setLocalidad(selectedLocalidad);

        const localidadObj = localidades.find(loc => loc.nombre === selectedLocalidad);
        if (localidadObj) {
            setCodigoPostal(localidadObj.codigo_postal);
        } else {
            setCodigoPostal('');
        }
    };

    const renderLocalidades = () => {
        return (
            <div className="field">
                <label>Localidad</label>
                <select className="ui fluid dropdown" onChange={handleLocalidadChange} value={localidad}>
                    <option value="">Seleccione Localidad</option>
                    {localidades.map(loc => (
                        <option value={loc.nombre} key={loc.id}>{loc.nombre}</option>
                    ))}
                </select>
            </div>
        );
    };

    const calculateNumAfiliado = () => {
        return `NA-${dni}-${new Date().getFullYear()}`;
    };

    const uploadPaciente = async (e) => {
        e.preventDefault();

        const num_afiliado = calculateNumAfiliado();

        const paciente = {
            nombre,
            apellido,
            dni,
            telefono,
            email: mail,
            localidad,
            codigo_postal: codigoPostal, 
            entre_calle_sup: calleSuperior,
            entre_calle_inf: calleInferior,
            fecha_desde: fechaDesde,
            fecha_nacimiento: fechaNacimiento,
            num_afiliado,
            provincia: 'TUCUMAN',
            pais: 'ARGENTINA',
            domicilio: direccion,
            direccion
        };

        const headers = { "Content-Type": "application/json" };

        try {
            const response = await api.post(`/altapaciente`, paciente, { headers });
            console.log('response', response);
            console.log(paciente);

            if (response.data.status === '200') {
                swal(response.data.status, response.data.message, "success").then(
                    ok => {
                        if (ok) navigate('/pacientes/listadopacientes');
                    }
                );
            } else {
                swal(`${response.data.status}`, response.data.message, "error");
            }
        } catch (error) {
            console.error("Error uploading paciente:", error.response ? error.response.data : error);
            swal("Error", "Hubo un problema al subir los datos del paciente", "error");
        }
    };

    return (
        <div className='ui container'>
            <div className="ui center aligned segment">
                <h1>Alta de paciente</h1>
            </div>

            <div className="ui segment">
                <div className='ui center aligned form '>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label> Nombre</label>
                                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Nombre' />
                            </div>

                            <div className="field">
                                <label> Apellido</label>
                                <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>DNI</label>
                                <input type="text" value={dni} onChange={(e) => setDni(e.target.value)} placeholder='DNI' />
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
                        <label>Direccion</label>
                        <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} placeholder='Calle 123' />
                    </div>

                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label htmlFor="">Calle Superior </label>
                                <input type="text" value={calleSuperior} onChange={(e) => setCalleSuperior(e.target.value)} placeholder='Calle' />
                            </div>
                            <div className="field">
                                <label htmlFor="">Calle Inferior </label>
                                <input type="text" value={calleInferior} onChange={(e) => setCalleInferior(e.target.value)} placeholder='Calle' />
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label>Teléfono</label>
                        <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder='381-441122' />
                    </div>

                    <div className="field">
                        <label>Email</label>
                        <input type="text" value={mail} onChange={e => setMail(e.target.value)} placeholder='JohnDoe@gmail.com' />
                    </div>
                    
                    <div className="field">
                        <label>Código Postal</label>
                        <input type="text" value={codigoPostal} readOnly />
                    </div>
                </div>

                <div className="ui header centered">
                    <button className='ui blue button' onClick={uploadPaciente}>Confirmar</button>
                    <Link className='ui negative button' to='/pacientes/listadopacientes'>Cancelar</Link>
                </div>
            </div>
        </div>
    );
}

export default AltaPaciente;
