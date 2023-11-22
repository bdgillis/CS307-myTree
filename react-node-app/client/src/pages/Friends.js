import React, { useEffect, useState, timeout } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import './Logout.css'
import { ButtonLink } from '../components/Header';
import FriendsTabs from '../components/FriendsComponents/FriendsTabs';
import Notification from '../components/Notification';


const Friends = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [username, setUsername] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [usernameExists, setUsernameExists] = useState(false);
    // const [user, setUser] = useState(null);
    const [friend, setFriend] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [requestSent, setRequestSent] = useState(false);
    const [incomingRequests, setIncomingRequests] = useState({});
    const [friends, setFriends] = useState({});
    const [displayRequests, setDisplayRequests] = useState(null);
    const [displayFriends, setDisplayFriends] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;


    return (
        <>
            <div className='NavMenu'>
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
                <FriendsTabs />
            </div>
            <div style={{ 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center',
				height: '90vh'
			}}>               
            </div>
        </>

    )
}

export default Friends