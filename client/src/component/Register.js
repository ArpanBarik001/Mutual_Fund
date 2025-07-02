import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './css/Register.css';
// import {Helmet, HelmetProvider} from "react-helmet-async";

export default function Register() {
    const[name,setname]=useState('');
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const[password2,setpassword2]=useState('');
    const[errors,seterrors]=useState({});
    const navigate=useNavigate();
    const handlesubmit=()=>{
        const data={
            name,
            email,
            password,
            password2
        };
        axios
        .post("http://localhost:5000/user/register",data)
        .then((response)=>{
            localStorage.setItem("userAvatar", response.data.avatar);
            // console.log(data);
            navigate("/login");
        })
        .catch((error)=>{
            seterrors(error.response.data);

        })
    }
  return (
    <div className='container'>
      <div className="signup">
        <h2>Sign Up</h2>
        <div className="inputBox">
          <input type="text" required="required"
           value={name}
           onChange={(e)=>setname(e.target.value)}
            />
          <i className="fa-solid fa-user"></i>
          <span>username</span>
          <div>{errors.name}</div>
        </div>
        <div className="inputBox">
          <input type="text" required="required" 
           value={email}
           onChange={(e)=>setemail(e.target.value)}
           />
          <i className="fa-solid fa-envelope"></i>
          <span>email</span>
          <div>{errors.email}</div>
        </div>
        <div className="inputBox">
          <input type="text" required="required"
           value={password}
           onChange={(e)=>setpassword(e.target.value)}
           />
           <i className="fa-solid fa-lock"></i>
          <span>create password</span>
          <div>{errors.password}</div>
        </div>
        <div className="inputBox">
          <input type="text" required="required"
           value={password2}
           onChange={(e)=>setpassword2(e.target.value)}
           />
           <i className="fa-solid fa-lock"></i>
          <span>confirm password</span>
          <div>{errors.password2}</div>
        </div>
        <div className="inputBox">
          <input type="submit" onClick={handlesubmit} value="Create Account"/>
        </div>
        <p>Already a member ? <Link to='/login' className='login'>Log in</Link></p>
      </div>
    </div>
  )
}
