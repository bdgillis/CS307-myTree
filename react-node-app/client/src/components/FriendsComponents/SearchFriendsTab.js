import React, { useEffect, useState, timeout } from 'react'
import { getAuth } from "firebase/auth";

const SearchFriendsTab = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [username, setUsername] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [friend, setFriend] = useState(null);
    const [requestSent, setRequestSent] = useState(false);
    const [friends, setFriends] = useState({});
    const [onFriendList, setOnFriendList] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const findFriend = async () => {
            const response = await fetch('/api/friends/username=' + username);
            const body = await response.json();
            if (body.available) {
                //console.log("user does not exist");
                setFriend(null);
            } else {
                //console.log("user exists");
                setFriend(body);
            }
        }
        findFriend();

        if (friends.length > 0) {
            friends.forEach((friend) => {
                if (friend.username === username) {
                    setOnFriendList(true);
                }
            })
        }

    }, [username]);

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
                    // setUserDoc(uUsername.userDoc);
                    setFriends(uUsername.userDoc.friends);
                    console.log(uUsername.userDoc.friends);
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }
            getUserUsername(); // Call the async function within useEffect
        }

    }, [user]);

    const sendRequest = () => {
        setRequestSent(true);
    }

    const handleSearch = async (e) => {
        setUsername(document.getElementById("username").value);
    }

    return (
        <div className="searchFriendsTab">
            <h1 className='searchFriendHeader'>Add friends </h1>
            <div className='searchFriendMenu'>
                <input
                    className="searchFriendInput"
                    type="text"
                    id="username"
                    placeholder='Add Friend'
                ></input>
                <button 
                    className= 'searchFriendButton' 
                    onClick={handleSearch}>
                        Search
                </button>
            </div>

            {friend ? (
                <div>
                    <h3 className='searchFriendStatus'>User Found</h3>
                    <h4 className='searchFriendUsername'>Username: {friend.user.username}</h4>
                    <div className='searchFriendButtons'>
                        {onFriendList ? (
                            <button className='searchFriendButton'>Friend</button>) : (
                            <button 
                                className='searchFriendButton' 
                                onClick={sendRequest}>
                                    Send Friend Request
                            </button>
                        )}
                        <button 
                            className='searchFriendButton' 
                            onClick={() => window.location = './profile/' + friend.user.username}>
                                View Profile
                        </button>
                    </div>
                </div>
            ) : (username) ? (
                <h3 className='searchFriendStatus'>User Not Found!</h3>) : (
                <></>
            )}
        </div>
    );
};
export default SearchFriendsTab;