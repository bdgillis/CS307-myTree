import React, {useState, useEffect} from "react";
import toast, {Toaster} from 'react-hot-toast';
import { requestForToken, onMessageListener } from "../firebase";
import { getMessaging, getToken } from "firebase/messaging";
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { ButtonLink } from "../components/Header";
import { notificationDetail } from "../components/Notification";


export var flag = 0;
export var g_Counter = 0;
export var giveNotification;

const NotificationPage = () => {
	const messaging = getMessaging;
    const [notification, setNotification] = useState({title: '', body: ''});
    const notify = () => toast(<ToastDisplay/>);

    const [isOpen, setIsOpen] = useState(false);
    var details;
    const toggle = () => {
      setIsOpen(!isOpen);
    };

	function ToastDisplay() {
        return(
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
        if(notification?.title){
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
            
			document.getElementById("printNotif").innerHTML = (notif + "<br/>");


        })
        .catch((err) => console.log('failed: ', err));
    


    
  	return (
		<>
		<Toaster/>

			<div className='NavMenu'>
                
				<Sidebar isOpen={isOpen} toggle={toggle} />
				<Navbar toggle={toggle} />
			</div>
			
			<div style={{ 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center',
				height: '90vh'
			}}>
                <div>
				    <h1>Notifications</h1>
                    <ButtonLink className="challenge" to='/daily-challenge' onClick={deleteArray()}>View Your Daily Challenge!</ButtonLink>
					
					<p id="printNotif"></p>
                    
            
                </div>

        
			</div>
            
		</>
  )
}

export default NotificationPage;