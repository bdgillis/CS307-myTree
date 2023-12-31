import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import './HomeTab.css'
import { useHistory } from 'react-router-dom';



const HomeTab = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [activityHistory, setActivityHistory] = useState({});
    const [loadingState, setLoadingState] = useState(true);
    const [imageSrc, setImageSrc] = useState('../Images/MyTree1.jpg');
    const [refresh, setRefresh] = useState(false);

    const history = useHistory();


    var uid = "null";

    const toggle = () => {
        setIsOpen(!isOpen);
    };


    const auth = getAuth();
    const user = auth.currentUser;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid;
            document.getElementById("welcome-msg").innerHTML = "Welcome to myTree, " + user.displayName;
        }
    }, [user])

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

        
    }, [user, refresh]);

    var weeklyNumAct = 0;
    var weeklyCarbonScore = 0;

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
                    var date = Date.now();
                    const activities = {};
                    Object.keys(data.activities).forEach((key) => {
                        const activity = data.activities[key];
                        activities[key] = activity;

                        console.log("here")

                        if ((date - data.activities[key].timestamp) <= 604800) {
                            weeklyNumAct++;
                            console.log(""+weeklyNumAct);
                        }
                    });
                    
                    setActivityHistory(activities);
                    setLoadingState(false);
                } catch (err) {
                    console.log('Error: ', err);
                }
            }
        };

        getActivities(); // Call the async function within useEffect
    }, [user, refresh]); // The empty dependency array ensures that useEffect runs only once

    console.log(profileData)
    console.log(activityHistory);

    const activityOptions = Object.keys(activityHistory).map((key) => {
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

    //var temp = 1;
    var image
    var height = 250;

    function changeImage() {
        //Change Carbon Score artifically
        //profileData.carbonScore = -0.1;

        image = document.getElementById('myTree');

        if (profileData.carbonScore < 0) {
            image.src = require('../Images/MyTree0.png');
            if (profileData.carbonScore > -100) {
                image.height = 450 + 2 * profileData.carbonScore;
            } else {
                image.height = 250;
            }
        }
        else if (profileData.carbonScore < 100) {
            image.src = require('../Images/MyTree1.jpg');
            //image.height = 450;
            image.height = 250 + 2 * profileData.carbonScore;
        } else {
            image.src = require('../Images/MyTree2.png');
            if (profileData.carbonScore < 200) {
                image.height = 250 + 2 * (profileData.carbonScore - 100);
            } else {
                image.height = 450;
            }
        }
    }


    //var timer = setInterval(changeImage(), 2000);


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
            <div>
                <button style={{position: 'absolute', left: 0, marginTop: '80px', marginLeft: '100px', marginRight: '3.5px'}}
                    className='refreshButton' 
                    onClick={() => setRefresh(!refresh)}>
                        Refresh
                </button>
            </div>
            

            <div className='tree'>
                <img
                    src={require('../Images/MyTree1.jpg')} 
                    id='myTree'
                    witdh={250} 
                    height={250}
                    alt="logo" 
                />
            </div>
            <div className='carbon-score'>
            {profileData ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {changeImage()}
                        <h3>MyTree's Height: {image.height}</h3>
                    </div>
                ) : (
                    <h3>MyTree's Height: 250 </h3>
                )}
                {!loadingState ? (
                    (isEmpty(activityHistory)) ? (
                        <h3></h3>
                    ) : (
                        <div>
                            {}
                        </div>
                    )
                    
                ) : (
                    <h3></h3>
                )}
                
            </div>


            <div className='num-activites'>
                {profileData ? (
                    
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h3 style={{marginRight: '25px'}}>Weekly Stats:</h3>
                        <h3 style={{marginRight: '25px'}}>Carbon Score: {profileData.weeklyCarbonScore}</h3>
                        <h3>Number of Activities: {profileData.weeklyNumActivities}</h3>
                    </div>
                    
                    ) : (
                    <h3>Weekly Stats:</h3>
                )}
                
            </div>

            <div className='num-activites'>
                {profileData ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h3 style={{marginRight: '25px'}}>All Time Stats:</h3>

                        <h3 style={{marginRight: '25px'}}>Carbon Score: {profileData.carbonScore}</h3>

                        <h3>Number of Activities: {profileData.numActivities}</h3>
                        <button 
                            className='learnAboutCarbonScore'
                            style={{ 
                                marginLeft: '25px', 
                                backgroundColor: '#256ce1', 
                                color: 'white', 
                                borderRadius: '50%', 
                                width: '30px', 
                                height: '30px' 
                        }}title="How is Carbon Score Calculated?" onClick={() => history.push('./faq')}>
                            ?
                        </button>
                    </div>
                    ) : (
                    <h3>All Time Stats:</h3>
                )}

            </div>
        </>
    )
    
}

export default HomeTab