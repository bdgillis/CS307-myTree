import React, { useEffect, useState, timeout } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import './Logout.css'
import { ButtonLink } from '../components/Header';
import LeagueListTab from '../components/LeaguesComponent/LeagueListTab';
import Notification from '../components/Notification';


const Leagues = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const auth = getAuth();
    const user = auth.currentUser;

    

    return (
        <>
            <div className='NavMenu'>
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
                <LeagueListTab />
            </div>
            <div style={{ 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center',
				height: '90vh'
			}}></div>

        </>

    )
}

export default Leagues