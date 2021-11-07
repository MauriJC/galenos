import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login'

import SubirRadiografia from './components/SubirRadiografia'

//ABM medico
import ListadoMedicos from './components/ABMMedico/ListadoMedicos';
import AltaMedico from './components/ABMMedico/AltaMedico';
import ModificarMedico from './components/ABMMedico/ModificarMedico';

const App = () => {

  return (
     <BrowserRouter>
        <Routes>
            <Route path="/subirRadiografia" element={<SubirRadiografia/>}/>

            <Route path='/listadoMedicos' element={<ListadoMedicos></ListadoMedicos>}></Route>
            <Route path='/altaMedico' element={<AltaMedico></AltaMedico>}></Route>
            <Route path='/modificarMedico/:nlegajo' element={<ModificarMedico></ModificarMedico>}></Route>
            <Route path='/' element= {<Login/>}></Route>
              
           
            <Route path="/" ></Route>
        </Routes> 

        </BrowserRouter>
        
     
    
  )
}

ReactDOM.render(<App/>, document.querySelector("#root"))