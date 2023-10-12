import React, {useState} from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import styled from 'styled-components';

const LogoutButton = styled.button `
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
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
  	return (
		<>
            <>
			    <Sidebar isOpen={isOpen} toggle={toggle} />
			    <Navbar toggle={toggle} />
            </>
            
			<div style={{ 
				display: 'flex', 
				justifyContent: 'center', 
				//alignItems: 'top',
				height: '90vh'
			}}>
				<h1>Are you sure you want to Logout?</h1>
			</div>

            <div  style={{ 
				display: 'flex', 
                justifyContent: 'center', 
                position: 'relative',
				alignItems: '',
			    }}> 
                    <LogoutButton>
                        Logout
                    </LogoutButton>
                </div>
		</>
  	)
}

export default Logout