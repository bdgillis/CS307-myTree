import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import styled from 'styled-components';
import './Logout.css'
import '../App.css'
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

    window.location = '/loginPage'
}


const ManageAccount = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const Button = styled.button `
    border-radius: 10px;
    background: #256ce1;
    padding: 7px 15px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    font-size: 14px;

    //margin-left: -18px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`


    const Input = styled.input `
       

`

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
            <div className='NavMenu'>
				<Sidebar isOpen={isOpen} toggle={toggle} />
				<Navbar toggle={toggle} />
			</div>

            <div>
                <br /><br />
                <h1>Manage Account</h1>
                <h2>Account Info</h2>
                <h4>Email address: {user.email}</h4>
                <h4>Account Created: {created}</h4>
                <h4>Most recent login: {login}</h4>
            </div>
            <div>
                <h2>Reset your password</h2>
            </div>
            <div>
                <label for="old-password">Enter your old password: </label><br />
                <input 
                    className= 'inputs' 
                    type="text" 
                    id="old-password"
                    placeholder='Old Password'
                ></input><br />
                <br />
                <label for="new-password">Enter your NEW password: </label><br />
                    <input 
                        className= 'inputs' 
                        type="text" 
                        id="new-password"
                        placeholder='New Password'
                    ></input>
            </div>
            <div>
                <br/>
                <Button onClick={resetPword}>
                    Click here to Reset Password
                </Button>
            </div>

            <div name="status">
                <h3 id="status" style={{ color: 'red' }}></h3>
            </div>
            <div>
                <h2>Delete Account</h2>
                <Button onClick={deleteAccount}>
                    Click here to Delete Account
                </Button>

            </div>

        </>
    )
}

export default ManageAccount