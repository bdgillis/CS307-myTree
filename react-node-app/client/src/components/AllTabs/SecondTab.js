import React, { useEffect, useState, timeout } from 'react'
import { getAuth, reload } from "firebase/auth";
import { onAuthStateChanged } from 'firebase/auth';
import { Friends } from '../../pages/Friends';
const scoreData = [];
var stopMore;
var flagOne;

function sortFunction(a, b) {
  if (a[0] === b[0]) {
    if (a[1] === b[1]) {
      return 0;
    } else {
      return (a[1] < b[1]) ? -1 : 1;
    }
  }
  else {
    return b[0]-a[0];
  }
}

const SecondTab = () => {

  const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [userUsername, setUserUsername] = useState(null);
    const [friends, setFriends] = useState({});
    const [userDoc, setUserDoc] = useState(null);
    const [carbonScore, setCarbonScore] = useState({});
    const [displayFriends, setDisplayFriends] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;
    var uid = "null";



    useEffect(() => {
      function runThis() {

      
      async function getUidFriends(userFriend) {

        const responseOne = await fetch('/api/friends/username=' + userFriend);
        const body = await responseOne.json();
        const responseTwo = await fetch(`/api/friends/uid=${body.id}`, {
          method: 'GET'
        });

        if (!responseTwo.ok) {
            throw new Error('Network response was not ok');
        }

        const uUsernameTwo = await responseTwo.json();
        return uUsernameTwo;
  
      }

      if (user) {
          const uid = user.uid;
          const getUserUsername = async () => {
            if(flagOne === 1) {
              return;
            }
            flagOne = 1;
            
              try {

                  const response = await fetch(`/api/friends/uid=${uid}`, {
                      method: 'GET'
                  });
                  
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  const uUsername = await response.json();
                  //console.log("79 username " + username)
                  setUserUsername(uUsername.username); // Set the data in the component's state
                  setUserDoc(uUsername.userDoc);
                  setCarbonScore(uUsername.userDoc.carbonScore);
                  setFriends(uUsername.userDoc.friends);
                  console.log(scoreData);
                  scoreData.splice(0);
                  console.log(friends.length);
                  console.log(scoreData);
                  let realScore = (Math.round(uUsername.userDoc.carbonScore * 100) / 100).toFixed(2);

                  scoreData.push([realScore, auth.currentUser.displayName]);
                  uUsername.userDoc.friends.forEach((element) => {

                    const answer = getUidFriends(element);
                    const promise1 = Promise.resolve(answer);

                    promise1.then((value) => {

                      let carbonScoreValue = value.userDoc.carbonScore;
                      let carbonScoreValue2 = (Math.round(carbonScoreValue * 100) / 100).toFixed(2);
                      let couple = [carbonScoreValue2, element];
                      scoreData.push(couple);
                      
                    })
                    
                  })

              } catch (error) {
                  console.error('There was an error:', error);
              }
          }
          getUserUsername(); // Call the async function within useEffect
          
      }

      scoreData.sort(sortFunction);
      let number = 1;

      for(let i = 0; i < scoreData.length; i++) {
        
        if(i === 0) {
    
          document.getElementById("printScore").innerHTML = (number + ". " + scoreData[i][1] + ", " + scoreData[i][0] + "<br/>");
          number++;
        }
        else {
          document.getElementById("printScore").innerHTML += (number + ". " + scoreData[i][1] + ", " + scoreData[i][0] + "<br/>");
          number++;
        }
      }
    }
    runThis();


  }, []);

  
  return (
    <div className="SecondTab">
      <p>Leaderboard</p>
      {/* Second  tab content will go here */}

      <p className="box" id="printScore"></p>


    </div>

    
  );
};
export default SecondTab;
