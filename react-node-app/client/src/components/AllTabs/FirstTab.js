import React, { useState, useEffect } from 'react'
import { getAuth, TotpMultiFactorGenerator } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';

const FirstTab = () => {

  const [profileData, setProfileData] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [allData, setAllData] = useState(true);
  const [allData2, setAllData2] = useState(true);

  var uid = "null";

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {

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

            
          });
        } catch (error) {
          console.error('There was an error:', error);
        }
      };
      getAllData();

  }, []); // The empty dependency array ensures that useEffect runs only once

  useEffect(() => {
    const getProfileData = async () => {
      if (user) {
          if (user.uid != null){
              uid = user.uid
          } else {
              uid = ""
          }
          try {
              const response = await fetch(`/api/profile/${uid}`, {
                  method: 'GET'
              });
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const profileData = await response.json();
              setProfileData(profileData); // Set the data in the component's state
              setLoadingState(false);
          } catch (error) {
              console.error('There was an error:', error);
          }
        }
    };
    getProfileData();
}, [user][profileData]);





  
  return (
    <div className="FirstTab">
      <p>Users</p>
      {/* First tab content will go here */}

      {profileData ? (
                    <h3>Carbon Score: {profileData.carbonScore}</h3>
                    ) : (
                    <h3>Carbon Score: Unavailable</h3>
                )}


    </div>
  );
};
export default FirstTab;