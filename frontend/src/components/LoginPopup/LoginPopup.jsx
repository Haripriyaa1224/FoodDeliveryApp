import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {

  const {url, token, setToken} = useContext(StoreContext);

    const [currentState, setCurrentState] = useState("Sign Up");
    const [data, setData] = useState({
      name:"",
      email:'',
      password:''
    });

    const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }


    // useEffect(()=>{
    //   console.log(data);
    // },[data])

    //userLogin

    const onLogin = async (event)=>{
      event.preventDefault();
      let newUrl = url;
      if(currentState === 'Login'){
        newUrl += '/api/user/login';
      }
      else{
        newUrl += '/api/user/register';
      }

      const response = await axios.post(newUrl, data);
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
      }
      else{
        alert(response.data.message);
      }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
              {currentState === 'Login' ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
              
              <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='your email' required />
              <input name="password" onChange={onChangeHandler} value={data.password} type="password"  placeholder='enter passsword' required />
              

            </div>
            <button type='submit'>{currentState === 'Sign Up' ? 'Create Account' : 'Login' }</button>
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