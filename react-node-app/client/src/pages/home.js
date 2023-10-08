import React, { useState } from 'react'
import {
    createUserWithEmailAndPassword,

} from "firebase/auth";
import { auth } from '../firebase';
import { Link } from "react-router-dom";
import Header from '../components/Header';



export default function Home(){

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");


    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user)

        } catch (error) {
            console.log(error.message);
        }

    }

    function ButtonLink({ to, children }) {
      return <Link to={to} onClick={register}><button>{children}</button></Link>;
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

            <ButtonLink to='/HomeTab'>Register</ButtonLink>

      </div>


    </>

  )
};