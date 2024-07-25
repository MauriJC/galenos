import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Navbar from './components/navbar/Navbar';
import Login from './components/Login';
import SubirRadiografia from './components/SubirRadiografia';

// ABM Medico
import ListadoMedicos from './components/ABMMedico/ListadoMedicos';
import AltaMedico from './components/ABMMedico/AltaMedico';
import ModificarMedico from './components/ABMMedico/ModificarMedico';
import BajaMedico from './components/ABMMedico/BajaMedico';

// ABM Radiologo
import AltaRadiologo from './components/ABMRadiologo/AltaRadiologo';
import ModificarRadiologo from './components/ABMRadiologo/ModificarRadiologo';
import ListadoRadiologos from './components/ABMRadiologo/ListadoRadiologos';
import BajaRadiologo from './components/ABMRadiologo/BajaRadiologo';

// ABM Paciente
import AltaPaciente from './components/ABMPaciente/AltaPaciente';
import ModificarPaciente from './components/ABMPaciente/ModificarPaciente';
import ListadoPacientes from './components/ABMPaciente/ListadoPacientes';
import BajaPaciente from './components/ABMPaciente/BajaPaciente';

import ListadoDiagnosticos from './components/Diagnosticos/ListadoDiagnosticos';
import Diagnostico from './components/Diagnosticos/Diagnostico';

import Menu from './components/Menu';

// ABM Secretario
import AltaSecretario from './components/ABMSecretario/AltaSecretario';
import ListadoSecretarios from './components/ABMSecretario/ListadoSecretarios';
import BajaSecretario from './components/ABMSecretario/BajaSecretario';
import ModificarSecretario from './components/ABMSecretario/ModificarSecretario';

//Mapa
import ImagenBase64 from './components/Mapa';

//proteccion de turas
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


const App = () => {
  const location = useLocation();

  const showNavbar = location.pathname !== '/login';
  return (
    <>
      {showNavbar && <Navbar />}
      <div className='ui container'>
        <Routes>
          <Route path='/login' element={<Login />} />
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
              <PrivateRoute>
                <ListadoMedicos />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/medicos/altamedico' 
            element={
              <PrivateRoute>
                <AltaMedico />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/medicos/modificarmedico/:numero_matricula' 
            element={
              <PrivateRoute>
                <ModificarMedico />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/medicos/bajamedico/:nmatricula' 
            element={
              <PrivateRoute>
                <BajaMedico />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/radiologos/listadoradiologos' 
            element={
              <PrivateRoute>
                <ListadoRadiologos />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/radiologos/altaradiologo' 
            element={
              <PrivateRoute>
                <AltaRadiologo />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/radiologos/modificarradiologo/:nmatricula' 
            element={
              <PrivateRoute>
                <ModificarRadiologo />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/radiologos/bajaradiologo/:nmatricula' 
            element={
              <PrivateRoute>
                <BajaRadiologo />
              </PrivateRoute>
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
              <PrivateRoute>
                <AltaSecretario />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/secretarios/listadosecretarios' 
            element={
              <PrivateRoute>
                <ListadoSecretarios />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/secretarios/bajasecretario/:nlegajo' 
            element={
              <PrivateRoute>
                <BajaSecretario />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/secretarios/modificarsecretario/:nlegajo' 
            element={
              <PrivateRoute>
                <ModificarSecretario />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/diagnosticos/listadodiagnosticos' 
            element={
              <PrivateRoute>
                <ListadoDiagnosticos />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/diagnosticos/listadodiagnosticos/ver/:idDiagnostico/:nroAfiliado' 
            element={
              <PrivateRoute>
                <Diagnostico />
              </PrivateRoute>
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