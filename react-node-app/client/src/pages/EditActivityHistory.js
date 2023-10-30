import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { ToggleGroup, ParameterInput } from "../components/ActivityComponents/Button";
import { getAuth } from 'firebase/auth';
import './Logout.css'


const mainCategories = ['Transportation', 'Eating', 'Household'];
const auth = getAuth();



const EditActivityHistory = () => {
    const user = auth.currentUser;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    const uid = user?.uid;
    const [activityHistory, setActivityHistory] = useState({});
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const history = async () => {
      if (user) {
        // const uid = user.uid;
        try {
          const res = await fetch(`/api/editActivityHistory/${uid}`, {
            method: 'GET'
          });
          const data = await res.json();
        //   console.log(data);
          const activities = {};
          Object.keys(data.activities).forEach((key) => {
            const activity = data.activities[key];
            activities[key] = activity;
          });
          setActivityHistory(activities);
        } catch (err) {
          console.log('Error: ', err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    history();
  }, [user]);


    const [selectedActivity, setSelectedActivity] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeActivity, setActiveActivity] = useState(null);
    const [activityParam, setActivityParam] = useState('');
    const [oldTimestamp, setOldTimestamp] = useState(null);




  if (isLoading) {
    return <div>Loading...</div>;
  }



    // create array of options from activityHistory object
    const activityOptions = Object.keys(activityHistory).map((key) => {
        const activity = activityHistory[key];
        return (
            <option key={key} value={key}>
                {activity.activeCategory} - {activity.activeActivity} - {activity.activityParam}
            </option>
        );
    });


    

    const handleSelectedActivity = (a) => { 
        setSelectedActivity(a);
        setActiveCategory(activityHistory[a].activeCategory);
        setActiveActivity(activityHistory[a].activeActivity);
        setActivityParam(activityHistory[a].activityParam);
        setOldTimestamp(activityHistory[a].timestamp);
    };

    const handleCategoryToggle = (type) => {
        setActiveCategory(type);
        setActiveActivity(null);
    };

    const handleActivityToggle = (type) => {
        setActiveActivity(type);
    };

    const handleConfirm = async () => {
        const uid = user.uid;
        const timestamp = oldTimestamp;

        const dataToSend = {
            uid,
            selectedActivity,
            activeCategory,
            activeActivity,
            activityParam,
            timestamp,
        };

        await fetch('/api/editActivityHistory', {
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
			<div className='NavMenu'>
				<Sidebar isOpen={isOpen} toggle={toggle} />
				<Navbar toggle={toggle} />
			</div>
            <div>
                <select value={selectedActivity} onChange={(e) => handleSelectedActivity(e.target.value)}>
                    <option value="">Select an activity</option>
                    {activityOptions}
                </select>
            </div>

            <div >
                {activeCategory && <ToggleGroup types={mainCategories} onToggle={handleCategoryToggle} starting={activeCategory}/>}
                {activityTypes && <ToggleGroup types={activityTypes} onToggle={handleActivityToggle} starting={activeActivity}/>}
                {paramUnits && <ParameterInput placeholder={"" + activityParam + " " + paramUnits}
                    to="./view-profile"
                    children={"Confirm"}
                    onChange={(e) => setActivityParam(e.target.value)}
                    onClick={handleConfirm} />}
            </div>
        </>
    )
}

export default EditActivityHistory