import React, { useState, useEffect } from 'react'
import { getAuth, reauthenticateWithRedirect, TotpMultiFactorGenerator } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
const scoreData = [];



const FirstTab = () => {

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


  var i = 0;
  useEffect(() => {

    if(final === 1) {
      return;
    }
    setFinal(1);
    async function getProfileData(uidComp, curUser) {
      if (user) {
          if (user.uid != null){
              uid = user.uid
          } else {
              uid = ""
          }
          try {
              const response = await fetch(`/api/profile/${uidComp}`, {
                  method: 'GET'
              });
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const profileData = await response.json();

              setProfileData(profileData); // Set the data in the component's state
              const couple = [curUser, profileData.carbonScore];
              scoreData.push(couple);
              

              
          } catch (error) {
            if(!profileData){
              return;
            }
            profileData.carbonScore = 0;
            const couple = [curUser, profileData.carbonScore];
            scoreData.push(couple);
          
            console.error('There was an error:', error);
          }
        }
    }

    

      const getAllData = async () => {
        scoreData.splice(0);
        try {
          setFinal(0);
          if(final === 1) {
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

          allData.users.forEach((userRecord) => {
            getProfileData(userRecord.uid, userRecord.displayName);
          });

        } catch (error) {
          
          console.error('There was an error:', error);
        }
      };

    
      getAllData();
      setAnswer(scoreData);
      

  }, []); // The empty dependency array ensures that useEffect runs only once

  
  function sortFunction(a, b) {
    if (a[1] === b[1]) {
      return 0;
    }
    else {
      return (a[1] < b[1]) ? -1 : 1;
    }
  }

  function sortArray() {
    scoreData.sort(sortFunction);
    
    var sortedArr = scoreData.sort(sortFunction);
    console.log(sortedArr.join('\r\n'));
    return (sortedArr.join('\r\n'));
    
  }
  return (
    

 
    <div className="FirstTab">
      <p>Users</p>
      {/* First tab content will go here */}

                <h3>Carbon Scores:</h3>
                <h3>{sortArray()}</h3>





    </div>
  );
};

export default FirstTab;