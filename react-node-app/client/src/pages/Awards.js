import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth } from "firebase/auth";
import { ButtonLink } from '../components/ActivityComponents/Button';
import './Logout.css';
//import '../App.css';
import './Awards.css';


const Awards = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [activityHistory, setActivityHistory] = useState({});
    const [loadingState, setLoadingState] = useState(true);

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
                    
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }

            getProfileData(); // Call the async function within useEffect
        };

    }, [user]);

    
    const tButton = () => {
        var demo = document.getElementById("tInfo");
        if (demo.style.display == "block") {
            demo.style.display = "none";
        } else {
            demo.style.display = "block";
        }
    }

    const eButton = () => {
        var demo = document.getElementById("eInfo");
        if (demo.style.display == "block") {
            demo.style.display = "none";
        } else {
            demo.style.display = "block";
        }
    }

    const hButton = () => {
        var demo = document.getElementById("hInfo");
        if (demo.style.display == "block") {
            demo.style.display = "none";
        } else {
            demo.style.display = "block";
        }
    }

    return (
        <>
            <div className='NavMenu'>
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
            </div>
        

            <div className='awardPage'>
                <div>
                    <h1 className='awardHeight'>
                        Awards
                    </h1>
                </div>
                {profileData ? (
                    profileData.quizTaken ? (
                        <div>
                            <></>
                            {profileData.awards ? (
                            <div>
                                {profileData.awards[0] ? <img src={require("../Images/transportation.png")} height={500} width={500} title="Award for 3+ Transportation Activities Logged!" /> : null}
                                {profileData.awards[0] ? <button onClick={tButton} id="showHide"
                                    className='learnAboutCarbonScore'
                                    style={{ 
                                        marginLeft: '25px', 
                                        backgroundColor: '#256ce1', 
                                        color: 'white', 
                                        borderRadius: '50%', 
                                        width: '30px', 
                                        height: '30px' 
                                    }}title="Transportation Award">
                                        ?
                                </button> : null}
                                {profileData.awards[0] ? <p id='tInfo'>You earned a Transportation award!
                                        You completed 3 or more transportation activities. Keep up the good work!</p> : null}
                                
                                <br></br>

                        

                                {profileData.awards[1] ? <img src={require("../Images/eating.png")} height={500} width={500} title="Award for 3+ Eating Activities Logged!" /> : null}
                                
                                {profileData.awards[1] ? <button onClick={eButton} id="showHide"
                                    className='learnAboutCarbonScore'
                                    style={{ 
                                        marginLeft: '25px', 
                                        backgroundColor: '#256ce1', 
                                        color: 'white', 
                                        borderRadius: '50%', 
                                        width: '30px', 
                                        height: '30px' 
                                    }}title="Eating Award" >
                                        ?
                                </button> : null}
                                {profileData.awards[1] ? <p id='eInfo'>You earned an Eating award!
                                        You completed 3 or more eating activities. Keep up the good work!</p> : null}
                
                                <br></br>

                                {profileData.awards[2] ? <img src={require("../Images/household.png")} height={500} width={500} title="Award for 3+ Household Activities Logged!" /> : null}
                                {profileData.awards[2] ? <button onClick={hButton} id="showHide"
                                    className='learnAboutCarbonScore'
                                    style={{ 
                                        marginLeft: '25px', 
                                        backgroundColor: '#256ce1', 
                                        color: 'white', 
                                        borderRadius: '50%', 
                                        width: '30px', 
                                        height: '30px' 
                                    }}title="Household Award" >
                                        ?
                                </button> : null}
                                {profileData.awards[2] ? <p id='hInfo'>You earned a Household award!
                                        You completed 3 or more household activities. Keep up the good work!</p> : null}
                                
                                <br></br>
                            </div>) : <h3>No awards yet...</h3>}
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

export default Awards