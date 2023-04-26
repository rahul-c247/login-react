import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notifications from "../utilities/Notifications";
import Input from "../components/Input";
import Button from "../components/Button";
import '../styles/auth.css'
import jwtDecode from "jwt-decode";
/* import 'https://apis.google.com/js/platform.js' */

function Login(){
  const [loginData,setLoginData] = useState({
    email:'',
    password:''
  })
  const [emailErr,setEmailErr] = useState('')
  const [passwordErr,setPasswordErr] = useState('')
  const [success,setSuccess] = useState('')
  const [googleUser,setGoogleUser] = useState({})

  const isLoggedIn = localStorage.getItem('loginData');
  const isGmailLoggedIn = localStorage.getItem('gmailLogin');

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
      setEmailErr(Notifications.required);
    }else if(!loginData.email.includes('rahul@gmail.com')){
      setEmailErr(Notifications.invalidEmail);
    }else{
      setEmailErr('')
    }

    if(!loginData.password){
      setPasswordErr(Notifications.required);
    }else if(!loginData.password.includes('rahul123')){
      setPasswordErr(Notifications.invalidPassword);
    }else{
      setPasswordErr('')
    }

    if(loginData.email.includes('rahul@gmail.com') && loginData.password.includes('rahul123')){
      localStorage.setItem('loginData',JSON.stringify({
        email:'rahul@gmail.com',
        password:'rahul123'
      }));
      setSuccess(Notifications.loginSuccess)
      navigate('/dashboard');
    }
  }

  const handleCallback=(response)=>{
    console.log('response',response.credential);
    var userObject = jwtDecode(response.credential)
    console.log(userObject);
    setGoogleUser(userObject)
    navigate('/dashboard');
    localStorage.setItem('gmailLogin',JSON.stringify(userObject));
  }

  useEffect(() => {
    if(isLoggedIn || isGmailLoggedIn){
      navigate('/dashboard');
    }
    window.google.accounts.id.initialize({
      client_id: '1059940744811-dqu0n7q5gu8pdr3ug38eqk1gvus6i5c6.apps.googleusercontent.com',
      callback:handleCallback
    })
    window.google.accounts.id.renderButton(
      document.getElementById("googleLogin"),{
      theme:'outline',size:'large'
    })
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

          <div id="googleLogin"></div>
          {/* {googleUser && <div>
            <img src={googleUser.picture} alt="profile image" width={100} height={100}/>
            <h2>{googleUser.given_name}{googleUser.family_name}</h2>
            </div>
          } */}

          {/* <div id="g_id_onload"
            data-client_id="YOUR_GOOGLE_CLIENT_ID"
            data-login_uri="https://your.domain/your_login_endpoint"
            data-auto_prompt="false">
          </div> */}
          {/* <div className="g-signin2" dataonsuccess={onSignIn}></div> */}

          {/* <div id="g_id_onload"
            data-client_id="1059940744811-dqu0n7q5gu8pdr3ug38eqk1gvus6i5c6.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="/dashboard"
            data-callback={()=>onSignIn()}
            data-itp_support="true">
        </div>

        <div className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left">
        </div> */}
        </div>
      </div>
      :null}
    </>
  )
}

export default Login