import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from "../firebase";
import { getMessaging, getToken } from "firebase/messaging";
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { ButtonLink } from "../components/Header";
import { notificationDetail } from "../components/Notification";
import { getAuth } from "firebase/auth";
import Tabs from "../components/NotificationComponents/NotificationTabs";
import '../App.css';


export var flag = 0;
export var g_Counter = 0;
export var giveNotification;

const NotificationPage = () => {
    const messaging = getMessaging;
    const [notification, setNotification] = useState({ title: '', body: '' });
    const notify = () => toast(<ToastDisplay />);

    const [isOpen, setIsOpen] = useState(false);
    const [userDoc, setUserDoc] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [friendRequests, setFriendRequests] = useState({});
    const [friendRequestDisplay, setFriendRequestDisplay] = useState(null);
    const [nudges, setNudges] = useState({});
    const [groupInvites, setGroupInvites] = useState({});

    var details;
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const auth = getAuth();
    const user = auth.currentUser;
    window.localStorage.setItem("FReq", 0);
    window.localStorage.setItem("nudges", 0);
    window.localStorage.setItem("GInv", 0);


    useEffect(() => {
        if (user) {
            const uid = user.uid;
            console.log("uid: " + uid);

            const getUserData = async () => {
                const response = await fetch(`/api/profile/${uid}`, {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const uData = await response.json();
                console.log(uData);
                setUserDoc(uData);
                setUserUsername(uData.username)
            }
            getUserData();
        }
    }, [user]);

    useEffect(() => {
        if (userDoc) {
            g_Counter = 0;
            if (userDoc.incomingRequests != null) {
                g_Counter += userDoc.incomingRequests.length;
                setFriendRequests(userDoc.incomingRequests);
                window.localStorage.setItem("FReq", userDoc.incomingRequests.length);
                console.log("FReq: " + window.localStorage.getItem("FReq"));
            }
            if (userDoc.nudges) {
                g_Counter += userDoc.nudges.length;
                setNudges(userDoc.nudges);
                window.localStorage.setItem("nudges", userDoc.nudges.length);

            }
            if (userDoc.groupInvites) {
                g_Counter += userDoc.groupInvites.length;
                setGroupInvites(userDoc.groupInvites);
                window.localStorage.setItem("GInv", userDoc.groupInvites.length);
            }
            console.log("g_Counter: " + g_Counter);
            window.localStorage.setItem("g_Counter", g_Counter);
        }

    }, [userDoc]);



    function ToastDisplay() {
        return (
            <div>
                <p><b>{notification?.title}</b></p>
                <p>{notification?.body}</p>
            </div>
        );
    };



    function deleteArray() {
        g_Counter = 0;
    }

    useEffect(() => {
        if (notification?.title) {
            notify()
        }

    }, [notification])


    requestForToken();

    onMessageListener()
        .then((payload) => {
			g_Counter = 1;
            setNotification({title: payload?.notification?.title, body: payload?.notification?.body});
			let notif = payload.notification.body;
			console.log(notif);


        })
        .catch((err) => console.log('failed: ', err));




    return (
        <>
            <Toaster />

            <div className='NavMenu'>

                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
                <h1 style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}> Notifications</h1>


                <div className="notifButton">
                    <ButtonLink className="challenge" to='/daily-challenge' onClick={deleteArray()}>View Your Daily Challenge!</ButtonLink>
                </div>

                <Tabs />

            </div>


            {/* <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh'
            }}>
                <div>
				    <h1>Notifications</h1>
                    <ButtonLink className="challenge" to='/daily-challenge' onClick={deleteArray()}>View Your Daily Challenge!</ButtonLink>
				
                    
            
                </div>


            </div> */}


        </>
    )
}

export default NotificationPage;