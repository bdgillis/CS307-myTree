import React, { useEffect, useState, timeout } from 'react'
import { getAuth } from "firebase/auth";

const SearchTab = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [groupname, setGroupname] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [group, setGroup] = useState(null);
    const [joinRequest, setJoinRequest] = useState(false);
    const [friends, setFriends] = useState({});
    const [onFriendList, setOnFriendList] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (groupname) {
            const findGroup = async () => {
                const response = await fetch('/api/groups/' + groupname);
                const body = await response.json();
                if (body.exists == false) {
                    //console.log("user does not exist");
                    setGroup(null);
                } else {
                    //console.log("user exists");
                    setGroup(body);
                }
            }
            findGroup();
        }

    }, [groupname]);

    useEffect(() => {
        if (user) {
            const uid = user.uid;

            if (group) {
                const joinGroup = async () => {
                    console.log(group);
                    const response = await fetch(`/api/groups/join/${groupname}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ uid: uid }),
                    });
                    const body = await response.json();
                    console.log(body);
                }
                joinGroup();
            }
        } else {
            console.log("user is null");
        }

    }, [joinRequest]);

    // useEffect(() => {
    //     if (user) {
    //         const uid = user.uid;
    //         console.log("uid: " + uid);

    //         const getUserUsername = async () => {
    //             try {
    //                 const response = await fetch(`/api/friends/uid=${uid}`, {
    //                     method: 'GET'
    //                 });
    //                 if (!response.ok) {
    //                     throw new Error('Network response was not ok');
    //                 }
    //                 const uUsername = await response.json();
    //                 //console.log("79 username " + username)
    //                 setUserUsername(uUsername.username); // Set the data in the component's state
    //                 // setUserDoc(uUsername.userDoc);
    //                 setFriends(uUsername.userDoc.friends);
    //                 console.log(uUsername.userDoc.friends);
    //             } catch (error) {
    //                 console.error('There was an error:', error);
    //             }
    //         }
    //         getUserUsername(); // Call the async function within useEffect
    //     }

    // }, [user]);

    const sendRequest = () => {
        setJoinRequest(true);
    }

    const handleSearch = async (e) => {
        setGroupname(document.getElementById("groupname").value);
    }

    return (
        <div className="searchFriendsTab">
            <h1 className='searchFriendHeader'>Search Groups </h1>
            <div className='searchFriendMenu'>
                <input
                    className="searchFriendInput"
                    type="text"
                    id="groupname"
                    placeholder='Group Name'
                ></input>
                <button
                    className='searchFriendButton'
                    onClick={handleSearch}>
                    Search
                </button>
            </div>

            {group ? (
                <div>
                    {/* <h3 className='searchFriendStatus'>Group Found</h3> */}
                    <h4 className='searchFriendUsername'>Group: {groupname}</h4>
                    <div className='searchFriendButtons'>
                        <button
                            className='searchFriendButton'
                            onClick={sendRequest}>
                            Join Group
                        </button>
                        {/* <button
                            className='searchFriendButton'
                            onClick={() => window.location = './profile/' + friend.user.username}>
                            View Profile
                        </button> */}
                    </div>
                </div>
            ) : (groupname) ? (
                <h3 className='searchFriendStatus'>Group Not Found!</h3>) : (
                <></>
            )}
        </div>
    );
};
export default SearchTab;