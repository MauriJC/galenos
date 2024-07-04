import React, { useState, useEffect } from 'react';
import api from '../../../apis';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';

const AltaRadiologo = () => {
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
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [legajo, setLegajo] = useState('');
    const [localidades, setLocalidades] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        const fetchLocalidades = async () => {
            try {
                const response = await api.get('/localidades');
                setLocalidades(response.data);
            } catch (error) {
                console.error("Error fetching localidades:", error);
                swal("Error", "No se pudieron cargar las localidades", "error");
            }
        };
        fetchLocalidades();
    }, []);

    const postInfoRadiologo = async (e) => {
        e.preventDefault();
        const radiologo = {
            nombre, apellido, dni, direccion, telefono, email: mail, numero_matricula: matricula,
            localidad, entre_calle_sup: calleSuperior, entre_calle_inf: calleInferior,
            fecha_desde: fechaDesde, fecha_nacimiento: fechaNacimiento, legajo
        };
        const headers = { "Content-Type": "application/json" };

        try {
            const response = await api.post('/radiologos', radiologo, { headers });
            console.log(response.data); // Añadimos un log para ver la respuesta del servidor

            if (response.data.status == 200) {
                swal("Éxito", response.data.message, "success").then((ok) => {
                    if (ok) {
                        navigate('/radiologos/listadoradiologos');
                    }
                });
            } else {
                swal("Error", response.data.message, "error");
            }
        } catch (error) {
            console.error(error);
            swal("Ocurrió un error inesperado", '', 'error');
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
        </div>
    );

    return (
        <div className='ui container'>
            <div className="ui center aligned segment">
                <h1>Alta de radiólogo</h1>
            </div>
            <div className="ui segment">
                <div className="ui center aligned form">
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>Nombre</label>
                                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                            </div>
                            <div className="field">
                                <label>Apellido</label>
                                <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>DNI</label>
                                <input type="text" value={dni} onChange={e => setDni(e.target.value)} placeholder='DNI' />
                            </div>
                            <div className="field">
                                <label>Fecha de nacimiento</label>
                                <input type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <h4 className="ui dividing header">Domicilio</h4>
                    {renderLocalidades()}
                    <div className="field">
                        <label htmlFor="">Fecha desde:</label>
                        <input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="">Direccion</label>
                        <input type="text" value={direccion} onChange={e => setDireccion(e.target.value)} />
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label htmlFor="">Calle Superior</label>
                                <input type="text" value={calleSuperior} onChange={e => setCalleSuperior(e.target.value)} />
                            </div>
                            <div className="field">
                                <label htmlFor="">Calle Inferior</label>
                                <input type="text" value={calleInferior} onChange={e => setCalleInferior(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="">Telefono</label>
                        <input type='text' value={telefono} onChange={e => setTelefono(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="">E-mail</label>
                        <input type="email" value={mail} onChange={e => setMail(e.target.value)} />
                    </div>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label htmlFor="">Nro de Matricula</label>
                                <input type="text" value={matricula} onChange={e => setMatricula(e.target.value)} />
                            </div>
                            <div className="field">
                                <label htmlFor="">Nro de Legajo</label>
                                <input type="text" value={legajo} onChange={e => setLegajo(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="ui header centered">
                        <button className='ui blue button' onClick={postInfoRadiologo}>Confirmar</button>
                        <Link className='ui negative button' to='/radiologos/listadoradiologos'>Cancelar</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AltaRadiologo;
