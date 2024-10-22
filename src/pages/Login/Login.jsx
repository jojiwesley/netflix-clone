import React, { useState } from 'react'
import './Login.css'
import Logo from '../../assets/logo.png'
import {login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

const [singState,setSingState] = useState("Sign In");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const user_auth = async (event) => {
event.preventDefault();
setLoading(true);
  if(singState === "Sign In")
    await login(email, password)
  else{
    await signup(name, email, password)
  }
  setLoading(false);
}

  return (
    loading ? <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div> :
    <div className='login'>
      <img src={Logo} alt="" className='login-logo ' />
      <div className="login-form">
        <h1>{singState}</h1>

        <form action="">
          {singState === "Sing Up" ? <input  value={name} onChange={(e) => {setName(e.target.value)}} type="text" placeholder='Your name'/> : <></>}
          <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder='Email'/>
          <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder='Password' />
          <button onClick={user_auth} type='submit'>{singState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          { 
          singState === "Sign In" 
          ? 
          <p>Bew to Netflix? <span onClick={()=>{setSingState("Sing Up")}}>Sing Up Now</span></p> 
          : 
          <p>Already have account <span  onClick={()=>{setSingState("Sign In")}}>Sing Up Now</span> <span></span></p>
          }
        </div>
      </div>
    </div>
  )
}

export default Login