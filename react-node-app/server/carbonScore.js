

function calcScore(category, activity, param) {

    let score = 0;
    p = Number(param);
    switch(category) {
        case "Transportation": {
            switch(activity) {
                case "Drive":
                    score = -1 * p * 0.088;
                    break;
                case "Walk":
                    score = p * 0.068;
                    break;
                case "Run":
                    score = p * 0.098;
                    break;
                case "Bus":
                    score = p * 0.076;
                    break;
                default:
                    score = 0;
                    break;
            }
            break;
        }
        case "Eating": {
            switch(activity) {
                case "Takeout":
                    score = -1 * p * 0.0348;
                    break;
                case "Meal Protein - Red Meat":
                    score = -1 * p * 0.027;
                    break;
                case "Meal Protein - Poultry":
                    score = p * 0.013;
                    break;
                case "Meal Protein - Vegetarian":
                    score = p * 0.026;;
                    break;
                default:
                    score = 0;
                    break;
            }
            break;
        }
        case "Household": {
            switch(activity) {
                case "Cold Water Wash":
                    score = p * 0.054;
                    break;
                case "Cold Shower":
                    score = p * 0.054;
                    break;
                case "Temperature Adjustment":
                    score = p * 0.04;
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

