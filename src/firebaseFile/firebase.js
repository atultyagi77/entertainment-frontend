// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-q6KQjDsy46dFMC4fF9Frpnc7exp7-kU",
  authDomain: "entertainment-app-5.firebaseapp.com",
  projectId: "entertainment-app-5",
  storageBucket: "entertainment-app-5.appspot.com",
  messagingSenderId: "539192250390",
  appId: "1:539192250390:web:0d9e61912f47a90a13a537",
  measurementId: "G-FVW6T44Y69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider } 