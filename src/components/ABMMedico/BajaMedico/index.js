import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import api from '../../../apis'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';


const BajaMedico = () => {
    const { nmatricula } = useParams()
    let navigate = useNavigate()

    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [dni, setdni] = useState('');
    const [direccion, setdireccion] = useState('');
    const [telefono, settelefono] = useState('');
    const [mail, setmail] = useState('');
    const [matricula, setmatricula] = useState('');
    const [legajo, setlegajo] = useState('');
    const [provincia, setprovincia] = useState('')
    const [pais, setpais] = useState('')
    const [localidad, setlocalidad] = useState('')
    const [calleSuperior, setcalleSuperior] = useState('')
    const [calleInferior, setcalleInferior] = useState('')
    const [fechaDesde, setfechaDesde] = useState('')
    const [fechaHasta, setfechaHasta] = useState('')
    const [id, setid] = useState('')
    const [loaderState, setloaderState] = useState('disabled')

    const [fechaNacimiento, setfechaNacimiento] = useState('')




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
        "Tucumán"
    ]




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
                    <option value="AZ">asdasd</option>
                    <option value="AR">Rio Cuarto</option>
                </select>


            </div>

        )


    }




    useEffect(() => {
        //console.log('renderizado')
        //console.log(nmatricula);
        getMedico()
    }, [])






    // API Comms
    const getMedico = async () => {

        const headers = {
            "Content-Type": "application/json"
        }

        const params = {
            matricula: nmatricula
        }

        console.log(nmatricula)

        const response = await api.get(`/altamedico`, { params }, { headers })

        console.log(response.data)


        setnombre(response.data.medico['nombre'])
        setapellido(response.data.medico['apellido'])
        setdni(response.data.medico['dni'])
        setdireccion(response.data.medico['direccion'])
        settelefono(response.data.medico['telefono'])
        setmail(response.data.medico['email'])
        setmatricula(response.data.medico['numero_matricula'])
        setlegajo(response.data.medico['legajo'])
        setlocalidad(response.data.medico.localidad)
        setcalleSuperior(response.data.medico.entre_calle_sup)
        setcalleInferior(response.data.medico.entre_calle_inf)
        setfechaDesde(response.data.medico.fecha_desde)
        setfechaNacimiento(response.data.medico.fecha_nacimiento)
        setid(response.data.medico.id)


        //Solucion provisoria

        //const medicoamodificar= response.data.medicos.filter(medico=> medico.numero_matricula == numero_matricula)
        //console.log(medicoamodificar)





    }


    const deleteMedico = async () => {
        const params = {
            matricula: nmatricula
        }

        const headers = {
            "Content-Type": "application/json"
        }


        await api.delete(`/altamedico`, { params }, { headers }).then(
            response => {
                if (response.data.status == 200) {


                    swal(`${response.data.status}`, response.data.message, "success").then(
                        ok => {
                            if (ok) navigate('/medicos/listadomedicos')
                        }
                    )


                }
                if (response.data.status == 500)
                    swal(`${response.data.status}`, response.data.message, "error")
            }
        ).catch(
            error => swal('Ha ocurrido un error en la baja del medico', ',"error')
        )



    }



    return (
        <div className='ui container'>
            <div className="ui center aligned segment">
                <h1>Baja de médico</h1>
            </div>
            <div className="ui segment">
                <div className="ui center aligned form">

                    <div className="field">
                        <label>Nombre completo</label>
                        <div className="two fields">
                            <div className="field">
                                <input type="text"
                                    value={nombre}
                                    onChange={(e) => setnombre(e.target.value)}
                                    placeholder='Nombre'
                                />

                            </div>

                            <div className="field">
                                <input type="text"
                                    value={apellido}
                                    onChange={(e) => setapellido(e.target.value)}
                                    placeholder='Apellido'
                                />
                            </div>



                        </div>

                    </div>

                    <div className="fields">
                        <div className=" eight wide field">
                            <label>DNI</label>
                            <input type="text"
                                value={dni}
                                onChange={(e) => setdni(e.target.value)}
                                placeholder='DNI'
                            />
                        </div>
                        <div className="eight wide field">
                            <label >Fecha de nacimiento</label>

                            <input type="date" value={fechaNacimiento} onChange={e => setfechaNacimiento(e.target.value)} />
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

                    <div className="field">
                        <div className="two fields">

                            <div className="field">
                                <label>Número de matrícula</label>
                                <input type="text"
                                    value={matricula}
                                    onChange={e => setmatricula(e.target.value)} />
                            </div>
                            <div className="field">
                                <label>Número de legajo </label>
                                <input type="text"
                                    value={legajo}
                                    onChange={(e) => setlegajo(e.target.value)}
                                    placeholder='Legajo'
                                />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="ui center aligned segment">
                    <button className='ui blue button' onClick={deleteMedico}>Confirmar</button>
                    <Link to='/medicos/listadomedicos' className='ui negative button' >Cancelar</Link>
                    <div class={`ui ${loaderState} inline loader`}></div>

                </div>


            </div>

        </div>
    )
}

export default BajaMedico
