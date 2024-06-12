import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';

const LoginPopup = ({setShowLogin}) => {

    const [currentState, setCurrentState] = useState("Sign Up");
  return (
    <div className='login-popup'>
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
              {currentState === 'Login' ? <></> : <input type="text" placeholder='Your Name' name="name" required />}
              
              <input type="email" name="email" placeholder='your email' required />
              <input type="password" name="password" placeholder='enter passsword' required />
              

            </div>
            <button>{currentState === 'Sign Up' ? 'Create Account' : 'Login' }</button>
            <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>By continuing, I agree to the terms of use of use & privacy policy</p>
            </div>
            { 
              currentState === 'Login' ? <p>Create a New Account? <span onClick={()=>setCurrentState('Sign Up')}>Click Here</span></p> :
              <p>Already Have an Account? <span onClick={()=>setCurrentState('Login')}>Login</span></p>
            }
            
            
        </form>
    </div>
  )
}

export default LoginPopup