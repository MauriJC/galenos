import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../../../apis';
import swal from 'sweetalert';

const Diagnostico = () => {
    let { idDiagnostico, nroAfiliado } = useParams();
    const [info, setinfo] = useState({ radiografia: { paciente: { nombre: '', edad: 0 } } });
    const [mail, setmail] = useState('');
    const [loaderState, setloaderState] = useState('disabled');
    const [errors, setErrors] = useState({});
    const [sugerencia, setSugerencia] = useState('');

    useEffect(() => {
        getDiagnostico();
    }, []);

    const getDiagnostico = async () => {
        const headers = {
            "Content-Type": "multipart/form-data"
        };

        const params = {
            id_diagnostico: idDiagnostico,
            numero_afiliado: nroAfiliado
        };

        setloaderState('active');
        try {
            const response = await api.get('/diagnostico', { params }, { headers });
            setinfo(response.data);
            sugerirEnfermedad(response.data);
        } catch (error) {
            console.error("Error fetching diagnostico:", error);
            swal("Error", "No se pudo cargar el diagnóstico", "error");
        }
        setloaderState('disabled');
    };

    const sugerirEnfermedad = async (diagnosticoData) => {
        const params = {
            numero_afiliado: diagnosticoData.radiografia.paciente.numero_afiliado,
            diagnostico: diagnosticoData.resultado
        };
    
        try {
            const response = await api.get('/sugerir_enfermedad/', { params });
            setSugerencia(response.data.sugerencia);
        } catch (error) {
            console.error("Error al sugerir enfermedad:", error.response ? error.response.data : error);
            swal("Error", "No se pudo sugerir la enfermedad", "error");
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!mail) {
            formErrors.mail = "El correo electrónico es requerido";
            isValid = false;
        } else if (!validateEmail(mail)) {
            formErrors.mail = "Formato de correo electrónico no válido";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await api.post('/enviardiagnostico', {
                    id_diagnostico: idDiagnostico,
                    email: mail
                });
                if (response.data.success) {
                    swal("Success", "El correo electrónico ha sido enviado", "success");
                } else {
                    swal("Error", response.data.error, "error");
                }
            } catch (error) {
                console.error("Error sending email:", error.response ? error.response.data : error);
                swal("Error", "No se pudo enviar el correo electrónico", "error");
            }
        } else {
            swal("Error", "Por favor, corrige los errores en el formulario", "error");
        }
    };

    return (
        <div className='ui container'>
            <div className="ui segment">
                <div className="ui center aligned segment">
                    <h1 className='header'>Diagnostico {idDiagnostico}</h1>
                    <div className={`ui ${loaderState} centered inline loader`}></div>
                </div>

                <div className="ui segment">
                    <div className="ui vertical stripe quote segment">
                        <div className="ui equal width stackable internally celled grid">
                            <div className="center aligned row">
                                <div className="column">
                                    <h3>Paciente: {info.radiografia.paciente.apellido} {info.radiografia.paciente.nombre}</h3>
                                    <h3>Fecha: {info.fecha}</h3>
                                </div>
                                <div className="column">
                                    <h3>Nro de afiliado: {nroAfiliado}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ui segment">
                    <img className="ui small left floated image" src={`//159.223.186.3/${info.radiografia.placa}`} alt='Radiografia' />
                    <h4>Diagnostico de la IA: {info.resultado}</h4>
                    <h4>Recomendaciones:</h4>
                    <ul>
                        {sugerencia.split('<br>').map((line, index) => (
                            <li key={index}>{line}</li>
                        ))}
                    </ul>
                </div>

                <form className="ui form" onSubmit={handleSubmit}>
                    <div className="inline fields">
                        <div className="field">
                            <input
                                type="text"
                                placeholder="Correo electrónico"
                                value={mail}
                                onChange={e => setmail(e.target.value)}
                            />
                            {errors.mail && <div className="ui pointing red basic label">{errors.mail}</div>}
                        </div>
                        <button className='ui button' type="submit">Enviar</button>
                    </div>
                </form>

                <Link to='/diagnosticos/listadodiagnosticos' className='ui button'>Volver al listado</Link>
            </div>
        </div>
    );
};

export default Diagnostico;
