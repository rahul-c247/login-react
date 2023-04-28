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


  /* window.fbAsyncInit = function() {
    window.FB.init({
      appId      : '247992354441620',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.7'
    });
      
    window.FB.AppEvents.logPageView();     
  }; */

 /*  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk')); */


   function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      testAPI();
    } else {                                 // Not logged into your webpage or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
    }
  }


  function checkLoginState() {               // Called when a person is finished with the Login Button.
    window.FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
  }


  window.fbAsyncInit = function() {
    window.FB.init({
      appId      : '247992354441620',
      cookie     : true,                     // Enable cookies to allow the server to access the session.
      xfbml      : true,                     // Parse social plugins on this webpage.
      version    : 'v5.0'           // Use this Graph API version for this call.
    });


    window.FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
      statusChangeCallback(response);        // Returns the login status.
    });
  };


  (function(d, s, id) {                      // Load the SDK asynchronously
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    window.FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
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


          {/* <div id="facebook-jssdk"></div>

          <div className="fb-login-button" data-width="100" data-size="" data-button-type="" data-layout="" data-auto-logout-link="true" data-use-continue-as="false"></div> */}

<div id="fb-root"></div>
<div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="true"></div>
<div id="status"></div>

        </div>
      </div>
      :null}
    </>
  )
}

export default Login