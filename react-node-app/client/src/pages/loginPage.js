import React, { useState } from 'react'
import '../App.css'
import { Link } from "react-router-dom";
import Header from '../components/Header';



import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    FacebookAuthProvider
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
            if (user.metadata.creationTime == user.metadata.lastSignInTime) {
                window.location = '/quiz'
            } else {
                window.location = '/HomeTab'
            }
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

  const facebookAuth = async () => {
    console.log("here");
    const fbauth = getAuth();
    const fbAuthProvider = new FacebookAuthProvider(); //Facebook Auth
    signInWithPopup(fbauth, fbAuthProvider)
      .then((result) => {
        console.log("here2");
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log("here3");
        // The signed-in user info.
        const user = result.user;
        if (user.metadata.creationTime == user.metadata.lastSignInTime) {
          window.location = '/quiz'
        } else {
          window.location = '/HomeTab'
        }
        console.log(user.metadata);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
        console.log(error);
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
              className="inputs"
              placeholder="Email..."
              onChange={(event) => {
                  setLoginEmail(event.target.value);
              }} />
          </div>
          <div className="passwordFormat">
          <label>Password</label>
          <input
              className="inputs"
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
          <div>
            <button className="googleAuthButton" onClick={googleAuth} style={{marginRight: '10px'}}>Google</button>
            <button className="googleAuthButton" onClick={facebookAuth} style={{marginRight: '25px'}}>Facebook</button>
          </div>
        </div>

        

    </div>

  );
};