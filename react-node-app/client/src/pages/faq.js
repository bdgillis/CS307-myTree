import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { ToggleGroup } from "../components/ActivityComponents/Button";
import './Logout.css'
import { ButtonLink } from '../components/Header';

const FAQ = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const mainCategories = ['Transportation', 'Eating', 'Household'];
    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryToggle = (type) => {
        setActiveCategory(type);
      };

    return (
        <>
            <div className='NavMenu'>
				<Sidebar isOpen={isOpen} toggle={toggle} />
				<Navbar toggle={toggle} />
			</div>
            <div>
                <h1>How is Carbon Score Calculated?</h1>
                <h2>Click on a category to learn more!</h2>
            </div>
            <div>
                <ToggleGroup types={mainCategories} onToggle={handleCategoryToggle}/>
            </div>
            <div>
                {activeCategory === 'Transportation' && 
                    <div>
                        <p style={{  
                            lineHeight: '1.6', 
                            margin: '10px 0',
                            textAlign: 'center'
                        }}>
                            Two of the transportation activities will decrease your carbon score.<br/>
                            Driving a car alone will decrease your carbon score by 1 point for every <br />
                            33 miles you drive, and flying will decrease your carbon score by 1 point for every <br />
                            250 miles you fly. Other more environmentally friendly transportation activities <br />
                            will increase your carbon score. You will earn one point for every 33 miles <br />
                            carpooled, every 28 miles biked/scootered or walked, or every 66 miles by bus or train.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ButtonLink to={"../homeTab"} children={"Return Home"}></ButtonLink>
                        </div>
                    </div>}
                {activeCategory === 'Eating' && 
                    <div>
                    <p style={{  
                        lineHeight: '1.6', 
                        margin: '10px 0',
                        textAlign: 'center'
                    }}>
                        Eating activities can also positively or negatively affect your carbon score. <br />
                        Getting takeout decreases your score by 1 point for every 5 meals you get <br />
                        that are in plastic containers, but more so if they are in styrofoam. <br />
                        If you choose to eat at home, a red-meat based meal takes away 0.027 points <br />
                        while a poultry meal adds 0.013 and a vegetarian meal adds 0.026. <br />
                        Finally, your shopping matters too, espcially how often you shop each week. <br />
                        Shopping at a farmer's market or co-op adds a full point, while shopping at a <br />
                        grocery store takes away 0.33 points for each time above 3 times a week. <br />
                        If you go less than 3 times a week to the grocery, you gain 0.33 points.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ButtonLink to={"../homeTab"} children={"Return Home"}></ButtonLink>
                    </div>
                </div>}
                {activeCategory === 'Household' && 
                    <div>
                    <p style={{  
                        lineHeight: '1.6', 
                        margin: '10px 0',
                        textAlign: 'center'
                    }}>
                        Household activities have relatively small effects on your carbon score, <br />
                        but they sure can add up! 10 cold showers or 5 cold water laundry loads <br />
                        add 0.1 points to your score. Temperature adjustments during the heating season <br />
                        (+1 degree) adds half a point while during the cooling season (-1 degree)adds <br />
                        a full points for every degree. Looking at waste, a standard 32 gallon container of  <br />
                        recycling adds just about a point, while the same amount of trash takes away <br />
                        a quarter of a point. Composting adds a full point for every 25 gallons. Finally, <br />
                        with the average weekly electricty consumption being about 7.06 kilowatt-hours every <br />
                        week, you are rewarded or penalized a point for every kilowatt-hour above or below <br />
                        7.06 in a week.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ButtonLink to={"../homeTab"} children={"Return Home"}></ButtonLink>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default FAQ;