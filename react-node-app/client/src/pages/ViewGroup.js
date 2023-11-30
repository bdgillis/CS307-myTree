import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import GroupInvitesTab from '../components/GroupsComponents/GroupInvitesTab';

import { getAuth } from "firebase/auth";

import UserTree from './UserTree';



function GroupProfile({ match }) {

    const { groupname } = match.params;
    const [isOpen, setIsOpen] = useState(false);
    const [groupData, setGroupData] = useState(null);
    const [members, setMembers] = useState({});
    const [loadingState, setLoadingState] = useState(true);
    const [groupOwner, setGroupOwner] = useState(null);
    const [adminPrivilege, setAdminPrivilege] = useState(false);
    const [userData, setUserData] = useState(null);
    const [profileUser, setProfileUser] = useState(null);
    const [invitee, setInvitee] = useState(null);
    const [inviteeID, setInviteeID] = useState(null);
    const [inviteSent, setInviteSent] = useState(false);
    const [inviteStatus, setInviteStatus] = useState(null);
    const [groupBio, setGroupBio] = useState("");

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid;

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

                    if (body.ownerid === user.uid) {
                        setAdminPrivilege(true);
                    }

                    setMembers(body.members);

                    setGroupBio(body.bio);
                    setLoadingState(false);
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }
            getGroupData();
        }
    }, [groupname, user]);

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
            <div>
                <h3 key={key} value={key}>
                    {member}
                    <button
                        className='groupTreeButton'
                        onClick={() => window.location = '/homeTabNew/' + member}>
                        View Tree
                    </button>
                
                </h3>
            </div>
            
            
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
                <h2>{groupBio}</h2>
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
                {
                    adminPrivilege && (<div className='friendRequestButtons'>
                    <button
                        className='friendRequestButton'
                        onClick={() => window.location = '../editgroup/' + groupname}>
                        Edit Group
                    </button>
                    </div>)
                }

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

export default GroupProfile;