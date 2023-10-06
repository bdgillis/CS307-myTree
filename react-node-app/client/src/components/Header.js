import { Link } from "react-router-dom";
import React from 'react';



function refreshPage() {
    setTimeout(()=>{
        window.location.reload(false);
    }, 100);
    console.log('page to reload')
}

function ButtonLink({ to, children }) {
    return <Link to={to} onClick={refreshPage}><button>{children}</button></Link>;
  }

 

const Header = () => {

    return(
        <>
            
            <h1>myTree</h1>
            <ul className="nav">
                <li>
                    <ButtonLink to='/'>Create Account</ButtonLink>
                </li>
                
                <li>
                    <ButtonLink to='/loginPage'>Login</ButtonLink>
                </li>
            </ul>
        </>
    );
};

export default Header;