// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCttnu50SzgfX5f_JKEUut9EhkPCRzP1NU",
  authDomain: "practice-app-28.firebaseapp.com",
  projectId: "practice-app-28",
  storageBucket: "practice-app-28.appspot.com",
  messagingSenderId: "928244608866",
  appId: "1:928244608866:web:21d50259fe50f8fb66c63b",
  databaseURL: "https://practice-app-28-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);