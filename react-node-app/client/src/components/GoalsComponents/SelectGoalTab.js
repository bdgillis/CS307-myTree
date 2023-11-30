import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar';
import { NavBtn } from '../Navbar/NavbarElements';
import Sidebar from '../Sidebar/Sidebar';
import '../../App.css';
import '../../pages/Logout.css'

const arrData = [];

const Divider = () => {
    return (
        <hr
            style={{ borderTop: "2px solid grey" }}
        ></hr>
    );
};


const transportationActivities = ["Drive", "Walk", "Run", "Bus"];
const eatingActivities = ["Takeout", "Meal Protein - Red Meat",
    "Meal Protein - Poultry", "Meal Protein - Vegetarian"];
const householdActivities = ["Cold Water Wash", "Cold Shower", "Temperature Adjustment"];
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
    if (categoryChoice === "transportation") {
        retCat = shuffle(transportationActivities);
    }
    else if (categoryChoice === 'eating') {
        retCat = shuffle(eatingActivities);
    }
    else if (categoryChoice === 'household') {
        retCat = shuffle(householdActivities);
    }
    return retCat;

}

function findTime() {
    var number = getNumber(1, 10);
    number = Math.round(number * 100 / 100).toFixed(2);

    return number;
}

function findSuffix(spec_cat) {
    var suffix;
    if (spec_cat === 'transportation') {
        suffix = "miles";
    } else {
        suffix = "times today";
    }
    return suffix;
}
// setInterval(findChallenge, 1000 * 60 * 60 * 24);

function findChallenge(challengeNumber) {
    localStorage.setItem('isDone', "Click to mark done!");
    console.log("hello");
    const category = ['transportation', 'eating', 'household'];
    const categoryChoice = shuffle(category);
    const subCategory = findSub(categoryChoice);
    const timeEnd = findTime();
    const suffix = findSuffix(categoryChoice);

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



function getStatus() {
    var isDone = localStorage.getItem('isDone');
    return isDone;

}

const markDone = () => {

    localStorage.setItem('isDone', "Done!");
    const textInput = getStatus();
    console.log(textInput);
    document.getElementById("thisBtn").innerHTML = textInput;

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

    const selectChallenge = (challenge) => {
        console.log(challenge);
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
                <Divider/>
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
            




        </>

    )
}

export default DailyChallengeTab