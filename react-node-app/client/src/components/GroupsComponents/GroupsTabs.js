import React, {useState} from "react";
import FirstTab from "./SearchTab";
import SecondTab from "./CreateTab";
import ThirdTab from "../AllTabs/ThirdTab";



const GroupsTabs = () => {
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

  return (
    <div className="Tabs">
      {/* Tab nav */}
      <ul className="nav">
        <li className={activeTab === "tab1" ? "active" : ""}
            onClick={handleTab1}
        >
            Search
        </li>

        <li className={activeTab === "tab2" ? "active" : ""}
            onClick={handleTab2}
        >
            Create
        </li>
        
      </ul>
      <div className="outlet">
        {activeTab === "tab1" ? <FirstTab /> : 
        activeTab === "tab2" ? <SecondTab /> : <ThirdTab />}
      </div>

    </div>
  );
};
export default GroupsTabs;