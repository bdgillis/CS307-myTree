import React, { useEffect, useState } from 'react'
import { ToggleGroup, ParameterInput, ButtonLink } from "../components/ActivityComponents/Button";
import {
    getAuth,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth'

const mainCategories = ['Transportation', 'Eating', 'Household', 'None of These'];

const Quiz = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [activeCategory, setActiveCategory] = useState(null);
    const [activeActivity, setActiveActivity] = useState(null);
    const [hometown, setHometown] = useState(null);
    const [bio, setBio] = useState(null)
    const [quizTaken, setQuizTaken] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const getUser = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in.
            setUser(user);
          } else {
            // User is signed out.
            setUser(null);
          }
        });
    
        // Cleanup the subscription when the component unmounts
        return () => getUser();
      }, []);

    var dataToSend = {}

    useEffect(() => {
        if (quizTaken) {
            console.log('quizTaken is now true');
            const uid = user.uid;
            dataToSend = {
                uid,
                bio,
                hometown,
                activeCategory,
                quizTaken
            };
            fetch('/api/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log('Error: ', err);
                });
            window.location = './hometab'
        }

    }, [quizTaken]);

    const handleCategoryToggle = (type) => {
        if (type === "None of These") {
            setActiveCategory("Unsure")
        } else {
            setActiveCategory(type);
        }
        setActiveActivity(null);
    };

    const handleActivityToggle = (type) => {
        setActiveActivity(type);
    };

    const handleHometownChange = (e) => {
        setHometown(e.target.value)
    }
    const handleBioChange = (e) => {
        setBio(e.target.value)
    }

    const handleSubmit = () => {
        console.log(quizTaken)
        setQuizTaken(true);

    }

    const handleSetUpLater = () => {
        const uid = user.uid;

        dataToSend = {
            uid,
            bio,
            hometown,
            activeCategory,
            quizTaken
        }
        fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                window.location = '/hometab';
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
    }

    // const quizAlreadyTaken = () => {
    //     if (quizTaken) {
    //         window.location = '/HomeTab';
    //     }
    // }

    const exitOptions = ["Submit", "Set Up Later"];
    // const transportationActivities = ["Drive Less", "Walk More", "Run", "Take the Bus"];
    // const eatingActivities = ["Buy Less Takeout", "Eat Less Red Meat",
    //     "Eat Less Poultry", "Eat Plant-Based Protein"];
    // const householdActivities = ["Wash Clothes in Cold Water", "Take Cold Showers", "Use Less Heating/AC at Home", "Turn the lights off when I'm not using them"];
    // let activityTypes = null;

    // if (activeCategory === 'Transportation') {
    //     activityTypes = transportationActivities;
    // } else if (activeCategory === 'Eating') {
    //     activityTypes = eatingActivities;
    // } else if (activeCategory === 'Household') {
    //     activityTypes = householdActivities;
    // }


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

                {/* <div>{quizAlreadyTaken}</div> */}
                <h2>
                    What town or city do you live in?
                </h2>
                <input type="text" id="hometown" onChange={handleHometownChange}></input><br />
                <h2>
                    Write a short bio about yourself for your profile!
                </h2>
                <textarea id="bio" name="w3review" rows="4" cols="50" onChange={handleBioChange}></textarea>
            </div>

            <div >
                <h2>
                    Pick a category where you'd like to decrease your carbon footprint!
                </h2>
                <ToggleGroup types={mainCategories} onToggle={handleCategoryToggle} />
                {/* <h3 id="act-prompt"></h3>
                {activityTypes && <ToggleGroup types={activityTypes} onToggle={handleActivityToggle} />} */}
            </div>
            <br /><br />
            <div >
                <ButtonLink to="./quiz" children={"Submit"} onClick={handleSubmit}></ButtonLink>
                {/* <ButtonLink to="./hometab" children={"Set Up Later"} onClick={handleSetUpLater}></ButtonLink> */}
                {/* <ToggleGroup types={exitOptions} onToggle={handleExit} /> */}
            </div>

        </>
    )
}

export default Quiz