import React, {useState} from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import './Logout.css'
import Tabs from '../components/TabComponent/Tabs';

const Leaderboards = () => {
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
				<h1>Leaderboards</h1>

			</div>
		</>
  	)
}

export default Leaderboards