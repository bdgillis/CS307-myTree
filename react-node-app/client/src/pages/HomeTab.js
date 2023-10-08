import React, {useState} from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';

const HomeTab = () => {
	const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
    };
	return (
		
		<div className="testNav">
			<Sidebar isOpen={isOpen} toggle={toggle} />
			<Navbar toggle={toggle} />

    		<div style={{ 
        		display: 'flex', 
        		justifyContent: 'center', 
        		alignItems: 'center',
        		height: '90vh'
        	}}>
        		<h1>Home</h1>
    		</div>

		</div>
  )
}
export default HomeTab