import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Login() {
    const[email, setemail]=useState('');
  const[password, setpassword]=useState('');
  const[errors,seterrors]=useState({});
  const navigate=useNavigate();
  const handlesubmit=()=>{
    const data={
        email,
        password
    };
    axios
    .post("http://localhost:5000/user/login",data)
    .then((response)=>{
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("userAvatar", response.data.avatar);
      
        // console.log(data);
        navigate('/landing');
    })
    .catch((error)=>{
        seterrors(error.response.data);

    })
}
  return (
    <div className='container'>
      <div className="signup">
        <h2>Login</h2>
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
          <span>password</span>
          <div>{errors.password}</div>
        </div>
        <div className="inputBox">
          <input type="submit" onClick={handlesubmit} value="Login"/>
        </div>
        <p>Create Account <Link to='/register' className='login'>Sign Up</Link></p>
      </div>
    </div>
  )
}
