import React, { useState, useEffect } from 'react'
import { getAuth, TotpMultiFactorGenerator } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';

const FirstTab = () => {


  const [profileData, setProfileData] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [allData, setAllData] = useState(true);
  const [allData2, setAllData2] = useState(true);
  const [scoreDataArr, setScoreDataArr] = useState(true);
  const scoreData = [];

  var uid = "null";

  const auth = getAuth();
  const user = auth.currentUser;

 

  useEffect(() => {
    let i = 0;
    async function getProfileData(uidComp) {
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
              scoreData[i++] = profileData.carbonScore;
              setScoreDataArr({scoreData});

          } catch (error) {
              console.error('There was an error:', error);
          }
        }
    }

      const getAllData = async () => {
        try {
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
            console.log(userRecord.uid);
            getProfileData(userRecord.uid);

            
          });

        } catch (error) {
          console.error('There was an error:', error);
        }
      };
      getAllData();
      console.log(scoreDataArr);

  }, []); // The empty dependency array ensures that useEffect runs only once

  return (
 
    <div className="FirstTab">
      <p>Users</p>
      {/* First tab content will go here */}

      {profileData ? (
                    <h3>Carbon Score: {profileData.carbonScore}</h3>
                    ) : (
                    <h3>Carbon Score: Unavailable</h3>
                )}    

      <html>
      <body>
        <pre id ="arrPrint"></pre>
        <script>

            document.getElementById("arrPrint").innerHTML = JSON.stringify({scoreData}, null, 4);
        </script>
    

      </body>
      </html>
      <h3>Carbon Scores: {scoreData}</h3>          


    </div>
  );
};

export default FirstTab;