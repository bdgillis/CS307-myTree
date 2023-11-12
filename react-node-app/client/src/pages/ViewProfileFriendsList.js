import React, { useEffect, useState, timeout } from 'react'
import React, { useEffect, useState, timeout } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import './Logout.css'
import { ButtonLink } from '../components/Header';
import FriendsTabs from '../components/FriendsComponents/FriendsTabs';
import Notification from '../components/Notification';
import { getAuth } from "firebase/auth";


const ViewProfileFriendList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [friends, setFriends] = useState({});
    const [displayFriends, setDisplayFriends] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [userDoc, setUserDoc] = useState(null);



    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const uid = user.uid;
            console.log("uid: " + uid);
            // const getIncomingRequests = async () => {
            //     const response = await fetch('/api/friendrequests/incoming/' + uid);
            //     const body = await response.json();
            //     console.log(body);
            //     setIncomingRequests(body.incomingRequests);
            // }

            const getUserUsername = async () => {
                try {
                    const response = await fetch(`/api/friends/uid=${uid}`, {
                        method: 'GET'
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const uUsername = await response.json();
                    //console.log("79 username " + username)
                    setUserUsername(uUsername.username); // Set the data in the component's state
                    setUserDoc(uUsername.userDoc);
                    setFriends(uUsername.userDoc.friends);
                    console.log(uUsername.userDoc.friends);
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }
            // getIncomingRequests();
            getUserUsername(); // Call the async function within useEffect
        }

    }, [user]);

    useEffect(() => {
        // if (userDoc) {
        if (friends.length > 0) {
            // console.log(incomingRequests);
            
            const displayFriendsPromises = friends.map( async (element) => {
                const isNudge = await nudgeNeeded(element);
                // console.log(isNudge)
                console.log(element);
                return{isNudge:isNudge, element: element};
            
            });

            Promise.all(displayFriendsPromises).then((renderedFriends) => {
                const displayFriendsArray = renderedFriends.map((friend) => (
                    <div>
                        <hr/>
                        <h3 className='friendName'>
                            Friend: {friend.element}
                            
                        </h3>
                        <button
                            className='friendProfButton'
                            onClick={() => window.location = './profile/' + friend.element}>
                            View Profile
                        </button>
                        {friend.isNudge.daysSince ? (
                            <h4 className='friendName'>Last Activity: {friend.isNudge.daysSince} days ago</h4>
                        ) : (
                            <h4 className='friendName'>No Activities!</h4>
                        )}
                        {friend.isNudge.needNudge ? (
                            <button className='friendProfButton'>Nudge</button>
                        ) : ( 
                            <div></div>
                        )
                        }
                        
                    </div>
                ));
                setDisplayFriends(displayFriendsArray);
            });
                    

            // setDisplayFriends(displayFriends);
        }
        // }
    }, [friends]);

    const nudgeNeeded = async (targetUsername) => {
        const response = await fetch(`/api/friends/activity/${targetUsername}`, {
            method: 'GET'
        });
        const body = await response.json();
        // if (body.status === "success") {
            return {needNudge: body.needNudge, daysSince: body.daysSince};
        // }
    }

    function isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }

    return (
        <div className="searchTab">
            <h1 className='friendListHeader'>
                Friends List
            </h1>
            {/* <h2>Friend List : </h2> */}
            {!isEmpty(friends) ? (
                (displayFriends ? (
                    <div>
                        {displayFriends}
                    </div>) : (
                    <h3>Loading Friends List ... </h3>
                ))
            ) : (
                <h3 className='friendName'>No Friends</h3>
            )}
        </div>
    );
}