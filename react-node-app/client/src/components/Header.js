import { Link } from "react-router-dom";
import React from 'react';
import styled from 'styled-components';
import '../App.css'


function refreshPage() {
    setTimeout(()=>{
        window.location.reload(false);
    }, 100);
    console.log('page to reload')
}

export const Button = styled.button`
border-radius: 4px;
background: #256ce1;
padding: 5px 10px;
color: #fff;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
font-size: 13px;
  font-weight: bold; 

&:hover {
  transition: all 0.2s ease-in-out;
  background: #fff;
  color: #010606;
}
`;

export const ButtonLink = ({ to, children, onClick }) => {
    return <Link to={to}><Button onClick={onClick}>{children}</Button></Link>;
}



const Header = () => {

    return(
        <div class="header-style">
            
            <img src={require('../Images/myTreeLogo.png')} witdh={250} height={250} alt="logo"/>

            <ul className="accountsNav">
                <li className="navAccount">
                    <ButtonLink className="buttonlink" to='/'>Create Account</ButtonLink>
                </li>
                
                <li className="navLogin">
                    <ButtonLink className="test" to='/loginPage'>Login</ButtonLink>
                </li>
            </ul>
        </div>
    );
};

export default Header;