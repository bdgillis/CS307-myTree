import React, { useEffect, useState, timeout } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { applyActionCode, getAuth } from "firebase/auth";



const FriendListTab = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const notify = () => toast(<ToastDisplay />);
    const [notification, setNotification] = useState({ title: '', body: '' });


    const [friends, setFriends] = useState({});
    const [displayFriends, setDisplayFriends] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [nudgeSent, setNudgeSent] = useState(false);
    const [nudgeUser, setNudgeUser] = useState(null);
    const [nudgeUid, setNudgeUid] = useState(null);
    const [nudgeStatus, setNudgeStatus] = useState(null);



    const auth = getAuth();
    const user = auth.currentUser;

    function ToastDisplay() {
        return (
            <div>
                <p><b>{notification?.title}</b></p>
                <p>{notification?.body}</p>
            </div>
        );
    };

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

            const displayFriendsPromises = friends.map(async (element) => {
                const isNudge = await nudgeNeeded(element);
                // console.log(isNudge)
                console.log(element);
                return { isNudge: isNudge, element: element };

            });

            Promise.all(displayFriendsPromises).then((renderedFriends) => {
                const displayFriendsArray = renderedFriends.map((friend) => (
                    <div>
                        <hr />
                        <h3 className='friendName'>
                            Friend: {friend.element}

                        </h3>
                        <button
                            className='friendProfButton'
                            onClick={() => window.location = './profile/' + friend.element}>
                            View Profile
                        </button>
                        <button
                            className='friendTreeButton'
                            onClick={() => window.location = './homeTabNew/' + friend.element}>
                            View Tree
                        </button>
                        {friend.isNudge.daysSince ? (
                            <h4 className='friendName'>Last Activity: {friend.isNudge.daysSince} days ago</h4>
                        ) : (
                            <h4 className='friendName'>No Activities!</h4>
                        )}
                        {friend.isNudge.needNudge ? (

                            <button key={friend.element} className='friendProfButton' onClick={() => handleNudge(friend.element)}>Nudge</button>
                        ) : (
                            <div></div>
                        )
                        }

                    </div>
                ));
                setDisplayFriends(displayFriendsArray);
            });
        }
    }, [friends]);

    function handleNudge(friend) {
        setNudgeUser(friend);
        console.log("handle Nudge" + friend)
    };

    useEffect(() => {
        if (nudgeUser) {
            console.log("nudgeUser: " + nudgeUser);
            const getNudgeUid = async () => {
                const response = await fetch(`/api/friends/username=${nudgeUser}`, {
                    method: 'GET'
                });
                const body = await response.json();
                console.log(body);
                setNudgeUid(body.id);
            }
            getNudgeUid();
        }
    }, [nudgeUser]);

    useEffect(() => {
        if (nudgeUid) {
            const uid = user.uid;
            console.log("nudgeUid: " + nudgeUid);
            const sendNudge = async () => {
                const response = await fetch(`/api/nudges/send`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ receivingUid: nudgeUid, sendingUid: uid })
                });
                const body = await response.json();
                console.log(body);
                if (body.status === 'success') {
                    setNudgeSent(true);
                    toast.success('Successfully Nudged!')
                } else {
                    setNudgeSent(false);
                    toast.error('Failed to Nudge!')
                }
            }
            sendNudge();
        }
    }, [nudgeUid]);

    const nudgeNeeded = async (targetUsername) => {
        const response = await fetch(`/api/friends/activity/${targetUsername}`, {
            method: 'GET'
        });
        const body = await response.json();
        // if (body.status === "success") {
        return { needNudge: body.needNudge, daysSince: body.daysSince };
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
        <>
            <Toaster />

            <div className="searchTab">
                <h1 className='friendListHeader'>
                    Friends List
                </h1>

                {/* <h2>Friend List : </h2> */}
                {!isEmpty(friends) ? (
                    (displayFriends ? (
                        <div className='scrollHere'>
                            {displayFriends}
                        </div>) : (
                        <h3>Loading Friends List ... </h3>
                    ))
                ) : (
                    <h3 className='friendName'>No Friends</h3>
                )}
            </div>
        </>
    );
};
export default FriendListTab;