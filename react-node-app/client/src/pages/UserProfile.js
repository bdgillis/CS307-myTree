import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

function UserProfile({ match }) {
    
    const { username } = match.params;
    const [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [activityHistory, setActivityHistory] = useState({});
    const [loadingState, setLoadingState] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    

    return (
        <>
            <div className='NavMenu'>
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
            </div>
            <div>
                <h1>Welcome to {username}'s profile page!</h1>
                {/* Add user-specific content here */}
            </div>
        </>
    );
}

export default UserProfile;