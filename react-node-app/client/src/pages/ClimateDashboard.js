import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ButtonLink } from '../components/ActivityComponents/Button';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import './Logout.css';
import '../App.css';
import './ManageAccount.css';
import './HomeTab.css'
import { 
    Nav, 
    Bars, 
    NavMenu, 
    NavLink, 
    NavBtn, 
    FriendBtnLink
  } from '../components/Navbar/NavbarElements'


const Divider = () => {
    return (
        <hr
            style={{ borderTop: "2px solid grey" }}
        ></hr>
    );
};



const ClimateDashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [activityHistory, setActivityHistory] = useState({});
    const [loadingState, setLoadingState] = useState(true);

    const history = useHistory();


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

    function isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }

    var image
    var tree_level = 0;
    var height = 250;

    function changeImage() {
        //Change Carbon Score artifically
        //profileData.carbonScore = -0.1;

        image = document.getElementById('myTree');

        if (profileData.carbonScore < 0) {
            tree_level = 0;
            if (profileData.carbonScore > -100) {
                height = 450 + 2 * profileData.carbonScore;
            } else {
                height = 250;
            }
        }
        else if (profileData.carbonScore < 100) {
            tree_level = 1;
            //image.height = 450;
            height = 250 + 2 * profileData.carbonScore;
        } else {
            tree_level = 2;
            if (profileData.carbonScore < 200) {
                height = 250 + 2 * (profileData.carbonScore - 100);
            } else {
                height = 450;
            }
        }
    }


    return (
        <>
            <div className='NavMenu'>
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
            </div>

            <div className='profileStyle'>
                <h2>MyTree's Stats</h2>
            </div>
            <div className='num-activites'>
                    {profileData ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {changeImage()}
                                <h3 className='Background3' style={{marginRight: '25px'}}>MyTree's Height: {height}</h3>
                                <h3 className='Background3' style={{marginRight: '25px'}}>MyTree's Level: {tree_level}</h3>
                                <h3 className='Background3' style={{marginRight: '25px'}}>Carbon Score: {profileData.carbonScore}</h3>
                            </div>
                        </>
                        ) : (
                        <h3>Stats:</h3>
                    )}
            </div>

            <div className='num-activites'>
                    {profileData ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FriendBtnLink to='/homeTab'>
                                    View MyTree
                                </FriendBtnLink>
                            </div>
                        </>
                        ) : (
                        <h3>Stats:</h3>
                    )}
            </div>

            <div className='header'>
                <h2>User Stats</h2>
                <button 
                        className='learnAboutCarbonScore'
                        style={{ 
                            marginLeft: '25px', 
                            marginTop: '23px', 
                            backgroundColor: '#256ce1', 
                            color: 'white', 
                            borderRadius: '50%', 
                            width: '30px', 
                            height: '30px' 
                    }}title="How is Carbon Score Calculated?" onClick={() => history.push('./faq')}>
                        ?
                </button>
            </div>
            <div className='Background'>
                <div className='num-activites'>
                    {profileData ? (
                        
                        <div className='Background' style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 className='Background' style={{marginRight: '25px'}}>Weekly Stats:</h3>
                            <h3  className='Background' style={{marginRight: '25px'}}>Carbon Score: {profileData.weeklyCarbonScore}</h3>
                            <h3>Number of Activities: {profileData.weeklyNumActivities}</h3>
                        </div>
                        
                        ) : (
                        <h3>Weekly Stats:</h3>
                    )}
                    
                </div>

                <Divider />

                <div className='num-activites'>
                    {profileData ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{marginRight: '25px'}}>All Time Stats:</h3>
                            <h3 style={{marginRight: '25px'}}>Carbon Score: {profileData.carbonScore}</h3>
                            <h3>Number of Activities: {profileData.numActivities}</h3>
                        </div>
                        ) : (
                        <h3>All Time Stats:</h3>
                    )}
                </div>
            </div>

            <div className='Headerbuffer'>
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
  );
};

export default ClimateDashboard;
