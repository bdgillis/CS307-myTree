import React, { useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import './Logout.css'


const HomeTab = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            document.getElementById("welcome-msg").innerHTML = "Welcome to myTree, " + user.displayName;
        }
    })


    return (

        <>
            <div className="NavMenu">
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
            </div>
            <div className='welcome-banner'>
                <h1 id="welcome-msg"></h1>
            </div>

        </>

    )
}
export default HomeTab