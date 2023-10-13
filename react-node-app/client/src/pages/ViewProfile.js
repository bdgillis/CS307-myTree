import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth } from "firebase/auth";
import './Logout.css'


const ViewProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <>
            <div className='NavMenu'>
				<Sidebar isOpen={isOpen} toggle={toggle} />
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