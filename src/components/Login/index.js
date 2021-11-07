import React from 'react'
import { useState } from 'react'
import './styles.css'

const Login = () => {
    const [username, setusername] = useState('')
    const [pass, setpass] = useState('')
/**let formu = new FormData();
  
formu.append('nombre',123123)
formu.append('apellido','carlos')
console.log(formu.get('nombre')) */




  return (
            

            <div className="ui middle aligned grid center aligned">  
                    
           
                

        

            <div className="column">
                <h2 className="ui image header">
                <div className="content">
                    Accede a tu cuenta
                </div>
                </h2>
                <form className="ui large form">
                <div className="ui stacked secondary  segment">
                    <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        
                        <input                                
                             type="text" 
                             value = {username}
                             placeholder={'Nombre de usuario'}
                             onChange= {(e)=>setusername(e.target.value)}
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
                        value= {pass}
                        onChange={(e)=> setpass(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="ui fluid large blue submit button">Login</div>
                </div>

                <div className="ui error message"></div>

                </form>

              
            </div>

       
            </div>
         



  )
}

export default Login

