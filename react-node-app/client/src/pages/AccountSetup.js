import React, {useState} from 'react'
import { ToggleGroup, ParameterInput } from "../components/ActivityComponents/Button";


const mainCategories = ['Transportation', 'Eating', 'Household'];

const Quiz = () => {
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
			<div style={{ 
				position: 'fixed', 
				top: 0, 
				left: '12%', 
				}}>

			</div>

            <div>
                <h1>Welcome to myTree!</h1>
                <h2>
                    Please set up your profile and tell us a little bit about 
                    your carbon footprint related habits and goals!

                </h2>
                <label for="username">Please enter a username:<br/> (So you and your friends can find each other!) </label><br />
                <input type="text" id="username"></input><br /><br />
                <label for="bio">Write a short bio for your profile:</label><br />
                <input type="text" id="bio"></input><br />
            </div>
			
			<div >
                <h2>
                    Please tell us a little bit about your activities in these categories!
                </h2>
				<ToggleGroup types={mainCategories} onToggle={handleCategoryToggle}/>
            	{activityTypes && <ToggleGroup types={activityTypes} onToggle={handleActivityToggle}/>}
            	{activityParams && <ParameterInput placeholder="Number of Miles" to="../Hometab" children={"Confirm"}/>}
			</div>
		</>
		
  	)
}

export default Quiz