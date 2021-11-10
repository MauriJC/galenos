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

//ABM secretario


import ListadoDiagnosticos from './components/Diagnosticos/ListadoDiagnosticos';
import Diagnostico from './components/Diagnosticos/Diagnostico';


import Menu from './components/Menu';




import Prueba from './prueba';
import AltaSecretario from './components/ABMSecretario/AltaSecretario';
import ListadoSecretarios from './components/ABMSecretario/ListadoSecretarios';
import BajaSecretario from './components/ABMSecretario/BajaSecretario';


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

            <Route path='/pacientes/altapaciente' element={<AltaPaciente/>}></Route>
            <Route path='/pacientes/modificarpaciente' element={<ModificarPaciente/>}></Route>
            <Route path='/pacientes/listadopacientes' element={<ListadoPacientes/>}></Route>

            <Route path='/secretarios/altasecretario' element={<AltaSecretario></AltaSecretario>}></Route>
            <Route path='/secretarios/listadosecretarios' element={<ListadoSecretarios></ListadoSecretarios>}></Route>
            <Route path='/secretarios/bajasecretario/:legajo' element={<BajaSecretario></BajaSecretario>}></Route>

            <Route path='/diagnosticos/listadodiagnosticos' element = {<ListadoDiagnosticos/>}></Route>
            <Route path='/diagnosticos/listadodiagnosticos/ver/:idDiagnostico/:nroAfiliado' element = {<Diagnostico/>}></Route>

            <Route path='/menu' element={<Menu></Menu>}></Route>
            
            <Route path='/' element= {<Login/>}></Route>


            <Route path='/prueba' element= {<Prueba/>}></Route>



              
        </Routes> 

        </BrowserRouter>
        
     
    
  )
}

ReactDOM.render(<App/>, document.querySelector("#root"))