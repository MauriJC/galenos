import React, { useState } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../apis';

const Login = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!username) {
      errors.username = 'Nombre de usuario es requerido';
      isValid = false;
    }

    if (!pass) {
      errors.pass = 'Contraseña es requerida';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.post('/login', {
        username,
        password: pass,
      });

      const token = response.data.token;
      localStorage.setItem('Authorization', `Token ${token}`); 
      navigate('/'); 
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError('Usuario no existe');
        } else if (err.response.status === 400) {
          setError('Nombre de usuario o contraseña incorrectos');
        } else {
          setError('Ocurrió un error. Por favor, inténtelo de nuevo.');
        }
      } else {
        setError('No se pudo conectar con el servidor. Por favor, inténtelo de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="ui middle aligned center aligned ">
      <div className="column">
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt='GALENOS' className='logo' />
          <span className='logo-text'>GALENOS</span>
        </div>
        <h2 className="ui image header">
          <div className="content">Accede a tu cuenta</div>
        </h2>
        <form className="ui large form" onSubmit={handleLogin}>
          <div className="ui stacked secondary segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  type="text"
                  value={username}
                  placeholder="Nombre de usuario"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {validationErrors.username && <div className="ui pointing red basic label">{validationErrors.username}</div>}
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              {validationErrors.pass && <div className="ui pointing red basic label">{validationErrors.pass}</div>}
            </div>
            <button type="submit" className="ui fluid large blue submit button">
              Login
            </button>
          </div>
          {error && <div className="ui negative message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
