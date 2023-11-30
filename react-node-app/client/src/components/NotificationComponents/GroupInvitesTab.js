import React, { useEffect, useState, timeout } from 'react'
import { getAuth } from "firebase/auth";

const GroupInvitesTab = () => {

    const [username, setUsername] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [groupInvites, setGroupInvites] = useState({});
    const [friends, setFriends] = useState({});
    const [displayRequests, setDisplayRequests] = useState(null);
    const [userGroups, setUserGroups] = useState({});
    const [displayInvites, setDisplayInvites] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {

        if (user) {
            const uid = user.uid;
            console.log("uid: " + uid);
            const getGroupInvites = async () => {
                const response = await fetch('/api/groupInvites/' + uid, {
                    method: 'GET',

                }); 
                const body = await response.json();
                console.log(body);
                setGroupInvites(body.groupInvites);
            }

            getGroupInvites();
        }

    }, [user]);

    useEffect(() => {
        if (groupInvites.length > 0) {
            // console.log(incomingRequests);
            const display = groupInvites.map((element) => (
                <div>
                    <hr />

                    <h3 className='friendRequestName'>
                        Groupname: {element}
                    </h3>
                    <div className='friendRequestButtons'>
                        <button
                            className='friendRequestButton'
                            onClick={() => window.location = './' + {element}}>
                            Accept
                        </button>
                        <button
                            className='friendRequestButton'
                            onClick={() => window.location = './' + {element}}>
                            Decline
                        </button>
                        <button
                            className='friendRequestButton'
                            onClick={() => window.location = './' + {element}}>
                            View Group
                        </button>
                    </div>
                </div>
            ));
            setDisplayInvites(display);
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
            {!isEmpty(groupInvites) ? (
                (displayInvites ? (
                    <div>
                        {displayInvites}
                    </div>) : (
                    <h3>Loading Groups ... </h3>
                ))
            ) : (
                <div>
                    <h3 className='friendRequestName'>No Group Invites</h3>
                    <button
                        className='friendRequestButton'
                        onClick={() => window.location = './groups'}>
                        Join a Group
                    </button>
                </div>
            )}
        </div>
    );
};
export default GroupInvitesTab;