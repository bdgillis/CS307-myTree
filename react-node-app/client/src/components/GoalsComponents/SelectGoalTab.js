import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { NavBtn } from '../Navbar/NavbarElements';
import Sidebar from '../Sidebar/Sidebar';
import '../../App.css';
import '../../pages/Logout.css'
import toast from 'react-hot-toast';
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";

const arrData = [];

const Divider = () => {
    return (
        <hr
            style={{ borderTop: "2px solid grey" }}
        ></hr>
    );
};


const transportationActivities = ["Drive - Carpool", "Walk", "Bus"];
const eatingActivities = ["Takeout - Plastic", "Meal Protein - Red Meat",
    "Meal Protein - Poultry", "Meal Protein - Vegetarian"];
const householdActivities = ["Cold Water Laundry", "Recycle", "Cold Shower", "Compost"];
const finalArray = [];
var setDone = false;

function getNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array[0];
}

function findSub(categoryChoice) {
    let retCat;
    if (categoryChoice === "Transportation") {
        retCat = shuffle(transportationActivities);
    }
    else if (categoryChoice === 'Eating') {
        retCat = shuffle(eatingActivities);
    }
    else if (categoryChoice === 'Household') {
        retCat = shuffle(householdActivities);
    }
    return retCat;

}

function findTime() {
    var number = getNumber(1, 10);
    number = Math.round(number * 100 / 100).toFixed(2);

    return number;
}

function findSuffix(spec_cat, category) {
    let paramUnits = null
    switch (category) {
        case "Transportation": {
            paramUnits = "Miles";
            break;
        }
        case "Eating": {
            switch (spec_cat) {
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
                default:
                    paramUnits = null;
                    break;
            }
            break;
        }
        case "Household": {
            switch (spec_cat) {
                case "Cold Water Laundry":
                    paramUnits = "Loads";
                    break;
                case "Cold Shower":
                    paramUnits = "Times today";
                    break;
                case "Recycle":
                    paramUnits = "Gallons";
                    break;
                case "Compost":
                    paramUnits = "Gallons";
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
    return paramUnits;
}
// setInterval(findChallenge, 1000 * 60 * 60 * 24);

function findChallenge(challengeNumber) {
    localStorage.setItem('isDone', "Click to mark done!");
    // console.log("hello");
    const category = ['Transportation', 'Eating', 'Household'];
    const categoryChoice = shuffle(category);
    const subCategory = findSub(categoryChoice);
    const timeEnd = findTime();
    const suffix = findSuffix(subCategory, categoryChoice);

    return {
        challengeNumber,
        category: categoryChoice,
        subCategory,
        timeEnd,
        suffix,
    };
}

function getVal() {
    var myObject = JSON.parse(localStorage.getItem('myObject'));

    console.log(myObject);
    return myObject;
}

const auth = getAuth();
const user = auth.currentUser;

function getStatus() {
    var isDone = localStorage.getItem('isDone');
    return isDone;

}

function generateChallenges() {
    const challenges = [];
    for (let i = 0; i < 5; i++) {
        challenges.push(findChallenge(i + 1)); // Pass challenge number to findChallenge
    }
    return challenges;
}

const DailyChallengeTab = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    async function selectChallenge(challenge) {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log(challenge);
        console.log(user)
        if (user) {
            const uid = user.uid;
            console.log(uid)
            const response = await fetch('/api/challenges/get/' + uid, {
                method: 'GET',
            });
            const existBody = await response.json();
            console.log(existBody);
            if (existBody.status === 'exists') {
                // const promise = toast.promise(
                //     (t) => (
                //     <span>
                //         Challenge Already Set, <br/>Would You Like to Replace it?<br/>
                //         <button onClick={() => handleRep(t, true, challenge)}>
                //             Yes
                //         </button>
                //         <button onClick={() => handleRep(t, false, challenge)}>
                //             No
                //         </button>
                //     </span>
                // ));
                const result = window.confirm("Challenge Already Set. Would you like to replace it?");
                if (result) {
                    handleRep(challenge);
                } else {
                    toast.error("Challenge Selection Cancelled");
                }
            } else {
                handleRep(challenge);
            }
        }
    }

    async function handleRep(challenge) {
        console.log(challenge);
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
        const response = await fetch('/api/challenges/set', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: user.uid, category: challenge.category, subCategory: challenge.subCategory, parameter: challenge.timeEnd, suffix: challenge.suffix })
        });
        const body = await response.json();
        console.log(body);
        if (body.status === 'success') {
            toast.success("Challenge Selection Set");
        } else {
            toast.error("Challenge Selection Failed");
        }
    } else {
        toast.error("Challenge Selection Failed");
    
    }

    }

    const challengeArray = generateChallenges();
    // console.log(challengeArray);

    return (
        <>
            <div className='NavMenu'>
                <Sidebar isOpen={isOpen} toggle={toggle} />
                <Navbar toggle={toggle} />
            </div>
            <div style={{ 'textAlign': 'center' }} className='logout-container'>
                <h1>Suggested Challenges</h1>
                <Divider />
                {challengeArray.map((challenge, index) => (
                    <>
                        <div key={index}>
                            <h3>{`Challenge ${index + 1}:`}</h3>
                            <h3>{challenge.subCategory} {challenge.timeEnd} {challenge.suffix}</h3>
                            <button id="thisBtn" class="searchFriendButton" onClick={() => selectChallenge(challenge)}>Select this Challenge</button>
                            <Divider />
                        </div>

                    </>
                ))}
            </div>


            <br></br>
            <br></br>


        </>

    )
}

export default DailyChallengeTab