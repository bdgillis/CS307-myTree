import React, { useEffect, useState, timeout } from 'react'
import { getAuth } from "firebase/auth";

const MyGroupsTab = () => {


    const [username, setUsername] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [incomingRequests, setIncomingRequests] = useState({});
    const [friends, setFriends] = useState({});
    const [displayRequests, setDisplayRequests] = useState(null);
    const [userGroups, setUserGroups] = useState({});
    const [displayGroups, setDisplayGroups] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {

        if (user) {
            const uid = user.uid;
            console.log("uid: " + uid);
            const getUserGroups = async () => {
                const response = await fetch('/api/groups/user/' + uid);
                const body = await response.json();
                console.log(body);
                setUserGroups(body);
            }

            getUserGroups();
        }

    }, [user]);

    useEffect(() => {
        if (userGroups.length > 0) {
            // console.log(incomingRequests);
            const displayGroups = userGroups.map((element) => (
                <div>
                    <hr />

                    <h3 className='friendRequestName'>
                        Groupname: {element}
                    </h3>
                    <div className='friendRequestButtons'>
                        <button
                            className='friendRequestButton'
                            onClick={() => window.location = './groups'}>
                            View Group
                        </button>
                    </div>
                </div>
            ));
            setDisplayGroups(displayGroups);
        }
    }, [userGroups]);

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
            <h1 className='friendRequestHeader'>My Groups</h1>
            {!isEmpty(userGroups) ? (
                (displayGroups ? (
                    <div>
                        {displayGroups}
                    </div>) : (
                    <h3>Loading Groups ... </h3>
                ))
            ) : (
                <div>
                    <h3 className='friendRequestName'>No Groups</h3>
                    <button
                        className='friendRequestButton'
                        onClick={() => window.location = './HomeTab'}>
                        Join a Group
                    </button>
                </div>
            )}
        </div>
    );
};
export default MyGroupsTab;