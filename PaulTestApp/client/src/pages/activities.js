import React, { useState } from "react";
import { ToggleGroup } from "../components/Button";
 
const mainCategories = ['Transportation', 'Eating', 'Household'];


const Activities = () => {
  const [activeType, setActiveType] = useState(null);
  const [activeActivity, setActiveActivity] = useState(null);

  const handleToggle = (type) => {
    setActiveType(type);
  };


  let activityTypes = null;

  if (activeType === 'Transportation') {
    activityTypes = ["drive", "walk", "run"];
  } else if (activeType === 'Eating') {
    activityTypes = ["breakfast", "lunch", "dinner"];
  } else if (activeType === 'Household') {
    activityTypes = ["cleaning", "cooking", "maintenance"];
  }


  let activityParams = null



    return (
        <div>
            <h1>
                Activities page!
            </h1>
            <ToggleGroup types={mainCategories} onToggle={handleToggle}/>
            {activityTypes && <ToggleGroup types={activityTypes} />}
            
        </div>
    );
};
  
 
export default Activities;