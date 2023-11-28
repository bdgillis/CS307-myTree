import React, {useState} from 'react'
import Navbar from '../components/Navbar/Navbar';
import { NavBtn } from '../components/Navbar/NavbarElements';
import Sidebar from '../components/Sidebar/Sidebar';
import '../App.css';
import './Logout.css'

const arrData = [];

setInterval(findChallenge, 1000 * 60);
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

	return array[0];
  }

function findSub(categoryChoice) {
	let retCat;
	if(categoryChoice === "transportation") {
		retCat = shuffle(transportationActivities);
	}
	else if(categoryChoice === 'eating') {
		retCat = shuffle(eatingActivities);
	}
	else if(categoryChoice === 'household') {
		retCat = shuffle(householdActivities);
	}
	return retCat;
		
}  

function findTime() {
	var number = getNumber(1,10);
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

function findChallenge() {
	console.log("hello");
	const category = ['transportation', 'eating', 'household'];
	let categoryChoice;
	let subCategory;
	let timeEnd;
	let suffix;
	const challengeArr = [];

	categoryChoice = shuffle(category);
	subCategory = findSub(categoryChoice);
	timeEnd = findTime();
	suffix = findSuffix(categoryChoice);
	arrData.push(categoryChoice);
	arrData.push(subCategory)
	arrData.push(timeEnd);
	arrData.push(suffix);
	challengeArr[0] = categoryChoice;
	challengeArr[1] = subCategory;
	challengeArr[2] = timeEnd;
	challengeArr[3] = suffix;
	
	localStorage.setItem('myObject', JSON.stringify(challengeArr));

}

findChallenge();

function getVal() {
	var myObject = JSON.parse(localStorage.getItem('myObject'));
	console.log(myObject);
	return myObject;
}



const markDone = () => {
	document.getElementById("thisBtn").innerHTML = "Done!";
}

const DailyChallenge = () => {

	const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
      setIsOpen(!isOpen);
    };

	const finalArr = getVal();
	

	

	

  	return (
		<>
			<div className='NavMenu'>
				<Sidebar isOpen={isOpen} toggle={toggle} />
				<Navbar toggle={toggle} />
			</div>

			<h1>Daily Challenge</h1>
			<h3>Your daily challenge is to: </h3>
			<h3>{finalArr[1]}</h3>
			<h3>{finalArr[2]}</h3>
			<h3>{finalArr[3]}</h3>
			<div>
				<button id="thisBtn" onClick={markDone}>Mark as done!</button>
			</div>
		


		

		</>
    	
  	)
}

export default DailyChallenge