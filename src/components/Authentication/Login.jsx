import React, {useState} from 'react'
import {app} from "../../firebase";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";

const auth = getAuth(app);

function Login() {
    const [data, setData] = useState({email:"", password:""});
    const handleChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const loginUser = ()=>{
        signInWithEmailAndPassword (auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code)
      });
      setData({email:"", password:""})
      }
  return (
    <>
        <div className="container">
          <h3>LOGIN</h3> 
          <div>
              <input onChange={handleChange} name="email" value={data.email} required/>
              <br/>
              <input onChange={handleChange} name="password" value={data.password} required/>
              <br/>
              <button onClick={loginUser}>LOGIN</button>

              
          </div>
        </div>
    </>
  )
}

export default Login