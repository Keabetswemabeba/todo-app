import React, { useEffect, useRef, useState } from 'react';

import Home from "./Home.js";

function Login() {
    const name=useRef()
    const email=useRef()
    const password=useRef()
    const [showHome, setShowHome]=useState(false)
    const [show, setShow]=useState(false)
    const localSignup=localStorage.getItem("signUp")
    const localEmail=localStorage.getItem("email")
    const localPassword=localStorage.getItem("password")
    const localName=localStorage.getItem("name")

    useEffect(()=>{
        if(localSignup){
            setShowHome(true)
        }
        if(localEmail){
            setShow(true)
        }
    })

    const handleClick=()=>{
        if(name.current.value&&email.current.value&&password.current.value)
        {
            localStorage.setItem("name",name.current.value)
            localStorage.setItem("email",email.current.value)
            localStorage.setItem("password",password.current.value)
            localStorage.setItem("signUp",email.current.value)
            alert("Account created successfully!!")
            window.location.reload()
        }
    }
    
    const handleLogin=()=>{
        if(email.current.value==localEmail&&password.current.value==localPassword){
            localStorage.setItem("signUp",email.current.value)
            window.location.reload()
        }else(
            alert("Please Enter Valid Credentials")
        )
    }
  return (
    <div>
        {showHome?<Home />:
        (show?
            <div className="container">
                <h1>Hello {localName}</h1>
                <div className="input_space">
                  <input placeholder="Email" type='text' ref={email} />
                </div>
                <div className="input_space">
                  <input placeholder="Password" type='password' ref={password} />
                </div>
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
            :
            <div className="container">
                <h1>Hello {localName}</h1>
                <div className="input_space">
                   <input placeholder="Name" type='text' ref={name} />
                </div>
                <div className="input_space">
                  <input placeholder="Email" type='text' ref={email} />
                </div>
                <div className="input_space">
                  <input placeholder="Password" type='password' ref={password} />
                </div>
                <button className="login-btn" onClick={handleClick}>Sign Up</button>
            </div>)
        }
    </div>
  );
}

export default Login;