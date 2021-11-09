import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login'

import SubirRadiografia from './components/SubirRadiografia'

//ABM medico
import ListadoMedicos from './components/ABMMedico/ListadoMedicos';
import AltaMedico from './components/ABMMedico/AltaMedico';
import ModificarMedico from './components/ABMMedico/ModificarMedico';

//ABM radiologo
import AltaRadiologo from './components/ABMRadiologo/AltaRadiologo';
import ModificarRadiologo from './components/ABMRadiologo/ModificarRadiologo';
import ListadoRadiologos from './components/ABMRadiologo/ListadoRadiologos';


//ABM paciente
import AltaPaciente from './components/ABMPaciente/AltaPaciente';
import ModificarPaciente from './components/ABMPaciente/ModificarPaciente';
import ListadoPacientes from './components/ABMPaciente/ListadoPacientes';
import ListadoDiagnosticos from './components/Diagnosticos/ListadoDiagnosticos';


//Diagnosticos

const App = () => {

  return (
     <BrowserRouter>
     
        <Routes>
            
            <Route path="/subirRadiografia" element={<SubirRadiografia/>}/>

            <Route path='/medicos/listadoMedicos' element={<ListadoMedicos></ListadoMedicos>}></Route>
            <Route path='/medicos/altaMedico' element={<AltaMedico></AltaMedico>}></Route>
            <Route path='/medicos/modificarMedico/:nlegajo' element={<ModificarMedico></ModificarMedico>}></Route>

            <Route path='/radiologos/listadoRadiologos' element={<ListadoRadiologos/>}></Route>
            <Route path='/radiologos/altaradiologo' element={<AltaRadiologo></AltaRadiologo>}></Route>
            <Route path='/radiologos/modificarRadiologo/:nmatricula' element={<ModificarRadiologo></ModificarRadiologo>}></Route>

            <Route path='pacientes/altapaciente' element={<AltaPaciente/>}></Route>
            <Route path='pacientes/modificarpaciente' element={<ModificarPaciente/>}></Route>
            <Route path='pacientes/listadopacientes' element={<ListadoPacientes/>}></Route>

            <Route path='diagnosticos/listadodiagnosticos' element = {<ListadoDiagnosticos/>}></Route>

            <Route path='/' element= {<Login/>}></Route>
              
        </Routes> 

        </BrowserRouter>
        
     
    
  )
}

ReactDOM.render(<App/>, document.querySelector("#root"))