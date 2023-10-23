import React, { useEffect, useState, timeout } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import './Logout.css'

const Friends = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [username, setUsername] = useState(null);
    const [usernameExists, setUsernameExists] = useState(false);

    useEffect(() => {

        if (username == document.getElementById("username").value) {
            console.log("username is the same");
        }
        const checkUsername = async () => {
            console.log(document.getElementById("username").value);
            console.log("username: " + username);
            const response = await fetch('/api/quiz/' + username);
            const body = await response.json();
            console.log(body);
            if (body.available) {
                console.log("user does not exist");
                setUsernameExists(false);
            } else {
                console.log("user exists");
                setUsernameExists(true);
            }
        }
        checkUsername();

    }, [username]);

    const handleSearch = async (e) => {
        setUsername(document.getElementById("username").value);

    }
    return (
        <>
            <div className='NavMenu'>
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
            </div>
            <div>
                <h1>Friends</h1>
                <h2>Search for a friend: </h2>
                <input type="text" id="username"></input>
                <button onClick={handleSearch}>Search</button>

            </div>
        </>

    )
}

export default Friends