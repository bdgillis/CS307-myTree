import React, { useState } from "react";
import FirstTab from "./FriendListTab";
import SecondTab from "./SearchFriendsTab";
import ThirdTab from "../NotificationComponents/FriendRequestsTab";
import FourthTab from "../NotificationComponents/NudgesTab";


const FriendsTabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    //  Functions to handle Tab Switching
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
    };
    const handleTab2 = () => {
        // update the state to tab2
        setActiveTab("tab2");
    };
    // const handleTab3 = () => {
    //     // update the state to tab2
    //     setActiveTab("tab3");
    // };
    // const handleTab4 = () => {
    //     // update the state to tab2
    //     setActiveTab("tab4");
    // };

    return (
        <div className="Tabs">
            {/* Tab nav */}
            <ul className="nav">
                <li className={activeTab === "tab1" ? "active" : ""}
                    onClick={handleTab1}>
                    Friend List


                </li>

                <li className={activeTab === "tab2" ? "active" : ""}
                    onClick={handleTab2}>
                    Search Friends


                </li>
                {/* <li className={activeTab === "tab3" ? "active" : ""}
                    onClick={handleTab3}>
                    Friend Requests
                </li>
                <li className={activeTab === "tab4" ? "active" : ""}
                    onClick={handleTab4}>
                    Nudges
                </li> */}

            </ul>
            <div className="outlet">
                {activeTab === "tab1" ? <FirstTab /> :
                    activeTab === "tab2" ? <SecondTab /> : 
                        activeTab === "tab3" ? <ThirdTab /> : <FourthTab />}
            </div>

        </div>
    );
};
export default FriendsTabs;