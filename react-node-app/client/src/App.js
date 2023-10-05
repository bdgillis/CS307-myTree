import React, { useState } from 'react'
import { BrowserRouter, Route, Switch, withRouter} from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

import { auth } from './firebase';
import Header from './components/Header';
import home from './pages/home';
import loginPage from './pages/loginPage';
import redirectHome from './pages/redirectHome';
import "./App.css";
import { Link } from "react-router-dom";

import { useLocation } from 'react-router-dom'


var entered = true;


function ButtonLink({ to, children }) {
    return <Link to={to}><button>{children}</button></Link>
  }


function App() {
    
    const location = useLocation();
    
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    return (
        <div className="App">
            <Header />

            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={withRouter(home)}/>
                        <Route path="/loginPage" component={withRouter(loginPage)}/>
                        <Route path="/redirectHome" component={withRouter(redirectHome)}/>

                    </Switch>
                </div>    
            </BrowserRouter>

        </div>


    )
};

export default App;