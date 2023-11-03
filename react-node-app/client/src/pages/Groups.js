import React, {useState} from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Tabs from '../components/GroupsComponents/GroupsTabs';
import './Logout.css'


const Groups = () => {
	const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
    };
  	return (
		<>
			<div className='NavMenu'>
				<Sidebar isOpen={isOpen} toggle={toggle} />
				<Navbar toggle={toggle} />
				<Tabs />
			</div>
			
			<div style={{ 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center',
				height: '90vh'
			}}>
				
			</div>
		</>
  )
}

export default Groups