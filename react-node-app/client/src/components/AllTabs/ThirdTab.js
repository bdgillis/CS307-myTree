import React, { useState, useEffect } from 'react'
import { getAuth, reauthenticateWithRedirect, TotpMultiFactorGenerator } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import FirstTab from './FirstTab';
import { FaIgloo } from 'react-icons/fa';

const scoreData = [];
var myScore;
var myScoreUpdated;
var myLeague;
export var g_sortedArr = [];
export var emailArray = [];


const ThirdTab = () => {

  const [profileData, setProfileData] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [allData, setAllData] = useState(true);
  const [allData2, setAllData2] = useState(true);
  const [answer, setAnswer] = useState(0);
  
  var uid = "null";

  const auth = getAuth();
  const user = auth.currentUser;
  const [final, setFinal] = useState(null);
  const [sortOnce, setSortOnce] = useState(null);

  var finalA = 0;
  var finalSort = 0;


  useEffect(() => {
    
    if(finalA === 1) {
      return;
    }
    finalA = 1;
    async function getProfileData(uidComp, curUser) {
      if (user) {

          try {
              const response = await fetch(`/api/profile/${uidComp}`, {
                  method: 'GET'
              });
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const profileData = await response.json();

              setProfileData(profileData); // Set the data in the component's state
              if(uidComp === user.uid) {
                console.log(profileData.username);
                myScore = profileData.carbonScore;

              }
              let carbonScoreVal = (Math.round(profileData.carbonScore * 100) / 100).toFixed(2);

              const couple = [curUser, carbonScoreVal, profileData.username];
              scoreData.push(couple);
              emailArray.push(profileData.username);
              

              
          } catch (error) {
            // no profile
            console.error('There was an error:', error);
          }
        }

    }

    

      const getAllData = async () => {
        scoreData.splice(0);
        emailArray.splice(0);
        try {
          if(final === 0) {
            return;
          }
          setFinal(1);
          const responseOne = await fetch(`/api/FirstTab/`, {
            method: 'GET'
          });
          if (!responseOne.ok) {
            throw new Error('Network response was not ok');
          }
          const allData = await responseOne.json();
    
          setAllData(allData); // Set the data in the component's state
    
          setLoadingState(false);

          let incUID = 0;

          allData.users.forEach((userRecord) => {
            console.log(userRecord.displayName);
            getProfileData(userRecord.uid, userRecord.displayName);

          });

        } catch (error) {
          
          console.error('There was an error:', error);
        }
      };

    
      getAllData();

      setAnswer(scoreData);
      

      

  }, []); // The empty dependency array ensures that useEffect runs only once

  const getLeague = () => {
    let myLeagueTree;
    if(myScore < 0) {
      myLeagueTree = "Oak";
    } else if (myScore >= 0 && myScore < 20) {
      myLeagueTree = "Maple";
    } else if (myScore >= 20 && myScore < 40) {
      myLeagueTree = "Hickory";
    } else if (myScore >= 40 && myScore < 60) {
      myLeagueTree = "Spruce";
    } else if (myScore >= 60 && myScore < 80) {
      myLeagueTree = "Pine";
    } else if (myScore >= 80 && myScore < 100) {
      myLeagueTree = "Cedar";
    } else {
      myLeagueTree = "Fir";
    }
    myLeague = myLeagueTree;
    return myLeagueTree;

  }

  function sortFunction(a, b) {
    if (a[1] === b[1]) {
      if (a[0] === b[0]) {
        return 0;
      } else {
        return (a[0] < b[0]) ? -1 : 1;
      }
    }
    else {
      return b[1]-a[1];
    }
  }

  function myScoreRange() {
    if(myScore < 0) {
      myScoreUpdated = Math.abs(myScore);
      return -Math.floor(myScoreUpdated / 20) * 20;
      
    }
    return Math.ceil(myScore / 20) * 20;
  }

  function sortArray() {

    try {

      let number = 1;
      scoreData.sort(sortFunction);
      let roundUp = myScoreRange();
      let bottom = roundUp - 20;
      
      let sortedArr = scoreData.sort(sortFunction);
      var prev;
      let arrayPlace = 0;

      for(let i = 0; i < sortedArr.length; i++) {
        
        if(sortedArr[i][1] <= roundUp && sortedArr[i][1] >= bottom) {
          if(number === 1) {
            
            document.getElementById("printThat").innerHTML = ((number) + ": \t" + sortedArr[i][0] + ", " + sortedArr[i][1] + "<br/>");
            var prev = sortedArr[i][1];
            g_sortedArr[arrayPlace] = sortedArr[i];
            number += 1;
            arrayPlace += 1;

          } else if (number > 1) {

            if(prev === sortedArr[i][1]) {
              number -= 1;
            }
            document.getElementById("printThat").innerHTML += ((number) + ": " + sortedArr[i][0] + ", " + sortedArr[i][1] + "<br/>");

            prev = sortedArr[i][1];
            g_sortedArr[arrayPlace] = sortedArr[i];
            number++;
            arrayPlace++;
            
          }
        }
      
      
      }

    } catch(error) {
        console.log(error);
    }
    
  }
  sortArray();
  console.log(emailArray);
  localStorage.setItem('sortedArray', JSON.stringify(g_sortedArr));


  return (
    <div className="ThirdTab">
      
      <p>Leaderboard</p>
      <p className="league-box">My League: {getLeague()}</p>

      <p className="box" id="printThat"></p>


    </div>
  );
};
export default ThirdTab;