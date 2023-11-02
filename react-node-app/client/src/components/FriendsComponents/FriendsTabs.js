import React, { useState } from "react";
import FirstTab from "./FriendListTab";
import SecondTab from "./SearchFriendsTab";
import ThirdTab from "./FriendRequestsTab";


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
    const handleTab3 = () => {
        // update the state to tab2
        setActiveTab("tab3");
    };

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
                <li className={activeTab === "tab3" ? "active" : ""}
                    onClick={handleTab3}>
                    Friend Requests
                </li>

            </ul>
            <div className="outlet">
                {activeTab === "tab1" ? <FirstTab /> :
                    activeTab === "tab2" ? <SecondTab /> : <ThirdTab />}
            </div>

        </div>
    );
};
export default FriendsTabs;