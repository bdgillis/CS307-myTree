import React, { useState } from 'react'
import { ToggleGroup, ParameterInput } from "../components/ActivityComponents/Button";
import {
    getAuth,
    updateProfile
} from 'firebase/auth'

const mainCategories = ['Transportation', 'Eating', 'Household', 'None of These'];

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
        if (type != "None of These") {
            document.getElementById("act-prompt").innerHTML = "Select an activity to focus on (optional)"
        } else {
            document.getElementById("act-prompt").innerHTML = ""
        }
    };

    const handleActivityToggle = (type) => {
        setActiveActivity(type);
    };

    const handleExit = (type) => {
        if (type === 'Submit') {
            window.location = '/hometab';
            const auth = getAuth();
            const user = auth.currentUser;
            const uid = user.uid;
            const bio = document.getElementById("bio").value

            const dataToSend = {
                uid,
                bio,
                activeActivity,
            };

            // //send data to backend

            // fetch('/api/activities', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(dataToSend),
            // })
            //     .then((res) => res.json())
            //     .then((data) => { console.log(data) })
            //     .catch((err) => {
            //         console.log('Error: ', err);
            //     });
        } else if (type === 'Set Up Later') {
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
    const transportationActivities = ["Drive Less", "Walk More", "Run", "Take the Bus"];
    const eatingActivities = ["Buy Less Takeout", "Eat Less Red Meat",
        "Eat Less Poultry", "Eat Plant-Based Protein"];
    const householdActivities = ["Wash Clothes in Cold Water", "Take Cold Showers", "Use Less Heating/AC at Home", "Turn the lights off when I'm not using them"];
    let activityTypes = null;

    if (activeCategory === 'Transportation') {
        activityTypes = transportationActivities;
    } else if (activeCategory === 'Eating') {
        activityTypes = eatingActivities;
    } else if (activeCategory === 'Household') {
        activityTypes = householdActivities;
    }


    return (
        <>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <img src={require('../Images/myTreeLogo.png')} witdh={250} height={250} alt="logo" />

            </div>


            <div>
                <h1 id="welcome-msg"><br />Welcome to myTree!</h1>

                <div>{quizAlreadyTaken}</div>
                <h2>
                    What town or city do you live in?
                </h2>
                <input type="text" id="hometown" ></input><br />
                <h2>
                    Write a short bio about yourself for your profile!

                </h2>
                <textarea id="bio" name="w3review" rows="4" cols="50"></textarea>
            </div>

            <div >
                <h2>
                    Pick a category where you'd like to decrease your carbon footprint!
                </h2>
                <ToggleGroup types={mainCategories} onToggle={handleCategoryToggle} />
                <h3 id="act-prompt"></h3>
                {activityTypes && <ToggleGroup types={activityTypes} onToggle={handleActivityToggle} />}
            </div>
            <br /><br />
            <div >
                <ToggleGroup types={exitOptions} onToggle={handleExit} />
            </div>

        </>
    )
}

export default Quiz