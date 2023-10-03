
import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/activities" activeStyle>
                        Activities
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;