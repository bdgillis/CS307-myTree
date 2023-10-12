import React, { useState } from 'react'
import '../App.css'
import { Link } from "react-router-dom";
import Header from '../components/Header';



import {
    signInWithEmailAndPassword,
    
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "firebase/auth";

import { auth } from '../firebase';

function refreshPage() {
  setTimeout(()=>{
      window.location.reload(false);
  }, 100);
  console.log('page to reload')
}


export default function LoginPage(){

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        window.location = '/HomeTab';

    } catch (err) {
        document.getElementById('errfn').innerHTML="Email or password is incorrect.";
        console.log(err.message);

    }
  };

  const googleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            window.location = '/HomeTab'
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
        });
    }


  return (
    
    <div>

   
      <div class="login-page">
        <Header />

          <h1 className='loginToAccount'>Login to Account</h1>

          <div className="emailFormat">
          <label>Email</label>
          <input
          
              placeholder="Email..."
              onChange={(event) => {
                  setLoginEmail(event.target.value);
              }} />
          </div>
          <div className="passwordFormat">
          <label>Password</label>
          <input
              placeholder="Password..."
              onChange={(event) => {
                  setLoginPassword(event.target.value);
              }} />
          </div>
      </div>
      <div>   
              <button className="buttonLog" onClick={login}>Login</button><div className="error" id="errfn">   </div>
          
      </div>

        <div className="googleAuth">
          <h3> Login with Other Accounts</h3>

          <button onClick={googleAuth}>Login with Google</button>
          {/* <button onClick={googleAuth}>Login with Twitter</button>
          <button onClick={googleAuth}>Login with Github</button> */}

        </div>

        

    </div>

  );
};