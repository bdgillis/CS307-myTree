import React, { useEffect, useState, timeout } from 'react'
import { getAuth } from "firebase/auth";
import toast from 'react-hot-toast';
import { GroupBtnLink } from '../Navbar/NavbarElements';

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

    function acceptInvite(groupname) {
        const uid = user.uid;
        const acceptInvite = async () => {
            const response = await fetch(`/api/groupInvites/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid: uid, groupname: groupname }),
            });
            const body = await response.json();
            console.log(body);
            if (body.status === 'success') {
                toast.success("Invite Accepted");
            } else {
                toast.error("Invite Failed");
            }
        }
        acceptInvite();
    }

    function declineInvite(groupname) {
        const uid = user.uid;
        const acceptInvite = async () => {
            const response = await fetch(`/api/groupInvites/decline`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid: uid, groupname: groupname }),
            });
            const body = await response.json();
            console.log(body);
            if (body.status === 'success') {
                toast.error("Invite Declined");
            } else {
                toast.error("Error: Invite Decline Failed");
            }
        }
        acceptInvite();
    }

    useEffect(() => {

        if (user) {
            const uid = user.uid;
            console.log("uid: " + uid);
            const getGroupInvites = async () => {
                const response = await fetch('/api/groupInvites/' + uid, {
                    method: 'GET',

                });
                const body = await response.json();
                console.log(body.groupInvites);
                setGroupInvites(body.groupInvites);
            }

            getGroupInvites();
        }

    }, [user]);

    useEffect(() => {
        if (groupInvites.length > 0) {
            console.log("groupInvites: " + groupInvites);
            const display = groupInvites.map((element) => (
                <div>
                    <hr />

                    <h3 className='friendRequestName'>
                        Groupname: {element}
                    </h3>
                    <div className='friendRequestButtons'>
                        <button
                            className='friendRequestButton'
                            onClick={() => acceptInvite(element)}>
                            Accept
                        </button>
                        <button
                            className='friendRequestButton'
                            onClick={() => declineInvite(element)}>
                            Decline
                        </button>
                        <GroupBtnLink to={'./' + { element }}>
                            View Group
                        </GroupBtnLink>
                    </div>
                </div>
            ));
            setDisplayInvites(display);
            console.log(display);
        }
    }, [groupInvites]);

    function isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }

    return (
        <div className="searchTab">
            <h1 className='friendRequestHeader'>My Groups</h1>
            {!isEmpty(groupInvites) ? (
                (!isEmpty(displayInvites) ? (
                    <div>
                        {displayInvites}
                    </div>) : (
                    <h3>Loading Groups ... </h3>
                ))
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <h3 className='friendRequestName'>No Group Invites</h3>
                    <GroupBtnLink to={'./groups'} >
                        Join a Group
                    </GroupBtnLink>
                </div>
            )}
        </div>
    );
};
export default GroupInvitesTab;