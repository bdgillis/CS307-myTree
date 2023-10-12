import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { getAuth, 
    updatePassword, 
    reauthenticateWithCredential,
    EmailAuthProvider} from "firebase/auth";



function deleteAccount() {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    user
        .delete()
        .then(() => {
            console.log("Account deleted");
        })
        .catch((error) => {
            console.log("Error deleting account")
        });

    window.location = '/'
}


const Settings = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const resetPword = async () => {

        const auth = getAuth();

        const user = auth.currentUser;
        console.log(user);
        const email = user.email;
        var oldPassword = document.getElementById("old-password").value;
        const credential = EmailAuthProvider.credential(
            email,
            oldPassword
        );
        reauthenticateWithCredential(user, credential).then(() => {
            // User re-authenticated.
            var newPassword = document.getElementById("new-password").value;

            updatePassword(user, newPassword).then(() => {
                document.getElementById("status").innerText = "Success, your password has been changed";
                newPassword = "";
                oldPassword = "";
            }).catch((error) => {
                console.log(error)
            });
        }).catch((error) => {
            // const div = document.getElementById("reset-page");
            document.getElementById("status").innerText = "Error. Please input your old password.";
            // div.appendChild(incorrect);
            // console.log(error)
        });
    }

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <div style={{ 
				position: 'fixed', 
				top: 0, 
				left: '12%', 
				}}>
                <Navbar toggle={toggle} />
                </div>
                <div>

                <h1>Settings</h1>

                <h2>Reset your password</h2>
                <label for="old-password">Enter your old password: </label><br />
                <input type="text" id="old-password"></input><br />
                <br />
                <label for="new-password">Enter your NEW password: </label><br />
                <input type="text" id="new-password"></input>
                <br /><br />

                <button onClick={resetPword}>
                    Click here to Reset Password
                </button>
                <h3 id="status" style={{color: 'red'}}></h3>
                <br />

                <h2>Delete Account</h2>

                <button onClick={deleteAccount}>
                    Click here to Delete Account
                </button>

            </div>

        </>
    )
}

export default Settings