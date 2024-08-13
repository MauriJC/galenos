import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import api from '../../../apis';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const BajaPaciente = () => {
    let { nafiliado } = useParams();
    let navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [nroAfiliado, setNroAfiliado] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        getPaciente();
    }, []);

    const getPaciente = async () => {
        const headers = { "Content-Type": "application/json" };

        const params = { paciente: nafiliado };

        try {
            const response = await api.get('/altapaciente', { params }, { headers });
            const datos = response.data.paciente;

            setNombre(datos.nombre);
            setApellido(datos.apellido);
            setDni(datos.dni);
            setNroAfiliado(datos.numero_afiliado);

            setId(response.data.id);
        } catch (error) {
            console.error("Error fetching paciente:", error);
            swal("Error", "No se pudo obtener la información del paciente", "error");
        }
    };

    const deletePaciente = async () => {
        const params = { numero_afiliado: nafiliado };

        const headers = { "Content-Type": "application/json" };

        try {
            const response = await api.delete(`/altapaciente`, { params }, { headers });
            if (response.status === 200) {
                swal("Éxito", `Paciente con numero de afiliado: ${nafiliado} eliminado` , "success").then(ok => {
                    if (ok) navigate('/pacientes/listadopacientes');
                });
            } else {
                swal(`${response.status}`, response.data.message, "error");
            }
        } catch (error) {
            console.error("Error deleting paciente:", error);
            swal("Error", "Ha ocurrido un error en la baja del paciente", "error");
        }
    };

    return (
        <div className='ui container'>
            <div className="ui center aligned segment">
                <h1>Baja de paciente</h1>
            </div>
            <div className="ui segment">
                <div className="ui center aligned form">
                    <div className="two fields">
                        <div className="field">
                            <label>Nombre completo</label>
                            <span>{nombre} {apellido}</span>
                        </div>
                        <div className="field">
                            <label>DNI</label>
                            <span>{dni}</span>
                        </div>
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>Número de afiliado</label>
                            <span>{nroAfiliado}</span>
                        </div>
                    </div>
                </div>
                <div className="ui center aligned segment">
                    <button className='ui red button' onClick={deletePaciente}>Eliminar</button>
                    <Link to='/pacientes/listadopacientes' className='ui blue button'>Cancelar</Link>
                </div>
            </div>
        </div>
    );
};

export default BajaPaciente;
