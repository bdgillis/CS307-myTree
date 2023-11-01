import React, { useEffect, useState, timeout } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import './Logout.css'
import { ButtonLink } from '../components/Header';

const Friends = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [username, setUsername] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [usernameExists, setUsernameExists] = useState(false);
    // const [user, setUser] = useState(null);
    const [friend, setFriend] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [requestSent, setRequestSent] = useState(false);
    const [incomingRequests, setIncomingRequests] = useState({});
    const [friends, setFriends] = useState({});
    const [displayRequests, setDisplayRequests] = useState(null);
    const [displayFriends, setDisplayFriends] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const findFriend = async () => {
            // console.log(document.getElementById("username").value);
            // console.log("username: " + username);
            const response = await fetch('/api/friends/username=' + username);
            const body = await response.json();
            // console.log(body);
            if (body.available) {
                //console.log("user does not exist");
                setFriend(null);
            } else {
                //console.log("user exists");
                setFriend(body);
            }
        }
        findFriend();

    }, [username]);

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
                    setUserDoc(uUsername.userDoc);
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
        if (user) {
            const uid = user.uid;
            // console.log("uid: " + uid);
            // console.log(userUsername)
            // console.log(username)
            if (friend) {
                const addFriend = async () => {
                    console.log(friend.id);
                    const response = await fetch('/api/friendrequests/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ sendingUid: uid, sendingUsername: userUsername, receivingUid: friend.id, receivingUsername: username }),
                    });
                    const body = await response.json();
                    console.log(body);
                }
                addFriend();
            }
        } else {
            console.log("user is null");
        }

    }, [requestSent]);


    const sendRequest = () => {
        setRequestSent(true);
        // console.log("why is this running")
    }

    const handleSearch = async (e) => {
        setUsername(document.getElementById("username").value);

    }

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
            window.location = './friends';
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
                    <h3>Friend Request from: {element}</h3>
                    <button onClick={() => acceptRequest(element)}>Accept</button>
                    <button onClick={() => declineRequest(element)}>Decline</button>
                    <button onClick={() => window.location = './profile/' + element}>View Profile</button>
                </div>
            ));
            setDisplayRequests(displayRequests);
        }
    }, [incomingRequests]);

    useEffect(() => {
        // if (userDoc) {
            if (friends.length > 0) {
                // console.log(incomingRequests);
                const displayFriends = friends.map((element) => (
                    <div>
                        <h3>Friend: {element}</h3>
                        <button onClick={() => window.location = './profile/' + element}>View Profile</button>
                    </div>
                ));
                setDisplayFriends(displayFriends);
            }
        // }
    }, [friends]);



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
                <h1>Friends </h1>
                <h2>Friend List : </h2>
                {!isEmpty(friends) ? (
                    (displayFriends ? (
                        <div>
                            {displayFriends}
                        </div>) : (
                        <h3>Loading Friends List ... </h3>
                    ))
                ) : (
                    <h3>No Friends</h3>
                )}
                <h2>Add friends: </h2>
                <input
                    className="inputs"
                    type="text"
                    id="username"
                    placeholder='Add Friend'
                ></input>
                <button onClick={handleSearch}>Search</button>
                {friend ? (
                    <div>
                        <h3>User Found</h3>
                        <h4>Username: {friend.user.username}</h4>
                        <button onClick={sendRequest}>Send Friend Request</button>
                        <button onClick={() => window.location = './profile/' + friend.user.username}>View Profile</button>
                    </div>
                ) : (
                    <h3>No User!!</h3>
                )}

            </div>
            <div>
                <h2>Friend Requests</h2>
                {!isEmpty(incomingRequests) ? (
                    (displayRequests ? (
                        <div>
                            {displayRequests}
                        </div>) : (
                        <h3>Loading Requests ... </h3>
                    ))
                ) : (
                    <h3>No Friend Requests</h3>
                )}
            </div>
        </>

    )
}

export default Friends