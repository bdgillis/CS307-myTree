import React, { useEffect, useState, timeout } from 'react'
import { getAuth } from "firebase/auth";

const NudgesTab = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [username, setUsername] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [incomingRequests, setIncomingRequests] = useState({});
    const [friends, setFriends] = useState({});
    const [displayRequests, setDisplayRequests] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {

        if (user) {
            const uid = user.uid;
            console.log("uid: " + uid);
            const getIncomingRequests = async () => {
                const response = await fetch('/api/friendrequests/incoming/' + uid);
                const body = await response.json();
                console.log(body);
                setIncomingRequests(body.incomingRequests);
            }

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
                    // setUserDoc(uUsername.userDoc);
                    setFriends(uUsername.userDoc.friends);
                    console.log(uUsername.userDoc.friends);
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }
            getIncomingRequests();
            getUserUsername(); // Call the async function within useEffect
        }

    }, [user]);

    useEffect(() => {
        if (incomingRequests.length > 0) {
            // console.log(incomingRequests);
            const displayRequests = incomingRequests.map((element) => (
                <div>
                    <hr />

                    <h3 className='friendRequestName'>
                        Nudge from: {element}
                    </h3>
                    <div className='friendRequestButtons'>
                        <button
                            className='friendRequestButton'
                            onClick={() => window.location = './activities'}>
                            Log an Activity
                        </button>
                        <button
                            className='friendRequestButton'
                            onClick={() => window.location = './friends'}>
                            Dismiss
                        </button>
                    </div>
                </div>
            ));
            setDisplayRequests(displayRequests);
        }
    }, [incomingRequests]);

    function isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }

    return (
        <div className="friendRequestsTab">
            <h1 className='friendRequestHeader'>Nudges</h1>
            {!isEmpty(incomingRequests) ? (
                (displayRequests ? (
                    <div>
                        {displayRequests}
                    </div>) : (
                    <h3>Loading Requests ... </h3>
                ))
            ) : (
                <h3 className='friendRequestName'>No Friend Requests</h3>
            )}
        </div>
    );
};
export default NudgesTab;