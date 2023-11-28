import React, {useState} from 'react'
import { FaBars } from 'react-icons/fa'
import Dropdown from '../Dropdown/Dropdown'
import { g_Counter } from '../../pages/notificationPage'

import { 
  Nav, 
  Bars, 
  NavMenu, 
  NavLink, 
  NavBtn, 
  NavBtnLink
} from './NavbarElements'


const Navbar = ({toggle}) => {


	//const [click, setClick] = useState(false);
	const [dropdown, setDropdown] = useState(false);
  
  
	const onMouseEnter = () => {
	  if (window.innerWidth < 768) {
		setDropdown(false);
	  } else {
		setDropdown(true);
	  }
	};
  
	const onMouseLeave = () => {
	  if (window.innerWidth < 768) {
		setDropdown(false);
	  } else {
		setDropdown(false);
	  }
	};



  return (
    <>
        <Nav fluid>
        	<NavLink to="/homeTab">
            	<img src={require('../../Images/myTreeLogo.png')} witdh={50} height={50} alt="logo"/>
          	</NavLink>
			<Bars onClick={toggle}>
				<FaBars />
			</Bars>
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
				<NavLink to="/leagues" activeStyle>
					League
				</NavLink>
            	<NavLink to="/leaderboards" activeStyle>
              		Leaderboards
            	</NavLink>
				<NavLink to="/awards" activeStyle>
					Awards
				</NavLink>
            	<NavLink to="/daily-challenge" activeStyle>
              		Daily Challenge
            	</NavLink>
				<NavLink to="/notificationPage" activeStyle>
					<div className="icon">
						<img src={require('../../Images/notificationLogo.png')} className="iconImg" witdh={40} height={40} alt=""/>
						<div className="counter">{g_Counter}</div>
					</div>
            	</NavLink>
				

          	</NavMenu>
          	<NavBtn>
				<ul>
			  	<li
            		className='nav-item'
            		onMouseEnter={onMouseEnter}
            		onMouseLeave={onMouseLeave}
          		>
            	<NavBtnLink to='/manage-account'>
					Settings <i class="fa-solid fa-caret-down" aria-hidden="true"></i>
				</NavBtnLink>
				{dropdown && <Dropdown />}

				</li>
				</ul>
          	</NavBtn>
        </Nav>
    </>
  )
}

export default Navbar;