import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import {
    getAuth,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider
} from "firebase/auth";



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


const ManageAccount = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const resetPword = async () => {
        var oldPasswordField = document.getElementById("old-password");
        var newPasswordField = document.getElementById("new-password");
        const oldPassword = oldPasswordField.value;
        const newPassword = newPasswordField.value;
        var status = document.getElementById("status")


        if (oldPassword === "") {
            status.innerHTML = "Error. Please enter your old password."
            console.log("empty old pword")

        } else if (newPassword === "") {
            status.innerHTML = "Error. Please enter a new password."
            console.log("empty new pword")

        } else {
            const auth = getAuth();

            const user = auth.currentUser;
            console.log(user);
            const email = user.email;
            const credential = EmailAuthProvider.credential(
                email,
                oldPassword
            );
            reauthenticateWithCredential(user, credential).then(() => {
                // User re-authenticated.

                const newCredential = EmailAuthProvider.credential(
                    email,
                    newPassword
                );
                console.log("successful old pword")
                reauthenticateWithCredential(user, newCredential).then(() => {
                    // User re-authenticated.
                    status.innerText = "Error. Your new password cannot be your old password.";
                    console.log("repeat pword")
                }).catch((error) => {
                    updatePassword(user, newPassword).then(() => {
                        status.innerText = "Success, your password has been changed";
                        console.log(" pword changed")

                    });
                });
            }).catch((error) => {
                // const div = document.getElementById("reset-page");
                document.getElementById("status").innerText = "Error. Please input your old password.";
                console.log("incorrect old pword")

            });
            newPasswordField.value = "";
            oldPasswordField.value = "";
        }
    }
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        console.log(user)
        var created = ""
        var login = ""
        if (user) {
            created = user.metadata.creationTime;
            login = user.metadata.lastSignInTime;
            const uid = user.uid;
        }
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
                <br /><br />
                <h1>Manage Account</h1>
                <br /><br />
                <h2>Account Info</h2>
                <h3>Email address: {user.email}</h3>
                <h3>Account Created: {created}</h3>
                <h3>Most recent login: {login}</h3>
            </div>
            <div>
                <br /><br />
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
            </div>
            <div name="status">
                <h3 id="status" style={{ color: 'red' }}></h3>
            </div>
            <br />
            <div>
                <br /><br />
                <h2>Delete Account</h2>
                <button onClick={deleteAccount}>
                    Click here to Delete Account
                </button>

            </div>

        </>
    )
}

export default ManageAccount