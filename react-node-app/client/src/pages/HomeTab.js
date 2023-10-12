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
    if (user) {
        // console.log(user)
        const name = user.displayName;
        // console.log(name);
        document.getElementById("welcome-msg").innerHTML = "Welcome to myTree  <br/> " + name;
    } else {
        document.getElementById("welcome-msg").innerHTML = "Welcome to myTree ";
    }


    return (


        <div className="testNav">
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh'
            }}>
                <h1 id="welcome-msg">Home</h1>
            </div>

        </div>
    )
}
export default HomeTab