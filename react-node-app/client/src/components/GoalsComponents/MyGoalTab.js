import React, { useEffect, useState, timeout } from 'react'
import { getAuth } from "firebase/auth";
import { Button } from 'react-scroll';

const MyGoalTab = ({ changeTab }) => {

    const redirect = () => {
        // Call the changeTab function passed as a prop
        changeTab();
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [groupname, setGroupname] = useState(null);
    const [status, setStatus] = useState(false);
    const [sent, setSent] = useState(false);
    const [uid, setUid] = useState(null);
    const [challenge, setChallenge] = useState(null);

    const auth = getAuth();
    const user = auth.currentUser;

    const Divider = () => {
        return (
            <hr
                style={{ borderTop: "2px solid grey" }}
            ></hr>
        );
    };

    useEffect(() => {

        if (user) {
             setUid (user.uid);
        }

    }, [user]);

    useEffect(() => {

        if (uid) {
            console.log("getting challenge" + uid)
            const getChallenge = async () => {
                setSent(true);
                const response = await fetch(`/api/challenges/get/` + uid, {
                    method: 'GET',
                });
                const body = await response.json();
                if (body.status === 'exists') {
                    setChallenge(body.challenge);
                } else {
                    setChallenge(null);
                }
                console.log(body);
            }
            getChallenge();
        }

    }, [uid]);

    return (
        <div style={{ textAlign: 'center' }}className="searchTab">
            <h1 className='createGroupHeader'>Current Challenge</h1>
            <Divider />
            {challenge ? (
                <div>
                    <h2>Category: {challenge.category}</h2>
                    <h3>{challenge.subCategory} {challenge.parameter} {challenge.suffix}</h3>
                    <h3>Progress: {challenge.progress} / {challenge.parameter} {challenge.suffix}</h3>
                    <Divider />
                    <button className="friendRequestButton" onClick={redirect}>Change Challenge</button>

                </div>
            ) : (
                <div>
                    <h2>No Challenge Set</h2>
                    <Button onClick={redirect}>Create Challenge</Button>
                </div>
            )}
        </div>
    );
};
export default MyGoalTab;