import React from 'react'
import {app} from "../../firebase";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);

function Home(props) {
  const signout =()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div>
      <div>Hello {props.name}</div>
      <button onClick={signout}>Log Out</button> 
    </div>
  )
}


export default Home