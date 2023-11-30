import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import GroupInvitesTab from '../components/GroupsComponents/GroupInvitesTab';
import { getAuth } from "firebase/auth";
import { get } from 'react-scroll/modules/mixins/scroller';



function EditGroup({ match }) {
    const { groupname } = match.params;
    const [isOpen, setIsOpen] = useState(false);
    const [groupData, setGroupData] = useState(null);
    const [members, setMembers] = useState({});
    const [loadingState, setLoadingState] = useState(true);
    const [groupOwner, setGroupOwner] = useState(null);
    const [acceptUser, setAcceptUser] = useState(null);
    const [acceptID, setAcceptID] = useState(false);
    const [declineUser, setDeclineUser] = useState(null);
    const [declineID, setDeclineID] = useState(false);
    const [removeUser, setRemoveUser] = useState(null);
    const [removalID, setRemovalID] = useState(false);
    const [removeStatus, setRemoveStatus] = useState(null);
    const [groupBio, setGroupBio] = useState("");
    const [sendingBio, setSendingBio] = useState(false);
    const [groupJoinRequests, setGroupJoinRequests] = useState({});

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid;

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    //re render when removing user from group
    useEffect(() => {

        if (removeUser) {
            console.log("removeUser: " + removeUser);
            const getID = async () => {
                const response = await fetch('/api/friends/username=' + removeUser);
                const body = await response.json();
                if (body.available) {
                    //console.log("user does not exist");
                    setRemovalID(null);
                    setRemoveStatus(false);
                } else {
                    //console.log("user exists");
                    setRemovalID(body.id);
                }
            }
            getID();
        }
    }, [removeUser]);
    
    useEffect(() => {
        if (removalID) {
            console.log("removalID: " + removalID);

            const removeUser = async () => {
                const response = await fetch('/api/groups/remove/' + groupname, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid: removalID }),
                });
                const body = await response.json();
                console.log(body);
                if (body.status === 'success') {
                    setRemoveStatus(true);
                } else {
                    setRemoveStatus(false);
                }
            }
            removeUser();
        }

    }, [removalID]);

    //re render when accepting user to group
    useEffect(() => {

        if (acceptUser) {
            console.log("acceptUser: " + acceptUser);
            const getID = async () => {
                const response = await fetch('/api/friends/username=' + acceptUser);
                const body = await response.json();
                if (body.available) {
                    //console.log("user does not exist");
                    setAcceptID(null);
                } else {
                    //console.log("user exists");
                    setAcceptID(body.id);
                }
            }
            getID();
        }
    }, [acceptUser]);

    useEffect(() => {
        if (acceptID) {
            console.log("acceptID: " + acceptID);

            const acceptUser = async () => {
                const response = await fetch('/api/groupRequests/accept/' + groupname, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid: acceptID }),
                });
                const body = await response.json();
                console.log(body);
                
            }
            acceptUser();
        }

    }, [acceptID]);

    //re render when declining user entry to group
    useEffect(() => {

        if (declineUser) {
            console.log("declineUser: " + declineUser);
            const getID = async () => {
                const response = await fetch('/api/friends/username=' + declineUser);
                const body = await response.json();
                if (body.available) {
                    //console.log("user does not exist");
                    setDeclineID(null);
                } else {
                    //console.log("user exists");
                    setDeclineID(body.id);
                }
            }
            getID();
        }
    }, [declineUser]);

    useEffect(() => {
        if (declineID) {
            console.log("declineID: " + declineID);

            const declineUser = async () => {
                const response = await fetch('/api/groupRequests/decline/' + groupname, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid: declineID }),
                });
                const body = await response.json();
                console.log(body);
                
            }
            declineUser();
        }

    }, [declineID]);

    

    const handleRemove = (member) => {
        console.log("Trying to remove: " + member);
        // if (document.getElementById('groupname').value in members) {
        //     setRemoveUser(document.getElementById('groupname').value);
        // }
        if (member === groupOwner) {
            alert("You cannot remove yourself as the group owner!");
        } else {
            setRemoveUser(member);
        }
    };
    
    const handleAccept = (member) => {
        console.log("Trying to accept request from: " + member);
        // if (document.getElementById('groupname').value in members) {
        //     setRemoveUser(document.getElementById('groupname').value);
        // }
        setAcceptUser(member);
    };
    
    const handleDecline = (member) => {
        console.log("Trying to decline request from: " + member);
        // if (document.getElementById('groupname').value in members) {
        //     setRemoveUser(document.getElementById('groupname').value);
        // }
        setDeclineUser(member);
    };

    const handleBioChange = (e) => {
        console.log("biochange");

        setSendingBio(true);
    }

    useEffect(() => {
        if (sendingBio) {
            console.log("sending bio: " + groupBio);

            const updateBio = async () => {
                try {
                    const response = await fetch('/api/groups/update/' + groupname, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ bio: groupBio }),
                    });
    
                    setSendingBio(false);
                } catch (err) {
                    console.log('Error: ', err);
                }
            }
            updateBio();
        }
    }, [sendingBio]);

    


    useEffect(() => {
        if (groupname) {
            const getGroupData = async () => {
                try {
                    const response = await fetch('/api/groups/' + groupname + '/members');
                    const body = await response.json();
                    console.log(body);
                    setGroupOwner(body.owner);

                    setMembers(body.members);

                    setGroupBio(body.bio);
                    setLoadingState(false);
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }
            getGroupData();
        }
    }, [groupname]);

    useEffect(() => {
        if (groupname) {
            const getGroupRequests = async () => {
                try {
                    const response = await fetch('/api/groupRequests/incoming/' + groupname);
                    const body = await response.json();
                    console.log(body);
                    setGroupJoinRequests(body.incomingRequests);
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }
            getGroupRequests();
        }
    }, [groupname]);

    const memberDisplay = Object.keys(members).map((key) => {
        const member = members[key];
        //const time = new Date(member.timestamp).toLocaleString()
        return (
            <div style={{display: 'flex'}}>
                <h3 key={key} value={key}>
                    {member}
                </h3>
                <button
                    className='searchFriendButton'
                    onClick={() => handleRemove(member)}
                    style={{ marginLeft: '15px', marginTop: '15px', height: '30px' }}>
                    Remove User from Group
                </button>
            </div>
        );
    });

    const requestDisplay = Object.keys(members).map((key) => {
        const member = groupJoinRequests[key];
        //const time = new Date(member.timestamp).toLocaleString()
        return (
            <div style={{display: 'flex'}}>
                <h3 key={key} value={key}>
                    {member}
                </h3>
                <button
                    className='searchFriendButton'
                    onClick={() => handleAccept(member)}
                    style={{ marginLeft: '15px', marginTop: '15px', height: '30px' }}>
                    Accept
                </button>
                <button
                    className='searchFriendButton'
                    onClick={() => handleDecline(member)}
                    style={{ marginLeft: '15px', marginTop: '15px', height: '30px' }}>
                    Decline
                </button>
            </div>
        );
    });

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
            <div >
                <button
                    className='backButton'
                    onClick={() => window.location = '../viewgroup/' + groupname}>
                    Back
                </button>
            </div>
            <div>
                <h1>Edit {groupname}</h1>
                {/* Add user-specific content here */}
            </div>

            <div>
                {!loadingState ? (

                    <div>
                        <h3>Groupname: {groupname}</h3>
                        <h3>About Us:</h3>
                        <input
                            className="editBioInput"
                            type="text"
                            id='groupBio'
                            value={groupBio}
                            onChange={(e) => setGroupBio(e.target.value)}
                        ></input>
                        <button
                            className='searchFriendButton'
                            onClick={handleBioChange}
                            style={{ marginLeft: '15px', marginTop: '15px', height: '30px' }}>
                            Update Group Bio
                        </button>
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
                <br /><br />
                <h2>Requests to Join</h2>
                {!loadingState ? (
                    (isEmpty(groupJoinRequests)) ? (
                        <h3>No requests to join</h3>
                    ) : (
                        <div>
                            {requestDisplay}
                        </div>
                    )
                ) : (
                    <h3>Loading join Requests ... </h3>
                )}
            </div>

            {/* <div>
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
            </div> */}
        </>
    );
}

export default EditGroup;