import React, {useState} from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

const Settings = () => {
	const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
    };

	return (
		<>
			<Sidebar isOpen={isOpen} toggle={toggle} />
			<Navbar toggle={toggle} />
    		<div style={{ 
        		display: 'flex', 
        		justifyContent: 'center', 
        		alignItems: 'center',
        		height: '90vh'
        	}}>
        		<h1>Settings</h1>
    		</div>

		</>
  )
}

export default Settings