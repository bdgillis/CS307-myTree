import React, {useState} from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { ToggleGroup, ParameterInput } from "../components/ActivityComponents/Button";

const mainCategories = ['Transportation', 'Eating', 'Household'];

const Activities = () => {
	const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
    };

	const [activeCategory, setActiveCategory] = useState(null);
	const [activeActivity, setActiveActivity] = useState(null);
  
	const handleCategoryToggle = (type) => {
	  setActiveCategory(type);
	  setActiveActivity(null);
	};
  
	const handleActivityToggle = (type) => {
	  setActiveActivity(type);
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
  
  
	let activityParams = null
	  if (transportationActivities.includes(activeActivity)) {
		activityParams = 'miles';
	  } else {
		activityParams = null
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
			
			<div >
				<ToggleGroup types={mainCategories} onToggle={handleCategoryToggle}/>
            	{activityTypes && <ToggleGroup types={activityTypes} onToggle={handleActivityToggle}/>}
            	{activityParams && <ParameterInput placeholder="Number of Miles" to="../Hometab" children={"Confirm"}/>}
			</div>
		</>
		
  	)
}

export default Activities