import {createContext} from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCttnu50SzgfX5f_JKEUut9EhkPCRzP1NU",
    authDomain: "practice-app-28.firebaseapp.com",
    projectId: "practice-app-28",
    storageBucket: "practice-app-28.appspot.com",
    messagingSenderId: "928244608866",
    appId: "1:928244608866:web:21d50259fe50f8fb66c63b",
    databaseURL: "https://practice-app-28-default-rtdb.firebaseio.com/"
  };

const firebaseApp = initializeApp(firebaseConfig);
const FirebaseContext = createContext(null)
const auth = getAuth(firebaseApp);

export const FirebaseProvider = (props)=>{
    const signupUser = (email, password)=>{
        createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        return user
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
      }

      const loginUser = (email, password)=>{
        signInWithEmailAndPassword (auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code)
      });
      }

    return(
        <FirebaseContext.Provider value={{signupUser, loginUser}}>{props.children}</FirebaseContext.Provider>
    )
}