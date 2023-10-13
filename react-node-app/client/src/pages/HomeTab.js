import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';

import './HomeTab.css'


const HomeTab = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    var uid = "null";

    const toggle = () => {
        setIsOpen(!isOpen);
    };


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid;
            document.getElementById("welcome-msg").innerHTML = "Welcome to myTree, " + user.displayName;
        }
    })

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const response = await fetch(`/api/profile/${uid}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const profileData = await response.json();
                setProfileData(profileData); // Set the data in the component's state
            } catch (error) {
                console.error('There was an error:', error);
            }
        };

        getProfileData(); // Call the async function within useEffect
    }, []); // The empty dependency array ensures that useEffect runs only once


    return (

        <>
        
            <div className="NavMenu">
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
            </div>
            <div className='welcome-banner'>
                <h1 
                    className = 'test' 
                    id="welcome-msg" 
                >
                </h1>
            </div>
            <div className='tree'>
                <img
                    src={require('../Images/download.jpg')} 
                    alt="logo" 
                />
            </div>
            <div className='carbon-score'>
                {profileData ? (
                    <h3>Carbon Score: {profileData.carbonScore}</h3>
                    ) : (
                    <h3>Carbon Score: Unavailable</h3>
                )}
                
            </div>
            <div className='num-activites'>
                {profileData ? (
                    <h3>Number of Activites: {profileData.numActivites}</h3>
                    ) : (
                    <h3>Number of Activites:  Unavailable</h3>
                )}
                
            </div>

        </>

    )
}
export default HomeTab