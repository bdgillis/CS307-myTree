import React from 'react'
import { FaBars } from 'react-icons/fa'
import { 
  Nav, 
  Bars, 
  NavMenu, 
  NavLink, 
  NavBtn, 
  NavBtnLink
} from './NavbarElements'

const Navbar = ({toggle}) => {
  return (
    <>
        <Nav>
        	<NavLink to="/HomeTab">
            	<img src={require('../../Images/myTreeLogo.png')} witdh={50} height={50} alt="logo"/>
				<Bars onClick={toggle}>
					<FaBars />
				</Bars>
          	</NavLink>
          	<NavMenu>
        		<NavLink to="/activities" activeStyle>
              		Activities
            	</NavLink>
            	<NavLink to="/groups" activeStyle>
              		Groups
            	</NavLink>
            	<NavLink to="/friends" activeStyle>
              		Friends
            	</NavLink>
            	<NavLink to="/leaderboards" activeStyle>
              		Leaderboards
            	</NavLink>
            	<NavLink to="/daily-challenge" activeStyle>
              		Daily Challenge
            	</NavLink>
          	</NavMenu>
          	<NavBtn>
            	<NavBtnLink to='/settings'>Settings</NavBtnLink>
          	</NavBtn>
        </Nav>
    </>
  )
}

export default Navbar;