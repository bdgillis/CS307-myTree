import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

function UserProfile({ match }) {

    const { username } = match.params;
    const [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [activityHistory, setActivityHistory] = useState({});
    const [loadingState, setLoadingState] = useState(true);
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [profileUser, setProfileUser] = useState(null);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (username) {
            const getProfileData = async () => {
                try {
                    // const response = await fetch(`/api/profile/username=${username}`, {
                    //     method: 'GET'
                    // });
                    // if (!response.ok) {
                    //     throw new Error('Network response was not ok');
                    // }
                    //console.log(response)
                    const response = await fetch('/api/friends/' + username);
                    const body = await response.json();
                    console.log(body);
                    setProfileData(body); // Set the data in the component's state
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }
            getProfileData();
        }
    }, [username]);

    useEffect(() => {
        if (user) {
            const uid = user.uid;
            // const dataToSend = { uid };
            const getUserData = async () => {
                try {
                    const response = await fetch(`/api/profile/${uid}`, {
                        method: 'GET'
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const userData = await response.json();
                    setUserData(userData); // Set the data in the component's state
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }

            getUserData(); // Call the async function within useEffect
        };

    }, [user]);

    useEffect(() => {
        const getActivities = async () => {
            if (profileData && profileData.user && profileData.user.activities) {
                const activities = {};
                Object.keys(profileData.user.activities).forEach((key) => {
                    const activity = profileData.user.activities[key];
                    activities[key] = activity;
                });
                setActivityHistory(activities);
            }
            setLoadingState(false);

        }

        getActivities(); // Call the async function within useEffect
    }, [profileData]); // The empty dependency array ensures that useEffect runs only once

    function isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }

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

    return (
        <>
            <div className='NavMenu'>
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
            </div>
            <div>
                <h1>Welcome to {username}'s profile page!</h1>
                {/* Add user-specific content here */}
            </div>
            <div>
                <h1>User Profile </h1>
                {profileData ? (

                    <div>
                        {/* <h3 id="displayName">Display Name: {user.displayName}</h3> */}

                        <h3>Username: {profileData.user.username}</h3>
                        <h3>Location: {profileData.user.hometown}</h3>
                        <h3>About Me: {profileData.user.bio}</h3>
                        <h3>Favorite Category: {profileData.user.targetCategory}</h3>
                    </div>
                ) : (
                    <h3>Loading data...</h3>

                )}
                <br /><br />
                <h2>Activity History</h2>
                {profileData ? (
                    <h3>Carbon Score: {profileData.user.carbonScore}</h3>
                ) : (
                    <h3>Carbon Score Unavailable</h3>
                )}
                {!loadingState ? (
                    (isEmpty(activityHistory)) ? (
                        <h3>No Activity History</h3>
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
    );
}

export default UserProfile;