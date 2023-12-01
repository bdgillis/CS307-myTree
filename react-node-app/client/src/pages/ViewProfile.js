import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ButtonLink } from '../components/ActivityComponents/Button';
import styled from 'styled-components';
import './Logout.css';
import '../App.css';
import './ManageAccount.css';
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBBtn
  } from 'mdb-react-ui-kit';
  
import { 
    Nav, 
    Bars, 
    NavMenu, 
    NavLink, 
    NavBtn, 
    FriendBtnLink
  } from '../components/Navbar/NavbarElements'



const FriendsButton = styled.button `
    border-radius: 4px;
    background: #256ce1;
    padding: 7px 15px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    font-size: 20px;
	font-weight: bold; 

    margin-left: 0px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }

`

const Divider = () => {
    return (
        <hr
            style={{ borderTop: "2px solid grey" }}
        ></hr>
    );
};


const ViewProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [activityHistory, setActivityHistory] = useState({});
    const [loadingState, setLoadingState] = useState(true);
    const [challenge, setChallenge] = useState({});


    const changeToFriendList = async () => {
        try {
            //alert(auth.currentUser.email)
            window.location = '/friends';    
        } catch (err) {
            alert(err)
            document.getElementById('errfn').innerHTML="Logout failed.";
            console.log(err.message);
        }
    };



    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const uid = user.uid;
            const dataToSend = { uid };
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
                    if (profileData.completedChallenges) {
                        setChallenge(profileData.completedChallenges);
                    }
                    
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }

            getProfileData(); // Call the async function within useEffect
        };


    }, [user]);

    useEffect(() => {
        const getActivities = async () => {
            if (user) {
                const uid = user.uid;
                try {
                    const res = await fetch(`/api/editActivityHistory/${uid}`, {
                        method: 'GET'
                    });
                    const data = await res.json();
                    console.log(data);
                    const activities = {};
                    Object.keys(data.activities).forEach((key) => {
                        const activity = data.activities[key];
                        activities[key] = activity;
                    });

                    setActivityHistory(activities);
                    setLoadingState(false);
                } catch (err) {
                    console.log('Error: ', err);
                }
            }
        };

        getActivities(); // Call the async function within useEffect
    }, [user]); // The empty dependency array ensures that useEffect runs only once

    // console.log(profileData)
    // console.log(activityHistory);

    const numFriends = 0;

    const activityOptions = Object.keys(activityHistory).map((key) => {
        //numFriends= numFriends + 1;
        const activity = activityHistory[key];
        //console.log(activity)
        const time = new Date(activity.timestamp).toLocaleString()
        return (
            <h3 key={key} value={key}>
                {time} - {activity.activeCategory} - {activity.activeActivity} - {activity.activityParam} mi.
            </h3>
        );
    });

    const challengeDisplay = Object.keys(challenge).map((key) => {
        //numFriends= numFriends + 1;
        const chall = challenge[key];
        //console.log(activity)
        return (
            <h3 key={key} value={key}>
                {chall}
            </h3>
        );
    });

    function isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }

    return (
        <>
            <div className='NavMenu'>
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
            </div>

            <div className='profileStyle'>
                <div>
                    <h1>
                        User Profile 
                    </h1>
                </div>
                {profileData ? (
                    profileData.quizTaken ? (
                        <div className='profileCard'>
                            <h3 id="displayName">Display Name: {user.displayName}</h3>
                            <Divider />
                            <h3>Username: {profileData.username}</h3>
                            <Divider />
                            <h3>Location: {profileData.hometown}</h3>
                            <Divider />
                            <h3>About Me: {profileData.bio}</h3>
                            <Divider />
                            <h3>Favorite Category: {profileData.targetCategory}</h3>
                            <Divider />
                            <FriendBtnLink to='/friends'>
                                Friends: {profileData.friends.length}
                            </FriendBtnLink>
                            <Divider />

                            <>
                            </>
                            {profileData.awards ? (
                            <div>
                                <h3>Awards: </h3>
                                {profileData.awards[0] ? <img src={require("../Images/transportation.png")} height={200} title="Award for 3+ Transportation Activities Logged!" /> : null}
                                {profileData.awards[1] ? <img src={require("../Images/eating.png")} height={200} title="Award for 3+ Eating Activities Logged!" /> : null}
                                {profileData.awards[2] ? <img src={require("../Images/household.png")} height={200} title="Award for 3+ Household Activities Logged!" /> : null}
                            </div>) : <h3>No awards yet...</h3>}
                        </div>
                    ) : (
                        <ButtonLink to="./quiz" children={"Set up Profile"}></ButtonLink>
                    )) : (
                    <h3>Loading data...</h3>

                )}
                <h2>Carbon Score</h2>
                {profileData ? (
                    <div className='profileCard'>
                        <h3>Carbon Score: {profileData.carbonScore}</h3>
                        <Divider />
                        <h3>Weekly Carbon Score: {profileData.weeklyNumActivities}</h3>
                        
                    </div>
                    
                ) : (
                    <h3>Carbon Score Unavailable</h3>
                )}
                <h2>Challenges Completed</h2>
                {!isEmpty(challenge) ? (
                    <div className='profileCard'>
                        {challengeDisplay}
                    </div>
                ) : (
                    <div className='profileCard'>
                    <h3>No Challenges Completed</h3>
                    </div>
                )}
                {!loadingState ? (
                    (isEmpty(activityHistory)) ? (
                        <ButtonLink to="./activities" children={"Enter Your First Activity!"}></ButtonLink>
                    ) : (
                        <>
                        <h2>Activity History</h2>
                        <div className='profileCard'>
                            {activityOptions}
                        </div>
                        <br /><br />
                        </>

                    )
                ) : (
                    <h3>Loading Activity History ... </h3>
                )}
            </div>

        </>

    )
}

export default ViewProfile