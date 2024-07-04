import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../../apis'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router'


const ModificarPaciente = () => {


    let { nafiliado } = useParams()


    const paises = ['Argentina', 'Peru']
    const provinciasArg = [
        "Buenos Aires",
        "Capital Federal",
        "Catamarca",
        "Chaco",
        "Chubut",
        "Córdoba",
        "Corrientes",
        "Entre Ríos",
        "Formosa",
        "Jujuy",
        "La Pampa",
        "La Rioja",
        "Mendoza",
        "Misiones",
        "Neuquén",
        "Río Negro",
        "Salta",
        "San Juan",
        "San Luis",
        "Santa Cruz",
        "Santa Fe",
        "Santiago del Estero",
        "Tierra del Fuego",
        "TUCUMAN"
    ]

    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [dni, setdni] = useState('');
    const [direccion, setdireccion] = useState('');
    const [localidad, setlocalidad] = useState('');
    const [provincia, setprovincia] = useState('')
    const [pais, setpais] = useState('');
    const [calleSuperior, setcalleSuperior] = useState('');
    const [calleInferior, setcalleInferior] = useState('');
    const [fechaDesde, setfechaDesde] = useState('');
    const [telefono, settelefono] = useState('');
    const [mail, setmail] = useState('');
    const [fechaNacimiento, setfechaNacimiento] = useState('')
    const [nroAfiliado, setnroAfiliado] = useState('')
    const [id, setid] = useState('')

    let navigate = useNavigate()


    //console.log(id)





    //renders
    const renderPaises = () => {
        return (
            <div className="field">
                <label>Pais</label>
                <select className="ui fluid dropdown" onChange={e => setpais(e.target.value)} value={pais}>
                    <option >Seleccione Pais</option>
                    {paises.map(pais => {
                        return (
                            <option value={pais}>{pais}</option>
                        )
                    })}
                </select>
            </div>
        )

    }

    const renderProvincias = () => {
        return (
            <div className="field">
                <label> Provincia </label>
                <select className="ui fluid dropdown" onChange={e => setprovincia(e.target.value)} value={provincia}>
                    <option value='' >Seleccione Provincia</option>
                    {provinciasArg.map(provincia => {
                        return (<option value={provincia}>{provincia}</option>)
                    })}

                </select>

            </div>
        )
    }



    const renderLocalidades = () => {
        return (
            <div className="field">
                <label> Localidad </label>

                <select className="ui fluid dropdown" onChange={(e) => setlocalidad(e.target.value)}
                    value={localidad}
                >
                    <option value="">Localidad</option>
                    <option value="San Miguel de Tucuman">San Miguel de Tucuman</option>
                    <option value="Aguilares">Aguilares</option>
                </select>


            </div>

        )


    }

    useEffect(() => {
        getPaciente()
    }, [])


    // API comms

    const getPaciente = async () => {

        const headers = {
            "Content-Type": "application/json"
        }

        console.log('el nafiliado es', nafiliado)


        const params = {
            paciente: nafiliado
        }

        const response = await api.get('/altapaciente', { params }, { headers })
        console.log(response.data)

        setnombre(response.data.paciente['nombre'])
        setapellido(response.data.paciente['apellido'])
        setdni(response.data.paciente['dni'])
        setdireccion(response.data.paciente['direccion'])
        settelefono(response.data.paciente['telefono'])
        setmail(response.data.paciente['email'])
        setlocalidad(response.data.paciente.localidad)
        setcalleSuperior(response.data.paciente.entre_calle_sup)
        setcalleInferior(response.data.paciente.entre_calle_inf)
        setfechaDesde(response.data.paciente.fecha_desde)
        setfechaNacimiento(response.data.paciente.fecha_nacimiento)
        setnroAfiliado(response.data.paciente.numero_afiliado)
        setid(response.data.paciente.id)


    }


    const uploadPaciente = async () => {

        const paciente = {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            telefono: telefono,
            email: mail,
            fecha_nacimiento: fechaNacimiento,
            numero_afiliado: nroAfiliado,
            id: id,

            domicilio: direccion,
            localidad: localidad,
            entre_calle_sup: calleSuperior,
            entre_calle_inf: calleInferior,
            fecha_desde: fechaDesde

        }


        const headers =
        {
            "Content-Type": "application/json"
        }


        await api.put(`/modificarpaciente/${id}`, paciente, { headers })
            .then(response => {
                console.log('response', response)
                if (response.status == '200') {
                    swal(`${response.status}`, 'Paciente modificado exitosamente', "success").then(
                        ok => {
                            if (ok) navigate('/pacientes/listadopacientes')
                        }
                    )
                }
                if (response.status == '500') {
                    swal(`${response.status}`, 'Error 500', "error")
                }
            })
            .catch(error => {
                swal('Ha ocurrido un error al modificar el paciente', 'error')
                console.log(error)
            }
            )

    }







    return (
        <div className='ui container'>

            <div className="ui center aligned segment">
                <h1>Modificar paciente</h1>
            </div>

            <div className="ui segment">
                <div className='ui center aligned form '>
                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label> Nombre</label>
                                <input type="text"
                                    value={nombre}
                                    onChange={(e) => setnombre(e.target.value)
                                    }
                                    placeholder='Nombre'
                                />
                            </div>

                            <div className="field">
                                <label htmlFor=""> Apellido</label>
                                <input type="text"
                                    value={apellido}
                                    onChange={(e) => setapellido(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>



                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label>DNI</label>
                                <input type="text"
                                    value={dni}
                                    onChange={(e) => setdni(e.target.value)}
                                    placeholder='DNI'
                                />
                            </div>

                            <div className="field">
                                <label >Fecha de nacimiento</label>

                                <input type="date" value={fechaNacimiento} onChange={e => setfechaNacimiento(e.target.value)} />
                            </div>
                        </div>
                    </div>


                    <h4 className="ui dividing header">Domicilio</h4>

                    {renderPaises()}


                    <div className="two fields">
                        {renderProvincias()}

                        {renderLocalidades()}
                    </div>

                    <div className="field">

                        <label htmlFor="">Fecha desde:</label>
                        <input type="date" name="" id="" value={fechaDesde} onChange={e => setfechaDesde(e.target.value)} />
                    </div>



                    <div className="field">
                        <label>Dirección</label>
                        <input type="text" value={direccion} onChange={e => setdireccion(e.target.value)} placeholder='Calle 123' />
                    </div>

                    <div className="field">
                        <div className="two fields">
                            <div className="field">
                                <label htmlFor="">Calle Superior </label>
                                <input type="text"
                                    value={calleSuperior}
                                    onChange={(e) => setcalleSuperior(e.target.value)}
                                    placeholder='Calle'
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="">Calle inferior </label>
                                <input type="text"
                                    value={calleInferior}
                                    onChange={(e) => setcalleInferior(e.target.value)}
                                    placeholder='Calle'
                                />

                            </div>
                        </div>
                    </div>


                    <div className="field">
                        <label>Teléfono</label>
                        <input type="text" value={telefono} onChange={e => settelefono(e.target.value)} placeholder='381-441122' />
                    </div>

                    <div className="field">
                        <label>Email</label>
                        <input type="text" value={mail} onChange={e => setmail(e.target.value)} placeholder='JohnDoe@gmail.com' />
                    </div>

                    </div>


                    <div className="ui header centered">
                        <button className='ui blue button' onClick={uploadPaciente}>Confirmar</button>
                        <Link className='ui negative button' to='/pacientes/listadopacientes' >Cancelar</Link>

                    </div>

                </div>
                
            </div>
    

    )
}

export default ModificarPaciente
