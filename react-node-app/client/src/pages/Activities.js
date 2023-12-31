import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { ToggleGroup, ParameterInput, ButtonLink } from "../components/ActivityComponents/Button";
import { getAuth } from 'firebase/auth';
import './Logout.css'


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
		  
		await fetch('api/activities', {
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
  
	const transportationActivities = ["Drive - Alone", "Drive - Carpool", "Walk", "Bike/Scooter", "Bus", "Train", "Airline Flight"];
	const eatingActivities = ["Takeout - Styrofoam", "Takeout - Plastic", "Meal Protein - Red Meat", 
	  "Meal Protein - Poultry", "Meal Protein - Vegetarian", "Shopping - Farmer's Market/Co-op", "Shopping - Grocery Store",
	];
	const householdActivities = ["Cold Water Laundry", "Cold Shower", "Temperature Adjustment - Heating", 
	"Temperature Adjustment - Cooling", "Recycle", "Compost", "Trash", "Electricity Consumption"];
	let activityTypes = null;
  
	if (activeCategory === 'Transportation') {
	  activityTypes = transportationActivities;
	} else if (activeCategory === 'Eating') {
	  activityTypes = eatingActivities;
	} else if (activeCategory === 'Household') {
	  activityTypes = householdActivities;
	}
  
  
	let paramUnits = null
	switch(activeCategory) {
        case "Transportation": {
            paramUnits = "Miles";
            break;
        }
        case "Eating": {
            switch(activeActivity) {
                case "Takeout - Styrofoam":
                    paramUnits = "Containers";
                    break;
                case "Takeout - Plastic":
                    paramUnits = "Containers";
                    break;
                case "Meal Protein - Poultry":
                    paramUnits = "Servings";
                    break;
                case "Meal Protein - Vegetarian":
                    paramUnits = "Servings";
                    break;
                case "Meal Protein - Red Meat":
                    paramUnits = "Servings";
                    break;
                case "Shopping - Farmer's Market/Co-op":
                    paramUnits = "Trips this week";
                    break;
                case "Shopping - Grocery Store":
                    paramUnits = "Trips this week";
                    break;
                default:
                    paramUnits = null;
                    break;
            }
            break;
        }
        case "Household": {
            switch(activeActivity) {
                case "Cold Water Laundry":
                    paramUnits = "Loads";
                    break;
                case "Cold Shower":
                    paramUnits = "Times today";
                    break;
                case "Temperature Adjustment - Heating":
                    paramUnits = "Degrees";
                    break;
                case "Temperature Adjustment - Cooling":
                    paramUnits = "Degrees";
                    break;
                case "Recycle":
                    paramUnits = "Gallons";
                    break;
                case "Compost":
                    paramUnits = "Gallons";
                    break;
                case "Trash":
                    paramUnits = "Gallons";
                    break;
                case "Electricity Consumption":
                    paramUnits = "Kilowatt/hours this week";
                    break;
                default:
                    paramUnits = null;
                    break;
            }
            break;
        }
        default:
            paramUnits = null;
            break;
    }


	return (
		<>
			
			<div className="NavMenu">
				<Sidebar isOpen={isOpen} toggle={toggle} />
				<Navbar toggle={toggle} />
			</div>
			<div>
				<ButtonLink to={"../edit-history"} children={"Edit Activity History"}></ButtonLink>
			</div>
			
			<div >
				<ToggleGroup types={mainCategories} onToggle={handleCategoryToggle}/>
            	{activityTypes && <ToggleGroup types={activityTypes} onToggle={handleActivityToggle}/>}
            	{paramUnits && <ParameterInput placeholder={"Number of " + paramUnits} 
					to="./view-profile" 
					children={"Confirm"}
					onChange={(e) => setActivityParam(e.target.value)}
					onClick={handleConfirm}/>}
			</div>
		</>

		
		

				

		
  	)
}

export default Activities