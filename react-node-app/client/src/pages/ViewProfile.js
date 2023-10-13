import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ButtonLink } from '../components/ActivityComponents/Button';
import './Logout.css'

const ViewProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [activityHistory, setActivityHistory] = useState({});
    const [loadingState, setLoadingState] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const dataToSend = { uid };
    // var profileData = {};

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

    useEffect(() => {
        const getActivities = async () => {
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
        };

        getActivities(); // Call the async function within useEffect
    }, [uid]); // The empty dependency array ensures that useEffect runs only once

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

    return (
        <>
      <div className='NavMenu'>
				<Sidebar isOpen={isOpen} toggle={toggle} />
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
                        <h3>Favorite Category: {profileData.targetCategory}</h3>
                    </div>
                ) : (
                    <ButtonLink to="./quiz" children={"Set up Profile"}></ButtonLink>
                )) : (
                    <h3>Loading data...</h3>

                )}
                <br/><br/>
                <h2>Activity History</h2>
                {profileData ? (
                    <h3>Carbon Score: {profileData.carbonScore}</h3>
                ) : (
                    <h3>Carbon Score Unavailable</h3>
                )}
                {!loadingState ? (
                    (isEmpty(activityHistory)) ? (
                        <ButtonLink to="./activities" children={"Enter Your First Activity!"}></ButtonLink>
                    ) : (
                        <div>
                            {activityOptions}
                        </div>
                    )
                ) : (
                    <h3>Loading Activity History ... </h3>
                )}
            </div>

        </>

    )
}

export default ViewProfile