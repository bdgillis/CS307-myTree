const awardCheck = require('../src/awardCheck');

const activityHistory111 = {

    A1: {activeActivity: 'Takeout - Plastic', activeCategory: 'Eating', activityParam: '5', timestamp: 1698888492736},
    A2: {activeActivity: 'Temperature Adjustment - Cooling', activeCategory: 'Household', activityParam: '1', timestamp: 1698958250773},
    A3: {activeActivity: 'Drive - Carpool', activeCategory: 'Transportation', activityParam: '3', timestamp: 1698958322331},
    A4: {activeActivity: 'Bus', activeCategory: 'Transportation', activityParam: '56', timestamp: 1698958692278},
    A5: {activeActivity: 'Takeout - Plastic', activeCategory: 'Eating', activityParam: '1', timestamp: 1698958868344},
    A6: {activeActivity: 'Meal Protein - Vegetarian', activeCategory: 'Eating', activityParam: '1', timestamp: 1698958969881},
    A7: {activeActivity: 'Temperature Adjustment - Heating', activeCategory: 'Household', activityParam: '1', timestamp: 1698959315371},
    A8: {activeActivity: 'Electricity Consumption', activeCategory: 'Household', activityParam: '7.05', timestamp: 1698959452941},
    A9: {activeActivity: 'Bike/Scooter', activeCategory: 'Transportation', activityParam: '34', timestamp: 1698959573135}
};

test('awardCheck returns all correct awards', () => {
    const actual = awardCheck(activityHistory111);
    expect(actual).toEqual([true, true, true]);
});

const activityHistory000 = {
    A1: {activeActivity: 'Takeout - Plastic', activeCategory: 'Eating', activityParam: '5', timestamp: 1698888492736},
    A2: {activeActivity: 'Temperature Adjustment - Cooling', activeCategory: 'Household', activityParam: '1', timestamp: 1698958250773},
    A3: {activeActivity: 'Drive - Carpool', activeCategory: 'Transportation', activityParam: '3', timestamp: 1698958322331},
};

test('awardCheck returns all correct awards for no awards', () => {
    const actual = awardCheck(activityHistory000);
    expect(actual).toEqual([false, false, false]);
});

