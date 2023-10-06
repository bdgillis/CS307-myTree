import React, { useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { auth } from '../firebase';

export default function Home(){

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [user, setUser] = useState({});

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user)

        } catch (error) {
            console.log(error.message);
        }

    }
      
  return (
    <>
      <div>
        <h1>Create Account</h1>
          <label>Email</label>
          <input className="register-user"
          
            placeholder="Email..."
            onChange={(event) => {
                setRegisterEmail(event.target.value);
            }} />
          <label>Password</label>
          <input className="register-pass"
            placeholder="Password..."
            onChange={(event) => {
                setRegisterPassword(event.target.value);
            }} />

          <button onClick={ register }> Register</button>

        </div>

    </>

  )
};