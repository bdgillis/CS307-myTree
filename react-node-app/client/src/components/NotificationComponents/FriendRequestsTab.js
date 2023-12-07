import React, { useEffect, useState, timeout } from 'react'
import { GroupBtnLink } from '../Navbar/NavbarElements';
import { getAuth } from "firebase/auth";

const FriendRequestsTab = () => {

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

    function acceptRequest(targetUsername) {
        // console.log(friend.id);
        if (user) {
            const makeFriends = async () => {
                const uid = user.uid;

                const response = await fetch(`/api/friendrequests/accept`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ receivingUid: uid, receivingUsername: userUsername, sendingUsername: targetUsername }),
                });
                const body = await response.json();
                console.log(body);
            }
            makeFriends();
            
        }
    }

    function declineRequest(targetUsername) {
        // console.log(friend.id);
        if (user) {
            const makeFriends = async () => {
                const uid = user.uid;

                const response = await fetch(`/api/friendrequests/decline`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ receivingUid: uid, receivingUsername: userUsername, sendingUsername: targetUsername }),
                });
                const body = await response.json();
                console.log(body);
            }
            makeFriends();
            window.location = './friends';
        }
    }

    useEffect(() => {
        if (incomingRequests.length > 0) {
            // console.log(incomingRequests);
            const displayRequests = incomingRequests.map((element) => (
                <div>
                    <hr />

                    <h3 className='friendRequestName'>
                        Friend Request from: {element}
                    </h3>
                    <div className='friendRequestButtons'>
                    <GroupBtnLink
                            onClick={() => acceptRequest(element)}
                            to={'./friends'}>Accept</GroupBtnLink>

                        <button
                            className='friendRequestButton'
                            onClick={() => declineRequest(element)}>
                            Decline
                        </button>
                        <button
                            className='friendRequestButton'
                            onClick={() => window.location = './profile/' + element}>
                            View Profile
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
            <h1 className='friendRequestHeader'>Friend Requests</h1>
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
export default FriendRequestsTab;