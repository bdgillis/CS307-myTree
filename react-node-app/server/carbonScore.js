

function calcScore(category, activity, param) {

    let score = 0;
    p = Number(param);
    switch(category) {
        case "Transportation": {
            switch(activity) {
                case "Drive - Alone":
                    score = -1 * p * 0.03;
                    break;
                case "Drive - Carpool":
                    score = p * 0.03;
                    break;
                case "Walk":
                    score = p * 0.035;
                    break;
                case "Bike/Scooter":
                    score = p * 0.035;
                    break;
                case "Train":
                    score = p * 0.015;
                    break;
                case "Bus":
                    score = p * 0.015;
                    break;
                case "Airline Flight":
                    score = -1 * p * 0.004;
                    break;
                default:
                    score = 0;
                    break;
            }
            break;
        }
        case "Eating": {
            switch(activity) {
                case "Takeout - Styrofoam":
                    score = -1 * p * 0.9;
                    break;
                case "Takeout - Plastic":
                    score = -1 * p * 0.2;
                    break;
                case "Meal Protein - Poultry":
                    score = p * 0.013;
                    break;
                case "Meal Protein - Vegetarian":
                    score = p * 0.026;
                    break;
                case "Meal Protein - Red Meat":
                    score = -1 * p * 0.027;
                    break;
                case "Shopping - Farmer's Market/Co-op":
                    score = 1;
                    break;
                case "Shopping - Grocery Store":
                    score = -1 * 0.33 * (p - 3);
                    break;
                default:
                    score = 0;
                    break;
            }
            break;
        }
        case "Household": {
            switch(activity) {
                case "Cold Water Laundry":
                    score = p * 0.05;
                    break;
                case "Cold Shower":
                    score = p * 0.01;
                    break;
                case "Temperature Adjustment - Heating":
                    score = p * 0.5;
                    break;
                case "Temperature Adjustment - Cooling":
                    score = p;
                    break;
                case "Recycle":
                    score = p * 0.032;
                    break;
                case "Compost":
                    score = p * 0.04;
                    break;
                case "Trash":
                    score = -1 * p * 0.008;
                    break;
                case "Electricity Consumption":
                    score = -1 * (p - 7.06);
                    break;
                default:
                    score = 0;
                    break;
            }
            break;
        }
        default:
            score = 0;
            break;
    }
    return score;
}

module.exports = calcScore;

