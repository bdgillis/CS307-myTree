import React, { useInsertionEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail,

} from "firebase/auth";
import { auth } from '../firebase';
import Header from '../components/Header';



export default function Home(){

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");


    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
              .then((userCredential) => {
                sendEmailVerification(auth.currentUser)
                .then(() => {
                  alert("Email verificaiton link sent.");
                })
              });
            console.log(user)
            

          

        } catch (error) {
            console.log(error.message);
            alert(error.message);
            window.location = '/'
            
        }

    }


  
      
  return (
    <>
      <div class="register-style">
        <Header />
        <h1>Create Account</h1>
          <label>Email</label>
          <input className="register-user"
          
            placeholder="Email..."
            onChange={(event) => {
                setRegisterEmail(event.target.value);
            }} />
          <label class="label">Password</label>
          <input className="register-pass"
            placeholder="Password..."
            onChange={(event) => {
                setRegisterPassword(event.target.value);
            }} />
      </div>

      <div class="login-button">
        <button onClick={register}>Register</button>        

      </div>


    </>

  )
};