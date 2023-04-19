import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notification from "../notifications";
import Input from "../components/Input";
import Button from "../components/Button";
import '../styles/auth.css'

function Login(){
  const [loginData,setLoginData] = useState({
    email:'',
    password:''
  })
  const [emailErr,setEmailErr] = useState('')
  const [passwordErr,setPasswordErr] = useState('')
  const [success,setSuccess] = useState('')

  const isLoggedIn = localStorage.getItem('loginData');

  const navigate = useNavigate();

  const handleInput =(e)=>{
    const {name, value} = e.target
    setLoginData({
      ...loginData,
      [name]:value
    })
  }

  const loginSubmit =(e)=>{
    e.preventDefault()
    console.log(loginData);

    if(!loginData.email){
      setEmailErr(notification.required);
    }else if(!loginData.email.includes('rahul@gmail.com')){
      setEmailErr(notification.invalidEmail);
    }else{
      setEmailErr('')
    }

    if(!loginData.password){
      setPasswordErr(notification.required);
    }else if(!loginData.password.includes('rahul123')){
      setPasswordErr(notification.invalidPassword);
    }else{
      setPasswordErr('')
    }

    if(loginData.email.includes('rahul@gmail.com') && loginData.password.includes('rahul123')){
      localStorage.setItem('loginData',JSON.stringify({
        email:'rahul@gmail.com',
        password:'rahul123'
      }));
      setSuccess(notification.loginSuccess)
      navigate('/dashboard');
    }
  }

  useEffect(() => {
    if(isLoggedIn){
      navigate('/dashboard');
    }
  }, []);

  return(
    <>
      {!isLoggedIn ? 
      <div className="login-wrapper">
        <div className="login-box">
          <h2>Login Form</h2>
          <form onSubmit={loginSubmit}>
            <Input 
              label="Email"
              type="email"
              placeholder="Enter email"
              className={`input-box animate__animated ${!emailErr ? null : 'animate__headShake'}`}
              name="email"
              value={loginData.email}
              onChange={handleInput}
              error={emailErr}/>

            <Input 
              label="Password"
              type="password"
              placeholder="Enter password"
              className={`input-box animate__animated ${!passwordErr ? null : 'animate__headShake'}`}
              name="password"
              value={loginData.password}
              onChange={handleInput}
              error={passwordErr}/>

            <Button type="submit" className="btn">Login</Button>

            <div className="signup_link"><a href="/signup">Create new account.</a></div>

            {success ? <p className="success animate__animated animate__bounceInRight">{success}</p>: null}
          </form>
        </div>
      </div>
      :null}
    </>
  )
}

export default Login