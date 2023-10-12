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
                  document.getElementById('errfn').innerHTML="Varification link sent to your email.";
                })
              });
            console.log(user)
            

          

        } catch (error) {
            console.log(error.message);
            document.getElementById('errfn').innerHTML="Email or password is invalid.";
            
        }

    }


  
      
  return (
    <>
      <div class="register-style">
        <Header />
        <h1 className="createHeader">Create Account</h1>
        <div className="regEmailFormat">
          <label>Email</label>
          <input className="register-user"
          
            placeholder="Email..."
            onChange={(event) => {
                setRegisterEmail(event.target.value);
            }} />
        </div>
        <div className="regPassFormat">
          <label class="label">Password</label>
          <input className="register-pass"
            placeholder="Password..."
            onChange={(event) => {
                setRegisterPassword(event.target.value);
            }} />
          </div>
      </div>

      <div class="register-button">
        <button className="buttonReg" onClick={register}>Register</button><div className="error" id="errfn">   </div>        

      </div>


    </>

  )
};