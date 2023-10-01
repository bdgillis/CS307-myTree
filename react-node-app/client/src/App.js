import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword } from "firebase/auth";

import {auth} from './firebase';

function App() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user)

    } catch (error) {
      console.log(error.message);
    }

  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(user)

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="App">

      <div>
        <h3> Register User </h3>
      
        <input
          placeholder="Email..." 
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }} />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }} />

        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>

        <input
          placeholder="Email..." 
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }} />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }} />

        <button onClick={login}> Login</button>
      </div>

    </div>

    
  )
}

export default App