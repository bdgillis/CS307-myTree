import React, { useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { getAuth } from "firebase/auth";

const HomeTab = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const auth = getAuth();
    const user = auth.currentUser;
    window.onload = (event) => {
        if (user) {
            // console.log(user)
            const name = user.displayName;
            // console.log(name);
            document.getElementById("welcome-msg").innerHTML = "Welcome to myTree  <br/> " + name;
        }    
    };


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