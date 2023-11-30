import React, { useEffect, useState, timeout } from 'react'
import { getAuth } from "firebase/auth";
import toast, {Toaster} from 'react-hot-toast';

const NudgesTab = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [username, setUsername] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [incomingRequests, setIncomingRequests] = useState({});
    const [nudgesID, setNudgesID] = useState({});
    const [nudges, setNudges] = useState({});
    const [friends, setFriends] = useState({});
    const [displayRequests, setDisplayRequests] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;

    async function dismissNudge(id) {
        const uid = user.uid;

        const response = await fetch('/api/nudges/dismiss', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ receivingUid: uid, sendingUid: id }),
        })
        const body = await response.json();
        console.log(body);
        if (body.status === 'success') {
            toast.success('Nudge Dismissed!');
        } else {
            toast.error('Failed to Dismiss Nudge!');
        }
    }

    async function nudgeBack(id) {
        const uid = user.uid;

        const response = await fetch('/api/nudges/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ receivingUid: id, sendingUid: uid }),
        })
        const body = await response.json();
        console.log(body);
        if (body.status === 'success') {
            toast.success('Nudge Sent!');
        } else {
            toast.error('Failed to Send Nudge!');
        }

    }

    useEffect(() => {

        if (user) {
            const uid = user.uid;
            console.log("uid: " + uid);
            const getNudges = async () => {
                const response = await fetch('/api/nudges/get/' + uid);
                const body = await response.json();
                console.log(body.nudges);
                setNudgesID(body.nudges);
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

                } catch (error) {
                    console.error('There was an error:', error);
                }
            }
            getNudges();
            getUserUsername(); // Call the async function within useEffect
        }

    }, [user]);

    useEffect(() => {

        if (nudgesID.length > 0) {
            console.log(nudgesID);
            const nudgeUsers = [];
            const getNudgeUnames = async () => {
                for (var element of nudgesID) {
                    console.log(element)
                    const response = await fetch('/api/friends/uid=' + element, {
                        method: 'GET'
                    });
                    const body = await response.json();
                    console.log(body);
                    const nudge = {
                        id: element,
                        username: body.username
                    }

                    nudgeUsers.push(nudge);
                }
                setNudges(nudgeUsers);
            }
            getNudgeUnames();
        }

    }, [nudgesID]);

    function handleActivity(id) {
        dismissNudge(id);
        window.location = './activities';

    }

    useEffect(() => {
        if (nudges.length > 0) {
            // console.log(nudges);
            const displayRequests = nudges.map((element) => (
                <div>
                    <hr />

                    <h3 className='friendRequestName'>
                        Nudge from: {element.username}
                    </h3>
                    <div className='friendRequestButtons'>
                        <button
                            className='friendRequestButton'
                            onClick={() => handleActivity(element.id)}>
                            Log an Activity
                        </button>
                        <button
                            className='friendRequestButton'
                            onClick={() => dismissNudge(element.id)}>
                            Dismiss
                        </button>
                        <button
                            className='friendRequestButton'
                            onClick={() => nudgeBack(element.id)}>
                            Nudge {element.username} back!
                        </button>
                    </div>
                </div>
            ));
            setDisplayRequests(displayRequests);
        }
    }, [nudges]);

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
            <div className="friendRequestsTab">
                <h1 className='friendRequestHeader'>Nudges</h1>
                {!isEmpty(nudges) ? (
                    (displayRequests ? (
                        <div>
                            {displayRequests}
                        </div>) : (
                        <h3>Loading Requests ... </h3>
                    ))
                ) : (
                    <h3 className='friendRequestName'>No Nudges, Nice Job!</h3>
                )}
            </div>
        </>
    );
};
export default NudgesTab;