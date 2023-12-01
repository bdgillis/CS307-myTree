import React, { useEffect, useState, timeout } from 'react'
import { getAuth } from "firebase/auth";
import { GroupBtnLink } from '../Navbar/NavbarElements';

const MyGroupsTab = () => {


    const [username, setUsername] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [incomingRequests, setIncomingRequests] = useState({});
    const [friends, setFriends] = useState({});
    const [displayRequests, setDisplayRequests] = useState(null);
    const [userGroups, setUserGroups] = useState({});
    const [displayGroups, setDisplayGroups] = useState(null);
    const [userGroupRequests, setUserGroupRequests] = useState({});
    const [displayGroupRequests, setDisplayGroupRequests] = useState(null);

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
                <>
                    <hr />

                    <h3 className='friendRequestName'>
                        Groupname: {element}
                    </h3>
                    <div className='friendRequestButtons'>
                        <GroupBtnLink to={'./viewgroup/' + element}>View Group</GroupBtnLink>
                        {/* <button
                            className='friendRequestButton'
                            onClick={() => window.location = './viewgroup/' + element}>
                            View Group
                        </button> */}
                    </div>
                </>
            ));
            setDisplayGroups(displayGroups);
        }
    }, [userGroups]);


    useEffect(() => {

        if (user) {
            const uid = user.uid;
            console.log("uid: " + uid);
            const getUserGroupRequests = async () => {
                const response = await fetch('/api/groupRequests/userRequests/' + uid);
                const body = await response.json();
                console.log(body);
                setUserGroupRequests(body);
            }

            getUserGroupRequests();
        }

    }, [user]);

    useEffect(() => {
        if (userGroupRequests.length > 0) {
            // console.log(incomingRequests);
            const displayGroupRequests = userGroupRequests.map((element) => (
                <div>
                    <hr />

                    <h3 className='friendRequestName'>
                        Groupname: {element}
                    </h3>
                    <div className='friendRequestButtons'>
                    <GroupBtnLink to={'./viewgroup/' + element}>View Group</GroupBtnLink>
                        {/* <button
                            className='friendRequestButton'
                            onClick={() => window.location = './viewgroup/' + element}>
                            View Group
                        </button> */}
                    </div>
                </div>
            ));
            setDisplayGroupRequests(displayGroupRequests);
        }
    }, [userGroupRequests, user]);



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
                        <center>
                            <button
                                className='friendRequestButton'
                                onClick={() => window.location = './groups'}>
                                Join a Group
                            </button>
                        </center>

                    </div>
                )}
            </div>
            <div className="friendRequestsTab">
                <h1 className='friendRequestHeader'>My Group Requests</h1>
                {!isEmpty(userGroupRequests) ? (
                    (displayGroupRequests ? (
                        <div>
                            {displayGroupRequests}
                        </div>) : (
                        <h3>Loading Groups ... </h3>
                    ))
                ) : (
                    <div>
                        <h3 className='friendRequestName'>No Pending Group Requests</h3>
                    </div>
                )}
            </div>
        </>
    );
};
export default MyGroupsTab;