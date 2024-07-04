import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="ui middle aligned center aligned ">
      <div className="column">
        <h2 className="ui image header">
          <div className="content">
            Accede a tu cuenta
          </div>
        </h2>
        <form className="ui large form">
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
            <Link to='/' className="ui fluid large blue submit button">Login</Link>
          </div>
          <div className="ui error message"></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
