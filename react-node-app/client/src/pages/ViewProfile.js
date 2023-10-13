import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ButtonLink } from '../components/ActivityComponents/Button';


const ViewProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const dataToSend = { uid };
    // var profileData = {};

    useEffect(() => {
        const getData = async () => {
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

        getData(); // Call the async function within useEffect
    }, []); // The empty dependency array ensures that useEffect runs only once

    console.log(profileData)

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
                <h3 id="displayName">Display Name: {user.displayName}</h3>
                {profileData ? (
                    profileData.quizTaken ? (
                    <div>
                        <h3>Location: {profileData.hometown}</h3>
                        <h3>About Me: {profileData.bio}</h3>
                    </div>
                ) : (
                    <ButtonLink to="./quiz" children={"Set up Profile"}></ButtonLink>
                )) : (
                    <h3>Loading data...</h3>

                )}
            </div>

        </>

    )
}

export default ViewProfile