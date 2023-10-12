import { Link } from "react-router-dom";
import React from 'react';
import { auth } from '../firebase';

import {
    getAuth,
    onAuthStateChanged
} from "firebase/auth";
import LoginPage from "../pages/loginPage";



function refreshPage() {
    setTimeout(()=>{
        window.location.reload(false);
    }, 100);
    console.log('page to reload')
}

function ButtonLink({ to, children }) {
    return <Link to={to} onClick={refreshPage}><button>{children}</button></Link>;
  }

 

const Header = () => {

    return(
        <div class="header-style">
            
            <h1>myTree</h1>
            <ul className="nav">
                <li className="navAccount">
                    <ButtonLink to='/'>Create Account</ButtonLink>
                </li>
                
                <li className="navLogin">
                    <ButtonLink to='/loginPage'>Login</ButtonLink>
                </li>
            </ul>
        </div>
    );
};

export default Header;