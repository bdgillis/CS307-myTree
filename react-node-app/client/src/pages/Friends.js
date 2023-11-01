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
    const [usernameExists, setUsernameExists] = useState(false);
    // const [user, setUser] = useState(null);
    const [friend, setFriend] = useState(null);
    const [requestSent, setRequestSent] = useState(false);
    const [incomingRequests, setIncomingRequests] = useState({});

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const findFriend = async () => {
            // console.log(document.getElementById("username").value);
            // console.log("username: " + username);
            const response = await fetch('/api/friends/' + username);
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
        // const auth = getAuth();
        // const getUser = onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         // User is signed in.
        //         setUser(user);
        //         // uid = user.uid;
        //         // console.log("uid: " + uid)
        //     } else {
        //         // User is signed out.
        //         setUser(null);
        //     }
        // });
        // getUser();
        if (user) {
            const uid = user.uid;
            console.log("uid: " + uid);
            const getIncomingRequests = async () => {
                const response = await fetch('/api/friendrequests/incoming/' + uid);
                const body = await response.json();
                console.log(body);
                setIncomingRequests(body.incomingRequests);
            }
            getIncomingRequests();
        }

    }, [user]);

    useEffect(() => {
        if (user) {
            const uid = user.uid;
            if (friend) {
                const addFriend = async () => {
                    console.log(friend.id);
                    const response = await fetch('/api/friendrequests/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ sendingUid: uid, receivingUid: friend.id }),
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


    const addFriend = () => {
        setRequestSent(true);
        console.log("why is this running")
    }

    const handleSearch = async (e) => {
        setUsername(document.getElementById("username").value);

    }

    const displayRequests = incomingRequests.map((element, index) => (
          <h3 key={index}>Friend Request from: {element}</h3>
        ));

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
                <h1>Friends</h1>
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
                        <button onClick={addFriend}>Add Friend</button>
                        <button onClick={() => window.location = './profile/' + friend.user.username}>View Profile</button>
                    </div>
                ) : (
                    <h3>No User!!</h3>
                )}

            </div>
            <div>
                <h2>Friend Requests</h2>
                {!isEmpty(incomingRequests) ? (
                    <div>
                        {displayRequests}
                    </div>
                ) : (
                    <h3>No Friend Requests</h3>
                )}
            </div>
        </>

    )
}

export default Friends