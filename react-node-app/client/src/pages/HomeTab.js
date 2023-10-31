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

    var temp = 1;

    function changeImage() {
        var image = document.getElementById('myTree');
        if (temp < 0) {
            image.src = '../Images/MyTree0.png';
        }
        else if (temp > 0) {
            image.src = '../Images/MyTree1.jpg';
        } else {
            image.src = '../Images/MyTree2.png';
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
                    <button style={{ 
                        marginRight: '20px', 
                        backgroundColor: '#256ce1', 
                        color: 'white', 
                        borderRadius: '50%', 
                        width: '30px', 
                        height: '30px' 
                    }}title="How is Carbon Score Calculated?" onClick={() => history.push('./faq')}>
                        ?
                    </button>
                    <h3 style={{marginRight: '50px'}}>Carbon Score: {profileData.carbonScore}</h3>
                    
                    </div>
                ) : (
                    <h3>Carbon Score:</h3>
                )}
                {!loadingState ? (
                    (isEmpty(activityHistory)) ? ({}) : (
                        <>
                            {}
                        </>
                    )
                ) : (
                    <h3></h3>
                )}
                
            </div>
            <div className='num-activites'>
                {!loadingState ? (
                    <h3>Number of Activities: {profileData.numActivities}</h3>
                    ) : (
                    <h3>Number of Activities:</h3>
                )}
                
            </div>

        </>

    )
}
export default HomeTab