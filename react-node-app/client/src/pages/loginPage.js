import React, { useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

import { auth } from '../firebase';

export default function LoginPage(){

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(user)

    } catch (error) {
        console.log(error.message);
    }
  }

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
    <>
      <div>

          <h1>Login to Account</h1>
          <label>Email</label>
          <input className="login-user"
          
              placeholder="Email..."
              onChange={(event) => {
                  setLoginEmail(event.target.value);
              }} />
          <label>Password</label>
          <input className="login-pass"
              placeholder="Password..."
              onChange={(event) => {
                  setLoginPassword(event.target.value);
              }} />
          <button onClick={ login }> Login</button>
      </div>

        <div className="googleAuth">
          <h3> Login with Other Accounts</h3>
          <button onClick={googleAuth}>Login with Google</button>
          <button onClick={googleAuth}>Login with Twitter</button>
          <button onClick={googleAuth}>Login with Github</button>


        </div>

    </>

  );
};