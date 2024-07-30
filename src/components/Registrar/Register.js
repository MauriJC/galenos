import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import 'semantic-ui-css/semantic.min.css';
import { Form, Button, Container, Header, Select } from 'semantic-ui-react';
import api from '../../apis';
import './styles.css'; // Asegúrate de importar los estilos

const roleOptions = [
  { key: 'MEDICO', value: 'MEDICO', text: 'Medico' },
  { key: 'SECRETARIO', value: 'SECRETARIO', text: 'Secretario' },
  { key: 'RADIOLOGO', value: 'RADIOLOGO', text: 'Radiologo' },
];

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const handleChange = (e, data) => {
    const { name, value } = data || e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/register', formData);
      swal({
        icon: 'success',
        title: 'Registro exitoso',
        text: response.data.message
      });
      navigate('/login');
    } catch (error) {
      swal({
        icon: 'error',
        title: 'Error en el registro',
        text: error.response.data.error
      });
    }
  };

  return (
    <div className="login-page">
      <div className="ui middle aligned center aligned grid login-grid">
        <div className="column login-column">
          <div className="ui segment login-segment">
            <div className="logo-container">
              <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt='GALENOS' className='logo' />
              <span className='logo-text'>GALENOS</span>
            </div>
            <h2 className="ui image header login-header">
              <div className="content">Registrarse</div>
            </h2>
            <form className="ui large form login-form" onSubmit={handleSubmit}>
              <div className="ui stacked secondary segment login-inputs">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input
                      type="text"
                      value={formData.username}
                      placeholder="Nombre de usuario"
                      name="username"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="mail icon"></i>
                    <input
                      type="email"
                      value={formData.email}
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input
                      type="password"
                      value={formData.password}
                      placeholder="Contraseña"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <Select
                    label="Role"
                    options={roleOptions}
                    placeholder="Seleccionar rol"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" color="blue" fluid>Registrarse</Button>
              </div>
            </form>
            <div className="ui message">
              ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
