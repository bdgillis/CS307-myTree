import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import './HomeTab.css'
import { useHistory } from 'react-router-dom';
import { FaUserAstronaut } from 'react-icons/fa';

function UserTree({ match }) {
    const { username } = match.params;
    const [isOpen, setIsOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [activityHistory, setActivityHistory] = useState({});
    const [loadingState, setLoadingState] = useState(true);
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [profileUser, setProfileUser] = useState(null);
    
    const [imageSrc, setImageSrc] = useState('../Images/MyTree1.jpg');
    const history = useHistory();

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (username) {
            console.log(username);
            const getProfileData = async () => {
                try {
                    const response = await fetch('/api/friends/username=' + username);
                    const body = await response.json();
                    console.log(body);
                    setProfileData(body); // Set the data in the component's state
                    document.getElementById("welcome-msg").innerHTML = "This is " + username + "'s tree";
                } catch (error) {
                    console.error('There was an error:', error);
                }
            }
            getProfileData();
        }
    }, [username]);

    function isEmpty(obj) {
        for (const prop in obj) {
          if (Object.hasOwn(obj, prop)) {
            return false;
          }
        }
      
        return true;
    }

    //var temp = 1;
    var image
    var height = 250;

    function changeImage() {
        //Change Carbon Score artifically
        //profileData.carbonScore = -0.1;

        image = document.getElementById('myTree');

        if (profileData.user.carbonScore < 0) {
            image.src = require('../Images/MyTree0.png');
            if (profileData.user.carbonScore > -100) {
                image.height = 450 + 2 * profileData.user.carbonScore;
            } else {
                image.height = 250;
            }
        }
        else if (profileData.user.carbonScore < 100) {
            image.src = require('../Images/MyTree1.jpg');
            //image.height = 450;
            image.height = 250 + 2 * profileData.user.carbonScore;
        } else {
            image.src = require('../Images/MyTree2.png');
            if (profileData.user.carbonScore < 200) {
                image.height = 250 + 2 * (profileData.user.carbonScore - 100);
            } else {
                image.height = 450;
            }
        }
    }


    //var timer = setInterval(changeImage(), 2000);


    return (
    
        <>
            <div className="NavMenu">
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
            </div>
            <div className='welcome-banner'>
                <h1 
                    className = 'test' 
                    id="welcome-msg" 
                >
                </h1>
            </div>
            

            <div className='tree'>
                <img
                    src={require('../Images/MyTree1.jpg')} 
                    id='myTree'
                    witdh={250} 
                    height={250}
                    alt="logo" 
                />
            </div>
            <div className='carbon-score'>
            {profileData ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {changeImage()}
                        <h3>{username}'s Tree Height: {image.height}</h3>
                    </div>
                ) : (
                    <h3>MyTree's Height: 250 </h3>
                )}
                {!loadingState ? (
                    (isEmpty(activityHistory)) ? (
                        <h3></h3>
                    ) : (
                        <div>
                            {}
                        </div>
                    )
                    
                ) : (
                    <h3></h3>
                )}
                
            </div>
        </>
    )
    
}

export default UserTree