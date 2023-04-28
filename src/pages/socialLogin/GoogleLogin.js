import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function GoogleLogin(){
  const isGmailLoggedIn = localStorage.getItem('gmailLogin');
  const navigate = useNavigate();

  const handleCallback=(response)=>{
    console.log('response',response.credential);
    var userObject = jwtDecode(response.credential)
    navigate('/dashboard');
    localStorage.setItem('gmailLogin',JSON.stringify(userObject));
  }

  useEffect(() => {
    if(isGmailLoggedIn){
      navigate('/dashboard');
    }
    window.google.accounts.id.initialize({
      client_id: '1059940744811-dqu0n7q5gu8pdr3ug38eqk1gvus6i5c6.apps.googleusercontent.com',
      callback:handleCallback
    })
    window.google.accounts.id.renderButton(
      document.getElementById("googleLogin"),{
      theme:'outline',
      size:'large'
    })
  }, []);

  return(
    <div className="social-buttons" id="googleLogin"></div>
  )
}

export default GoogleLogin