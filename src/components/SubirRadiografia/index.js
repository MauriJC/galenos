import api from '../../apis';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './styles.css'
const SubirRadiografia = () => {
  const [nroAfiliado, setNroAfiliado] = useState(''); 
  const [infoAfiliado, setInfoAfiliado] = useState(null);
  const [radiografia, setRadiografia] = useState(null);
  const [inputFileState, setInputFileState] = useState(true);
  const [nromatricularadiologo, setnromatricularadiologo] = useState('');
  const [listadoRadiologos, setlistadoRadiologos] = useState([]);
  const [listaMedicos, setlistaMedicos] = useState([]);
  const [matriculaMedico, setmatriculaMedico] = useState('');
  const [fechaRadiografia, setfechaRadiografia] = useState('');
  const [tipoRadiografia, settipoRadiografia] = useState('Radiografía de Torax');
  const [descripcion, setdescripcion] = useState('');
  const [loaderState, setloaderState] = useState('disabled');
  const [loaderCargar, setloaderCargar] = useState('disabled');
  const [errors, setErrors] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    getRadiologos();
    getListadoMedicos();
  }, []);

  const getInfoAfiliado = async (e) => {
    e.preventDefault();
    const headers = { "Content-Type": "application/json" };
    const params = { paciente: nroAfiliado };
    setloaderState('active');

    try {
      const response = await api.get(`/altapaciente`, { params }, { headers });
      setInputFileState(false);
      setInfoAfiliado(response.data.paciente);

      if (response.data.status === 200) { 
        swal(`${response.data.status}`, "Afiliado encontrado!", "success");
      } else {
        swal(`Error`, response.data.message, 'error');
      }
    } catch (error) {
      swal("Error", "No se pudo encontrar el afiliado", "error");
    } finally {
      setloaderState('disabled');
    }
  };

  const getRadiologos = async () => {
    const headers = { "Content-Type": "application/json" };
    try {
      const response = await api.get('/radiologos', { headers });
      setlistadoRadiologos(response.data);
    } catch (error) {
      console.error("Error fetching radiologos:", error);
    }
  };

  const getListadoMedicos = async () => {
    try {
      const response = await api.get(`/altamedico`);
      setlistaMedicos(response.data.medicos);
    } catch (error) {
      console.error("Error fetching medicos:", error);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!nroAfiliado || !/^\d+$/.test(nroAfiliado)) {
      formErrors.nroAfiliado = "Número de afiliado es requerido y debe ser un número";
      isValid = false;
    }

    if (!matriculaMedico) {
      formErrors.matriculaMedico = "Médico es requerido";
      isValid = false;
    }

    if (!nromatricularadiologo) {
      formErrors.nromatricularadiologo = "Radiólogo es requerido";
      isValid = false;
    }

    if (!fechaRadiografia) {
      formErrors.fechaRadiografia = "Fecha es requerida";
      isValid = false;
    }

    if (!tipoRadiografia) {
      formErrors.tipoRadiografia = "Tipo de radiografía es requerido";
      isValid = false;
    }

    if (!radiografia) {
      formErrors.radiografia = "Archivo de radiografía es requerido";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const uploadRx = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      swal("Error", "Por favor, corrige los errores en el formulario", "error");
      return;
    }

    const formData = new FormData();
    formData.append('numero_afiliado', infoAfiliado['numero_afiliado']);
    formData.append('estudio', tipoRadiografia);
    formData.append('matricula_medico', parseInt(matriculaMedico));    
    formData.append('matricula_radiologo', parseInt(nromatricularadiologo));
    formData.append('placa', radiografia);
    formData.append('descripcion', descripcion);
    formData.append('fecha', fechaRadiografia);

    const headers = { "Content-Type": "multipart/form-data" };

    setloaderCargar('active');

    try {
      const response = await api.post(`/subiradiografia`, formData, { headers });
      setloaderCargar('disabled');

      if (response.data.status === 200) {
        swal({
          title: "Subida exitosa!",
          text: "La radiografia ha sido enviada correctamente",
          icon: "success"
        }).then(() => {
          navigate('/diagnosticos/listadodiagnosticos');
        });
      }
    } catch (error) {
      console.log(error);
      swal("Error", "No se pudo subir la radiografía", "error");
      setloaderCargar('disabled');
    }
  };

  const renderRadiologos = () => (
    <div className="field">
      <label> Radiologo </label>
      <select className="ui fluid dropdown" onChange={e => setnromatricularadiologo(e.target.value)} value={nromatricularadiologo}>
        <option value=''>Seleccione radiologo</option>
        {listadoRadiologos.map(radiologo => (
          <option value={radiologo.numero_matricula} key={radiologo.numero_matricula}>{radiologo.nombre} {radiologo.apellido} - {radiologo.numero_matricula} </option>
        ))}
      </select>
      {errors.nromatricularadiologo && <div className="ui pointing red basic label">{errors.nromatricularadiologo}</div>}
    </div>
  );

  const renderMedicos = () => (
    <div className="field">
      <label> Medico </label>
      <select className="ui fluid dropdown" onChange={e => setmatriculaMedico(e.target.value)} value={matriculaMedico}>
        <option value=''>Seleccione medico</option>
        {listaMedicos.map(medico => (
          <option value={medico.numero_matricula} key={medico.numero_matricula}>{medico.nombre} {medico.apellido} - {medico.numero_matricula}</option>
        ))}
      </select>
      {errors.matriculaMedico && <div className="ui pointing red basic label">{errors.matriculaMedico}</div>}
    </div>
  );

  return (
    <div>
      <form className='ui form'>
        <h1 className="ui centered dividing header">Subir Radiografia</h1>
        <div className='ui container'>
          <div className='inline fields'>
            <div className='eight wide field'>
              <label htmlFor="" >Nro de Afiliado</label>
              <input 
                type="text" 
                value={nroAfiliado}
                placeholder={'Ingrese Numero de afiliado'}
                onChange={(e) => setNroAfiliado(e.target.value)}
              />
              {errors.nroAfiliado && <div className="ui pointing red basic label">{errors.nroAfiliado}</div>}
            </div>
            <button className='ui button' onClick={getInfoAfiliado}>
              Buscar
            </button>
            <div className={`ui ${loaderState} inline loader`}></div>
          </div>
        </div>
      </form>

      <div className="ui container">
        {renderRadiologos()}
      </div>

      <div className="ui container">
        {renderMedicos()}
      </div>

      <div className="ui container">
        <div className="ui form">
          <div className="inline fields">
            <label htmlFor="">Fecha</label>
            <input type="date" value={fechaRadiografia} onChange={e => setfechaRadiografia(e.target.value)} />
            {errors.fechaRadiografia && <div className="ui pointing red basic label">{errors.fechaRadiografia}</div>}
          </div>
          <div className="inline fields">
            <label>Tipo de estudio</label>
            <input type="text" value={tipoRadiografia} onChange={e => settipoRadiografia(e.target.value)} readOnly  disabled className="readonly-input"/>
            {errors.tipoRadiografia && <div className="ui pointing red basic label">{errors.tipoRadiografia}</div>}
          </div>
        </div>
      </div>
        
      <hr />
        
      <div className='ui container'>
        <div className="ui form">
          <label htmlFor="">Apellido y nombre: {infoAfiliado ? `${infoAfiliado['apellido']}  ${infoAfiliado['nombre']}` : '' }</label>
          <br />
          <label htmlFor="">DNI: {infoAfiliado ? infoAfiliado['dni'] : '' }</label> 
          <br />
          <label htmlFor="">Archivo: </label>
          <input 
            type="file" 
            name="image" 
            accept='image/*' 
            onChange={e => setRadiografia(e.target.files[0])} 
            disabled={inputFileState} 
          />
          {errors.radiografia && <div className="ui pointing red basic label">{errors.radiografia}</div>}
          <br />
          <div className="inline fields"> 
            <label htmlFor="">Observaciones: </label>
            <input type="text" value={descripcion} onChange={e => setdescripcion(e.target.value)} />
          </div>
          <center>
            <button className='ui button blue eight wide' onClick={uploadRx}>Cargar</button>
            <div className={`ui ${loaderCargar} inline loader`}></div>
            <Link className='ui negative button eight wide' to='/'>Volver al menu</Link>
          </center>
        </div>
      </div>
    </div>
  );
};

export default SubirRadiografia;
