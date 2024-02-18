import React from 'react'
import { UseFirebase } from '../context/ContextBase';

import { auth, provider } from '../context/ContextBase';

import {signInWithPopup} from 'firebase/auth'

import { useNavigate } from 'react-router';
// LETS implement login Here...

import "./../styles/Login.css"


function Login({setIsAuth}) {

const firebase=UseFirebase();
const navigate=useNavigate();

  const signup=()=>{
    console.log("User Signing in....");
    signInWithPopup(auth,provider)
    .then((res)=>{
            setIsAuth(true);
            console.log("user Logged");
            localStorage.setItem("User",res.user.email);
            console.log(res.user.email);
            navigate("/");

    })
    .catch(er=>{
       console.log("Error ",er);

    })
    
  }

  return (
    <div className='login'>
      <p className="display-4">Signup With Google</p>
      <button className='btn' onClick={signup} >
      <i className="material-icons" style={{width:"20px",height:"auto"}} >Google</i> Sign Up!
      </button>
    </div>
  )
}

export default Login