import React, { useInsertionEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail,

} from "firebase/auth";
import { auth } from '../firebase';
import Header from '../components/Header';
import { getAdditionalUserInfo, updateProfile } from 'firebase/auth';



export default function Home(){

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [name, setName] = useState("");


    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
              .then((userCredential) => {
                sendEmailVerification(auth.currentUser)
                .then(() => {
                  document.getElementById('errfn').innerHTML="Varification link sent to your email.";

                })
              });
            await updateProfile(auth.currentUser, {displayName: name});  
            console.log(user)
            window.location= '/Quiz'
            

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

        <div className="nameFormat">
          <label>Name</label>
          <input
        
              placeholder="Name..."
              onChange={(event) => {
                  setName(event.target.value);
              }} />
          </div>
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