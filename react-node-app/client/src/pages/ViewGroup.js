import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import GroupInvitesTab from '../components/GroupsComponents/GroupInvitesTab';

function UserProfile({ match }) {

    const { groupname } = match.params;
    const [isOpen, setIsOpen] = useState(false);
    const [groupData, setGroupData] = useState(null);
    const [members, setMembers] = useState({});
    const [loadingState, setLoadingState] = useState(true);
    const [groupOwner, setGroupOwner] = useState(null);
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [profileUser, setProfileUser] = useState(null);
    const [invitee, setInvitee] = useState(null);
    const [inviteeID, setInviteeID] = useState(null);
    const [inviteSent, setInviteSent] = useState(false);
    const [inviteStatus, setInviteStatus] = useState(null);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (groupname) {
            const getGroupData = async () => {
                try {
                    const response = await fetch('/api/groups/' + groupname + '/members');
                    const body = await response.json();
                    console.log(body);
                    setGroupOwner(body.owner);

                    setMembers(body.members);
                    setLoadingState(false);
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }
            getGroupData();
        }
    }, [groupname]);

    const handleInvite = (e) => {
        console.log(document.getElementById('groupname').value);
        setInvitee(document.getElementById('groupname').value);

    };

    useEffect(() => {

        if (invitee) {
            console.log("invitee: " + invitee);
            const getID = async () => {
                const response = await fetch('/api/friends/username=' + invitee);
                const body = await response.json();
                if (body.available) {
                    //console.log("user does not exist");
                    setInviteeID(null);
                    setInviteStatus(false);
                    setInviteSent(true);
                } else {
                    //console.log("user exists");
                    setInviteeID(body.id);
                }
            }
            getID();
        }
    }, [invitee]);

    useEffect(() => {
        if (inviteeID) {
            console.log("inviteeID: " + inviteeID);

            const inviteUser = async () => {
                const response = await fetch('/api/groupInvites/invite/' + groupname, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid: inviteeID }),
                });
                const body = await response.json();
                console.log(body);
                setInviteSent(true);
                if (body.status === 'success') {
                    setInviteStatus(true);
                } else {
                    setInviteStatus(false);
                }
            }
            inviteUser();
        }

    }, [inviteeID]);



    function isEmpty(obj) {
        for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
                return false;
            }
        }

        return true;
    }

    const memberDisplay = Object.keys(members).map((key) => {
        const member = members[key];
        //const time = new Date(member.timestamp).toLocaleString()
        return (
            <h3 key={key} value={key}>
                {member}
            </h3>
        );
    });

    return (
        <>
            <div className='NavMenu'>
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
            </div>
            <div>
                <h1>Welcome to {groupname}</h1>
                {/* Add user-specific content here */}
            </div>

            <div>
                {!loadingState ? (

                    <div>
                        <h3>Groupname: {groupname}</h3>
                        <h2>Group Admin: {groupOwner}</h2>
                    </div>
                ) : (
                    <h3>Loading data...</h3>

                )}
                <br /><br />
                <h2>Members</h2>
                {!loadingState ? (
                    (isEmpty(members)) ? (
                        <h3>No Members</h3>
                    ) : (
                        <div>
                            {memberDisplay}
                        </div>
                    )
                ) : (
                    <h3>Loading Members ... </h3>
                )}
            </div>

            <div>
                <input
                    className="searchFriendInput"
                    type="text"
                    id="groupname"
                    placeholder='Username...'
                ></input>
                <button
                    className='searchFriendButton'
                    onClick={handleInvite}>
                    Invite User to Group
                </button>
            </div>
            <div>
                {inviteSent ? (
                    <div>
                        {inviteStatus ? (
                            <div>
                                <h3>Invite Sent!</h3>
                            </div>
                        ) : (
                            <div>
                                <h3>Invite Failed</h3>
                            </div>
                        )}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    );
}

export default UserProfile;