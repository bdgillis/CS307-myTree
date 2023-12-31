import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import GroupInvitesTab from '../components/NotificationComponents/GroupInvitesTab';
import { getAuth } from "firebase/auth";
import { get } from 'react-scroll/modules/mixins/scroller';
import './ManageAccount.css';
import toast from 'react-hot-toast';
import { BackBtnLink, RefreshBtnLink } from '../components/Navbar/NavbarElements';



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

    const [refresh, setRefresh] = useState(false);

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
                    toast.success('User Removed!');
                } else {
                    setRemoveStatus(false);
                    toast.error('Failed to Remove User!');
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
                if (body.status === 'success') {
                    toast.success('Request Accepted!');
                } else {
                    toast.error('Failed to Accept Request!');
                }
                
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
                if (body.status === 'success') {
                    toast.success('Request Denied!');
                } else {
                    toast.error('Failed to Deny Request!');
                }
                
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
            toast.error("You cannot remove yourself as the group owner!");
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
                    const body = await response.json();
                    console.log(body);
                    if (body.status === 'success') {
                        toast.success('Bio Updated!');
                    } else {
                        toast.error('Failed to Update Bio!');
                    }
    
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
    }, [groupname, refresh]);

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
    }, [groupname, refresh]);

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

    const requestDisplay = Object.keys(groupJoinRequests).map((key) => {
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
            <div style={{position: 'absolute', left: 0, marginTop: '120px', marginLeft: '100px', marginRight: '3.5px'}}>
                <BackBtnLink to = {'../viewgroup/' + groupname}>Back</BackBtnLink>
                
                <button 
                    className='refreshButton' 
                    onClick={() => setRefresh(!refresh)}>
                        Refresh
                </button>
            </div>
            
            <div className='profileStyle' style={{textAlign: 'center'}}>
                <h1>Edit {groupname}</h1>
                {/* Add user-specific content here */}
            </div>

            <div className='profileCard'>
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
                <h2 style={{textAlign: 'center'}}>Members</h2>
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
                <h2 style={{textAlign: 'center'}}>Requests to Join</h2>
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
        </>
    );
}

export default EditGroup;