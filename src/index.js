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

import ImagenBase64 from './components/Mapa';

const App = () => {
  const location = useLocation();

  const showNavbar = location.pathname !== '/login';

  return (
    <>
      {showNavbar && <Navbar />}
      <div className='ui container'>
        <Routes>
          <Route path='/subirradiografia' element={<SubirRadiografia />} />
          <Route path='/medicos/listadomedicos' element={<ListadoMedicos />} />
          <Route path='/medicos/altamedico' element={<AltaMedico />} />
          <Route path='/medicos/modificarmedico/:numero_matricula' element={<ModificarMedico />} />
          <Route path='/medicos/bajamedico/:nmatricula' element={<BajaMedico />} />
          <Route path='/radiologos/listadoradiologos' element={<ListadoRadiologos />} />
          <Route path='/radiologos/altaradiologo' element={<AltaRadiologo />} />
          <Route path='/radiologos/modificarradiologo/:nmatricula' element={<ModificarRadiologo />} />
          <Route path='/radiologos/bajaradiologo/:nmatricula' element={<BajaRadiologo />} />
          <Route path='/pacientes/altapaciente' element={<AltaPaciente />} />
          <Route path='/pacientes/modificarpaciente/:nafiliado' element={<ModificarPaciente />} />
          <Route path='/pacientes/listadopacientes' element={<ListadoPacientes />} />
          <Route path='/pacientes/bajapaciente/:nafiliado' element={<BajaPaciente />} />
          <Route path='/secretarios/altasecretario' element={<AltaSecretario />} />
          <Route path='/secretarios/listadosecretarios' element={<ListadoSecretarios />} />
          <Route path='/secretarios/bajasecretario/:nlegajo' element={<BajaSecretario />} />
          <Route path='/secretarios/modificarsecretario/:nlegajo' element={<ModificarSecretario />} />
          <Route path='/diagnosticos/listadodiagnosticos' element={<ListadoDiagnosticos />} />
          <Route path='/diagnosticos/listadodiagnosticos/ver/:idDiagnostico/:nroAfiliado' element={<Diagnostico />} />
          <Route path='/mapa' element={<ImagenBase64 />} />

          <Route path='/' element={<Menu />} />
          <Route path='/login' element={<Login />} />
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
