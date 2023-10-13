import React, {useState, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { ToggleGroup, ParameterInput, ButtonLink } from "../components/ActivityComponents/Button";
import { getAuth } from 'firebase/auth';

const mainCategories = ['Transportation', 'Eating', 'Household'];

const Activities = () => {
	const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
    };

	const [activeCategory, setActiveCategory] = useState(null);
	const [activeActivity, setActiveActivity] = useState(null);
	const [activityParam, setActivityParam]	= useState('');
  
	const handleCategoryToggle = (type) => {
	  setActiveCategory(type);
	  setActiveActivity(null);
	};
  
	const handleActivityToggle = (type) => {
	  setActiveActivity(type);
	};

	const handleConfirm = async () => {
		const auth = getAuth();
		const user = auth.currentUser;
		const uid = user.uid;
		const timestamp = Date.now();

		const dataToSend = {
			uid,
			activeCategory,
			activeActivity,
			activityParam,
			timestamp,
		  };

		  //send data to backend
		  
		await fetch('/api/activities', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},	
			body: JSON.stringify(dataToSend),
		})
		.then((res) => console.log(res.json()))
		.then((data) => console.log(data))
		.catch((err) => {
			console.log('Error: ', err);
		});
		  
		  
	};
  
	const transportationActivities = ["Drive", "Walk", "Run", "Bus"];
	const eatingActivities = ["Takeout", "Meal Protein - Red Meat", 
	  "Meal Protein - Poultry", "Meal Protein - Vegetarian"];
	const householdActivities = ["Cold Water Wash", "Cold Shower", "Temperature Adjustment"];
	let activityTypes = null;
  
	if (activeCategory === 'Transportation') {
	  activityTypes = transportationActivities;
	} else if (activeCategory === 'Eating') {
	  activityTypes = eatingActivities;
	} else if (activeCategory === 'Household') {
	  activityTypes = householdActivities;
	}
  
  
	let paramUnits = null
	  if (transportationActivities.includes(activeActivity)) {
		paramUnits = 'miles';
	  } else {
		paramUnits = null
	  }


	return (
		<>
			<Sidebar isOpen={isOpen} toggle={toggle} />
			<div style={{ 
				position: 'fixed', 
				top: 0, 
				left: '12%', 
				}}>

				<Navbar toggle={toggle} />
			</div>
			<div>
				<ButtonLink to={"../edit-history"} children={"Edit Activity History"}></ButtonLink>
			</div>
			
			<div >
				<ToggleGroup types={mainCategories} onToggle={handleCategoryToggle}/>
            	{activityTypes && <ToggleGroup types={activityTypes} onToggle={handleActivityToggle}/>}
            	{paramUnits && <ParameterInput placeholder="Number of Miles" 
					to="../Hometab" 
					children={"Confirm"}
					onChange={(e) => setActivityParam(e.target.value)}
					onClick={handleConfirm}/>}
			</div>
		</>

		
		

				

		
  	)
}

export default Activities