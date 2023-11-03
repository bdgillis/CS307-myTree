import React, {useState, useEffect} from "react";
import toast, {Toaster} from 'react-hot-toast';
import { requestForToken, onMessageListener } from "../firebase";
import { getMessaging, getToken } from "firebase/messaging";
import { giveNotification } from "../pages/notificationPage";

export var notificationDetail;

const Notification = () => {

    
    const messaging = getMessaging;
    const [notification, setNotification] = useState({title: '', body: ''});
    const notify = () => toast(<ToastDisplay/>);

    

    function ToastDisplay() {
        return(
            <div>
                <p><b>{notification?.title}</b></p>
                <p>{notification?.body}</p>
            </div>
        );
    };

    

    useEffect(() => {
        if(notification?.title){
            notify()
        }
        
    }, [notification])

    
    requestForToken();
    

    onMessageListener()
        .then((payload) => {
            setNotification({title: payload?.notification?.title, body: payload?.notification?.body});
            

            notificationDetail = notification.body;

            console.log(notificationDetail);

        })
        .catch((err) => console.log('failed: ', err));
    

    

    return (

        <Toaster/>

    )
}

export default Notification