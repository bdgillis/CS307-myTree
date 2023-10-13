import React, {useState} from 'react'
import { FaBars } from 'react-icons/fa'
import Dropdown from '../Dropdown/Dropdown'
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
        	<NavLink to="/tree-visualization">
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