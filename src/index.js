import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Navbar from './components/navbar/Navbar';
import Login from './components/Login';
import Register from './components/Registrar/Register';
import ChangePassword from './components/ChangePassword/ChangePassword'; // Agrega esta línea
import SubirRadiografia from './components/SubirRadiografia';
import ListadoMedicos from './components/ABMMedico/ListadoMedicos';
import AltaMedico from './components/ABMMedico/AltaMedico';
import ModificarMedico from './components/ABMMedico/ModificarMedico';
import BajaMedico from './components/ABMMedico/BajaMedico';
import AltaRadiologo from './components/ABMRadiologo/AltaRadiologo';
import ModificarRadiologo from './components/ABMRadiologo/ModificarRadiologo';
import ListadoRadiologos from './components/ABMRadiologo/ListadoRadiologos';
import BajaRadiologo from './components/ABMRadiologo/BajaRadiologo';
import AltaPaciente from './components/ABMPaciente/AltaPaciente';
import ModificarPaciente from './components/ABMPaciente/ModificarPaciente';
import ListadoPacientes from './components/ABMPaciente/ListadoPacientes';
import BajaPaciente from './components/ABMPaciente/BajaPaciente';
import ListadoDiagnosticos from './components/Diagnosticos/ListadoDiagnosticos';
import Diagnostico from './components/Diagnosticos/Diagnostico';
import Menu from './components/Menu';
import AltaSecretario from './components/ABMSecretario/AltaSecretario';
import ListadoSecretarios from './components/ABMSecretario/ListadoSecretarios';
import BajaSecretario from './components/ABMSecretario/BajaSecretario';
import ModificarSecretario from './components/ABMSecretario/ModificarSecretario';
import ImagenBase64 from './components/Mapa';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PageNotFound from './components/notFound/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Unauthorized from './components/Unauthorized/Unauthorized';

const App = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('Authorization');
    setIsAuthenticated(!!token);
  }, [location]);

  const showNavbar = isAuthenticated && location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/change-password';

  return (
    <>
      {showNavbar && <Navbar />}
      <div className='ui container'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/change-password' element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          } />
          <Route 
            path='/' 
            element={
              <PrivateRoute>
                <Menu />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/subirradiografia' 
            element={
              <PrivateRoute>
                <SubirRadiografia />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/medicos/listadomedicos' 
            element={
              <ProtectedRoute 
                element={<ListadoMedicos />} 
                allowedRoles={['ADMIN','SECRETARIO']} 
              />
            } 
          />
          <Route 
            path='/medicos/altamedico' 
            element={
              <ProtectedRoute 
                element={<AltaMedico />} 
                allowedRoles={['ADMIN','SECRETARIO']} 
              />
            } 
          />
          <Route 
            path='/medicos/modificarmedico/:numero_matricula' 
            element={
              <ProtectedRoute 
                element={<ModificarMedico />} 
                allowedRoles={['ADMIN','SECRETARIO']} 
              />
            } 
          />
          <Route 
            path='/medicos/bajamedico/:nmatricula' 
            element={
              <ProtectedRoute 
                element={<BajaMedico />} 
                allowedRoles={['ADMIN','SECRETARIO']} 
              />
            } 
          />
          <Route 
            path='/radiologos/listadoradiologos' 
            element={
              <ProtectedRoute 
                element={<ListadoRadiologos />} 
                allowedRoles={['ADMIN','SECRETARIO']} 
              />
            } 
          />
          <Route 
            path='/radiologos/altaradiologo' 
            element={
              <ProtectedRoute 
                element={<AltaRadiologo />} 
                allowedRoles={['ADMIN','SECRETARIO']} 
              />
            } 
          />
          <Route 
            path='/radiologos/modificarradiologo/:nmatricula' 
            element={
              <ProtectedRoute 
                element={<ModificarRadiologo />} 
                allowedRoles={['ADMIN','SECRETARIO']} 
              />
            } 
          />
          <Route 
            path='/radiologos/bajaradiologo/:nmatricula' 
            element={
              <ProtectedRoute 
                element={<BajaRadiologo />} 
                allowedRoles={['ADMIN','SECRETARIO']} 
              />
            } 
          />
          <Route 
            path='/pacientes/altapaciente' 
            element={
              <PrivateRoute>
                <AltaPaciente />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/pacientes/modificarpaciente/:nafiliado' 
            element={
              <PrivateRoute>
                <ModificarPaciente />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/pacientes/listadopacientes' 
            element={
              <PrivateRoute>
                <ListadoPacientes />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/pacientes/bajapaciente/:nafiliado' 
            element={
              <PrivateRoute>
                <BajaPaciente />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/secretarios/altasecretario' 
            element={
              <ProtectedRoute 
                element={<AltaSecretario />} 
                allowedRoles={['ADMIN']} 
              />
            } 
          />
          <Route 
            path='/secretarios/listadosecretarios' 
            element={
              <ProtectedRoute 
                element={<ListadoSecretarios />} 
                allowedRoles={['ADMIN']} 
              />
            } 
          />
          <Route 
            path='/secretarios/bajasecretario/:nlegajo' 
            element={
              <ProtectedRoute 
                element={<BajaSecretario />} 
                allowedRoles={['ADMIN']} 
              />
            } 
          />
          <Route 
            path='/secretarios/modificarsecretario/:nlegajo' 
            element={
              <ProtectedRoute 
                element={<ModificarSecretario />} 
                allowedRoles={['ADMIN']} 
              />
            } 
          />
          <Route 
            path='/diagnosticos/listadodiagnosticos' 
            element={
              <ProtectedRoute 
                element={<ListadoDiagnosticos />} 
                allowedRoles={['ADMIN','MEDICO','SECRETARIO']} 
              />
            } 
          />
          <Route 
            path='/diagnosticos/listadodiagnosticos/ver/:idDiagnostico/:nroAfiliado' 
            element={
              <ProtectedRoute 
                element={<Diagnostico />} 
                allowedRoles={['ADMIN','MEDICO','SECRETARIO']} 
              />
            } 
          />
          <Route 
            path='/mapa' 
            element={
              <PrivateRoute>
                <ImagenBase64 />
              </PrivateRoute>
            } 
          />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(<AppWrapper />, document.querySelector('#root'));
