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

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (groupname) {
            const getGroupData = async () => {
                try {
                    // const response = await fetch(`/api/profile/username=${username}`, {
                    //     method: 'GET'
                    // });
                    // if (!response.ok) {
                    //     throw new Error('Network response was not ok');
                    // }
                    //console.log(response)
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

    // useEffect(() => {
    //     const getMembers = async () => {
    //         if (groupname) {
    //             try {
    //                 const res = await fetch(`/api/profile/activity/${username}`, {
    //                     method: 'GET'
    //                 });
    //                 const data = await res.json();
    //                 console.log(data);
    //                 const activities = {};
    //                 Object.keys(data.activities).forEach((key) => {
    //                     const activity = data.activities[key];
    //                     activities[key] = activity;
    //                 });

    //                 setMembers(activities);
    //                 setLoadingState(false);
    //             } catch (err) {
    //                 console.log('Error: ', err);
    //             }
    //         }
    //     };

    //     getMembers(); // Call the async function within useEffect
    // }, [groupname]); // The empty dependency array ensures that useEffect runs only once

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
                <h1>User Profile </h1>
                {groupData ? (

                    <div>
                        {/* <h3 id="displayName">Display Name: {user.displayName}</h3> */}

                        <h3>Groupname: {groupname}</h3>
                        
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
        </>
    );
}

export default UserProfile;