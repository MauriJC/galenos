import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SubirRadiografia from './components/SubirRadiografia'

const App = () => {

  return (
      <BrowserRouter>
        <Switch>
            <Route path='/subirRadiografia' component = {SubirRadiografia} ></Route>
        </Switch>
      </BrowserRouter>
    
  )
}

ReactDOM.render(<App/>, document.querySelector("#root"))