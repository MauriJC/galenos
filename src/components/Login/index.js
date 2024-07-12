import React, { useState } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../apis';

const Login = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', {
        username,
        password: pass,
      });
      const token = response.data.token;
      localStorage.setItem('Authorization', `Token ${token}`); 
      navigate('/'); 
    } catch (err) {
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="ui middle aligned center aligned">
      <div className="column">
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
            </div>
            <button type="submit" className="ui fluid large blue submit button">
              Login
            </button>
          </div>
          {error && <div className="ui error message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
