import React, { useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';

const HomeTab = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            document.getElementById("welcome-msg").innerHTML = "Welcome to myTree,  <br/> " + user.displayName;
        }
    })


    return (


        <div className="testNav">
            <Sidebar isOpen={isOpen} toggle={toggle} />

            <div style={{ 
				position: 'fixed', 
				top: 0, 
				left: '12%', 
				}}>
                <Navbar toggle={toggle} />
            </div>
            <h1 id="welcome-msg">Welcome to myTree</h1>

        </div>
    )
}
export default HomeTab