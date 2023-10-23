import React, {useState} from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import './Logout.css'





function shuffle() {
	var array = [2, 11, 37, 42];

	let currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle.
	while (currentIndex > 0) {
  
	  // Pick a remaining element.
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
	console.log(array)
	return array;

  }

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
			</div>
			<div style={{ 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center',
				height: '90vh'
			}}>
				<h1>Leaderboards</h1>
				<div>
					<script>
						var elem = {shuffle()}
					</script>
				</div>

			</div>
		</>
  	)
}

export default Leaderboards