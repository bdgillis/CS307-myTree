import React, { useEffect, useState, timeout } from 'react'
import { getAuth } from "firebase/auth";

const CreateTab = () => {


    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [groupname, setGroupname] = useState(null);
    const [status, setStatus] = useState(false);
    const [sent, setSent] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {

        if (user) {
            const uid = user.uid;
        }

    }, [user]);

    useEffect(() => {
        if (user && groupname) {
            console.log("creating")
            const createGroup = async () => {
                const uid = user.uid;
                setSent(true);
                const response = await fetch(`/api/groups/create/${groupname}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid: uid }),
                });
                const body = await response.json();
                if (body.status === 'success') {
                    setStatus(true);
                } else {
                    setStatus(false);
                }
                console.log(body);
            }
            createGroup();
        }
    }, [groupname]);

    const handleCreate = (e) => {
        console.log(document.getElementById('groupname').value);
        setGroupname(document.getElementById('groupname').value);
        const uid = user.uid;

    };

    return (
        <div className="createTab">
            <h1 className='createGroupHeader'>Create A Group</h1>
            <h3 className='createGroupSubHeader'>Enter Group Name: </h3>
            <div className='createGroupMenu'>
                <input
                    className="searchFriendInput"
                    type="text"
                    id="groupname"
                    placeholder='Group Name'
                ></input>
                <button
                    className='searchFriendButton'
                    onClick={handleCreate}>
                    Create Group
                </button>
            </div>
            {sent ? (
                <div>
                    {status ? (
                        <div>
                            <h3 className='createGroupFooter'>Group Created!</h3>
                        </div>
                    ) : (
                        <div>
                            <h3 className='createGroupFooter'>Group Creation Failed</h3>
                        </div>
                    )}
                </div>
            ) : (
                <div></div>
            )}
            {/* Second  tab content will go here */}
        </div>
    );
};
export default CreateTab;