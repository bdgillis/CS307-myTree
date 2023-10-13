import React, {useState} from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import styled from 'styled-components';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import './Logout.css'


const LogoutButton = styled.button `
    border-radius: 4px;
    background: #256ce1;
    padding: 5px 22px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    margin-left: -18px;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }

`

const Logout = () => {
	const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
    };

    const logout = async () => {
        try {
            signOut(auth)
            //alert(auth.currentUser.email)
            window.location = '/';    
        } catch (err) {
            alert(err)
            document.getElementById('errfn').innerHTML="Logout failed.";
            console.log(err.message);
        }
      };

  	return (
        <>
			<div className='NavMenu'>
                <Sidebar isOpen={isOpen} toggle={toggle} />
			    <Navbar toggle={toggle} />
            </div>
            
			<div className='verification'>
				<h1>Are you sure you want to Logout?</h1>
			</div>

            <div className='Logout-Button'> 
                    <LogoutButton onClick={logout}>
                        Logout
                    </LogoutButton>
            </div>
        </>
  	)
}

export default Logout