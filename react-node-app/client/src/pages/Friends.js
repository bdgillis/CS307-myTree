import React, { useEffect, useState, timeout } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import './Logout.css'

const Friends = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [username, setUsername] = useState(null);
    const [usernameExists, setUsernameExists] = useState(false);
    const [user, setUser] = useState(null);
    const [friend, setFriend] = useState(null);
    const uid = null;

    useEffect(() => {
        const findFriend = async () => {
            console.log(document.getElementById("username").value);
            console.log("username: " + username);
            const response = await fetch('/api/friends/' + username);
            const body = await response.json();
            console.log(body);
            if (body.available) {
                //console.log("user does not exist");
                setFriend(null);
            } else {
                //console.log("user exists");
                setFriend(body);
            }
        }
        findFriend();

    }, [username]);

    useEffect(() => {
        const auth = getAuth();
        const getUser = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                setUser(user);
                uid = user.uid;
            } else {
                // User is signed out.
                setUser(null);
            }
        });
        getUser();
    }, [user]);

    useEffect(() => {
        if (friend) {
            console.log("friend: " + friend);
            const addFriend = async () => {
                const response = await fetch('/api/friends', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid: uid , username: friend.username }),
                });
                const body = await response.json();
                console.log(body);
            }
            addFriend();
        }
    }, [friend]);

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
                <h2>Add friends: </h2>
                <input type="text" id="username"></input>
                <button onClick={handleSearch}>Search</button>
                {friend ? (
                    <h3>User exists!!</h3>
                ) : (
                    <h3>No User!!</h3>
                )}

            </div>
        </>

    )
}

export default Friends