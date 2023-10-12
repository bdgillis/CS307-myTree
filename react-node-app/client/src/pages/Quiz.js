import React, { useState } from 'react'
import { ToggleGroup, ParameterInput } from "../components/ActivityComponents/Button";
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import {getAuth,
        updateProfile} from 'firebase/auth'

const mainCategories = ['Transportation', 'Eating', 'Household'];

const Quiz = () => {
    const [quizTaken, setQuizTaken] = useState(false);
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

    const handleExit = (type) => {
        if(type == 'Submit') {
            window.location = '/hometab';
        } else if (type == 'Set Up Later') {
            setQuizTaken(!quizTaken);
            window.location = '/hometab';
        }
    }

    const quizAlreadyTaken = () => {
        if (quizTaken) {
            window.location = '/HomeTab';
        }
    }

    const exitOptions = ["Submit", "Set Up Later"];
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
          

            <div>
                <div>{quizAlreadyTaken}</div>
                <h1>Welcome to myTree!</h1>
                <h2>
                    Please set up your profile!

                </h2>
                <label for="username">Please enter a display name:<br /> (So you and your friends can find each other!) </label><br />
                <input type="text" id="username"></input><br /><br />
                <label for="bio">Write a short bio for your profile:</label><br />
                <input type="text" id="bio"></input><br />
            </div>

            <div >
                <h2>
                    Please tell us a little bit about your goals for these categories!
                </h2>
                <ToggleGroup types={mainCategories} onToggle={handleCategoryToggle} />
                {activityTypes && <ToggleGroup types={activityTypes} onToggle={handleActivityToggle} />}
                {activityParams && <ParameterInput placeholder="Number of Miles" to="../Hometab" children={"Confirm"} />}
            </div>

            <div >
				<ToggleGroup types={exitOptions} onToggle={handleExit}/>
			</div>

        </>
    )
}

export default Quiz