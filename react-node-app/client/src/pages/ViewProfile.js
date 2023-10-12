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

    if (user) {
        console.log(user)
        var created = ""
        var login = ""
        if (user) {
            created = user.metadata.creationTime;
            login = user.metadata.lastSignInTime;
            const uid = user.uid;
        }
    }
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

            <div>
                <br /><br />
                <h1>Account Information</h1>
                <h3>Your email address: {user.email}</h3>
                <h3>Account Created: {created}</h3>
                <h3>Most recent login: {login}</h3>
            </div>
        </>

    )
}

export default ViewProfile