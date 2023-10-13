import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth } from "firebase/auth";


const ViewProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <div style={{
                position: 'fixed',
                top: 0,
                left: '12%',
            }}>
                <Navbar toggle={toggle} />
                </div>
            <div>
                <h1>User Profile </h1>
                <h3 id="displayName">Welcome {user.displayName}</h3>
            </div>

        </>

    )
}

export default ViewProfile