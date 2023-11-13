import React, { useEffect, useState, timeout } from 'react'

import { getAuth } from "firebase/auth";

import ThirdTab, { emailArray } from '../AllTabs/ThirdTab';

import { g_sortedArr } from '../AllTabs/ThirdTab';



const LeagueListTab = () => {

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
                    console.log(uUsername.userDoc);
                    setFriends(uUsername.userDoc.friends);
                    console.log(uUsername.userDoc.friends);
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }
            // getIncomingRequests();
            getUserUsername(); // Call the async function within useEffect
            displayArray();
            
        }

    }, [user]);

    function displayArray() {
            // console.log(incomingRequests);

                const displayFriendsArray = g_sortedArr.map((league) => (
                    <div>
                        <hr/>
                        <h3 className='friendName'>
                            User: {league[2]}
                        </h3>
                        <button
                            className='friendProfButton'
                            onClick={() => window.location = './profile/' + league[2]}>
                            View Profile
                        </button>
                        
                    </div>
                ));
                setDisplayFriends(displayFriendsArray);

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
                League List
            </h1>
            {/* <h2>Friend List : </h2> */}
            {!isEmpty(friends) ? (

                (displayFriends ? (
                    <div>
                        {displayFriends}
                    </div>) : (
                    <h3>Loading League List ... </h3>
                ))
            ) : (
                <h3 className='friendName'>No League</h3>
            )}
        </div>
    );
};
export default LeagueListTab;