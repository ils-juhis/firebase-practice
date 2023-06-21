import React, {useState} from 'react'
import {app} from "../../firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function Signup() {
    const [data, setData] = useState({email:"", password:""});
    const handleChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const signupUser = ()=>{
        createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      setData({email:"", password:""})
      }

      const signupWithGoogle = ()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
      }
  return (
    <>
        <div className="container">
          <h3>SIGN UP</h3> 
          <div>
              <input onChange={handleChange} name="email" value={data.email} required/>
              <br/>
              <input onChange={handleChange} name="password" value={data.password} required/>
              <br/>
              <button onClick={signupUser}>Sign Up</button>
              <br/>
              <button className="google-btn" onClick={signupWithGoogle}>Sign Up with GOOGLE</button>
          </div>
        </div>
    </>
  )
}

export default Signup 