import React, {useState, useEffect} from 'react'
import './App.css';
import { initializeApp } from "firebase/app";
import { app } from "./firebase";
import AddBook from "./components/AddBook"
import Login from "./components/Authentication/Login"
import { getToken, getMessaging} from "firebase/messaging";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const messaging = getMessaging(app);

const auth = getAuth(app);

function App() {

  const requestPermission= async()=>{
    const permission = await Notification.requestPermission();
    if(permission==='granted'){
      const token = await getToken (messaging, {vapidKey: 'BHsuphK1mOMHUkCMtRkbgORNu16mDpdqzQfFIpuMrCoci29IBZZuntb1PjMVsq8ysHl3o-O5pKLUvxBIkONs1ec'})
      console.log(token)
    }else{ 
      alert("You denied for the notification")
    }
  }

  const [user, setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setUser(user)
      }else{
        console.log("you are logged out");
        setUser(null);
      }
    })
    requestPermission();
  },[])
  return (
    <div className="App">
      {user ? <AddBook user={user}/>: <Login/>}
    </div>
  );
}

export default App;


{/*
import React, {useState, useEffect} from 'react'
import './App.css';
import AddBook from "./components/AddBook"
import {app} from "./firebase";
import {getFirestore, collection, doc, addDoc, getDoc, getDocs, query, where} from "firebase/firestore"; 
const firestore = getFirestore(app);

function App() {

  const writeData = async()=>{
    try {
      const docRef = await addDoc(collection(firestore, "cities"), {
        name: "indore",
        pincode: "1234",
        lat: 15,
        lon: 34
      });
      console.log(docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const makeSubCollection = async()=>{
    try {
      const docRef = await addDoc(collection(firestore, "cities/ejCqt82JNMuAZUosa6e4/places"), {
        place: "this is a place",
        desc: "awsome ",
        date: Date.now()
      });
      console.log(docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  //get collection
  const readAllDocs = async()=>{
    const querySnapshot = await getDocs(collection(firestore, "cities"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  const readDoc = async()=>{
    const querySnapshot = await getDoc(doc(firestore, "cities", "ejCqt82JNMuAZUosa6e4"));
    console.log(querySnapshot.data())
  }

  const queryData = async()=>{
  // Create a reference to the cities collection
  let collectionRef = collection(firestore, "users")

  // Create a query against the collection.
  let queryD = query(collectionRef, where("isMale", "==", true))
  console.log(queryD)
  }

  useEffect(()=>{
  })

  return (
    <div className="App">
      <button onClick={writeData}>Write Data</button>
      <br/><br/>
      <button onClick={makeSubCollection}> Make Sub-Collection</button>
      <br/><br/>
      <button onClick={readAllDocs}> Read docs</button>
      <br/><br/>
      <button onClick={readDoc}> Read doc</button>
      <br/><br/>
      <button onClick={queryData}> Query</button>
      <br/><br/>
      <AddBook user={{uid:1, email:"juhi@gmail.com"}}/>
    </div>
  );
}

export default App;
*/}


{/* //authentication
import React, {useState, useEffect} from 'react'
import './App.css';
import Login from './components/Login';
import Signup from "./components/Signup";
import {app} from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from './components/Home';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setUser(user)
      }else{
        console.log("you are logged out");
        setUser(null);
      }
    })
  })

  return (
    <div className="App">
  
      {user ?<Home name= {user.name}/>:  <Signup/>}
      </div>
      );
    }
    
    export default App;
    
*/}

{/* // realtime database
import {app} from "./firebase"
import {getDatabase, ref, set} from "firebase/database" 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import './App.css';

//for reading & writing in DB
const db = getDatabase(app);
//for authetication
const auth = getAuth(app);

function App() {
  const putData= ()=>{
    set(ref(db, "users/juhi"), {
      id: 1,
      name: "juhi",
      age: 21
    })
  }

  const signupUser = ()=>{
    createUserWithEmailAndPassword(auth, "juhisahu28@gmail.com", "Juhi@123")
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  return (
    <div className="App">
      <button onClick={signupUser}>Signup</button>
      <button onClick={putData}>Put Data</button>
    </div>
  );
}

export default App;

*/}
